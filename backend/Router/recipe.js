const express = require('express');
const Router = express.Router();
const {addRecipe ,getRecipes ,getRecipe ,deletRecipe ,editRecipe} = require('../controller/recipe');

Router.post('/',addRecipe);
Router.get('/',getRecipes);
Router.get('/:id',getRecipe);
Router.delete('/:id',deletRecipe);
Router.put('/:id',editRecipe);
module.exports = Router;