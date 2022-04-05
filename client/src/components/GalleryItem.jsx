import React, { useState } from "react";
import { Col } from "react-bootstrap";
import classes from "../styles/Thumbnail.module.css";
import Actions from "./Actions";
import { Lightbox } from "react-modal-image";

const GalleryItem = ({ docId, title }) => {
    const [showModal, setShowModal] = useState();
    const [modalSrc, setModalSrc] = useState();
    const [modalTitle, setModalTitle] = useState();

    const thumbnail = `${process.env.REACT_APP_SERVER_URL}/api/docs/${docId}`;
    const download = `${process.env.REACT_APP_SERVER_URL}/api/docs/download/${docId}`;

    const openModal = (thumbnail, title) => {
        setShowModal(true);
        setModalSrc(thumbnail);
        setModalTitle(title);
    };

    return (
        <>
            <Col sm={12} md={6} lg={3} className={`p-3`}>
                <div className="rounded px-3 py-1">
                    <div className={`${classes.thumbnail_container}`}>
                        <img
                            src={thumbnail}
                            alt={title}
                            className={`img-fluid rounded ${classes.thumbnail}`}
                            onClick={() => {
                                openModal(thumbnail, title);
                            }}
                        />
                    </div>
                    <h5>{title}</h5>
                    <Actions
                        docId={docId}
                        thumbnail={thumbnail}
                        title={title}
                        download={download}
                    />
                </div>
            </Col>
            {showModal && (
                <Lightbox
                    medium={modalSrc}
                    alt={modalTitle}
                    showRotate
                    downloadLink={download}
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default GalleryItem;
