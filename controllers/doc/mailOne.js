const validator = require("validator");
const mailModel = require("../../models/mailModel");
const { emailSender } = require("../../workers/emailSender");

const mailOne = async (req, res) => {
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

        const mail = await mailModel.create({
            receiver,
            subject,
            filename: doc.filename,
            message,
            user: user._id,
            socketid: res.locals.socketid,
        });

        emailSender.emit("send_new_email", { mail, user });

        res.status(200).json({
            message: "Your document will be sent in a minute!",
            doc,
        });
    } catch (error) {
        console.log(error.message);
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json({
            message: error.message,
        });
    }
};

module.exports = mailOne;
