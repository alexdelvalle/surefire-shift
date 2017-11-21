const mongoose      = require("mongoose");

const Schema        = mongoose.Schema;


const stationSchema = new Schema (
    {
      // Station's Address
      location: {type: String},

      // Station Number
      stationNumber: {type: Number},

      // Station district
      district: {type: String},

      // Station Chief
      chief: {type: String},

      // Station Captain
      captain: {type: String},

      // Firefighters who work at this station
      fireFighters: [],
    }
);

const StationModel = mongoose.model("Station", stationSchema);

module.exports = StationModel;
