const passport = require("passport");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy: LocalStrategy } = require("passport-local");

dotenv.config();

module.exports = {
  localStrategy: () => {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "userEmail",
          passwordField: "password",
        },
        async (userEmail, password, done) => {
          try {
            //1) check if email and password are provided
            if (!userEmail || !password) {
              return done(null, false, {
                reason: "Please provide your email and password",
              });
            }

            //2) check if user exists, select을 안하면 밑에서 compare 작업을 할 수 없음
            const user = await User.findOne({
              userEmail,
            }).select("+password");

            if (!user) {
              return done(null, false, { reason: "This user doesn't exist" });
            }

            console.log("user", user);
            //3) check if password is correct
            if (!(await user.comparePassword(password, user.password))) {
              return done(null, false, {
                reason: "the password is not correct",
              });
            }
            return done(null, user);
          } catch (error) {
            console.error(error);
            return done(error);
          }
        }
      )
    );
  },

  googleStrategy: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.AUTH_URL,
        },
        async (accessToken, refreshToken, profile, cb) => {
          try {
            //check if user already exists in our db
            //여기서 profile.id가 email로 전송되는지 확인해야함.
            const exGoogleUser = await User.findOne({
              googleEmail: profile.emails[0]["value"],
            });

            //If there is no id, will make new ID
            if (!exGoogleUser) {
              let email = profile.emails[0]["value"];
              let newGoogleUser = new User({
                googleId: profile.id,
                googleEmail: email,
                name: profile.displayName,
              });

              newGoogleUser.save();
              console.log("New User Created:", newGoogleUser);

              return cb(null, newGoogleUser);
            } else {
              console.log("User Found", exGoogleUser);
              return cb(null, exGoogleUser);
            }
          } catch (error) {
            console.log(error);
            return cb(error, null);
          }
        }
      )
    );
  },
};
// Get user from upper middleware and save it into session
passport.serializeUser(async (user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
