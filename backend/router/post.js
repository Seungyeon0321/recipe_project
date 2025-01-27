const express = require("express");
const multer = require("multer");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const postController = require("../controllers/postController");

const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);

    cb(null, basename + "_" + new Date().getTime() + ext);
  },
});

const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Create a post
router.post("/", isLoggedIn, upload.none("image"), postController.createPosts);
router.post("/search", postController.searchPosts);

//when click upload image button, this api is called
router.post(
  "/image",
  isLoggedIn,
  upload.single("image"),
  postController.uploadImage
);

router.get("/:postId", postController.getPost);

module.exports = router;
