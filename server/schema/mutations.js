const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const UserType = require('./types/user_type');
const ChannelType = require('./types/channel_type');
const AuthService = require('./../services/auth');
const ChannelsService = require('./../services/channels');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.signup(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    createChannel: {
      type: ChannelType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(_, args) {
        return ChannelsService.createChannel(args);
      }
    },
    updateChannelName: {
      type: ChannelType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(_, args) {
        return ChannelsService.updateChannelName(args);
      }
    },
    addChannelUser: {
      type: ChannelType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return ChannelsService.addChannelUser(args);
      }
    },
    removeChannelUser: {
      type: ChannelType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return ChannelsService.removeChannelUser(args);
      }
    },
    addChannelMessage: {
      type: ChannelType,
      args: {
        _id: { type: GraphQLID },
        message: { type: GraphQLID }
      },
      resolve(_, args) {
        return ChannelsService.addChannelMessage(args);
      }
    },
  }
});

module.exports = mutation;