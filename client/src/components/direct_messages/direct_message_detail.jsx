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
          if (error) return <p>Error</p>;
          console.log(data);
          return (
            <div>        
              <h3><Link to={`/dms/${data.directmessage._id}`}>{`Direct Message: ${data.directmessage}`}</Link></h3>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default DirectMessageDetail;