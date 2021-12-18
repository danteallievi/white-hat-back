const express = require("express");
const {
  createUser,
  getUser,
  favoriteUserVideo,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);

router.get("/:userId", getUser);

router.post("/favorite/:userId", favoriteUserVideo);

module.exports = router;
