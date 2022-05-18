import styled from "styled-components";
import React from "react";
import { useLayout } from "../Layout";

const Wrapper = styled.span`
    color: var(--text-color);
    transition: var(--tran-03);
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    opacity: ${(props) => (props.hide === true ? 0 : 1)};
`;

const Text = ({ children, ...props }) => {
    const { sidebarToggle } = useLayout();
    return (
        <Wrapper hide={!sidebarToggle} props>
            {children}
        </Wrapper>
    );
};

export default Text;
