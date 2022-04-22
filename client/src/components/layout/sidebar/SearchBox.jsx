import React, { useRef } from "react";
import styled from "styled-components";
import { useLayout } from "../Layout";
import Icon from "./Icon";
import ListItem from "./ListItem";

const Box = styled(ListItem)`
    border-radius: 6px;
    background-color: var(--primary-color-light);
    cursor: pointer;
    transition: var(--tran-03);
`;

const Input = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    background-color: var(--primary-color-light);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    transition: var(--tran-03);
`;

const SearchBox = () => {
    const { setSidebarToggle } = useLayout();

    const inputRef = useRef();

    return (
        <Box>
            <Icon
                className="bx bx-search icon"
                onClick={() => {
                    setSidebarToggle(true);
                    if (inputRef.current) {
                        setTimeout(() => {
                            inputRef.current.focus();
                        }, 500);
                    }
                }}
            ></Icon>
            <Input
                type="text"
                placeholder="Search..."
                onFocus={() => {
                    console.log(555);
                }}
                ref={inputRef}
            />
        </Box>
    );
};

export default SearchBox;
