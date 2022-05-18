import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDocs } from "../contexts/DocsContext";
import { useXhr } from "../hooks/useXhr";
import AlertComponent from "./Alert";
import Loading from "./Loading";

const DeleteDocModal = ({ show, handleClose: closeModal, doc }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [shouldDelete, setShouldDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const thumbnail = `${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`;

    const { dispatchDocs } = useDocs();

    const deleteDoc = useXhr(
        shouldDelete,
        "delete",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`
    );

    const deleteHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setShouldDelete(true);
        }, 3000);
    };

    const handleClose = () => {
        closeModal();
        setErrorMessage("");
        setSuccessMessage("");
    };

    useEffect(() => {
        if (deleteDoc) {
            if (deleteDoc.type === "success") {
                setSuccessMessage(deleteDoc.data.message);
                setTimeout(() => {
                    handleClose();
                    dispatchDocs({ type: "delete", docId: doc._id });
                }, 300);
            } else {
                setErrorMessage(deleteDoc.data.message);
            }
            setShouldDelete(false);
            setLoading(false);
        }

        return () => {
            setLoading(false);
            setShouldDelete(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteDoc, doc._id]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Confirm deletion</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertComponent variant="danger" show={errorMessage}>
                    {errorMessage}
                </AlertComponent>

                <AlertComponent variant="success" show={successMessage}>
                    {successMessage}
                </AlertComponent>

                <Loading loading={loading} text={`Deleting ${doc.title}`} />

                <p>
                    Do you really want to delete <b>{doc.title}</b>?
                </p>

                <img src={thumbnail} alt={doc.title} width="200px" />
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
