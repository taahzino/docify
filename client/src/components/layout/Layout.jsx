import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Main from "./Main";
import Body from "./Body";

const LayoutContext = React.createContext();

export const useLayout = () => {
    return useContext(LayoutContext);
};

const Layout = ({ children }) => {
    const [sidebarToggle, setSidebarToggle] = useState(
        JSON.parse(localStorage.getItem("toggleSidebar"))
    );

    useEffect(() => {
        localStorage.setItem("toggleSidebar", sidebarToggle);
    }, [sidebarToggle]);

    const value = {
        sidebarToggle,
        setSidebarToggle,
    };

    return (
        <LayoutContext.Provider value={value}>
            <Body>
                <Sidebar />
                <Main>{children}</Main>
            </Body>
        </LayoutContext.Provider>
    );
};

export default Layout;
