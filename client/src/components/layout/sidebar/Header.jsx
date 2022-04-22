import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Text from "./Text";
import SidebarToggle from "./SidebarToggle";
import { useLayout } from "../Layout";
import { useAuth } from "../../../contexts/AuthContext";

const Header = styled.header`
    position: relative;
`;

const ProfileMenu = styled.div`
    display: flex;
    align-items: center;
`;

const ImageWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 40px;
    border-radius: 6px;
    margin-left: 10px;
    margin-right: 10px;
`;

const LogoText = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.span`
    margin-top: 2px;
    font-size: 18px;
    font-weight: 600;
`;

const UserTag = styled.span`
    font-size: 16px;
    margin-top: -2px;
    display: block;
`;

const SidebarHeader = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { setSidebarToggle } = useLayout();

    const { currentUser } = useAuth();

    useEffect(() => {
        if (windowWidth < 900) {
            setSidebarToggle(false);
        }

        return () => {};
    }, [windowWidth]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    return (
        <Header>
            <ProfileMenu>
                <ImageWrapper className="image">
                    <Image src="/devtahsin.png" alt="Logo" />
                </ImageWrapper>

                <Text>
                    <LogoText>
                        <UserName>{currentUser.name}</UserName>
                        <UserTag>{currentUser.membership || "Free"}</UserTag>
                    </LogoText>
                </Text>
            </ProfileMenu>

            {windowWidth > 900 ? <SidebarToggle /> : null}
        </Header>
    );
};

export default SidebarHeader;
