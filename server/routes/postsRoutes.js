const express = require("express");

const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
} = require("../controllers/postControllers");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
