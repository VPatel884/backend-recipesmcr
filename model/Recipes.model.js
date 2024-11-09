const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
