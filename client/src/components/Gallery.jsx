import React from "react";
import { uniqueId } from "lodash";
import GalleryItem from "./GalleryItem";
import { Row } from "react-bootstrap";

const Gallery = ({ docs }) => {
    return (
        <>
            <Row>
                {docs.map((doc) => (
                    <GalleryItem key={uniqueId() * Math.random()} doc={doc} />
                ))}
            </Row>
        </>
    );
};

export default Gallery;
