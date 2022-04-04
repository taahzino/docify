import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteDocModal from "./DeleteDocModal";
import EditDocModal from "./EditDocModal";
import MailDocModal from "./MailDocModal";

const Actions = ({ thumbnail, download, title, docId }) => {
    const [showDeleteDocModal, setShowDeleteDocModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleMail = () => {
        setShowMailModal(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <a href={download}>
                    <Button variant="primary">
                        <i className="bi bi-download"></i>
                    </Button>
                </a>
                <Button variant="success" onClick={handleMail}>
                    <i className="bi bi-envelope"></i>
                </Button>
                <Button variant="secondary" onClick={handleEdit}>
                    <i className="bi bi-pencil"></i>
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        setShowDeleteDocModal(true);
                    }}
                >
                    <i className="bi bi-trash"></i>
                </Button>
            </div>
            <EditDocModal
                show={showEditModal}
                title={title}
                docId={docId}
                handleClose={() => {
                    setShowEditModal(false);
                }}
            />
            <MailDocModal
                show={showMailModal}
                title={title}
                handleClose={() => {
                    setShowMailModal(false);
                }}
            />
            <DeleteDocModal
                docId={docId}
                show={showDeleteDocModal}
                title={title}
                thumbnail={thumbnail}
                handleClose={() => {
                    setShowDeleteDocModal(false);
                }}
            />
        </>
    );
};

export default Actions;
