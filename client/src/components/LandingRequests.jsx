import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useXhr } from "../hooks/useXhr";
import { setCookie } from "../utils/setCookie";

const LandingRequests = ({ children }) => {
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
    }, [currentUser]);

    useEffect(() => {
        if (profileRequest && profileRequest.data) {
            setCurrentUser(profileRequest.data.user);
            setCookie("currentUser", JSON.stringify(profileRequest.data.user));
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileRequest]);

    return <>{children}</>;
};

export default LandingRequests;
