import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="nav">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({
                        data: {
                          isLoggedIn: false,
                          cart: []
                        }
                      });
                      props.history.push("/");
                    }}
                  >
                    Log out
                  </button>
                </div>
              );
            } else {
              return (
                <div className="nav">
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav;