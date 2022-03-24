import React, { useState } from "react";
import { Col } from "react-bootstrap";
import classes from "../styles/Thumbnail.module.css";
import Actions from "./Actions";
import { Lightbox } from "react-modal-image";

const GalleryItem = ({ thumbnail, title }) => {
    const [showModal, setShowModal] = useState();
    const [modalSrc, setModalSrc] = useState();
    const [modalTitle, setModalTitle] = useState();

    const openModal = (thumbnail, title) => {
        setShowModal(true);
        setModalSrc(thumbnail);
        setModalTitle(title);
    };

    return (
        <>
            <Col sm={12} md={4} lg={3} className={`p-3`}>
                <div className="rounded px-3 py-1">
                    <div className={`${classes.thumbnail_container}`}>
                        <img
                            src={thumbnail}
                            alt={title}
                            className={`img-fluid rounded ${classes.thumbnail}`}
                            onClick={() => {
                                console.log(132);
                                openModal(thumbnail, title);
                            }}
                        />
                    </div>
                    <h5>{title}</h5>
                    <Actions thumbnail={thumbnail} title={title} />
                </div>
            </Col>
            {showModal && (
                <Lightbox
                    medium={modalSrc}
                    alt={modalTitle}
                    showRotate
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default GalleryItem;
