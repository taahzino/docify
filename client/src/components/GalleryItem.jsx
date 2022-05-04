import React, { useState, useEffect, useRef } from "react";
import { Lightbox } from "react-modal-image";
import moment from "moment";
import DocActions from "./DocActions";
import NoPreview from "./NoPreview";
import styled from "styled-components";

const GalleryContainer = styled.div`
    background-color: var(--sidebar-color);
    color: var(--text-color);
    padding: 0.5rem;
    border-radius: 5px;
    box-sizing: border-box;
`;

const GalleryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    position: relative;
`;

const ThumnailContainer = styled.div`
    border-radius: 5px;
    width: 100%;
    height: 200px;
    max-height: 200px;
    overflow: hidden;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const GalleryItem = ({ doc }) => {
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
            <GalleryContainer>
                <GalleryHeader>
                    <div>
                        <i
                            className="bi bi-clock"
                            style={{
                                marginRight: "0.5rem",
                            }}
                        ></i>
                        {moment(doc.createdAt).format("DD MMMM YYYY")}
                    </div>

                    <DocActions show={showActions} doc={doc} />

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
                </GalleryHeader>
                <ThumnailContainer role="button">
                    {doc.mimetype === "application/pdf" && <NoPreview />}
                    {doc.mimetype !== "application/pdf" && (
                        <Thumbnail
                            src={thumbnail}
                            alt={doc.title}
                            crossOrigin="use-credentials"
                            onClick={
                                doc.mimetype !== "application/pdf"
                                    ? () => {
                                          openModal(thumbnail, doc.title);
                                      }
                                    : () => {}
                            }
                        />
                    )}
                </ThumnailContainer>
                <h5
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    {doc.title}
                </h5>
            </GalleryContainer>
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
