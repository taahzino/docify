import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import classes from "../styles/Dashboard.module.css";
import AlertComponent from "./Alert";
import Gallery from "./Gallery";
import ProfileModal from "./ProfileModal";
import NewDocModal from "./NewDocModal";
import { useHistory } from "react-router-dom";

const DashboardPage = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNewDocModal, setShowNewDocModal] = useState(false);

    const history = useHistory();

    const logoutHandler = () => {
        history.push("/login");
    };

    return (
        <>
            <Container
                fluid
                className="rounded d-flex align-items-center justify-content-center"
            >
                <Container
                    className={`bg-dark text-light rounded p-2 ${classes.dashboard}`}
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
                    <AlertComponent variant="danger" show={false}>
                        Error
                    </AlertComponent>
                    <AlertComponent variant="success" show={false}>
                        Success
                    </AlertComponent>
                    <AlertComponent variant="secondary" show={false}>
                        No document uploaded yet
                    </AlertComponent>
                    <Gallery />
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
