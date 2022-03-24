import React from "react";
import classes from "../styles/Layout.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <div className={`container-fluid bg-dark p-4 ${classes.layout}`}>
                {children}
            </div>
        </>
    );
};

export default Layout;
