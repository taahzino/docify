import React from "react";
import classes from "../styles/Options.module.css";

const UserActions = ({ show }) => {
    return (
        <div>
            <div className={`${classes.options} ${show ? classes.show : null}`}>
                <div className={`${classes.option}`}>
                    <i className="bx bx-mail-send"></i>
                    <span className="ms-2">Send mail</span>
                </div>
                <div className={`${classes.option}`}>
                    <i className="bx bx-edit"></i>
                    <span className="ms-2">Update user</span>
                </div>
                <div className={`${classes.option}`}>
                    <i className="bx bx-trash-alt"></i>
                    <span className="ms-2">Delete user</span>
                </div>
            </div>
        </div>
    );
};

export default UserActions;
