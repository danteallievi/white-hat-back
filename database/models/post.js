const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description must be less than 200 characters"],
  },
  categories: {
    type: [Types.ObjectId],
    ref: "Category",
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  favorites: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const User = model("Post", postSchema);

module.exports = User;
