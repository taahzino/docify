// Dependencies
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Modules
const generateToken = require("../../utils/generateToken");

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

        const COOKIE_TOKEN = req.cookies.token;

        const COOKIE_SOCKET_ID = req.cookies.socketid;

        const HEADER_SOCKET_ID = req.headers.socketid;

        const JWT = SERVER_TOKEN || CLIENT_TOKEN || COOKIE_TOKEN;

        const SOCKET_ID = COOKIE_SOCKET_ID || HEADER_SOCKET_ID;

        const decoded = jwt.verify(JWT, process.env.JWT_SECRET_KEY);

        res.locals.user = decoded;

        res.locals.socketid = SOCKET_ID;

        const exp = parseInt(decoded.exp.toString() + "000");

        const remaining = parseInt((exp - Date.now()) / (1000 * 86400));

        if (remaining <= 15) {
            const newToken = generateToken(res);
            res.locals.token = newToken;
        } else {
            res.cookie(process.env.LOGIN_COOKIE_NAME, JWT, {
                maxAge: exp - Date.now(),
                httpOnly: true,
                signed: true,
            });
            res.locals.token = JWT;
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error("Authentication falure");
    }
});

// Export
module.exports = authGuard;
