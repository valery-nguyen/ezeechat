import React from 'react';
import { Query, Subscription, subscribeToMore } from "react-apollo";
import Queries from "../../graphql/queries";
import Subscriptions from "../../graphql/subscriptions";
import CreateMessage from './create_message';
import { connect } from 'react-redux'
const { FETCH_MESSAGES } = Queries;
const { NEW_MESSAGE_SUBSCRIPTION } = Subscriptions;

class MainChat extends React.Component {

  _subscribeToNewMessages() {
    return subscribeToMore => {
      return subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
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
              <CreateMessage channel={this.props.history.location.pathname}/>
              <Subscription
                subscription={NEW_MESSAGE_SUBSCRIPTION}
              >
                {({ data, loading }) => {
                  console.log(data);
                  // return <h4>New comment: {!loading && data.messageSent}</h4>
                  return <h4>New Comment data: {(data) ? data.messageSent.body : "data null"}</h4>;
                }}
              </Subscription>
            </div>
          );
        }}
      </Query>
    )
  }
}


export default MainChat;