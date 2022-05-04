// Dependencies
const express = require("express");

// Internal Modules
const { authGuard } = require("../middlewares/authMiddleware");
const {
    saveDoc,
    getAllDocs,
    getLimitedDocs,
    getADoc,
    getDocData,
    downloadADoc,
    deleteADoc,
    editADoc,
    mailADoc,
} = require("../controllers/docController");
const checkDocAccess = require("../middlewares/docMiddlewares/checkDocAccess");
const updateDocValidation = require("../middlewares/docMiddlewares/updateDocValidation");

// Create the Router
const router = express.Router();

// Request Handling
router.use(authGuard);

router.post("/", saveDoc);
router.get("/", getAllDocs);
router.get("/limit/:skip/:limit", getLimitedDocs);
router.get("/data/:id", checkDocAccess, getDocData);
router.get("/:id", checkDocAccess, getADoc);
router.delete("/:id", checkDocAccess, deleteADoc);
router.put("/:id", checkDocAccess, updateDocValidation, editADoc);
router.get("/download/:id", checkDocAccess, downloadADoc);
router.post("/mail/:id", checkDocAccess, mailADoc);

// Export the router
module.exports = router;
