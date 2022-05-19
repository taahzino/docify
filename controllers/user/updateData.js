// Dependencies
const bcrypt = require("bcryptjs");
const asyncHanlder = require("express-async-handler");

// Modules
const User = require("../../models/User");

// @desc Update user data
// @route PUT /api/users/me
// @access Private
const updateData = asyncHanlder(async (req, res) => {
    const { name, phone, password, password2 } = req.body;

    let fields = {};

    if (!password || password.trim().length === 0) {
        res.status(400);
        throw new Error("Password is required to make any change!");
    }

    if (
        (!name && !phone && !password2) ||
        (name.trim().length === 0 &&
            phone.trim().length === 0 &&
            password2.trim().length === 0)
    ) {
        res.status(400);
        throw new Error("Fields can't be empty!");
    }

    const user = await User.findById(res.locals.user._id);

    if (!user) {
        res.status(400);
        throw new Error("Bad Request");
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("Incorrect password!");
    }

    if (name && name !== res.locals.user.name && name.trim().length > 0) {
        fields.name = name;
    }

    if (
        phone &&
        phone !== res.locals.user.phone &&
        phone.trim().length === 11
    ) {
        const userbyPhone = await User.findOne({ phone });
        if (
            userbyPhone &&
            userbyPhone.phone.length === 11 &&
            userbyPhone._id !== res.locals.user._id
        ) {
            res.status(400);
            throw new Error("This phone is being used by another account!");
        }
        fields.phone = phone;
    }

    if (
        password2 &&
        password2.length !== 0 &&
        !(await bcrypt.compare(password2, user.password))
    ) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password2, salt);
        fields.password = hashedPassword;
    }

    if (Object.keys(fields).length === 0) {
        res.status(400);
        throw new Error("Nothing to update!");
    }

    const updatedUser = await User.findByIdAndUpdate(
        res.locals.user._id,
        fields,
        {
            new: true,
        }
    );

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        message: "Account updated successfully!",
    });
});

module.exports = updateData;
