import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useNavigate,
} from "react-router-dom";

import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Navbar from "./Navbar";
import Home from "../pages/Home"
import Staff from "../pages/Home";


const oktaAuth = new OktaAuth({
  issuer: "https://dev-33633688.okta.com/oauth2/default",
  clientId: "0oa8tp2a89wB8bkBb5d7",
  redirectUri: window.location.origin + "/login/callback",
});

function Routing() {
  const history = useNavigate();
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
      history.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    };
    console.log({ restoreOriginalUri });
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" exact={true} Component={Home} />
            <SecureRoute path="/staff" exact={true} Component={Staff} />
          </Routes>
        </div>
      </div>
    </Security>
  );
}

export default Routing;
