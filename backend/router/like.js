const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const likeController = require("../controllers/likeController");

router.post("/", isLoggedIn, likeController.createLike);

module.exports = router;
