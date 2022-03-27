import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { useXhr } from "./hooks/useXhr.jsx";
import { useEffect } from "react";

const App = () => {
    const result = useXhr("get", "http://localhost:4000/api/users/me");

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <Router>
            <Layout>
                <Switch>
                    <PrivateRoute exact path="/" component={DashboardPage} />
                    <GuestRoute exact path="/login" component={LoginPage} />
                    <GuestRoute exact path="/signup" component={SignupPage} />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
