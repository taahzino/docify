import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDocs } from "../contexts/DocsContext";
import { useXhr } from "../hooks/useXhr";
import AlertComponent from "./Alert";
import Loading from "./Loading";

const EditDocModal = ({ show, handleClose: closeModal, doc }) => {
    const [newTitle, setNewTitle] = useState("");

    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { dispatchDocs } = useDocs();

    useEffect(() => {
        setNewTitle(doc.title);
    }, [doc]);

    const updateResult = useXhr(
        shouldUpdate,
        "put",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`,
        {
            title: newTitle,
        }
    );

    const handleClose = () => {
        setErrorMessage("");
        setSuccessMessage("");
        setNewTitle("");
        setLoading(false);
        closeModal();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        if (doc.title.trim() === newTitle.trim()) {
            return setErrorMessage("Nothing to update");
        }
        setLoading(true);
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
            setLoading(false);
            setShouldUpdate(false);
        }

        return () => {
            setShouldUpdate(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

                    <Loading loading={loading} text={`Updating ${doc.title}`} />

                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTitle}
                            onChange={(e) => {
                                setNewTitle(e.target.value);
                            }}
                            placeholder="Enter new title"
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
