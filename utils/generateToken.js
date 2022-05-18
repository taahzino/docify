const jwt = require("jsonwebtoken");

const generateToken = (res) => {
    const token = jwt.sign(res.locals.user, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });

    res.cookie(process.env.LOGIN_COOKIE_NAME, token, {
        maxAge: 864000000000,
        httpOnly: true,
        signed: true,
    });

    return token;
};

module.exports = generateToken;
