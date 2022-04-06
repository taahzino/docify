// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// Configure dotenv
dotenv.config();

// Establish database connection
const connectDB = require("./config/database");
connectDB();

// Nodemailer connection
const { verifyNodeMailer } = require("./config/nodemailer");
verifyNodeMailer();

// Internal Modules
const { errorHandler } = require("./middlewares/errorMiddleware");

// Get Environment Vairables
const { PORT } = process.env;

// Create Express App
const app = express();

// Middlewares
app.use(
    cors({
        origin: [
            "http://localhost:8080",
            "http://localhost:3000",
            "http://localhost:3000",
            "http://docify.devtahsin.com",
            "https://docify.devtahsin.com",
        ],
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/docs", require("./routes/docRoutes"));
app.use("/", express.static(path.join(__dirname, "./client/build/")));
app.use("/:anything", express.static(path.join(__dirname, "./client/build/")));
app.use(errorHandler);

// Start the app
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
