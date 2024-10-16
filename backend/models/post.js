const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    maxlength: [40, "Title must be less than 40 characters"],
    minlength: [5, "Title must be more than 5 characters"],
  },
  images: {
    // src: s3의 url이 들어간다
    size: Number,
    type: String,
  },
  ingredients: {
    type: [
      {
        name: {
          type: String,
          required: [true, "Please provide a name"],
        },
        quantity: {
          type: String,
        },
        unit: {
          type: String,
        },
      },
    ],
  },
  instructions: {
    type: [
      {
        step: {
          type: String,
          required: [true, "Please provide a step"],
        },
      },
    ],
    required: [true, "Please provide instructions"],
  },
  userId: {
    type: String,
    required: [true, "Please provide a user id"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
