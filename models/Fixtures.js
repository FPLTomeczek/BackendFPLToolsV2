const mongoose = require("mongoose");

const FixtureSchema = new mongoose.Schema({
  event: {
    type: Number,
    required: true,
  },
  team_a: {
    type: Number,
    required: true,
  },
  team_h: {
    type: Number,
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
