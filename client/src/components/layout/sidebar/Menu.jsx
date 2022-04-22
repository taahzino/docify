import React from "react";
import LinkItem from "./LinkItem";
import SearchBox from "./SearchBox";
import styled from "styled-components";
import Footer from "./Footer";

const Wrapper = styled.div`
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const MenuWrapper = styled.div`
    margin-top: 60px;
`;

const Menu = () => {
    return (
        <Wrapper>
            <MenuWrapper>
                <SearchBox />

                <ul
                    style={{
                        margin: "0",
                        padding: "0",
                    }}
                >
                    <LinkItem icon="bx bx-home-alt" text="My Docs" href="/" />
                    <LinkItem
                        icon="bx bx-plus-circle"
                        text="Add new"
                        href="/create"
                    />
                    {/* <LinkItem
                icon="bx bx-share-alt"
                text="Shared with Me"
                href="/"
            /> */}
                    {/* <LinkItem icon="bx bx-mail-send" text="Sent Mails" href="/" /> */}
                    <LinkItem
                        icon="bx bx-user"
                        text="Settings"
                        href="/settings"
                    />
                </ul>
            </MenuWrapper>

            <Footer />
        </Wrapper>
    );
};

export default Menu;
