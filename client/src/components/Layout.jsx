import React from "react";
import classes from "../styles/Layout.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <div className={`container-fluid pt-1 ${classes.layout}`}>
                {children}
            </div>
        </>
    );
};

export default Layout;
