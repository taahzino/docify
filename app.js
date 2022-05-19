// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const socketIo = require("socket.io");
const http = require("http");

// Configure dotenv
dotenv.config();

// Internal Modules
const middlewares = require("./middlewares");
const { emailSender } = require("./workers/emailSender");
const { verifyNodeMailer } = require("./config/nodemailer");
const connectDB = require("./config/database");

// Get Environment Vairables
const { PORT } = process.env;
const APP_ORIGINS = process.env.APP_ORIGINS.split("_");

// Establish database connection
connectDB();

// Nodemailer connection
verifyNodeMailer();

// Create Express App
const app = express();

// Create http server
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: APP_ORIGINS,
    },
});

global.io = io;

// Connect user with server
io.on("connect", (socket) => {
    socket.join(`NOTIFICATION_ROOM_${socket.id}`);
});

// Request-Response Middlewares
app.use(middlewares.common.reqRes);

// Routes
app.use("/api", require("./routes/api/index"));

// Error handing middleware
app.use(middlewares.common.errorHandler);

// Start the server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    setTimeout(() => {
        emailSender.emit("send_pending_emails");
    }, 10000);

    setTimeout(() => {
        emailSender.emit("send_pending_emails");
    }, 900000);

    setInterval(() => {
        emailSender.emit("send_pending_emails");
    }, 1800000);
});
