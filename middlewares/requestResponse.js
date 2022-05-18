const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Configure dotenv
dotenv.config();

const APP_ORIGINS = process.env.APP_ORIGINS.split("_");

const requestResponseMiddlewares = [
    (req, res, next) => {
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Headers, *"
        );
        next();
    },
    cors({
        origin: APP_ORIGINS,
        optionsSuccessStatus: 200,
    }),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.COOKIE_SECRET),
];

module.exports = requestResponseMiddlewares;
