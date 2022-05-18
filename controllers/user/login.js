// Dependencies
const bcrypt = require("bcryptjs");
const asyncHanlder = require("express-async-handler");

// Modules
const User = require("../../models/userModel");
const generateToken = require("../../utils/generateToken");

// @desc Authentication an user
// @route POST /api/users/login
// @access Public
const login = asyncHanlder(async (req, res) => {
    const { email, phone, password } = req.body;

    let userID;

    if (!email && !phone) {
        res.status(400);
        throw new Error("Email or Phone number is required!");
    }
    if (email) {
        userID = { email };
    } else {
        userID = { phone };
    }
    if (!password) {
        res.status(400);
        throw new Error("Password is required!");
    }

    // Check user by email/phone
    const user = await User.findOne(userID);

    userID = null;

    if (user && (await bcrypt.compare(password, user.password))) {
        res.locals.user = {
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };

        const token = generateToken(res);

        res.status(201).json({
            user: res.locals.user,
            token,
            message: "Logged in successfully!",
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials!");
    }
});

module.exports = login;
