const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
      // User's full name
      fullName: {
          type: String,
          required: [true, "Please provide your name."]
      },

      // User's primary email address
      email: {
          type: String,
          match: [/.+@.+/, "Email needs an @ sign."],
          required: [true, "Please provide your email address."]
      },

      // User's Facebook credentials
      facebookID: { type: String },

      // User's Google credentials
      googleID: { type: String },

      // User's phone number (optional)
      phoneNumber: {
          type: Number
      },

      // User's encrypted password
      encryptedPassword: {
          type: String
      },

      // User's Badge number
      badgeNumber: {
          type: Number,
      },

      // Image of User
      photoUrl: {
        type: String
      },

      // Rank of user
      rank: {
          type: String,
          required: [true, "Please provide your rank."]
      },

      // User's shift (A, B or C)
      shift: {
          type: String,
          required: [true, "Please provide your shift."]
      },

      // User's rest day (day of the week)
      restDay: {
          type: String,
          required: [true, "Please provide your rest day"]
      },

      // Groups user has joined
      groups: [],
      station: {
        type: Number,
      },

      // User's direct messages
      messages: [],
  },

  // Date user was created/updated
  {
      timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
