const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const MessageType = require('./types/message_type');
const Message = mongoose.model("messages");
const pubsub = require('./pubsub');

const messageSent = {
  type: MessageType,
  resolve(data) {
    return data.messageSent;
  },
  subscribe: () => pubsub.asyncIterator(['MESSAGE_SENT'])
};

const subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({ messageSent })
});

module.exports = subscription;