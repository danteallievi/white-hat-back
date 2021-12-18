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

const createPost = async (req, res, next) => {
  const { title, description, categories, creator, videoUrl } = req.body;
  console.log(req.body);

  try {
    const newPost = await Post.create({
      title,
      description,
      categories,
      creator,
      videoUrl,
    });

    res.status(201).json(newPost);
  } catch {
    const error = new Error("Error creating the post.");
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      const error = new Error("Post to delete not found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch {
    const error = new Error("Error deleting the post.");
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { title, description, categories, creator, videoUrl } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        categories,
        creator,
        videoUrl,
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      const error = new Error("Post to update not found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch {
    const error = new Error("Error updating the post.");
    next(error);
  }
};

module.exports = { getPosts, getPostById, createPost, deletePost, updatePost };
