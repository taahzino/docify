import React from "react";
import NotificationRoom from "./NotificationRoom";
import { DocsProvider } from "../contexts/DocsContext";
import { ActionsProvider } from "../contexts/ActionsContext";
import Layout from "./Layout";
import LandingRequests from "./LandingRequests";
import { ToastContainer } from "react-bootstrap";

const Wrappers = ({ children }) => {
    return (
        <>
            <LandingRequests>
                <NotificationRoom>
                    <DocsProvider>
                        <ActionsProvider>
                            <Layout>{children}</Layout>
                        </ActionsProvider>
                    </DocsProvider>
                </NotificationRoom>
            </LandingRequests>
            <ToastContainer />
        </>
    );
};

export default Wrappers;
