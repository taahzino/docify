const path = require("path");

const getDocFile = (req, res) => {
    try {
        res.status(200).sendFile(
            path.join(__dirname, "../../uploads/" + res.locals.doc.filename)
        );
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

module.exports = getDocFile;
