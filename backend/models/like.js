const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    created_date: {
      type: Date,
      default: Date.now,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
