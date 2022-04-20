import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Providers from "./components/Providers";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const App = () => {
    return (
        <Providers>
            <Router>
                <Layout>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <GuestRoute exact path="/login" component={Login} />
                        <GuestRoute exact path="/signup" component={Signup} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Router>
        </Providers>
    );
};

export default App;
