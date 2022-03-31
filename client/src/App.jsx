import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { useXhr } from "./hooks/useXhr.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import { setToken } from "./utils/setToken";

const App = () => {
    const { setCurrentUser } = useAuth();
    const [shouldGetMe, setShouldGetMe] = useState(false);

    const profileRequest = useXhr(
        shouldGetMe,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/users/me`
    );

    useEffect(() => {
        setShouldGetMe(true);

        return () => {
            setShouldGetMe(false);
        };
    }, []);

    useEffect(() => {
        if (profileRequest && profileRequest.data) {
            setCurrentUser(profileRequest.data.user);
        }
    }, [profileRequest]);

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
