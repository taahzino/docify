const fs = require("fs");
const path = require("path");
const docModel = require("../../models/docModel");

const deleteOne = async (req, res) => {
    await docModel.deleteOne({ _id: res.locals.doc._id });

    fs.unlinkSync(
        path.join(__dirname, "../../uploads/" + res.locals.doc.filename)
    );

    res.status(200).json({
        message: "Document deleted successfully",
    });
};

module.exports = deleteOne;
