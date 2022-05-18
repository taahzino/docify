const docModel = require("../../models/docModel");

const getFew = async (req, res) => {
    try {
        const docs = await docModel.find({ user: res.locals.user._id }, null, {
            sort: { updatedAt: -1 },
            skip: req.params.skip,
            limit: req.params.limit,
        });
        res.status(200).json({
            docs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

module.exports = getFew;
