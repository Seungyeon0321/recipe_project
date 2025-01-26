const Like = require("../models/like");

exports.createLike = async (req, res, next) => {
  try {
    let user = req.user;
    let postId = req.body.postId;

    if (!user || !postId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const like = new Like({
      postId,
      userId: user._id,
    });

    await like.save();

    res.status(201).json({ message: "Like created successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
