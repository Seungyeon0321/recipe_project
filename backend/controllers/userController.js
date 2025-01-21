const User = require("../models/user");

// const GoogleAndFaceBookUser = require("../models/google");

const passport = require("passport");

exports.createUser = async (req, res, next) => {
  try {
    console.log("backend -");
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

    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LoginWithLocal
exports.loginWithLocal = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    //There is no user
    if (!user) {
      return res.redirect("/login");
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      res.status(200).json({
        status: "success",
        user: user,
      });
    });
    //I cannot send all information about the user

    // });
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
  req.logout(() => {
    res.send("ok");
  });
};
