import React from "react";

const Column = ({ children }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3" style={{ padding: "8px" }}>
            {children}
        </div>
    );
};

export default Column;
