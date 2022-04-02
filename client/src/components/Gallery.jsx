import React from "react";
import { Row } from "react-bootstrap";
import GalleryItem from "./GalleryItem";

const Gallery = ({ docs }) => {
    return (
        <>
            <Row>
                {docs.map((doc) => (
                    <GalleryItem docId={doc._id} title={doc.title} />
                ))}
            </Row>
        </>
    );
};

export default Gallery;
