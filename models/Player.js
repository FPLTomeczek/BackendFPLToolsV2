const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  web_name: {
    type: String,
    required: true,
  },
  goals: {
    type: Number,
    default: 0,
  },
  assists: {
    type: Number,
    default: 0,
  },
  team: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
