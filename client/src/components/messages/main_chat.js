import React from 'react';
import { Query, subscribeToMore } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from 'react-router-dom';
import CreateMessage from './create_message';
const { FETCH_MESSAGES } = Queries;


class MainChat extends React.Component {



  render() {
    return (
      <Query query={FETCH_MESSAGES}>
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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