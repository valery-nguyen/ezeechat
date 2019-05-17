import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  return (
    <div>
      <h1>
        <Link to="/">Ezee Chat</Link>
      </h1>
      <Route path="/" component={Nav} />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;