import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";

const App = () => {
    return (
        <Router>
            <Switch>
                <Layout>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                </Layout>
            </Switch>
        </Router>
    );
};

export default App;
