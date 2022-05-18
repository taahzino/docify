// Dependencies
const asyncHanlder = require("express-async-handler");

// @desc GET user data
// @route GET /api/users/me
// @access Private
const getData = asyncHanlder(async (req, res) => {
    res.json({
        user: res.locals.user,
        token: res.locals.token,
    });
});

module.exports = getData;
