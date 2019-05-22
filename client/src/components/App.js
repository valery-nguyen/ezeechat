import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import Signup from "./Signup";
import ChannelIndex from "./channels/ChannelIndex";
import CreateChannel from "./channels/CreateChannel";
import MainChat from './messages/main_chat';
import MainPage from './main_page/main_page';
import './app.css';

const App = () => {
  return (
    <div className="whole-app">
      <Route path="/" component={MainPage} />
      <Switch>
        <Route exact path="/channels/create" component={CreateChannel} />
        <Route path="/channels/:channelId" component={MainChat} />
        <Route exact path="/channels/" component={ChannelIndex} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;