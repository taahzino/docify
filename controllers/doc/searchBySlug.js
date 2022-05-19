const docModel = require("../../models/docModel");

const searchBySlug = async (req, res) => {
    try {
        const slug = req.query.slug.trim().toString();
        const docs = await docModel.find(
            {
                title: {
                    $regex: slug,
                    $options: "$i",
                },
                user: res.locals.user,
            },
            null,
            {
                sort: { updatedAt: -1 },
            }
        );
        res.status(200).json({
            docs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

module.exports = searchBySlug;
