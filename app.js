// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const socketIo = require("socket.io");
const http = require("http");
const requestResponseMiddlewares = require("./middlewares/requestResponse");

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
const { emailSender } = require("./workers/emailSender");

// Get Environment Vairables
const { PORT } = process.env;
const APP_ORIGINS = process.env.APP_ORIGINS.split("_");

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

io.on("connect", (socket) => {
    socket.join(`NOTIFICATION_ROOM_${socket.id}`);
});

// Request-Response Middlewares
app.use(requestResponseMiddlewares);

// Routes
app.use("/api", require("./routes/api/index"));

// Error handing middleware
app.use(errorHandler);

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
