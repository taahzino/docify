import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import AlertComponent from "./Alert";
import { useAxios } from "../hooks/useAxios";

const ProfileModal = ({ show, handleClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { currentUser, setCurrentUser, Authorization } = useAuth();

    const [filledUp, setFilledUp] = useState();

    const submitHandler = e => {
        e.preventDefault();
        setFilledUp(false);
        setShowError(false);
        setShowSuccess(false);
        setErrorMessage("");
        setSuccessMessage("");

        if (password.trim().length === 0) {
            setShowError(true);
            setErrorMessage("Password is required to make any change!");
            return;
        }

        setFilledUp(true);
    };

    useEffect(() => {
        setUsername(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
    }, [currentUser]);

    useEffect(() => {
        (async () => {
            if (filledUp) {
                const result = await useAxios(
                    "put",
                    "/api/users/me",
                    {
                        name: username,
                        phone,
                        password,
                        password2
                    },
                    Authorization
                );

                if (result.type === "error") {
                    setShowError(true);
                    setErrorMessage(result.data.message);
                    setFilledUp(false);
                } else {
                    setShowSuccess(true);
                    setSuccessMessage(result.data.message);

                    delete result.data.message;

                    setCurrentUser(result.data);

                    setPassword("");
                    setPassword2("");

                    setTimeout(() => {
                        setShowSuccess(false);
                        setSuccessMessage(null);
                    }, 3000);
                }
            }
        })();

        return () => {
            setFilledUp(false);
        };
    }, [filledUp]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Hi, Fulan</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={showError}>
                        {errorMessage}
                    </AlertComponent>

                    <AlertComponent variant="success" show={showSuccess}>
                        {successMessage}
                    </AlertComponent>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="What should we call you now?"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="You can't change your email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            You can't change your email.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            minLength="11"
                            maxLength="11"
                            placeholder="Phone number must be bangladeshi"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicCurrentPassword"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicNewPassword"
                    >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new Password"
                            value={password2}
                            onChange={e => {
                                setPassword2(e.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            Leave this empty if you do not want to change your
                            password.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Account
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
