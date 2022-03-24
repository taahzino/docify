import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteDocModal = ({ show, handleClose, title, thumbnail, id }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>You're about to delete: {title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Do you really want to delete <b>{title}</b>?
                </p>
                <img src={thumbnail} alt={title} width="200px" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger">Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDocModal;
