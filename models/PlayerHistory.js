const mongoose = require("mongoose");

const PlayerHistorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  cost_history: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("PlayerHistory", PlayerHistorySchema);
