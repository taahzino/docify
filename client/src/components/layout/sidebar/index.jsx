import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import { useLayout } from "../Layout";

const Wrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    padding: 10px 14px;
    background: var(--sidebar-color);
    transition: var(--tran-03);
    z-index: 100;

    &.close {
        width: 88px;
    }
`;

const Sidebar = () => {
    const { sidebarToggle } = useLayout();

    return (
        <Wrapper className={`${sidebarToggle || "close"}`}>
            <Header />
            <Menu />
        </Wrapper>
    );
};

export default Sidebar;
