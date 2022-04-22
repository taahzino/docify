import React from "react";
import ListItem from "./ListItem";
import Icon from "./Icon";
import Text from "./Text";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const baseCss = css`
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

    &.active {
        background-color: dodgerblue;

        &:hover {
            background-color: dodgerblue;
        }
    }

    &:hover {
        background-color: var(--primary-color);
    }
`;

const StyledLink = styled(NavLink)`
    ${baseCss}
`;

const StyledButton = styled.button`
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    ${baseCss}
`;

const LinkItem = ({ icon, text, href, ...props }) => {
    return (
        <ListItem className="nav-link">
            {href && (
                <StyledLink to={href} exact {...props}>
                    <Icon className={icon}></Icon>
                    <Text>{text}</Text>
                </StyledLink>
            )}
            {!href && (
                <StyledButton {...props}>
                    <Icon className={icon}></Icon>
                    <Text>{text}</Text>
                </StyledButton>
            )}
        </ListItem>
    );
};

export default LinkItem;
