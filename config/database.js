// Dependencies
const mongoose = require("mongoose");

// Function for connecting to the DB
const connectDB = async () => {
    try {
        const MONGO_URI = process.env.NODE_ENV.trim().toString() === 'development' ? process.env.MONGO_URI_DEVELOPMENT : process.env.MONGO_URI_PRODUCTION;
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// Export the connectDB
module.exports = connectDB;
