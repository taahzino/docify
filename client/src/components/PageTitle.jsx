import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
    margin-bottom: 20px;
`;

const PageTitle = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

export default PageTitle;
