const mongooes = require("mongoose");

const connectDB = async () => {
  await mongooes.connect(
    "mongodb+srv://akash_shaw:Learnnodejs_20@akash-nodejs.vsjvwpb.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
