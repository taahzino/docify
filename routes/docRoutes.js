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
router.use(authGuard);

router.post("/", saveDoc);
router.get("/", getAllDocs);
router.get("/:id", checkDocAccess, getADoc);
router.delete("/:id", checkDocAccess, deleteADoc);
router.put("/:id", checkDocAccess, updateDocValidation, editADoc);
router.get("/download/:id", checkDocAccess, downloadADoc);

// Export the router
module.exports = router;
