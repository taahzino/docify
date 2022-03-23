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

module.exports = storage;
