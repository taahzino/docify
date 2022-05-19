import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFoundPage from "./NotFoundPage";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import Create from "../pages/Create";
import Settings from "../pages/Settings";
import CustomSwitch from "./CustomSwitch";
import { useDocs } from "../contexts/DocsContext";

const Router = () => {
    const { removeDocs, getInitialDocs } = useDocs();

    useEffect(() => {
        removeDocs();
        getInitialDocs();
    }, []);

    return (
        <BrowserRouter>
            <CustomSwitch>
                <GuestRoute exact path="/login" component={Login} />
                <GuestRoute exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/create" component={Create} />
                <PrivateRoute exact path="/settings" component={Settings} />

                <Route component={NotFoundPage} />
            </CustomSwitch>
        </BrowserRouter>
    );
};

export default Router;
