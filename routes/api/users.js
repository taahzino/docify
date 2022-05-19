// Dependencies
const express = require("express");

// Internal Modules
const {
    register,
    login,
    logout,
    getData,
    updateData,
} = require("../../controllers/user");
const { authGuard } = require("../../middlewares/authMiddleware");

// Create the Router
const users = express.Router();

// Request Handling
users.post("/", register);
users.post("/login", login);
users.post("/logout", authGuard, logout);
users.get("/me", authGuard, getData);
users.put("/me", authGuard, updateData);

// Export the router
module.exports = users;
