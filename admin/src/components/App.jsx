import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import DashboardPage from "./DashboardPage";
import UsersPage from "./UsersPage";
import CreateUserPage from "./CreateUserPage";

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/users" component={UsersPage} />
                    <Route
                        exact
                        path="/users/create"
                        component={CreateUserPage}
                    />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
