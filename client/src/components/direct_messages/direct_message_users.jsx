import './users.scss';
import React from "react";
import { Query, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from '../../graphql/mutations';
import { withRouter } from "react-router";


const { FETCH_USERS } = Queries;
const { CREATE_DIRECT_MESSAGE } = Mutations;

class DirectMessageUsers extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(createDirectMessage, user_id) {
    createDirectMessage({
      variables: {
        id: user_id
      } 
    }).then((data) => this.props.history.push(`/dms/${data.data.createDirectMessage._id}`));
  }

  render() {
    return (
    <Query query={FETCH_USERS} >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        const fetchUsersData = data;
        return (
          <Mutation
            mutation={CREATE_DIRECT_MESSAGE}
            onError={err => console.log(err.message)}
          >
            {(createDirectMessage, { data }) => {
              const createDMData = data;
              return <div className="dm-users">
                <p>Users</p>
                {(!fetchUsersData.users || !fetchUsersData.users.length) ? (
                <p>Users</p>
              ) : (
                  <div>
                    <ul>
                    {fetchUsersData.users.map(user => {
                      return (
                      <li key={user._id}>
                        <p>{user.email}</p>
                          <button onClick={(e) => {e.preventDefault(); return this.handleClick(createDirectMessage, user._id)}}>Send Direct Message</button>
                      </li>
                      );
                    })}
                    </ul>
                  </div>
                )}
            </div>
            }}
          </Mutation>            
        );
      }}
    </Query>
    )
  }
}

export default withRouter(DirectMessageUsers);