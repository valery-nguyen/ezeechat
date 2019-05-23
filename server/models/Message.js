const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel"
  },
  directMessage: {
    type: Schema.Types.ObjectId,
    ref: "DirectMessage"
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
});

MessageSchema.statics.findUser = function(messageId) {
  return this.findById(messageId)
    .populate("users")
    .then(message => {
      return message.users;
    });
};

module.exports = mongoose.model("messages", MessageSchema);