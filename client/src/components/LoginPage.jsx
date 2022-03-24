import React from "react";
import classes from "../styles/FormCard.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            <Container className="my-2 rounded d-flex align-items-center justify-content-center">
                <Form className={`${classes.formCard} bg-white p-4 rounded`}>
                    <h2 class="text-center">Docify</h2>
                    <p class="text-center">An address for your documents</p>
                    <hr />
                    <h4>Login</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
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

export default LoginPage;
