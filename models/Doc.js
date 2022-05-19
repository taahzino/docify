// Dependencies
const mongoose = require("mongoose");

// Create the schema
const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        mimetype: {
            type: String,
            required: [true, "Mimetype is required"],
        },
        filename: {
            type: String,
            required: [true, "Filename is required"],
            unique: [true, "Filename must be unique"],
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
const Doc = mongoose.model("Doc", schema);

// Export the model
module.exports = Doc;
