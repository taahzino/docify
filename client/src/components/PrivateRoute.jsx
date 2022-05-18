import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "./layout/Layout";

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return currentUser && currentUser._id && currentUser.email ? (
        <Route {...rest}>
            {(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        </Route>
    ) : (
        <Redirect to="/login" />
    );
}

export default PrivateRoute;
