const { Schema, model } = require("mongoose");

const categorieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categorie = model("Categorie", categorieSchema);

module.exports = Categorie;
