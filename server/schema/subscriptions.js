const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const MessageType = require('./types/message_type');
const Message = mongoose.model("messages");

const messagesSubscription = {
  type: MessageType,
  resolve(root, args, ctx, info) {
    console.log(Message.find({}));
    return Message.find({});
  }
};

const subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({messagesSubscription})
});

module.exports = subscription;