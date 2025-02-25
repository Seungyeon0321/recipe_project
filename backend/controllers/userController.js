const User = require("../models/user");

// const GoogleAndFaceBookUser = require("../models/google");

const passport = require("passport");

exports.createUser = async (req, res, next) => {
  try {
    console.log(`backend - ${req.body}`);
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

    return res.status(201).json({
      status: "success",
      user: newUser,
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
      // Passport에서 전달하는 실패 정보를 구체적으로 처리
      let statusCode = 401;
      let errorMessage = info.reason;

      // 일반적인 로그인 실패 케이스들을 구분하여 처리
      switch (info.type) {
        case "email-not-found":
          errorMessage = "존재하지 않는 이메일입니다.";
          break;
        case "wrong-password":
          errorMessage = "비밀번호가 일치하지 않습니다.";
          break;
        default:
          errorMessage = info.reason || "로그인에 실패했습니다.";
      }

      return res.status(statusCode).json({
        status: "error",
        message: errorMessage,
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "로그인에 실패했습니다. 다시 시도해주세요.",
      });
    }

    //req.login을 통해서 passport.serializeuser()가 실행됨, LoginErr은 해당 세션 저장과 관련있는 오류가 발생할 수 있음
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return res.status(500).json({
          status: "error",
          message: "로그인 처리 중 오류가 발생했습니다.",
          error: loginErr.message,
        });
      }

      const fullUserWithoutPassword = {
        userEmail: user.userEmail,
        password: undefined,
        name: user.name,
      };

      return res.status(200).json({
        status: "success",
        user: fullUserWithoutPassword,
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
  try {

    if (!req.session.cookie) {
      return res.status(400).json({ status: "You need to login first" });
    }

    return res
      .status(200)
      .json({ status: "success", cookie: req.session.cookie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Server error" });
  }
};
