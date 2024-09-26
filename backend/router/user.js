const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// Sign up
router.post("/signup", isNotLoggedIn, userController.createUser);

// Local login
router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginWithLocal
);

// Google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google login callback

// Home route
router.get("/", isLoggedIn, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

// Logout
router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;
