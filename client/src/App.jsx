import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { useXhr } from "./hooks/useXhr.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import { DocsProvider } from "./contexts/DocsContext.jsx";
import "./styles/global.css";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { io } from "socket.io-client";
import { setCookie } from "./utils/setCookie.jsx";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const [shouldGetMe, setShouldGetMe] = useState(false);

    const profileRequest = useXhr(
        shouldGetMe,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/users/me`
    );

    useEffect(() => {
        if (!currentUser || currentUser._id) {
            setShouldGetMe(true);
        }

        return () => {
            setShouldGetMe(false);
        };
    }, []);

    useEffect(() => {
        if (profileRequest && profileRequest.data) {
            setCurrentUser(profileRequest.data.user);
        }

        return () => {};
    }, [profileRequest]);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_SERVER_URL);

        socket.on("connect", () => {
            setCookie("socketid", socket.id);
        });

        socket.on("new_notice", (data) => {
            console.log(data);
            toast.success(data.message, {
                theme: "colored",
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        });

        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000);
        });
    }, []);

    return (
        <DocsProvider>
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
            <ToastContainer />
        </DocsProvider>
    );
};

export default App;
