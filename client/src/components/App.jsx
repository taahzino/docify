import React from "react";
import Router from "./Router.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import LandingRequests from "./LandingRequests.jsx";
import { DocsProvider } from "../contexts/DocsContext.jsx";
import NotificationRoom from "./NotificationRoom.jsx";
import { ActionsProvider } from "../contexts/ActionsContext.jsx";
import Body from "./layout/Body.jsx";

const App = () => {
  return (
    <AuthProvider>
      <LandingRequests>
        <DocsProvider>
          <NotificationRoom>
            <ActionsProvider>
              <Body>
                <Router />
              </Body>
            </ActionsProvider>
          </NotificationRoom>
        </DocsProvider>
      </LandingRequests>
    </AuthProvider>
  );
};

export default App;
