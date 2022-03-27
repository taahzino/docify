// Dependencies
const express = require("express");
const multer = require("multer");

// Internal Modules
const storage = require("../utils/storage");
const { authGuard } = require("../middlewares/authMiddleware");

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 30000000, // 30MB
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg, .png, .jpeg and .pdf format allowed!"));
        }
    },
});

// Create the Router
const router = express.Router();

// Request Handling
router.post("/", authGuard, (req, res) => {
    try {
        upload.single("document")(req, res, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send({ message: err.message });
            }

            const file = req.file;
            res.status(200).send({
                filename: file.filename,
                mimetype: file.mimetype,
                originalname: file.originalname,
                size: file.size,
                fieldname: file.fieldname,
                message: "Your file has been uploaded",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }
});

// Export the router
module.exports = router;
