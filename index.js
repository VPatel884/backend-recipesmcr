const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Recipes = require("./model/Recipes.model");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();

const createRecipe = async (newRecipe) => {
  try {
    const addNewRecipe = new Recipes(newRecipe);
    const saveRecipe = await addNewRecipe.save();
    return saveRecipe;
  } catch (error) {
    console.log("Error creating new recipe", error);
  }
};

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await createRecipe(req.body);

    res
      .status(201)
      .json({ message: "Recipe added successfully.", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe." });
  }
});

const readAllRecipes = async () => {
  try {
    const allRecipe = await Recipes.find();
    return allRecipe;
  } catch (error) {
    console.log(error);
  }
};

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await readAllRecipes();

    if (recipes.length != 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch {
    res.status(500).json({ error: "Error fetching the recipes." });
  }
});

const getRecipeById = async (recipeId) => {
  try {
    const recipeById = await Recipes.findById(recipeId);
    return recipeById;
  } catch (error) {
    console.log(error);
  }
};

app.get("/recipes/:recipeId", async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.recipeId);

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch the recipe." });
  }
});

const deleteRecipe = async (recipeId) => {
  try {
    const deleteRecipe = await Recipes.findByIdAndDelete(recipeId);
    return deleteRecipe;
  } catch (error) {
    throw error;
  }
};

app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const deletedRecipe = await deleteRecipe(req.params.recipeId);

    if (deletedRecipe) {
      res.status(200).json({
        message: "Recipe deleted successfully.",
        recipe: deletedRecipe,
      });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch {
    res.json(500).json({ error: "Error deleting the recipe." });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
