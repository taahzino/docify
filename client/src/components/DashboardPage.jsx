import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import classes from "../styles/Dashboard.module.css";
import AlertComponent from "./Alert";
import Gallery from "./Gallery";
import ProfileModal from "./ProfileModal";
import NewDocModal from "./NewDocModal";
import { useAuth } from "../contexts/AuthContext";
import { useXhr } from "../hooks/useXhr";
import { useDocs } from "../contexts/DocsContext";
import Loading from "./Loading";
import { toast } from "react-toastify";

const DashboardPage = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNewDocModal, setShowNewDocModal] = useState(false);

    const [shouldLogout, setShouldLogout] = useState(false);

    const [shouldGetDocs, setShouldGetDocs] = useState(false);
    const [loading, setLoading] = useState(true);

    const { logout } = useAuth();

    const { docs, dispatchDocs } = useDocs();

    const logoutHandler = () => {
        setShouldLogout(true);
    };

    const logoutResult = useXhr(
        shouldLogout,
        "post",
        `${process.env.REACT_APP_SERVER_URL}/api/users/logout`
    );

    const getAllDocs = useXhr(
        shouldGetDocs,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/`
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

    useEffect(() => {
        if (getAllDocs && getAllDocs.type === "success") {
            let payload = getAllDocs.data.docs;
            if (getAllDocs.data.docs.length > 0) {
                dispatchDocs({
                    type: "load",
                    payload,
                });
            }
            toast("Fetched all docs", {
                theme: "dark",
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            setLoading(false);
            setShouldGetDocs(false);
        }

        return () => {
            setLoading(false);
            setShouldGetDocs(false);
        };
    }, [getAllDocs]);

    useEffect(() => {
        setShouldGetDocs(true);

        return () => {
            setShouldGetDocs(false);
        };
    }, []);

    return (
        <>
            <Container
                fluid
                className="rounded d-flex align-items-center justify-content-center"
            >
                <Container
                    className={`text-light rounded p-2 ${classes.dashboard}`}
                >
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

                    <AlertComponent
                        variant="secondary"
                        show={!loading && docs && docs.length < 1}
                    >
                        No document uploaded yet
                    </AlertComponent>

                    <Loading loading={loading} text="Getting your docs" />

                    <Gallery docs={docs} />
                </Container>
            </Container>
            <ProfileModal
                show={showProfile}
                handleClose={() => {
                    setShowProfile(false);
                }}
            />
            <NewDocModal
                show={showNewDocModal}
                handleClose={() => {
                    setShowNewDocModal(false);
                }}
            />
        </>
    );
};

export default DashboardPage;
