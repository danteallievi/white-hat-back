const User = require("../../database/models/user");
const Post = require("../../database/models/post");

const createUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      const userToCreate = await User.create({
        email,
        name,
      });
      res.json(userToCreate);
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.code = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const favoriteUserVideo = async (req, res, next) => {
  const { userId } = req.params;
  const { postId, type } = req.body;
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user && !post) {
      const error = new Error("User or post not found");
      error.code = 404;
      return next(error);
    }
    if (type === "ADD") {
      await User.findByIdAndUpdate(userId, {
        $push: { favourites: postId },
      });
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { favourites: userId } }
      );
      return res.json();
    }
    await User.findByIdAndUpdate(userId, { $pull: { favourites: postId } });
    await Post.findByIdAndUpdate(postId, { $pull: { favourites: userId } });
    return res.json();
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUser, favoriteUserVideo };
