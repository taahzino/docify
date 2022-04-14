import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useXhr } from "../hooks/useXhr";
import { useDocs } from "../contexts/DocsContext";
import { useActions } from "../contexts/ActionsContext";
import ProfileModal from "./ProfileModal";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [shouldLogout, setShouldLogout] = useState(false);

    const { logout } = useAuth();
    const { setShowNewDocModal } = useActions();
    const { dispatchDocs } = useDocs();

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
            dispatchDocs({ type: "unload" });
            logout();
        }

        return () => {
            setShouldLogout(false);
        };
    }, [logoutResult]);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Dashboard</h4>
                <div>
                    <Button
                        className="ms-2"
                        variant="light"
                        onClick={() => {
                            setShowNewDocModal(true);
                        }}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </Button>
                    <Button
                        variant="light"
                        className="ms-2"
                        onClick={() => {
                            setShowProfile(true);
                        }}
                    >
                        <i className="bi bi-person"></i>
                    </Button>
                    <Button
                        className="ms-2"
                        variant="light"
                        onClick={logoutHandler}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </Button>
                </div>
            </div>
            <hr />
            <ProfileModal
                show={showProfile}
                handleClose={() => {
                    setShowProfile(false);
                }}
            />
        </div>
    );
};

export default Header;
