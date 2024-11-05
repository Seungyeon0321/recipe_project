const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Please provide a url"],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Please provide a post id"],
  },
});

module.exports = mongoose.model("Image", imageSchema);
