import React from "react";
import AlertComponent from "./Alert";
import { HashLoader } from "react-spinners";
const Loading = ({ loading, text }) => {
    return (
        <AlertComponent variant="info" show={loading}>
            <div className="d-flex">
                <HashLoader size={30} color="#135F7A" loading={loading} />
                <div className="ms-2">{text}...</div>
            </div>
        </AlertComponent>
    );
};

export default Loading;
