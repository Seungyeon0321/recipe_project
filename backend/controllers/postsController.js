const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    console.log("hello");
    const posts = await Post.find();

    // const filteredPosts = posts.filter(
    //   (post) => post.userId === req.query.userId
    // );

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    console.log(err);
  }
};
