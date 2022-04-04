// Dependencies
const express = require("express");

// Internal Modules
const { authGuard } = require("../middlewares/authMiddleware");
const {
    saveDoc,
    getAllDocs,
    getADoc,
    downloadADoc,
    deleteADoc,
    editADoc,
} = require("../controllers/docController");
const checkDocAccess = require("../middlewares/docMiddlewares/checkDocAccess");
const updateDocValidation = require("../middlewares/docMiddlewares/updateDocValidation");

// Create the Router
const router = express.Router();

// Request Handling
router.post("/", authGuard, saveDoc);
router.get("/", authGuard, getAllDocs);
router.get("/:id", authGuard, checkDocAccess, getADoc);
router.delete("/:id", authGuard, checkDocAccess, deleteADoc);
router.put("/:id", authGuard, checkDocAccess, updateDocValidation, editADoc);
router.get("/download/:id", authGuard, checkDocAccess, downloadADoc);

// Export the router
module.exports = router;
