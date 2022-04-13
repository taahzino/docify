const events = require("events");
const { sendMail } = require("../config/nodemailer");
const emailSender = new events.EventEmitter();

const Mail = require("../models/mailModel");

const sendedEmailHandler = async (data) => {
    try {
        const sent = await Mail.findByIdAndUpdate(
            data._id,
            { status: "sent" },
            { new: true }
        ).populate("user");

        global.io.to(`NOTIFICATION_ROOM_${sent.socketid}`).emit("new_notice", {
            message: `Email (${sent.subject}) has been sent successfully`,
            mail: sent,
        });
    } catch (error) {
        console.log(error);
    }
};

const newEmailHandler = function ({ mail, user }) {
    sendMail(
        {
            to: mail.receiver,
            subject: mail.subject,
            text: `${mail.message}`,
            filename: mail.filename,
            user,
        },
        (err, info) => {
            if (err) {
                console.log(err);
            } else {
                emailSender.emit("mail_sent", mail);
            }
        }
    );
};

const pendingEmailHandler = async () => {
    try {
        const pendingMails = await Mail.find({ status: "pending" }).populate(
            "user"
        );
        if (
            global.nodemailerStatus === "on" &&
            pendingMails &&
            pendingMails.length > 0
        ) {
            pendingMails.forEach((pm) => {
                sendMail(
                    {
                        to: pm.receiver,
                        subject: pm.subject,
                        text: `${pm.message}`,
                        filename: pm.filename,
                        user: pm.user,
                    },
                    (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            emailSender.emit("mail_sent", pm);
                        }
                    }
                );
            });
        }
    } catch (error) {
        console.log(error);
    }
};

emailSender.on("mail_sent", sendedEmailHandler);
emailSender.on("send_new_email", newEmailHandler);
emailSender.on("send_pending_emails", pendingEmailHandler);

// emailSender.emit("new_email", { name: "TAT" });

module.exports = { events, emailSender };
