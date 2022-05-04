import React from "react";
import styled from "styled-components";
import { useLayout } from "../Layout";

const Icon = styled.i`
    position: absolute;
    top: 50%;
    right: -25px;
    height: 25px;
    width: 25px;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 50%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: var(--tran-03);
`;

const SidebarToggle = () => {
    const { sidebarToggle, setSidebarToggle } = useLayout();

    const toggle = () => {
        setSidebarToggle((state) => !state);
    };

    return (
        <Icon
            className={`bx bx-chevron-${sidebarToggle ? "left" : "right"}`}
            onClick={toggle}
        ></Icon>
    );
};

export default SidebarToggle;
