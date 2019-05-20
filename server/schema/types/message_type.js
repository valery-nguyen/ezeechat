const mongoose = require("mongoose");
const graphql = require("graphql");
const graphqlisodate = require('graphql-iso-date');
const { GraphQLDateTime } = graphqlisodate;
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const MessageType = new GraphQLObjectType({
  name: "MessageType",
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    channel: { type: GraphQLID },
    body: { type: GraphQLString },
    date: { type: GraphQLDateTime }
  })
});

module.exports = MessageType;