import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewUI from "./NewUI";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const SecuredRoutes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/new" component={NewUI} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
};

export default SecuredRoutes;
