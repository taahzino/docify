const { uploader } = require("../utils/uploader");

const Doc = require("../models/docModel");
const path = require("path");
const fs = require("fs");
const { sendMail } = require("../config/nodemailer");
const validator = require("validator");

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
            return res.status(400).json({ message: "File upload failed!" });
        }
    });
};

const getADoc = (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "../uploads/" + res.locals.doc.filename)
    );
};

const mailADoc = async (req, res) => {
    try {
        const doc = res.locals.doc;
        const user = res.locals.user;

        const receiver =
            req.body.receiver && req.body.receiver.trim().length > 0
                ? req.body.receiver
                : false;

        if (!receiver) {
            res.status(400);
            throw new Error("Receiver address is required!");
        }

        if (!validator.isEmail(receiver)) {
            res.status(400);
            throw new Error("Receiver address is invalid!");
        }

        const subject =
            req.body.subject && req.body.subject.trim().length > 0
                ? req.body.subject
                : doc.title;

        const message =
            req.body.message && req.body.message.trim().length > 0
                ? req.body.message
                : "";

        res.status(200).json({
            message: "Your document will be sent in a minute!",
            doc,
        });

        sendMail(
            {
                to: receiver,
                subject,
                text: `${message}<div>This email was sent using Docify App by: ${user.email}`,
                filename: doc.filename,
            },
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json({
            message: error.message,
        });
    }
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
            message: "Document updated successfully!",
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
    mailADoc,
};
