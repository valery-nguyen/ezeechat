const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;
const User = require("../models/User");
const DirectMessage = require("../models/DirectMessage");

const addMessageToDM = async (data, context) => {
  try {
    // check for loggedin user
    const token = context.token;
    
    const decoded = await jwt.verify(token, key);
    const { id } = decoded;
    const loggedIn = await User.findById(id);
    
    if (!loggedIn) {
      throw new Error("A logged in user is required");
    }

    // add direct message
    const { _id, message } = data;
    let dm = await DirectMessage.findById(_id);
    if (!dm.messages.includes(message)) dm.messages.push(message);
    await dm.save();

    return dm ;
  } catch (err) {
    throw err;
  }
};

const createDirectMessage = async (data, context) => {
  try {
    // check for loggedin user
    const token = context.token;
    
    const decoded = await jwt.verify(token, key);
    const { id } = decoded;
    const loggedIn = await User.findById(id);
    
    if (!loggedIn) {
      throw new Error("A logged in user is required");
    }

    // add direct message
    const { users } = data;

    let dm = new DirectMessage({
      users: users
    });

    dm.save();

    return dm;
  } catch (err) {
    throw err;
  }
};

module.exports = { addMessageToDM, createDirectMessage };