import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { FETCH_DIRECT_MESSAGES } = Queries;


class DirectMessageDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: ""
    };

  }

  render() {
    return (
      <Query query={FETCH_DIRECT_MESSAGES} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.directmessage) return null;
          if (error) return <p>Error</p>;
          // console.log(data);
          return (
            <div className="channel-links-container">        
              <Link className="channel-link" to={`/dms/${data.directmessage._id}`}><h3 className="channel-name" >{`${data.directmessage.users[1].email}`}</h3></Link>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default DirectMessageDetail;