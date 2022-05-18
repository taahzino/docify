import React from "react";
import styled from "styled-components";
import { useLayout } from "./Layout";

const Home = styled.section`
    position: absolute;
    top: 0;
    top: 0;
    left: 250px;
    min-height: 100vh;
    height: auto;
    max-height: 100000vh;
    width: calc(100% - 250px);
    background-color: var(--body-color);
    transition: var(--tran-03);
    padding: 2rem 2rem;
    color: var(--text-color);

    &.close {
        min-height: 100vh;
        height: auto;
        max-height: 100000vh;
        left: 78px;
        width: calc(100% - 78px);
        transition: var(--tran-03);
    }
`;

const Main = ({ children }) => {
    const { sidebarToggle } = useLayout();

    return <Home className={`${!sidebarToggle && "close"}`}>{children}</Home>;
};

export default Main;
