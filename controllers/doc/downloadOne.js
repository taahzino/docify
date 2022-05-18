const path = require("path");

const downloadOne = (req, res) => {
    res.status(200).download(
        path.join(__dirname, "../../uploads/" + res.locals.doc.filename),
        `${res.locals.doc.title.split(" ").join("-")}.${
            res.locals.doc.mimetype.split("/")[1]
        }`
    );
};

module.exports = downloadOne;
