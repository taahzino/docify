import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Providers from "./components/Providers";

const App = () => {
    return (
        <Providers>
            <Router>
                <Layout>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/"
                            component={DashboardPage}
                        />
                        <GuestRoute exact path="/login" component={LoginPage} />
                        <GuestRoute
                            exact
                            path="/signup"
                            component={SignupPage}
                        />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Router>
        </Providers>
    );
};

export default App;
