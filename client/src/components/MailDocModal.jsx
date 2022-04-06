import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useXhr } from "../hooks/useXhr";
import AlertComponent from "./Alert";
import Loading from "./Loading";

const MailDocModal = ({ show, handleClose: closeModal, doc }) => {
    const [receiver, setReceiver] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [shouldRequest, setShouldRequest] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const title = doc.title;

    const handleClose = () => {
        setLoading(false);
        closeModal();
    };

    const sendDocResult = useXhr(
        shouldRequest,
        "post",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/mail/${doc._id}`,
        {
            receiver,
            subject,
            message,
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(false);

        if (!receiver) {
            return setErrorMsg("Receiver address is required!");
        }

        if (!subject) {
            return setErrorMsg("Subject is required!");
        }

        setLoading(true);
        setShouldRequest(true);
    };

    useEffect(() => {
        setSubject(title);

        return () => {
            setSubject("");
        };
    }, [title]);

    useEffect(() => {
        if (sendDocResult) {
            if (sendDocResult.type && sendDocResult.type === "success") {
                setSuccessMsg(sendDocResult.data.message);

                setReceiver("");
                setMessage("");

                setTimeout(() => {
                    setSuccessMsg("");
                    handleClose();
                }, 700);
            } else {
                setErrorMsg(sendDocResult.data.message);
            }
            setLoading(false);
        }

        setShouldRequest(false);

        return () => {
            setShouldRequest(false);
        };
    }, [sendDocResult]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Mail your document</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={errorMsg}>
                        {errorMsg}
                    </AlertComponent>

                    <AlertComponent variant="success" show={successMsg}>
                        {successMsg}
                    </AlertComponent>

                    <Loading loading={loading} text="Sending" />

                    <Form.Group className="mb-3" controlId="formBasicReceiver">
                        <Form.Label>Receiver</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="fulan@gmail.com"
                            value={receiver}
                            onChange={(e) => {
                                setReceiver(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Passport of Fulan Ibn Fulan"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            style={{ height: "100px" }}
                        />
                    </Form.Group>
                </Form>
                <p>
                    * Email will be sent from: <b>docify@devtahsin.com</b>{" "}
                    <br />* Check the spam folder
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="button" onClick={submitHandler}>
                    Send Mail
                </Button>

                <Button variant="secondary" type="button" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MailDocModal;
