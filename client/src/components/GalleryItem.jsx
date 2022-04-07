import React, { useState, useEffect, useRef } from "react";
import { Lightbox } from "react-modal-image";
import classes from "../styles/GalleryItem.module.css";
import moment from "moment";
import DocActions from "./DocActions";

const GalleryItem = ({ doc, setDocAction }) => {
    const [showModal, setShowModal] = useState();
    const [modalSrc, setModalSrc] = useState();
    const [modalTitle, setModalTitle] = useState();

    const thumbnail = `${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`;
    const download = `${process.env.REACT_APP_SERVER_URL}/api/docs/download/${doc._id}`;

    const [showActions, setShowActions] = useState(false);

    const openModal = (thumbnail, title) => {
        setShowModal(true);
        setModalSrc(thumbnail);
        setModalTitle(title);
    };

    const dotsRef = useRef();

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target !== dotsRef.current) {
                setShowActions(false);
            }
        });

        return () => {};
    }, []);

    return (
        <>
            <div className={`${classes.galleryItem}`}>
                <div className="rounded">
                    <div
                        className={`d-flex justify-content-between mt-1 mb-2 position-relative`}
                    >
                        <div>
                            <i className="bi bi-clock me-2"></i>
                            {moment(doc.createdAt).format("DD MMMM YYYY")}
                        </div>

                        <DocActions
                            show={showActions}
                            doc={doc}
                            setDocAction={setDocAction}
                        />

                        <div
                            onClick={() => {
                                setShowActions((state) => !state);
                            }}
                        >
                            <i
                                className="bi bi-three-dots-vertical"
                                role="button"
                                ref={dotsRef}
                            ></i>
                        </div>
                    </div>
                    <div className={`${classes.thumbnail_container}`}>
                        <img
                            src={
                                doc.mimetype !== "application/pdf"
                                    ? thumbnail
                                    : "./img_placeholder.png"
                            }
                            alt={doc.title}
                            className={`${classes.thumbnail}`}
                            onClick={
                                doc.mimetype !== "application/pdf"
                                    ? () => {
                                          openModal(thumbnail, doc.title);
                                      }
                                    : () => {}
                            }
                        />
                    </div>
                    <h5 className={`my-2`}>{doc.title}</h5>
                </div>
            </div>
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
