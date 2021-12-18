const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  favourites: {
    type: [Types.ObjectId],
    ref: "Post",
  },
  created: {
    type: [Types.ObjectId],
    ref: "Post",
  },
});

const User = model("User", userSchema);

module.exports = User;
