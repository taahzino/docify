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
import PrivateRoutes from "./PrivateRoutes";

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
        <Route path="/*" element={<PrivateRoutes />}>
          <Route path="" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route element={<NotFoundPage />} />
      </CustomSwitch>
    </BrowserRouter>
  );
};

export default Router;
