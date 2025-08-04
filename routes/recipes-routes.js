const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Show all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.render('recipes/allRecipes', { recipes });
});

module.exports = router;




// Show new recipe form
router.get('/new', (req, res) => {
  res.render('recipes/newRecipe');
});



// Create new recipe
router.post('/', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ name, ingredients, instructions });
  await newRecipe.save();
  res.redirect('/recipes');
});


// Show single recipe
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/recipeRead', { recipe });
});


// Show update form
router.get('/:id/update', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/recipeUpdate', { recipe });
});


// Update recipe
router.put('/:id', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  await Recipe.findByIdAndUpdate(req.params.id, { name, ingredients, instructions });
  res.redirect(`/recipes/${req.params.id}`);
});


router.get('/:id/delete', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/recipeDelete', { recipe });
});
