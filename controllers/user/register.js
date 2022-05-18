// Dependencies
const bcrypt = require("bcryptjs");
const asyncHanlder = require("express-async-handler");

// Modules
const User = require("../../models/userModel");

// @desc Register new User
// @route POST /api/users
// @access Public
const register = asyncHanlder(async (req, res) => {
    const { name, email, phone, password, password2 } = req.body;

    if (!name || !email || !phone || !password || !password2) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    if (password !== password2) {
        res.status(400);
        throw new Error("Passwords do not match!");
    }

    if (phone.length !== 11) {
        res.status(400);
        throw new Error(
            "Phone number must be exact 11 characters long and Bangladeshi!"
        );
    }

    // Check if the user exists
    const emailExists = await User.findOne({ email });
    const phoneExists = await User.findOne({ phone });

    if (emailExists) {
        res.status(400);
        throw new Error("Email already exists!");
    }

    if (phoneExists) {
        res.status(400);
        throw new Error("Phone number already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            message: "Registered successfully!",
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data!");
    }
});

module.exports = register;
