import React from "react";
import { useActions } from "../contexts/ActionsContext";
import classes from "../styles/Options.module.css";

const DocActions = ({ show, doc }) => {
    const download = `${process.env.REACT_APP_SERVER_URL}/api/docs/download/${doc._id}`;

    const { setDocAction } = useActions();

    return (
        <div>
            <div className={`${classes.options} ${show ? classes.show : null}`}>
                <a
                    href={`${process.env.REACT_APP_SERVER_URL}/api/docs/${doc._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${classes.option}`}
                >
                    <i className="bi bi-box-arrow-up-right"></i>
                    <span className="ms-2">Open</span>
                </a>
                <a href={download} className={`${classes.option}`}>
                    <i className="bi bi-download"></i>
                    <span className="ms-2">Download</span>
                </a>
                <div
                    className={`${classes.option}`}
                    onClick={() => {
                        setDocAction({ type: "mail", doc });
                    }}
                >
                    <i className="bi bi-envelope"></i>
                    <span className="ms-2">Mail</span>
                </div>
                <div
                    className={`${classes.option}`}
                    onClick={() => {
                        setDocAction({ type: "edit", doc });
                    }}
                >
                    <i className="bi bi-pencil"></i>
                    <span className="ms-2"> Edit</span>
                </div>
                <div
                    className={`${classes.option}`}
                    onClick={() => {
                        setDocAction({ type: "delete", doc });
                    }}
                >
                    <i className="bi bi-trash"></i>
                    <span className="ms-2">Delete</span>
                </div>
            </div>
        </div>
    );
};

export default DocActions;
