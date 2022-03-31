import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AlertComponent from "./Alert";
import { useAuth } from "../contexts/AuthContext";
import { useXhr } from "../hooks/useXhr";

const ProfileModal = ({ show, handleClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const { currentUser, setCurrentUser } = useAuth();

    const [shouldUpdate, setShouldUpdate] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (password.trim().length === 0) {
            setErrorMsg("Password is required to make any change!");
            return;
        }

        setShouldUpdate(true);
    };

    const result = useXhr(
        shouldUpdate,
        "put",
        `${process.env.REACT_APP_SERVER_URL}/api/users/me`,
        {
            name: username,
            phone,
            password,
            password2,
        }
    );

    useEffect(() => {
        setUsername(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
    }, [currentUser]);

    useEffect(() => {
        if (result) {
            setShouldUpdate(false);

            if (result.type === "error") {
                setErrorMsg(result.data.message);
            } else {
                setSuccessMsg(result.data.message);

                delete result.data.message;

                setCurrentUser(result.data);

                setPassword("");
                setPassword2("");

                setTimeout(() => {
                    setSuccessMsg();
                }, 3000);
            }
        }

        return () => {
            setShouldUpdate(false);
        };
    }, [result]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Hi, Fulan</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={errorMsg}>
                        {errorMsg}
                    </AlertComponent>

                    <AlertComponent variant="success" show={successMsg}>
                        {successMsg}
                    </AlertComponent>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="What should we call you now?"
                            value={username}
                            onChange={(e) => {
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
                            onChange={(e) => {
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
                            onChange={(e) => {
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
                            onChange={(e) => {
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
                            onChange={(e) => {
                                setPassword2(e.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            Leave this empty if you do not want to change your
                            password.
                        </Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={submitHandler}
                    >
                        Update Account
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
