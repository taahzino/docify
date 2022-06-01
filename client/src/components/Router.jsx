import React, { useEffect } from "react";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFoundPage from "./NotFoundPage";
import Create from "../pages/Create";
import Settings from "../pages/Settings";
import CustomSwitch from "./CustomSwitch";
import { useDocs } from "../contexts/DocsContext";
import { useAuth } from "../contexts/AuthContext";

const Router = () => {
  const { removeDocs, getInitialDocs } = useDocs();
  const { currentUser } = useAuth();

  useEffect(() => {
    removeDocs();
    getInitialDocs();
  }, []);

  return (
    <BrowserRouter>
      <CustomSwitch>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/create"
          element={currentUser ? <Create /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Navigate to="/login" />}
        />

        <Route element={<NotFoundPage />} />
      </CustomSwitch>
    </BrowserRouter>
  );
};

export default Router;
