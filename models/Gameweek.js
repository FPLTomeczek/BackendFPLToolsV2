const mongoose = require("mongoose");

const GameweekSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  finished: {
    type: Boolean,
    required: true,
  },
  deadline_time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gameweek", GameweekSchema);
