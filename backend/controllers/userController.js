const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const GoogleAndFaceBookUser = require("../models/google");
const passport = require("passport");

const jwtToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

exports.createUser = async (req, res, next) => {
  try {
    //Check if the email is already used even the google or facebook account
    const existingUser = await User.findOne({
      userEmail: req.body.userEmail,
    });

    const existingGoogleUser = await User.findOne({
      googleEmail: req.body.userEmail,
    });

    if (existingUser || existingGoogleUser)
      return res
        .status(403)
        .json({ error: "The email address is already used" });

    //Create a new user
    const newUser = await User.create({
      userEmail: req.body.userEmail,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      name: req.body.name,
    });

    const token = jwtToken(newUser);

    return res.status(201).json({
      status: "success",
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//LoginWithLocal
exports.loginWithLocal = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "서버 내부 오류가 발생했습니다.",
        error: err.message,
      });
    }

    if (info) {
      let errorMessage = info.reason;

      switch (info.type) {
        case "email-not-found":
          errorMessage = "The email address is not found";
          break;
        case "wrong-password":
          errorMessage = "The password is incorrect";
          break;
        default:
          errorMessage = info.reason || "Login failed";
      }

      return res.status(401).json({
        status: "error",
        message: errorMessage,
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Login failed",
      });
    }

    //req.login을 통해서 passport.serializeuser()가 실행됨, LoginErr은 해당 세션 저장과 관련있는 오류가 발생할 수 있음
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return res.status(500).json({
          status: "error",
          message: "Login failed",
          error: loginErr.message,
        });
      }

      const fullUserWithoutPassword = {
        userEmail: user.userEmail,
        password: undefined,
        name: user.name,
      };

      const token = jwtToken(user);

      return res.status(200).json({
        status: "success",
        user: fullUserWithoutPassword,
        token,
      });
    });
  })(req, res, next);
};

//LoginWithGoogle or Github
exports.loginWithGoogle = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).json({ error: info.reason });
      }

      return req.login(user, async (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
  }
};

exports.userLogout = (req, res, next) => {
  console.log("logout");
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ status: "success" });
    });
  });
};

exports.getUser = async (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
  }
};
