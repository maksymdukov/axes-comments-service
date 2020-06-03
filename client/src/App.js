import React from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import ProtectedRoute from "components/routes/protected-route";
import Routes from "Routes";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/" component={Routes} />
      </Switch>
    </div>
  );
}

export default App;
