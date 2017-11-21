const mongoose      = require("mongoose");

const Schema        = mongoose.Schema;


const groupSchema = new Schema (
    {
      // Group's name
      groupName: {type: String},

      // IDs of all group members
      members: [],

      // Messages tied to the group
      messages: []
    }
);

const GroupModel = mongoose.model("Group", groupSchema);

module.exports = GroupModel;
