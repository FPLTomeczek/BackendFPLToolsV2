const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fixtures: {
    type: [
      {
        opponent: String,
        difficulty: Number,
        isHome: Boolean,
        event: { type: Number, default: null },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Team", TeamSchema);
