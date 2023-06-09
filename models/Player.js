const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
    type: String,
    required: true,
  },
  element_type: {
    type: String,
    required: true,
  },
  total_points: {
    type: Number,
    required: true,
  },
  now_cost: {
    type: Number,
    required: true,
  },
  availability: {
    type: Number,
  },
  scoring_chance: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
