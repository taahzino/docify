import React from "react";
import styles from "../styles/ReportCard.module.css";

const ReportCard = ({ number, text, icon, variant }) => {
    return (
        <div
            className={`${
                styles.reportCard
            } py-4 d-flex flex-column align-items-center justify-content-center text-center rounded ${
                variant && `bg-${variant}`
            }`}
        >
            <div className={`${styles.reportCardContent} display-1 text-light`}>
                <div className="me-2">{number}</div> <i className={icon}></i>
            </div>
            <div className="lead">{text}</div>
        </div>
    );
};

export default ReportCard;
