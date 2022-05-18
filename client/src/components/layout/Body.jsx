import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    min-height: 100vh;
    height: 100%;
    max-height: 100000vh;
    background-color: var(--body-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
`;

const Body = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

export default Body;
