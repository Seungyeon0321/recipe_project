const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const DoNotHaveGoogleOrGithub = function () {
  return !this.googleEmail && !this.githubEmail;
};

const userSchema = new mongoose.Schema({
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
    required: DoNotHaveGoogleOrGithub,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    select: false,
    required: DoNotHaveGoogleOrGithub,
  },
  //해당 작업은 frontend에서도 해야함,
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
  posts: [],
});

//I have to make it work only when the user create an account.
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
  } catch (error) {
    console.error("Please provide a password and passwordConfirm");
  }
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
