const express = require("express");

const {
  createCategories,
  getCategories,
} = require("../controllers/categorieControllers");

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategories);

module.exports = router;
