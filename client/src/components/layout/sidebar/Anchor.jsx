import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React from "react";

const StyledNavLink = styled(NavLink)`
    list-style: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    text-decoration: none;
    transition: var(--tran-03);
    color: #fff;

    &:hover {
        background-color: var(--primary-color);
    }
`;

const Anchor = ({ children, to, ...props }) => {
    return (
        <StyledNavLink
            exact
            to={to}
            activeStyle={{ backgroundColor: "#343a40" }}
            {...props}
        >
            {children}
        </StyledNavLink>
    );
};

export default Anchor;
