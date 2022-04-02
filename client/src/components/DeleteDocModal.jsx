import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDocs } from "../contexts/DocsContext";
import { useXhr } from "../hooks/useXhr";
import AlertComponent from "./Alert";

const DeleteDocModal = ({ show, handleClose, title, thumbnail, docId }) => {
    const [shouldDelete, setShouldDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const { dispatchDocs } = useDocs();

    const deleteDoc = useXhr(
        shouldDelete,
        "delete",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/${docId}`
    );

    const deleteHandler = () => {
        setShouldDelete(true);
    };

    useEffect(() => {
        if (deleteDoc) {
            if (deleteDoc.type === "success") {
                setSuccessMessage(deleteDoc.data.message);
                setTimeout(() => {
                    handleClose();
                    dispatchDocs({ type: "delete", docId });
                }, 300);
            } else {
                setErrorMessage(deleteDoc.data.message);
            }
        }

        setShouldDelete(false);

        return () => {
            setShouldDelete(false);
        };
    }, [deleteDoc]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>You're about to delete: {title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertComponent variant="danger" show={errorMessage}>
                    {errorMessage}
                </AlertComponent>
                <AlertComponent variant="success" show={successMessage}>
                    {successMessage}
                </AlertComponent>
                <p>
                    Do you really want to delete <b>{title}</b>?
                </p>
                <img src={thumbnail} alt={title} width="200px" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDocModal;
