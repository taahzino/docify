const multer = require("multer");

// Create errorHandler Middleware
const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({
            message: err.message,
        });
    } else {
        const statusCode = res.statusCode ? res.statusCode : 500;

        res.status(statusCode);

        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }
};

// Export the middleware
module.exports = errorHandler;
