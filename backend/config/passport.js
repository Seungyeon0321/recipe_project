const passport = require("passport");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy: LocalStrategy } = require("passport-local");

dotenv.config();

module.exports = localStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userEmail",
        passwordField: "password",
      },
      async (userEmail, password, done) => {
        try {
          const user = await User.findOne({
            userEmail,
          });

          if (!user) {
            return done(null, false, { reason: "This user doesn't exist" });
          }
          const result = await bcrypt.compare(password, user.password);

          if (result) {
            return done(null, false, { reason: "the password is not correct" });
          }

          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

module.exports = googleStrategy = () => {
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
          const exGoogleUser = await User.findOne({
            googleId: profile.id,
          });

          //If there is no id, will make new ID
          if (!exGoogleUser) {
            let email = profile.emails[0]["value"];
            let newGoogleUser = new User({
              googleId: profile.id,
              userEmail: email,
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
};

// Get user from upper middleware and save it into session
passport.serializeUser((user, done) => {
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
