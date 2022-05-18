import React from "react";
import Router from "./components/Router.jsx";
import Wrappers from "./components/Wrappers.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Wrappers>
                <Router />
            </Wrappers>
        </AuthProvider>
    );
};

export default App;
