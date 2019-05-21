import gql from "graphql-tag";

export default {
  NEW_MESSAGES_SUBSCRIPTION: gql`
    subscription {
      messagesSubscription {
        _id, 
        user_id
        body,
        date
      }
    }
  `
};