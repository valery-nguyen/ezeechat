import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import Nav from '../Nav';
import UserChannelIndex from '../channels/UserChannelIndex';
import MainChat from '../messages/main_chat';
import DirectMessageIndex from './../direct_messages/direct_messages_index';

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
                        return <div>
                          <Nav currentUserId={currentUserId}/>
                          <UserChannelIndex currentUserId={currentUserId}/>
                          <DirectMessageIndex currentUserId={currentUserId}/>
                        </div>
                      }}
                    </Query>
                )}
                else {
                  return <div>
                    <Nav currentUserId={null} />
                    <UserChannelIndex currentUserId={null} />
                    <DirectMessageIndex currentUserId={null}/>
                  </div>
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