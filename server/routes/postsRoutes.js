const express = require("express");

const { getPosts, getPostById } = require("../controllers/postControllers");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

module.exports = router;
