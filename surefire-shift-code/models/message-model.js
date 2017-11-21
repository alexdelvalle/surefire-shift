const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  // Message content
  {
      content: {type: String}
  },
  // User who sent the message
  {
      sender: {type: String}
  },
  // User who received the message
  {
      recipient: {type: String}
  },
  // Date user was created/updated
  {
      timestamps: true
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
