const Recipe = require('../models/RecipeSchema');

const addRecipe = async(req,res)=>{
    const {title , ingredients , instructions} = req.body;
    if(!title || !ingredients || !instructions){
        res.json({message:"Required fields can't be empty"})
    }
    const newRecipe = await Recipe.create({
        title,ingredients,instructions
     })
     return res.json(newRecipe);
}

const getRecipes = async(req,res)=>{
    const recipe = await Recipe.find()
    return res.json(recipe)
}

const getRecipe = async(req,res)=>{
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
}

const deletRecipe = async(req,res)=>{
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    res.json(recipe)
}

const editRecipe = async (req,res)=>{
    const {title,ingredients,instructions} = req.body;
    let recipe = await Recipe.findById(req.params.id);
    try{
        if(recipe){
        await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({title,ingredients,instructions})
        }
    }
    catch(err){
        return res.status(404).json({message:"error"})
    }
}
module.exports = {addRecipe , getRecipes , getRecipe , deletRecipe , editRecipe}