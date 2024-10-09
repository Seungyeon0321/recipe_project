const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const port = 5000;

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./config/passport");

const { isLoggedIn, isNotLoggedIn } = require("./router/middlewares");
const userRouter = require("./router/user");
const postRouter = require("./router/post");

dotenv.config();

const DB = process.env.MONGO_URL.replace("<password>", process.env.MONGO_PW);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful!");
});

passportConfig.localStrategy();
passportConfig.googleStrategy();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware for session
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// //passport authenticate
// //This shows the google window
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/auth/protected");
  }
);

//endpoint login for google, need to redirect succeed page, need to navigate users to main Pages
app.get("/auth/protected", isLoggedIn, (req, res) => {
  console.log("hiiiiiiiii");
  let name = req.user.userName;

  res.status(200).json({ user: req.user });
});

// app.get("/auth/failure", isLoggedIn, (req, res) => {
//   res.send("You are failed!!!");
// });

app.use("/post", postRouter);
app.use("/user", userRouter);

///////////// Start server

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
