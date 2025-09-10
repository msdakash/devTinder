const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      requred: true, // This is a required field
      minLength: 5,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password not Strong enough!");
        }
      },
    },
    age: {
      type: String,
      min: 18,
      max: 75,
      require: true,
    },
    gender: {
      type: String,
      lowercase: true,
      required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not valid");
        }
      },
    },
    phoneNumber: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://image.pngaaa.com/853/3873853-middle.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid url value");
        }
      },
    },
    about: {
      type: String,
      default: "Hi I am new to this Place",
    },

    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
