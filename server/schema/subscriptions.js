const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const PubSub = require('./pubsub');

const MessageType = require('./types/user_type');


const subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    createMessage: {
      type: MessageType,
      postAdded: {
        subscribe: () => pubsub.asyncIterator(['message_created']),
      },
    },
  }
});

module.exports = subscription;