// Dependencies
const express = require("express");

// Internal Modules
const { authGuard } = require("../middlewares/authMiddleware");
const {
    saveDoc,
    getAllDocs,
    getADoc,
    downloadADoc,
} = require("../controllers/docController");
const checkDocAccess = require("../middlewares/docMiddlewares/checkDocAccess");
// Create the Router
const router = express.Router();

// Request Handling
router.post("/", authGuard, saveDoc);
router.get("/", authGuard, getAllDocs);
router.get("/:id", authGuard, checkDocAccess, getADoc);
router.get("/download/:id", authGuard, checkDocAccess, downloadADoc);

// Export the router
module.exports = router;
