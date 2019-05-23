import './channels.css';

import React from "react";
import { Query } from "react-apollo";
import ChannelDetail from './ChannelDetail';
import Queries from "../../graphql/queries";

const { FETCH_USER_CHANNELS } = Queries;

class UserChannelIndex extends React.Component {
  render() {
    if (this.props.currentUserId) {
      return <Query query={FETCH_USER_CHANNELS} variables={{ id: this.props.currentUserId }}>
        {({ data }) => {
          return (
            <div className="channel-list">
              <h3 className="channel-header">Channels</h3>
              {!data.userChannels || !data.userChannels.length ? (
                <p className="direct-message-link">No channel available</p>
              ) : (
                  <div>
                    {data.userChannels.map(channel => {
                      return <ChannelDetail key={channel._id} id={channel._id} />;
                    })}
                    
                  </div>
                )}
            </div>
          );
        }}
      </Query>
    } else {
      return <h1> Requires user log in </h1>
    }
      
    
  }
}

export default UserChannelIndex;