import React from 'react';
import { Query, subscribeToMore } from "react-apollo";
import Queries from "../../graphql/queries";
import Subscriptions from "../../graphql/subscriptions";
import CreateMessage from './create_message';
const { FETCH_MESSAGES } = Queries;
const { NEW_MESSAGES_SUBSCRIPTION } = Subscriptions;

class MainChat extends React.Component {

  _subscribeToNewMessages() {
    console.log("outsdie");
    return subscribeToMore => {
      console.log("werwer");
      return subscribeToMore({
        document: NEW_MESSAGES_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          console.log(subscriptionData);
          if (!subscriptionData.data) return prev;
          console.log(prev);
          const newMessage = subscriptionData.data.newMessage;
          const exists = prev.feed.messages.find(({ id }) => id === newMessage.id);
          if (exists) return prev;

          return Object.assign({}, prev, {
            feed: {
              messages: [newMessage, ...prev.feed.messages],
            }
          });
        }
      });
    };
  }

  render() {
    return (
      <Query query={FETCH_MESSAGES}>
        {({ subscribeToMore, loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          console.log("here");
          this._subscribeToNewMessages(subscribeToMore);

          return (
            <div>
              <ul>
                {data.messages.map(message => (
                  <li key={message._id}>
                    <p>{message.date}</p>
                    <p>{message.body}</p>
                  </li>
                ))}
              </ul>
              <CreateMessage />
            </div>
          );
        }}
      </Query>
    )
  }
}

export default MainChat;