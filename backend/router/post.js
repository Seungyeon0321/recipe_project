const express = require("express");
const postController = require("../controllers/postController");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// Create a post
router.post("/", postController.createPosts);

module.exports = router;
