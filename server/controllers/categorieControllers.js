const Categorie = require("../../database/models/categorie");

const createCategories = async (req, res, next) => {
  try {
    const newCategorie = await Categorie.create(req.body);
    res.status(201).json(newCategorie);
  } catch {
    const error = new Error("Error creating the categorie.");
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categorie.find();

    if (!categories) {
      const error = new Error("Categories not found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(categories);
  } catch {
    const error = new Error("Error loading the categories.");
    next(error);
  }
};

module.exports = { createCategories, getCategories };
