import './main_page.scss';

import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { Switch, Route, Link } from "react-router-dom";
import AuthRoute from "../../util/route_util";
import MainNav from './main_nav';
import CreateChannel from "../channels/CreateChannel";
import MainChat from '../messages/main_chat';
import DMChat from '../direct_messages/dm_main';
import DMUsers from '../direct_messages/direct_message_users';

import Queries from "../../graphql/queries";
const { IS_LOGGED_IN, CURRENT_USER } = Queries;

class MainPage extends React.Component {

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Query query={IS_LOGGED_IN}>
              {({ data }) => {
                if (data.isLoggedIn) {
                  return (
                    <Query query={CURRENT_USER}>
                      {({ data }) => {
                        const currentUserId = data.currentUserId;
                        return <div className="main-page-container">
                          <MainNav className="main-page-nav" currentUserId={currentUserId} />
                          <Switch>
                            <AuthRoute exact path="/channels/create" component={CreateChannel} routeType="protected" currentUserId={currentUserId}/>
                            <AuthRoute exact exact path="/channels/:channelId" component={MainChat} routeType="protected" currentUserId={currentUserId}/>
                            <AuthRoute exact path="/dms/:dmID" component={DMChat} routeType="protected" currentUserId={currentUserId}/>
                          </Switch>
                        </div>
                      }}
                    </Query>
                )}
                else {
                  return <div></div>
                }
              }}
            </Query>
          </div>
        )}
      </ApolloConsumer>
    )
  }
};

export default MainPage; 