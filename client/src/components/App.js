import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import ChannelIndex from "./channels/ChannelIndex";
import CreateChannel from "./channels/CreateChannel";
import MainChat from './messages/main_chat';

const App = () => {
  return (
    <div>
      <h1>
        <Link to="/">Ezee Chat</Link>
      </h1>
      <Route path="/" component={Nav} />
      <Switch>
        <Route exact path="/channels/create" component={CreateChannel} />
        <Route path="/channels" component={ChannelIndex} />
        <Route path="/mainChat" component={MainChat} />
        <Route path="/channels/:channel_id" component={MainChat} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;