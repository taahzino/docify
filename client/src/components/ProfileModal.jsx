import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProfileModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Hi, Fulan</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Fulan Ibn Fulan"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="fulan@devtahsin.com"
                            disabled
                        />
                        <Form.Text className="text-muted">
                            You can't change your email.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="email"
                            maxLength="11"
                            placeholder="01712345678"
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
                            required
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
                            required
                        />
                        <Form.Text className="text-muted">
                            Leave this empty if you do not want to change your
                            password.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
