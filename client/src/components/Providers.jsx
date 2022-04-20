import React, { useEffect, useState } from "react";
import NotificationRoom from "./NotificationRoom";
import { DocsProvider } from "../contexts/DocsContext";
import { ActionsProvider } from "../contexts/ActionsContext";
import { useAuth } from "../contexts/AuthContext";
import { useXhr } from "../hooks/useXhr";
import { setCookie } from "../utils/setCookie";

const Providers = ({ children }) => {
    const { currentUser, setCurrentUser } = useAuth();
    const [shouldGetMe, setShouldGetMe] = useState(false);

    const profileRequest = useXhr(
        shouldGetMe,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/users/me`
    );

    useEffect(() => {
        if (currentUser === "undefined" || !currentUser || currentUser._id) {
            setShouldGetMe(true);
        }

        return () => {
            setShouldGetMe(false);
        };
    }, []);

    useEffect(() => {
        if (profileRequest && profileRequest.data) {
            setCurrentUser(profileRequest.data.user);
            setCookie("currentUser", JSON.stringify(profileRequest.data.user));
        }

        return () => {};
    }, [profileRequest]);

    return (
        <NotificationRoom>
            <DocsProvider>
                <ActionsProvider>{children}</ActionsProvider>
            </DocsProvider>
        </NotificationRoom>
    );
};

export default Providers;
