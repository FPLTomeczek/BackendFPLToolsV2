const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);
