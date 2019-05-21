import React from "react";
import { Query } from "react-apollo";
import ChannelDetail from './ChannelDetail';
import Queries from "../../graphql/queries";
import './channels.css'
const { FETCH_CHANNELS } = Queries;

class ChannelIndex extends React.Component {
  render() {
    return (
      <Query query={FETCH_CHANNELS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <div className="channel-list">
              <h3>All Channels</h3>
              {!data.channels || !data.channels.length ? (
                <p>No channel available</p>
              ) : (
                  <div>
                    {data.channels.map(channel => {
                      return <ChannelDetail key={channel._id} id={channel._id} />;
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

export default ChannelIndex;