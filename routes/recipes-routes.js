const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Show all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.render('recipes/allRecipes', { recipes });
});

module.exports = router;
