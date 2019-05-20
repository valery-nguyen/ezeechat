const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const ChannelType = new GraphQLObjectType({
  name: "ChannelType",
  fields: () => ({
    _id: { type: GraphQLID },
    host_id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(require('./user_type')),
      resolve(parentValue) {
        return Channel.findUsers(parentValue._id);
      }
    },
    messages: {
      type: new GraphQLList(require('./message_type')),
      resolve(parentValue) {
        return Channel.findMessages(parentValue._id);
      }
    }
  })
});

module.exports = ChannelType;