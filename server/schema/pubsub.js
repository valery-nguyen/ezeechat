const mongoose = require("mongoose");
const { PubSub } = require('apollo-server');
const Message = mongoose.model("messages");

const pubsub = new PubSub();

pubsub.subscribe('MESSAGE_SENT', function (data) {
  console.log("sub2");
});

console.log(pubsub);
module.exports = pubsub;