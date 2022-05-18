// Dependencies
const asyncHanlder = require("express-async-handler");

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

module.exports = logout;
