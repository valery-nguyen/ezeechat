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
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("messages", MessageSchema);