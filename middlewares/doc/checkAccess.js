const asyncHandler = require("express-async-handler");
const Doc = require("../../models/Doc");
const isValidMID = require("../../utils/isValidMID");

const checkAccess = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!isValidMID(id)) {
        res.status(400);
        throw new Error("Invalid document id");
    }
    const doc = await Doc.findById(req.params.id);

    if (!doc) {
        res.status(404);
        throw new Error("Document not found!");
    }

    if (doc.user.toString() !== res.locals.user._id.toString()) {
        res.status(403);
        throw new Error(
            "You do not have the permission to access this resource!"
        );
    }

    res.locals.doc = doc;

    next();
});

module.exports = checkAccess;
