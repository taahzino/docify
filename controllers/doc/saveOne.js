const { uploader } = require("../../utils/uploader");
const Doc = require("../../models/Doc");

const saveOne = async (req, res) => {
    uploader.single("document")(req, res, async (err) => {
        try {
            if (err) {
                return res.status(400).send({ message: err.message });
            }

            const file = req.file;

            const newDoc = await Doc.create({
                title: req.body.title,
                filename: file.filename,
                mimetype: file.mimetype,
                user: res.locals.user._id,
            });

            res.status(200).json({
                doc: newDoc,
                message: "Your file has been uploaded!",
            });
        } catch (err) {
            return res.status(400).json({ message: "File upload failed!" });
        }
    });
};

module.exports = saveOne;
