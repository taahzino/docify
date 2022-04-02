const { uploader } = require("../utils/uploader");

const Doc = require("../models/docModel");
const path = require("path");

const getAllDocs = async (req, res) => {
    try {
        const docs = await Doc.find({ user: res.locals.user._id });
        res.status(200).json({
            docs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

const saveDoc = async (req, res) => {
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

            console.log(newDoc);

            res.status(200).json({
                doc: newDoc,
                message: "Your file has been uploaded!",
            });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    });
};

const getADoc = async (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename)
    );
};

const downloadADoc = async (req, res) => {
    res.status(200).download(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename),
        `${res.locals.doc.title.split(' ').join('-')}.${res.locals.doc.mimetype.split('/')[1]}`
    );
};

module.exports = { saveDoc, getAllDocs, getADoc, downloadADoc };
