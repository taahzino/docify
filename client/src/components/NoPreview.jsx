import React from "react";

const NoPreview = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center bg-dark text-light p-2">
            <div className="display-1">
                <i class="bi bi-file-earmark-pdf"></i>
            </div>
            <h5>No preview available</h5>
            <p>
                Download the file or <br /> open in new tab
            </p>
        </div>
    );
};

export default NoPreview;
