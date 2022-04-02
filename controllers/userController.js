// Dependencies
const bcrypt = require("bcryptjs");
const asyncHanlder = require("express-async-handler");

// Modules
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc Register new User
// @route POST /api/users
// @access Public
const registerUser = asyncHanlder(async (req, res) => {
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

// @desc Authentication an user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHanlder(async (req, res) => {
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

// @desc GET user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHanlder(async (req, res) => {
    res.json({
        user: res.locals.user,
        token: res.locals.token,
    });
});

// @desc Update user data
// @route PUT /api/users/me
// @access Private
const updateMe = asyncHanlder(async (req, res) => {
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

// @desc Logout loggedin user
// @route POST /api/users/logout
// @access Private
const logout = asyncHanlder(async (req, res) => {
    res.cookie(
        process.env.LOGIN_COOKIE_NAME,
        {},
        {
            maxAge: 0,
            httpOnly: true,
            signed: true,
        }
    );

    res.status(201).json({
        message: "Logged out successfully!",
    });
});

module.exports = { registerUser, loginUser, logout, getMe, updateMe };
