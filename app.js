// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const http = require("http");

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
const ORIGINS = process.env.ORIGINS.split("_");

// Create Express App
const app = express();

// Create http server
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: ORIGINS,
    },
});

global.io = io;

io.on("connect", (socket) => {
    socket.join(`NOTIFICATION_ROOM_${socket.id}`);

    io.to(`NOTIFICATION_ROOM_${socket.id}`).emit("new_notice", {
        message: "Realtime notification activated",
    });
});

// Middlewares
app.use(
    cors({
        origin: ORIGINS,
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api", require("./routes/apiRoutes"));
app.use("/app", express.static(path.join(__dirname, "./client/build/")));
// app.use("/:anything", express.static(path.join(__dirname, "./client/build/")));
app.use(errorHandler);

// Start the server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    emailSender.emit("send_pending_emails");

    setInterval(() => {
        emailSender.emit("send_pending_emails");
    }, 300000);
});
