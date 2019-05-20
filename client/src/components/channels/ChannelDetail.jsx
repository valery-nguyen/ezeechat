import React from "react";
import { Mutation } from "react-apollo";

import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_CHANNEL } = Queries;


const { ADD_CHANNEL_USER, REMOVE_CHANNEL_USER } = Mutations;

class ChannelDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: ""
    };

    this.joinChannel = this.joinChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  joinChannel(e, addChannelUser) {
    e.preventDefault();

    addChannelUser({
      variables: {
        id: this.props.id,
      }
    });
  }

  leaveChannel(e, removeChannelUser) {
    e.preventDefault();

    removeChannelUser({
      variables: {
        id: this.props.id,
      }
    });
  }

  render() {
    return (
      <Query query={FETCH_CHANNEL} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
            console.log(data)
          return (
            <div>        
              <h3>channel id:{data.channel._id}</h3>              
              <h3>host id:{data.channel.host_id}</h3>
              <h3>channel name:{data.channel.name}</h3>
              <ul>channel users:{data.channel.users.map(user => (
                <li key={user._id}>
                  <p>user name:{user.name}</p>
                  <p>user email:{user.email}</p>
                </li>
              ))}</ul>

              <Mutation
                mutation={ADD_CHANNEL_USER}
                onError={err => this.setState({ message: err.message })}
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                  console.log(data);
                  const { name } = data.addChannelUser;
                  this.setState({
                    message: `You successfully join channel ${name}`
                  });
                }}
              >
                {(addChannelUser, { data }) => (
                  <div>
                    <form onSubmit={e => this.joinChannel(e, addChannelUser)}>
                      <button type="submit">Join Channel</button>
                    </form>
                    <p>{this.state.message}</p>
                  </div>
                )}
              </Mutation>
              
              <Mutation
                mutation={REMOVE_CHANNEL_USER}
                onError={err => this.setState({ message: err.message })}
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                  console.log(data);
                  const { name } = data.removeChannelUser;
                  this.setState({
                    message: `You successfully left channel ${name}`
                  });
                }}
              >
                {(removeChannelUser, { data }) => (
                  <div>
                    <form onSubmit={e => this.joinChannel(e, removeChannelUser)}>
                      <button type="submit">Leave Channel</button>
                    </form>
                    <p>{this.state.message}</p>
                  </div>
                )}
              </Mutation>





            </div>
          );
        }}
      </Query>
    )
  }
}

export default ChannelDetail;