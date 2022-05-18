import React from "react";
import NotificationRoom from "./NotificationRoom";
import { DocsProvider } from "../contexts/DocsContext";
import { ActionsProvider } from "../contexts/ActionsContext";
import LandingRequests from "./LandingRequests";
import { ToastContainer } from "react-toastify";
import Body from "./layout/Body";

const Wrappers = ({ children }) => {
    return (
        <>
            <LandingRequests>
                <DocsProvider>
                    <NotificationRoom>
                        <ActionsProvider>
                            <Body>{children}</Body>
                        </ActionsProvider>
                    </NotificationRoom>
                </DocsProvider>
            </LandingRequests>
            <ToastContainer />
        </>
    );
};

export default Wrappers;
