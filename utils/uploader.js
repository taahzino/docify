const multer = require("multer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");

const UPLOADS_FOLDER = path.join(__dirname, "../uploads/");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        cb(null, uuidV4() + fileExt);
    },
});

const uploader = multer({
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
            cb(new Error("Only .jpg, .png, .jpeg and .pdf formats are allowed!"));
        }
    },
});

module.exports = { storage, uploader };
