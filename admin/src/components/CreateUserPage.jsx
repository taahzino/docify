import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DashboardLayout from "./DashboardLayout";
import RadioInput from "./RadioInput";

const CreateUserPage = () => {
    const [memberShip, setMemberShip] = useState("free");
    const [status, setStatus] = useState("approved");

    useEffect(() => {
        console.log(status);
    }, [status]);

    return (
        <DashboardLayout>
            <h1>Create User</h1>
            <Form
                style={{
                    maxWidth: "850px",
                }}
            >
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Fulan Ibn Fulan"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="fulan@devtahsin.com"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="01XXXXXXXXX"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Membership</Form.Label> <br />
                            <RadioInput
                                inputs={["free", "premium"]}
                                value={memberShip}
                                setValue={setMemberShip}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label> <br />
                            <RadioInput
                                inputs={["approved", "pending"]}
                                value={status}
                                setValue={setStatus}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create user
                        </Button>
                    </Col>
                </Row>
            </Form>
        </DashboardLayout>
    );
};

export default CreateUserPage;
