const Doc = require("../../models/Doc");

const updateOne = async (req, res) => {
    try {
        const doc = await Doc.findByIdAndUpdate(
            res.locals.doc._id,
            res.locals.updatedDoc,
            {
                new: true,
            }
        );

        res.status(200).json({
            message: "Document updated successfully!",
            doc,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

module.exports = updateOne;
