import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDocs } from "../contexts/DocsContext";
import { useXhr } from "../hooks/useXhr";
import AlertComponent from "./Alert";

const EditDocModal = ({ show, handleClose, doc }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [newTitle, setNewTitle] = useState(doc.title);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { dispatchDocs } = useDocs();

    const updateResult = useXhr(
        shouldUpdate,
        "put",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`,
        {
            title: newTitle,
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        if (doc.title.trim() === newTitle.trim()) {
            return setErrorMessage("Nothing to update");
        }
        setShouldUpdate(true);
    };

    useEffect(() => {
        if (updateResult) {
            if (updateResult.type === "success") {
                setSuccessMessage(updateResult.data.message);
                setTimeout(() => {
                    setSuccessMessage("");
                    handleClose();
                    dispatchDocs({
                        type: "update",
                        payload: updateResult.data.doc,
                    });
                }, 300);
            } else {
                setErrorMessage(updateResult.data.message);
            }
            setShouldUpdate(false);
        }

        return () => {
            setShouldUpdate(false);
        };
    }, [updateResult]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>You're editing: {doc.title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={errorMessage}>
                        {errorMessage}
                    </AlertComponent>

                    <AlertComponent variant="success" show={successMessage}>
                        {successMessage}
                    </AlertComponent>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTitle}
                            onChange={(e) => {
                                setNewTitle(e.target.value);
                            }}
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
