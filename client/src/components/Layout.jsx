import React from "react";
import classes from "../styles/Layout.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <div className={`container-fluid p-4 ${classes.layout}`}>
                {children}
            </div>
        </>
    );
};

export default Layout;
