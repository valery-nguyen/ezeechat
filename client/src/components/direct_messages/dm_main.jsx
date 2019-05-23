import React from 'react';
import { Query, Subscription, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import Subscriptions from "../../graphql/subscriptions";
import CreateDirectMessage from './../direct_messages/create_direct_message';
const { FETCH_DIRECT_MESSAGES } = Queries;
const { NEW_DIRECT_MESSAGE_SUBSCRIPTION } = Subscriptions;

class DMChat extends React.Component {
  render() {
    return (
      <Query query={FETCH_DIRECT_MESSAGES} variables={{ id: this.props.history.location.pathname.split("/").slice(-1)[0] }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!data) return null;
          let allMessages = [].concat(data.directmessage.messages);
          
          return (
            <Subscription
              subscription={NEW_DIRECT_MESSAGE_SUBSCRIPTION}
            >
              {({ data, loading }) => {
                return (
                  <div className="main-chat-window">
                    <p></p>
                    <ul>
                      {allMessages.map((message, idx) => (
                        <li key={idx}>
                          <p>{message.date}</p>
                          <p>{message.body}</p>
                        </li>
                      ))}
                    </ul>
                    <CreateDirectMessage />
                  </div>
                );
              }}
            </Subscription>
          );
        }}
      </Query>
    )
  }
}

export default DMChat;