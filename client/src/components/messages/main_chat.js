import React from 'react';
import { Query, Subscription, subscribeToMore } from "react-apollo";
import Queries from "../../graphql/queries";
import Subscriptions from "../../graphql/subscriptions";
import CreateMessage from './create_message';
const { FETCH_MESSAGES, FETCH_CHANNEL } = Queries;
const { NEW_MESSAGE_SUBSCRIPTION } = Subscriptions;

class MainChat extends React.Component {

  render() {
    return (
      <Query query={FETCH_CHANNEL} variables={{ id: this.props.history.location.pathname.split("/").slice(-1)[0]}}>
        {({ subscribeToMore, loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!data) return null;
          console.log(data);
          let allMessages = [].concat(data.channel.messages);
          let allMessagesIds = data.channel.messages.map(message => message._id);
          return (
            <Subscription
              subscription={NEW_MESSAGE_SUBSCRIPTION}
            >
              {({ data, loading }) => {
                if (data && !allMessagesIds.includes(data.messageSent._id) & !loading) {
                  allMessages.push(data.messageSent);
                  allMessagesIds.push(data.messageSent._id);
                }
                return <div>
                  <ul>
                    {allMessages.map((message, idx) => (
                      <li key={idx}>
                        <p>{message.date}</p>
                        <p>{message.body}</p>
                      </li>
                    ))}
                  </ul>
                  <CreateMessage />
                </div>
              }}
            </Subscription>
          );
        }}
      </Query>
    )
  }
}


export default MainChat;