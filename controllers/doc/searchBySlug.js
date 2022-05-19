const Doc = require("../../models/Doc");

const searchBySlug = async (req, res) => {
    let status = 500;
    try {
        let slug = req.query.slug;

        if (!slug || slug.trim().length < 1) {
            status = 400;
            throw new Error("Slug is required");
        }

        const docs = await Doc.find(
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
        res.status(status).json({
            status,
            message: error.message,
        });
    }
};

module.exports = searchBySlug;
