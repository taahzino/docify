import React, { useState } from "react";
import NavLink from "./NavLink";

const DashboardLayout = ({ children }) => {
    const [expandSidebar, setExpandSidebar] = useState(false);

    return (
        <>
            <div className={`dashboardBody ${expandSidebar && "body-pd"}`}>
                <header
                    className={`header ${expandSidebar && "body-pd"}`}
                    id="header"
                >
                    <div className="header__toggle">
                        <i
                            className={`bx bx-menu ${expandSidebar && "bx-x"}`}
                            id="header-toggle"
                            onClick={() => {
                                setExpandSidebar((state) => !state);
                            }}
                        ></i>
                    </div>

                    <div className="header__img">
                        <img src="./logo512.png" alt="" />
                    </div>
                </header>

                <div
                    className={`l-navbar ${expandSidebar && "show"}`}
                    id="nav-bar"
                >
                    <nav className="nav">
                        <div>
                            <div className="nav__logo">
                                <i className="bx bxl-react nav__logo-icon"></i>
                                <span className="nav__logo-name">Docify</span>
                            </div>

                            <div className="nav__list">
                                <NavLink
                                    to="/"
                                    text="Dashboard"
                                    icon="bx bx-grid-alt"
                                    active
                                />
                                <NavLink
                                    to="/users"
                                    text="Users"
                                    icon="bx bx-group"
                                />

                                <NavLink
                                    to="/users/create"
                                    text="Create User"
                                    icon="bx bx-user-plus"
                                />

                                {/* <NavLink
                                    to="/documents"
                                    text="Documents"
                                    icon="bx bx-folder nav__icon"
                                /> */}

                                {/* <NavLink
                                    to="/settings"
                                    text="Settings"
                                    icon="bx bx-cog nav__icon"
                                /> */}
                            </div>
                        </div>

                        <a href="./" className="nav__link">
                            <i className="bx bx-log-out nav__icon"></i>
                            <span className="nav__name">Log Out</span>
                        </a>
                    </nav>
                </div>

                <main className="p-4">
                    <div className="py-3">{children}</div>
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
