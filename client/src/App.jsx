import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import Wrappers from "./components/Wrappers.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import SecuredRoutes from "./components/SecuredRoutes.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Wrappers>
                <Router>
                    <Switch>
                        <GuestRoute exact path="/login" component={Login} />
                        <GuestRoute exact path="/signup" component={Signup} />
                        <PrivateRoute path="/" component={SecuredRoutes} />
                    </Switch>
                </Router>
            </Wrappers>
        </AuthProvider>
    );
};

export default App;
