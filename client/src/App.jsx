import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CookiesProvider } from "react-cookie";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

const App = () => {
    return (
        <CookiesProvider>
            <AuthProvider>
                <Router>
                    <Layout>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/"
                                component={DashboardPage}
                            />
                            <GuestRoute
                                exact
                                path="/login"
                                component={LoginPage}
                            />
                            <GuestRoute
                                exact
                                path="/signup"
                                component={SignupPage}
                            />
                        </Switch>
                    </Layout>
                </Router>
            </AuthProvider>
        </CookiesProvider>
    );
};

export default App;
