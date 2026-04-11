const Recipe = require('../models/RecipeSchema');
const verifyToken = require('../Middleware/auth')
const addRecipe = async(req,res)=>{
    console.log(req.user)
    try {
        const {title , ingredients , instructions} = req.body;
        if(!title || !ingredients || !instructions){
            return res.status(400).json({message:"Required fields can't be empty"})
        }

        const newRecipe = await Recipe.create({
            title,
            ingredients: typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients,
            instructions,
            coverImage: req.file ? req.file.filename : null,
            createdBy:req.user.id
        })

        return res.json(newRecipe);
    } catch(err) {
        console.log(err) 
        return res.status(500).json({message: err.message})
    }
}

// جلب جميع الوصفات
const getRecipes = async(req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// جلب وصفة واحدة
const getRecipe = async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.json(recipe);
    } catch (error) {
        res.status(404).json({ message: "Recipe not found" });
    }
};

// حذف وصفة
const deleteRecipe = async(req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        res.json(recipe);
    } catch (error) {
        res.status(404).json({ message: "Recipe not found" });
    }
};

// تعديل وصفة
const editRecipe = async(req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { 
                title,
                ingredients: typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients,
                instructions,
                coverImage: req.file ? req.file.filename : null,
            },
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRecipe, getRecipes, getRecipe, deleteRecipe, editRecipe };
