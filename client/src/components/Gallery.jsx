import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import GalleryItem from "./GalleryItem";
import classes from "../styles/Gallery.module.css";
import DeleteDocModal from "./DeleteDocModal";
import EditDocModal from "./EditDocModal";
import MailDocModal from "./MailDocModal";

const Gallery = ({ docs }) => {
    const [showDeleteDocModal, setShowDeleteDocModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState({ title: "", _id: "" });
    const [docAction, setDocAction] = useState("");

    useEffect(() => {
        switch (docAction.type) {
            case "edit":
                setShowEditModal(true);
                setSelectedDoc(docAction.doc);
                break;
            case "mail":
                setShowMailModal(true);
                setSelectedDoc(docAction.doc);
                break;
            case "delete":
                setShowDeleteDocModal(true);
                setSelectedDoc(docAction.doc);
                break;

            default:
                setSelectedDoc({ title: "", _id: "" });
                break;
        }

        return () => {
            setSelectedDoc({ title: "", _id: "" });
        };
    }, [docAction]);

    const thumbnail =
        typeof selectedDoc === "object"
            ? `${process.env.REACT_APP_SERVER_URL}/api/docs/${selectedDoc._id}`
            : null;

    return (
        <>
            <div className={`${classes.gallery}`}>
                {docs.map((doc) => (
                    <GalleryItem
                        key={uniqueId() * Math.random()}
                        doc={doc}
                        setDocAction={setDocAction}
                    />
                ))}
            </div>
            <EditDocModal
                show={showEditModal}
                doc={selectedDoc}
                handleClose={() => {
                    setShowEditModal(false);
                }}
            />
            <MailDocModal
                show={showMailModal}
                doc={selectedDoc}
                handleClose={() => {
                    setShowMailModal(false);
                }}
            />
            <DeleteDocModal
                show={showDeleteDocModal}
                thumbnail={thumbnail}
                doc={selectedDoc}
                handleClose={() => {
                    setShowDeleteDocModal(false);
                }}
            />
        </>
    );
};

export default Gallery;
