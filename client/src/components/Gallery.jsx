import React from "react";
import GalleryItem from "./GalleryItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDocs } from "../contexts/DocsContext";
import { BeatLoader } from "react-spinners";
import GridRow from "./GridRow";

const Gallery = ({ docs, loading }) => {
    const { hasMore, setShouldGetDocs } = useDocs();

    return (
        <InfiniteScroll
            dataLength={docs.length}
            next={() => {
                setShouldGetDocs(true);
            }}
            hasMore={hasMore}
            loader={
                !loading && hasMore ? (
                    <div className="d-flex w-100 align-items-center justify-content-center mt-4">
                        <div
                            style={{
                                color: "dodgerblue",
                            }}
                        >
                            Loading
                        </div>
                        <BeatLoader size={20} color="dodgerblue" />
                    </div>
                ) : null
            }
        >
            <GridRow>
                {/* <Skeleton /> */}
                {docs.map((doc) => (
                    <GalleryItem key={doc._id} doc={doc} />
                ))}
            </GridRow>
        </InfiniteScroll>
    );
};

export default Gallery;
