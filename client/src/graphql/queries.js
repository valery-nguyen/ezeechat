import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_CHANNELS: gql`
    query fetchChannels {
      channels {
        _id,
        host_id,
        name, 
        users {
          _id
          name
          email
        }
      }
    }
  `,
  FETCH_CHANNEL: gql`
    query fetchProduct($id: ID!) {
      channel(_id: $id) {
        _id,
        host_id,
        name, 
        users {
          _id
          name
          email
        }
      }
    }
  `,
  FETCH_MESSAGES: gql`
    query fetchMessages($id: ID!) {
      channel(_id: $id) {
        _id       
        messages {
          body
          _id
          date
          user_id
        }
      }
  }
  `
};