import React from "react";
import { uniqueId } from "lodash";
import GalleryItem from "./GalleryItem";
import styled from "styled-components";

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    @media screen and (max-width: 1040px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Gallery = ({ docs }) => {
    return (
        <Row>
            {docs.map((doc) => (
                <GalleryItem key={uniqueId() * Math.random()} doc={doc} />
            ))}
        </Row>
    );
};

export default Gallery;
