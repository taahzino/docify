import React from "react";
import { Row } from "react-bootstrap";
import GalleryItem from "./GalleryItem";

const Gallery = () => {
    return (
        <>
            <Row>
                <GalleryItem
                    thumbnail="http://localhost:8080/images/ab9ef09b0b0b796687be.jpg"
                    title="Smart Card 1"
                />
                <GalleryItem
                    thumbnail="http://localhost:8080/images/ab9ef09b0b0b796687be.jpg"
                    title="Smart Card 2"
                />
                <GalleryItem
                    thumbnail="http://localhost:8080/images/ab9ef09b0b0b796687be.jpg"
                    title="Smart Card 3"
                />
                <GalleryItem
                    thumbnail="http://localhost:8080/images/ab9ef09b0b0b796687be.jpg"
                    title="Smart Card 4"
                />
                <GalleryItem
                    thumbnail="http://localhost:8080/images/ab9ef09b0b0b796687be.jpg"
                    title="Smart Card 5"
                />
            </Row>
        </>
    );
};

export default Gallery;
