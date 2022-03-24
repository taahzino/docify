import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditDocModal = ({ show, handleClose, title, id }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>You're editing: {title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Passport, NID..."
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditDocModal;
