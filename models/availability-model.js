const mongoose = require("mongoose");

const Schema   = mongoose.Schema;


const availabilitySchema = new Schema ({

    date: {
      type: Date,
      required: [true, "Please specify a date."]
    },

});

const AvailabilityModel = mongoose.model("Availability", availabilitySchema);

module.exports = AvailabilityModel;
