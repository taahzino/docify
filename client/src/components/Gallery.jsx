import React from "react";
import GalleryItem from "./GalleryItem";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDocs } from "../contexts/DocsContext";

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
    const { hasMore, setShouldGetDocs } = useDocs();
    return (
        <InfiniteScroll
            dataLength={docs.length}
            next={() => {
                setShouldGetDocs(true);
            }}
            hasMore={hasMore}
            loader={<p>Scroll to load more...</p>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>All documents are loaded</b>
                </p>
            }
        >
            <Row>
                {docs.map((doc) => (
                    <GalleryItem key={doc._id} doc={doc} />
                ))}
            </Row>
        </InfiniteScroll>
    );
};

export default Gallery;
