import React, { useEffect, useState } from "react";
import classes from "../styles/FormCard.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AlertComponent from "./Alert";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [filledUp, setFilledUp] = useState();

    const history = useHistory();

    const { signup } = useAuth();

    const submitHandler = async e => {
        e.preventDefault();
        setShowError(false);
        setShowSuccess(false);
        setErrorMessage("");
        setSuccessMessage("");

        if (!username || !email || !phone || !password || !password2) {
            setShowError(true);
            setErrorMessage("All fields are required!");
            return;
        }
        setFilledUp(true);
    };

    useEffect(() => {
        (async () => {
            if (filledUp) {
                try {
                    const result = await signup({
                        name: username,
                        email,
                        phone,
                        password,
                        password2
                    });

                    if (result.type === "error") {
                        setShowError(true);
                        setErrorMessage(result.data.message);
                        setFilledUp(false);
                    } else {
                        setShowSuccess(true);
                        setSuccessMessage(result.data.message);
                        setTimeout(() => {
                            setShowSuccess(false);
                            setSuccessMessage(null);
                            history.push("/login");
                        }, 1500);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();

        return () => {
            setFilledUp(false);
        };
    }, [filledUp]);

    return (
        <>
            <Container className="my-2 rounded d-flex align-items-center justify-content-center">
                <Form
                    className={`${classes.formCard} bg-white p-4 rounded`}
                    onSubmit={submitHandler}
                >
                    <h2 className="text-center">Docify</h2>
                    <p className="text-center">An address for your documents</p>
                    <hr />
                    <h4>Sign up</h4>

                    <AlertComponent variant="danger" show={showError}>
                        {errorMessage}
                    </AlertComponent>
                    <AlertComponent variant="success" show={showSuccess}>
                        {successMessage}
                    </AlertComponent>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your phone"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicRepeatPassword"
                    >
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat your password"
                            value={password2}
                            onChange={e => {
                                setPassword2(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <div>
                        <span>Already have an account? </span>
                        <Link to="/login">Login</Link>
                    </div>

                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default SignupPage;
