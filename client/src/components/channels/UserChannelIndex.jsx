import './channels.scss';

import React from "react";
import { Query } from "react-apollo";
import ChannelNavDetail from './ChannelNavDetail';
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const { FETCH_USER_CHANNELS } = Queries;

class UserChannelIndex extends React.Component {
  render() {
    if (this.props.currentUserId) {
      return <Query query={FETCH_USER_CHANNELS} variables={{ id: this.props.currentUserId }}>
        {({ data }) => {
          return (
            <div className="channel-list">
              {/* <Link to='/channels'><h3 className="channel-header">Channels</h3></Link> */}
              {!data.userChannels || !data.userChannels.length ? (
                null
              ) : (
                  <div>
                    {data.userChannels.map(channel => {
                      return <ChannelNavDetail key={channel._id} id={channel._id} />;
                    })}
                    
                  </div>
                )}
                <Link className="channel-link" to="/channels/">+ Add a channel</Link>
            </div>
          );
        }}
      </Query>
    } else {
      return null;
    }
  }
}

export default withRouter(UserChannelIndex);