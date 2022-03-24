import React from "react";
import { Alert } from "react-bootstrap";

const AlertComponent = ({ show, variant, children, ...props }) => {
    return (
        <>
            {show && (
                <Alert variant={variant} props>
                    {children}
                </Alert>
            )}
        </>
    );
};

export default AlertComponent;
