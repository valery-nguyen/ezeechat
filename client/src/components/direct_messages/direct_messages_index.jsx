import './direct_messages.css';

import React from "react";
import { Query } from "react-apollo";
import DirectMessageDetail from './direct_message_detail';
import Queries from "../../graphql/queries";
import { Link } from 'react-router-dom';

const { FETCH_USER_MESSAGES } = Queries;

class DirectMessageIndex extends React.Component {
  render() {
    return (
      <Query query={FETCH_USER_MESSAGES} >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          return (
            <div className="direct-messages-list">
              <h3 className="direct-message-header">Direct Messages</h3>
              <h5 className="direct-message-header"><Link to={'/dms/new'}>New Direct Message</Link></h5>
              {!data.fetchUserMessages || !data.fetchUserMessages.length ? (
                <p className="direct-message-link">No Direct Messages</p>
              ) : (
                  <div>
                    {data.fetchUserMessages.map(message => {
                      return <DirectMessageDetail key={message._id} id={message._id} />;
                    })}
                  </div>
                )}
            </div>
          );
        }}
      </Query>
    )
  }
}

export default DirectMessageIndex;