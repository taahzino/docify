import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Container
            className={`d-flex flex-column text-center align-items-center justify-content-center text-light`}
        >
            <h1 className="display-1">404</h1>
            <br />
            <h4>Sorry! We couldn't find the page you are looking for.</h4>
            <Link to="/">
                <Button variant="primary">Back to homepage</Button>
            </Link>
        </Container>
    );
};

export default NotFoundPage;
