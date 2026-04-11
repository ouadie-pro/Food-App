const express = require('express');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const verifyToken = require('../Middleware/auth')
const { addRecipe, getRecipes, getRecipe, deleteRecipe, editRecipe } = require('../controller/recipe');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/images'); 
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Routes
Router.post('/', verifyToken, upload.single('coverImage'),addRecipe);
Router.get('/', getRecipes);
Router.get('/:id', getRecipe);
Router.delete('/:id', deleteRecipe);
Router.put('/:id',upload.single('coverImage'), editRecipe);

module.exports = Router;
