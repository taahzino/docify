const asyncHandler = require("express-async-handler");

const updateValidation = asyncHandler((req, res, next) => {
    const title =
        req.body.title && req.body.title.trim().length > 0
            ? req.body.title
            : false;

    if (!title) {
        res.status(400);
        throw new Error("Title is required!");
    }

    if (title.trim() === res.locals.doc.title.trim()) {
        res.status(400);
        throw new Error("Nothing to update!");
    }

    res.locals.updatedDoc = {
        title,
    };

    next();
});

module.exports = updateValidation;
