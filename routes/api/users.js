// Dependencies
const express = require("express");

// Internal Modules
const userController = require("../../controllers/user");
const { authGuard } = require("../../middlewares/common/");

// Create the Router
const users = express.Router();

// Request Handling
users.post("/", userController.register);
users.post("/login", userController.login);
users.post("/logout", authGuard, userController.logout);
users.get("/me", authGuard, userController.getData);
users.put("/me", authGuard, userController.updateData);

// Export the router
module.exports = users;
