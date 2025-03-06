const User = require("../models/user");
const Post = require("../models/post");
const { client } = require("../server");

//have to keep the user information to figure out the user id. This user id
//which is unique will be used a base to add the poset on the base id.
// const collection = client.db("test").collection("posts");
//The Id below will be brought by the login information
exports.createPosts = async (req, res, next) => {
  try {
    console.log("click2");
    // Logged을 요구는 게시물을 포스팅하려고 + 버튼을 눌렀을 때 handling하는 게 좋아보임, 바로 url을 입력해서
    // 게시물에 포스팅은 미들웨어로 막아줌
    console.log("req.body", req.body);
    const userId = req.user.id;
    console.log("userId", userId);
    const images = req.body.images;

    const newPost = await Post.create({
      title: req.body.foodTitle,
      image: req.body.foodImage,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      userId,
    });

    return res.status(201).json({
      status: "success",
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  //일단은 내 local에서 해당 파일이 올라가게 하고, 나중에 해당 파일을 s3로 올리게 해야할듯
  try {
    res.status(200).json({
      status: "success",
      image: req.file.filename,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.searchPosts = async (req, res, next) => {
  try {
    const queryString = req.body.query;
    const queryStrings = queryString.split(" ");
    allQueries = [];
    queryStrings.forEach((element) => {
      allQueries.push({ title: { $regex: String(element) } });
    });

    const allPosts = await Post.find({ $or: allQueries });

    if (!allPosts || allPosts.length === 0)
      res.status(400).send({ error: "No post was found" });
    res.status(200).send(allPosts);
  } catch (err) {
    console.error(err);
  }
};

// router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
//   try {
//     const hashtags = req.body.content.match(/#[^\s#]+/g);
//     const post = await Post.create({
//       content: req.body.content,
//       UserId: req.user.id,
//     });

//     if (hashtags) {
//       const result = await Promise.all(
//         hashtags.map((tag) =>
//           Hashtag.findOrCreate({
//             where: { name: tag.slice(1).toLowerCase() },
//           })
//         )
//       );
//       await post.addHashtags(result.map((v) => v[0]));
//     }

//     if (req.body.image) {
//       if (Array.isArray(req.body.image)) {
//         const images = await Promise.all(
//           req.body.image.map((image) => Image.create({ src: image }))
//         );
//         await post.addImages(images);
//       } else {
//         const image = await Image.create({ src: req.body.image });
//         await post.addImages(image);
//       }
//     }

//     const fullPost = await Post.findOne({
//       where: { id: post.id },
//       include: [
//         {
//           model: Image,
//         },
//         {
//           model: Comment,
//           include: [
//             {
//               model: User,
//               attributes: ["id", "nickname"],
//             },
//           ],
//         },
//         {
//           model: User,
//           attributes: ["id", "nickname"],
//         },
//         {
//           model: User,
//           as: "Likers",
//           attributes: ["id"],
//         },
//       ],
//     });
//     res.status(200).json(fullPost);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
