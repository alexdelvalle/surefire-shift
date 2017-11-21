const mongoose    = require("mongoose");

const Schema      = mongoose.Schema;


const shiftSchema = new Schema ({
    // User's shift schedule (A, B, or C)
    shift: {
      type: String,
      required: [true, "Please specify whether you are on the A, B or C shift."]
    },
    // User's shift length
    hours: {
      type: Number,
      required: [true, "You must specify the length of your shift. Default is 24."]
    },
    // Shift color (A is green, B is Blue, and C is red)
    color: {type: String}
});

const ShiftModel = mongoose.model("Shift", shiftSchema);

module.exports = ShiftModel;
