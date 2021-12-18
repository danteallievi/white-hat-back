const Post = require("../../database/models/post");

const getPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find(req.query);
    // .sort({ _id: -1 })
    // .limit(LIMIT)
    // .skip(startIndex);

    if (!allPosts) {
      const error = new Error("No posts found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      data: allPosts,
      // pagination: {
      //   page: pageNumber,
      //   total: totalPosts,
      //   size: pageNumbers,
      // },
    });
  } catch {
    const error = new Error("Error loading the posts.");
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch {
    const error = new Error("Error loading the post.");
    next(error);
  }
};

module.exports = { getPosts, getPostById };