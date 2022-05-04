import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useXhr } from "../hooks/useXhr";
import { useAuth } from "../contexts/AuthContext";
import { Form, Button } from "react-bootstrap";
import AlertComponent from "../components/Alert";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";

const Wrapper = styled.div`
    max-width: 500px;
    width: 100%;
`;

const Settings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const { currentUser, setCurrentUser } = useAuth();

    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(false);

        if (password.trim().length === 0) {
            setErrorMsg("Password is required to make any change!");
            return;
        }

        setLoading(true);
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

        return () => {};
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

            setLoading(false);
        }

        return () => {
            setShouldUpdate(false);
        };
    }, [result]);
    return (
        <>
            <PageTitle>Settings</PageTitle>
            <Wrapper>
                <Form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={errorMsg}>
                        {errorMsg}
                    </AlertComponent>

                    <AlertComponent variant="success" show={successMsg}>
                        {successMsg}
                    </AlertComponent>

                    <Loading loading={loading} text="Updating" />

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
                </Form>
            </Wrapper>
        </>
    );
};

export default Settings;
