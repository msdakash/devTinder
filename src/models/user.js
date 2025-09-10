const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
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
