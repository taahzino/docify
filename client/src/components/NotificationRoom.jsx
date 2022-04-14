import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "../utils/setCookie";

const NotificationRoom = ({ children }) => {
    useEffect(() => {
        const serverurl = process.env.REACT_APP_SERVER_URL;

        const socket = io(serverurl);

        socket.on("connect", () => {
            setCookie("socketid", socket.id);
        });

        socket.on("new_notice", (data) => {
            toast.success(data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        });

        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000);
        });
    }, []);

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};

export default NotificationRoom;
