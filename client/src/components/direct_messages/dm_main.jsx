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
          let newData = data;
          let messageAuthor;
          return (
            <Subscription
              subscription={NEW_DIRECT_MESSAGE_SUBSCRIPTION}
            >
              {({ data, loading }) => {
                return (
                  <div className="main-chat-window">
                    <ul className="message-list">
                      {allMessages.map((message, idx) => {
                        messageAuthor = newData.directmessage.users.filter((user) => (user._id === message.user_id))[0].name;
                        return <li className="message-element" key={idx}>
                        <div className="message-object">
                        <img className="message-pic" src={require('./pika.jpg')} alt="pika"/>
                          <div className="message-box">
                            <div className="message-info">
                                <p className="message-author">{messageAuthor}</p>
                              <p className="message-date">{message.date}</p>
                            </div>
                            <p className="message-body">{message.body}</p>
                          </div>
                        </div>
                      </li>
                      })}
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