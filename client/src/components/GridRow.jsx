import React from "react";
import styled from "styled-components";

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.3rem;

    @media screen and (max-width: 1040px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const GridRow = ({ children }) => {
    return <Row>{children}</Row>;
};

export default GridRow;
