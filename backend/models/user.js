const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const DoNotHaveGoogleOrGithub = function () {
  return !this.googleEmail && !this.githubEmail;
};

const userSchema = new mongoose.Schema(
  {
    googleEmail: {
      type: String,
    },
    githubEmail: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    userEmail: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 100,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        //This only works on CREATE and SAVE!!
        validator: function (el) {
          return el === this.password; // abc === abc
        },
        message: "Passwords are not the same",
      },
    },
  } // posts: [postShema]
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.password) return next();

  if (this.password !== this.passwordConfirm) {
    return next(new Error("Passwords do not match"));
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Compare password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
