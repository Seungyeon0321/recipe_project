const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();
// Sign up
router.post("/signup", isNotLoggedIn, userController.createUser);

// Local login
router.post("/login", isNotLoggedIn, userController.loginWithLocal);

router.post(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

// Google login
router.get(
  "/auth/google",
  isNotLoggedIn,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google login callback
//This navigates users to the URL after they login
router.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Home route
router.get("/", isLoggedIn, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

router.get("/auth/failure", isLoggedIn, (req, res) => {
  res.send("Please try again!");
});

// Logout
router.post("/logout", isLoggedIn, userController.userLogout);

module.exports = router;
