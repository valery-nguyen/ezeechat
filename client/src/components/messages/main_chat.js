import React from 'react';
import { Query, Subscription, subscribeToMore, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import Subscriptions from "../../graphql/subscriptions";
import CreateMessage from './create_message';
const { FETCH_CHANNEL } = Queries;
const { DELETE_MESSAGE } = Mutations;

const { NEW_MESSAGE_SUBSCRIPTION } = Subscriptions;

class MainChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage(e, deleteMessage, id) {
    e.preventDefault();
    deleteMessage({
      variables: {
        _id: id,
      }
    });
  }

  render() {
    return (
      <Query query={FETCH_CHANNEL} variables={{ id: this.props.history.location.pathname.split("/").slice(-1)[0]}}>
        {({ subscribeToMore, loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!data) return null;
  
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
                      
                        
                        <Mutation
                          mutation={DELETE_MESSAGE}
                          onError={err => this.setState({ message: err.message })}
                          refetchQueries={() => {
                            console.log("refetch");
                            return [{
                              query: FETCH_CHANNEL,
                              variables: { id: this.props.history.location.pathname.split("/").slice(-1)[0] }
                            }]
                          }}
                          onCompleted={data => {
                            console.log(`message deleted`)
                          }}
                        >
                          {(deleteMessage, { data }) => {
                            console.log(data);
                            console.log("inside the function");
                            if (!data || data.deleteMessage._id !== message._id) {
                              return <li key={idx}>
                                <div>
                                  <p>{message.date}</p>
                                  <p>{message.body}</p>
                                  <form onSubmit={e => this.deleteMessage(e, deleteMessage, message._id)}>
                                    <button type="submit">Delete</button>
                                    <p>{this.state.message}</p>
                                  </form>
                                </div>
                              </li>
                            } else {
                              return null;
                            }
                          }}

                        </Mutation>
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