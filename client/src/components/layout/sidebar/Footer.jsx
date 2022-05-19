import React, { useState, useEffect } from "react";
import LinkItem from "./LinkItem";
import { useAuth } from "../../../contexts/AuthContext";
import { useDocs } from "../../../contexts/DocsContext";
import { useXhr } from "../../../hooks/useXhr";

const Footer = () => {
    const [shouldLogout, setShouldLogout] = useState(false);

    const { logout } = useAuth();
    const { removeDocs } = useDocs();

    const logoutHandler = () => {
        setShouldLogout(true);
    };

    const logoutResult = useXhr(
        shouldLogout,
        "post",
        `${process.env.REACT_APP_SERVER_URL}/api/users/logout`
    );

    useEffect(() => {
        if (logoutResult && logoutResult.type === "success") {
            removeDocs();
            logout();
        }

        return () => {
            setShouldLogout(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logoutResult]);
    return (
        <div>
            <LinkItem
                icon="bx bx-log-out icon"
                text="Logout"
                onClick={logoutHandler}
            />
        </div>
    );
};

export default Footer;
