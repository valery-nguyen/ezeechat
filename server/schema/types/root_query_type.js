const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require("./user_type");
const User = mongoose.model("users");
const ChannelType = require("./channel_type");
const Channel = mongoose.model("Channel");
const MessageType = require('./message_type');
const Message = mongoose.model("messages");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    channels: {
      type: new GraphQLList(ChannelType),
      resolve() {
        return Channel.find({});
      }
    },
    channel: {
      type: ChannelType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Channel.findById(args._id);
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve() {
        return Message.find({});
      }
    },
    message: {
      type: MessageType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Message.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;
