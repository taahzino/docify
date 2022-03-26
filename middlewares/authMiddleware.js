// Dependencies
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const asyncHandler = require("express-async-handler");

// Modules
const User = require("../models/userModel");

// Functions
const authGuard = asyncHandler(async (req, res, next) => {
    try {
        const SERVER_TOKEN =
            req.signedCookies[process.env.LOGIN_COOKIE_NAME] || false;

        const CLIENT_TOKEN =
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
                ? req.headers.authorization.split(" ")[1]
                : false;

        const JWT = SERVER_TOKEN || CLIENT_TOKEN;

        const decoded = jwt.verify(JWT, process.env.JWT_SECRET_KEY);

        const doc = await User.findById(decoded._id).select("-password");

        const user = lodash.cloneDeep(doc.toObject());

        user.password = undefined;

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            errors: {
                common: { msg: "Authentication failure!" },
            },
        });
    }
});

// Export
module.exports = { authGuard };
