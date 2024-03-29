// Dependencies
const mongoose = require("mongoose");

// Create the schema
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email address must be unique"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: [true, "Phone number must be unique"],
            minLength: [11, "Invalid Phone Number"],
            maxLength: [11, "Invalid Phone Number"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

// Create the model
const User = mongoose.model("User", schema);

// Export the model
module.exports = User;
