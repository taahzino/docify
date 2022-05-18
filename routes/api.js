const express = require("express");

const api = express.Router();

api.use("/users", require("./users"));
api.use("/docs", require("./docs"));

module.exports = api;
