const mongoose = require("mongoose");

const FixtureSchema = new mongoose.Schema({
  event: {
    type: Number,
    required: false,
    default: null,
  },
  team_a: {
    type: String,
    required: true,
  },
  team_h: {
    type: String,
    required: true,
  },
  team_a_difficulty: {
    type: Number,
    required: true,
  },
  team_h_difficulty: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Fixture", FixtureSchema);
