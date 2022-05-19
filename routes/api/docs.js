// Dependencies
const express = require("express");

// Internal Modules
const { authGuard } = require("../../middlewares/authMiddleware");
const {
    getDocFile,
    getOne,
    getAll,
    getFew,
    saveOne,
    downloadOne,
    deleteOne,
    updateOne,
    mailOne,
    searchBySlug,
} = require("../../controllers/doc");
const checkDocAccess = require("../../middlewares/docMiddlewares/checkDocAccess");
const updateDocValidation = require("../../middlewares/docMiddlewares/updateDocValidation");

// Create the Router
const docs = express.Router();

// Middlewares
docs.use(authGuard);

// Request Handling
docs.get("/search", searchBySlug);
docs.get("/limit/:skip/:limit", getFew);
docs.get("/data/:id", checkDocAccess, getOne);
docs.get("/download/:id", checkDocAccess, downloadOne);
docs.post("/mail/:id", checkDocAccess, mailOne);
docs.post("/", saveOne);
docs.get("/", getAll);
docs.get("/:id", checkDocAccess, getDocFile);
docs.delete("/:id", checkDocAccess, deleteOne);
docs.put("/:id", checkDocAccess, updateDocValidation, updateOne);

// Export the router
module.exports = docs;
