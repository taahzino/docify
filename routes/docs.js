// Dependencies
const express = require("express");

// Internal Modules
const { authGuard } = require("../middlewares/authMiddleware");
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
} = require("../controllers/doc");
const checkDocAccess = require("../middlewares/docMiddlewares/checkDocAccess");
const updateDocValidation = require("../middlewares/docMiddlewares/updateDocValidation");

// Create the Router
const docs = express.Router();

// Request Handling
docs.use(authGuard);

docs.post("/", saveOne);
docs.get("/", getAll);
docs.get("/limit/:skip/:limit", getFew);
docs.get("/data/:id", checkDocAccess, getOne);
docs.get("/:id", checkDocAccess, getDocFile);
docs.delete("/:id", checkDocAccess, deleteOne);
docs.put("/:id", checkDocAccess, updateDocValidation, updateOne);
docs.get("/download/:id", checkDocAccess, downloadOne);
docs.post("/mail/:id", checkDocAccess, mailOne);

// Export the router
module.exports = docs;
