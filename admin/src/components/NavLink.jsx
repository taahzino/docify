import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, active, icon, text }) => {
    return (
        <Link
            to={to}
            className={`nav__link ${
                window.location.pathname === to && "active"
            }`}
        >
            <i className={`${icon} nav__icon`}></i>
            <span className="nav__name">{text}</span>
        </Link>
    );
};

export default NavLink;
