// Dependencies
const mongoose = require("mongoose");

// Create the schema
const mailSchema = mongoose.Schema(
    {
        status: {
            type: String,
            default: "pending",
        },
        receiver: {
            type: String,
            required: [true, "Receiver address is required"],
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
        },
        message: {
            type: String,
            default: "",
        },
        filename: {
            type: String,
            required: [true, "Filename is required"],
        },
        socketid: {
            type: String,
            required: [true, "socketid is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// Create the model
const mailModel = mongoose.model("Mail", mailSchema);

// Export the model
module.exports = mailModel;
