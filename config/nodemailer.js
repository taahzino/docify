const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.EMAILHOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS,
    },
});

const verifyNodeMailer = () => {
    transporter.verify(function (error) {
        if (error) {
            console.log(error);
            process.exit(1);
        } else {
            global.nodemailerStatus = "on";
            console.log("Nodemailer is ready send our messages");
        }
    });
};

const sendMail = ({ to, subject, text, filename, user }, callback) => {
    transporter.sendMail(
        {
            from: `Docify <${process.env.EMAILUSER}>`,
            to,
            subject,
            text,
            html: `<div>${text}</div> <hr /> <div><i>This email was sent using <b>Docify</b> App by ${user.name} - <b>${user.email}</b></i></div>`,
            attachments: [
                {
                    filename,
                    content: fs.createReadStream(
                        path.join(__dirname, `../uploads/${filename}`)
                    ),
                },
            ],
        },
        callback
    );
};

module.exports = { transporter, verifyNodeMailer, sendMail };
