import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MailDocModal = ({ show, handleClose, title, id }) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSubject(title);
    }, [title]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Mail your document</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Passport of Fulan Ibn Fulan"
                            value={subject}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Message"
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value);
                            }}
                            style={{ height: "100px" }}
                        />
                    </Form.Group>
                </Form>
                <p>
                    Email will be sent from: <b>mail@docify.devtahsin.com</b>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Send Mail
                </Button>

                <Button variant="secondary" type="submit" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MailDocModal;
