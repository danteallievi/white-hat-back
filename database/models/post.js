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
  favourites: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
