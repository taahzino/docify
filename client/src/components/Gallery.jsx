import React from "react";
import { uniqueId } from "lodash";
import GalleryItem from "./GalleryItem";
import styles from "../styles/Gallery.module.css";

const Gallery = ({ docs }) => {
    return (
        <>
            <div className={`${styles.gallery}`}>
                {docs.map((doc) => (
                    <GalleryItem key={uniqueId() * Math.random()} doc={doc} />
                ))}
            </div>
        </>
    );
};

export default Gallery;
