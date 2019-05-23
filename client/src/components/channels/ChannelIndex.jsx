import './channels.scss';

import React from "react";
import { Query } from "react-apollo";
import ChannelDetail from './ChannelDetail';
import Queries from "../../graphql/queries";

const { FETCH_CHANNELS } = Queries;

class ChannelIndex extends React.Component {
  render() {
    return (
      <Query query={FETCH_CHANNELS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (

            <div className="whole-index">
              

              <div className="channel-index">
                
                <div className="channel-browse-header">
                  <h3 className="channel-index-header">Browse channels</h3>
                  <button className="create-channel-button">Create Channel</button>
                </div>
              
                <div>
                <form className="channel-search">
                  <input
                    placeholder="Search channels"
                    className="channel-search-input"
                  />
                </form>
                
                </div>
                  
                {!data.channels || !data.channels.length ? (
                  null
                ) : (
                    <div>
                      {data.channels.map(channel => {
                        return <ChannelDetail key={channel._id} id={channel._id} />;
                      })}
                    </div>
                  )}
              </div>
              <div className="exit-div">
                <div className="exit-box">
                  <a className="channel-index-exit" href={`/mainchat/`}>&#215;</a>
                  <p className="esc" >esc</p>
                </div>
              </div>  
            </div>
          );
        }}
      </Query>
    )
  }
}

export default ChannelIndex;