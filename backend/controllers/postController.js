const User = require("../models/user");
const Post = require("../models/post");

//have to keep the user information to figure out the user id. This user id
//which is unique will be used a base to add the poset on the base id.

//The Id below will be brought by the login information
exports.createPosts = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      image: req.file.filename,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      UserId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    console.log("filllllllllllllllle", req.file);
    res.status(200).json({
      status: "success",
      image: req.file.filename,
    });
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
