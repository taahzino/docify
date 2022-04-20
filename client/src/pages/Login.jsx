import React, { useEffect, useState } from "react";
import classes from "../styles/FormCard.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AlertComponent from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { useDocs } from "../contexts/DocsContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [filledUp, setFilledUp] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { login } = useAuth();

    const { dispatchDocs } = useDocs();

    const submitHandler = (e) => {
        e.preventDefault();
        setFilledUp(false);
        setShowError(false);
        setShowSuccess(false);
        setLoading(false);
        setErrorMessage("");
        setSuccessMessage("");

        if (!email || !password) {
            setShowError(true);
            setErrorMessage("All fields are required!");
            return;
        }

        setLoading(true);
        setFilledUp(true);
    };

    useEffect(() => {
        dispatchDocs({ type: "unload" });
        return () => {};
    }, []);

    useEffect(() => {
        (async () => {
            if (filledUp) {
                try {
                    const result = await login({
                        email,
                        password,
                    });

                    if (result.type === "error") {
                        setShowError(true);
                        setErrorMessage(result.data.message);
                    } else {
                        setShowSuccess(true);
                        setSuccessMessage(result.data.message);

                        setTimeout(() => {
                            setShowSuccess(false);
                            setSuccessMessage(null);
                            history.push("/");
                        }, 1000);
                    }
                    setFilledUp(false);
                    setLoading(false);
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

                    <AlertComponent variant="danger" show={showError}>
                        {errorMessage}
                    </AlertComponent>

                    <AlertComponent variant="success" show={showSuccess}>
                        {successMessage}
                    </AlertComponent>

                    <Loading loading={loading} text="Logging you in" />

                    <h4>Login</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <div>
                        <span>Don't have an account? </span>
                        <Link to="/signup">Sign up</Link>
                    </div>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Login;
