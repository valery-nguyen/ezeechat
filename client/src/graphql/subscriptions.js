import gql from "graphql-tag";

export default {
  NEW_MESSAGE_SUBSCRIPTION: gql`
    subscription onMessageSent{
      messageSent {
        _id, 
        user_id
        body,
        date,
        channel
      }
    }
  `,
  REMOVED_MESSAGE_SUBSCRIPTION: gql`
    subscription onMessageRemoved{
      messageRemoved {
        _id, 
        user_id
        body,
        date,
        channel
      }
    }
  `
};