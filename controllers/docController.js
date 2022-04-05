const { uploader } = require("../utils/uploader");

const Doc = require("../models/docModel");
const path = require("path");
const fs = require("fs");

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
            return res.status(400).json({ message: 'File upload failed!' });
        }
    });
};

const getADoc = (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename)
    );
};

const editADoc = async (req, res) => {
    try {
        const doc = await Doc.findByIdAndUpdate(
            res.locals.doc._id,
            res.locals.updatedDoc,
            {
                new: true,
            }
        );

        res.status(200).json({
            message: 'Document updated successfully!',
            doc,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

const downloadADoc = (req, res) => {
    res.status(200).download(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename),
        `${res.locals.doc.title.split(" ").join("-")}.${
            res.locals.doc.mimetype.split("/")[1]
        }`
    );
};

const deleteADoc = async (req, res) => {
    await Doc.findByIdAndDelete(res.locals.doc._id);

    fs.unlinkSync(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename)
    );

    res.status(200).json({
        message: "Document deleted successfully",
    });
};

module.exports = {
    saveDoc,
    getAllDocs,
    getADoc,
    downloadADoc,
    deleteADoc,
    editADoc,
};
