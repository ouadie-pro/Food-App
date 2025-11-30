const User = require('../models/UserSchema');
const bcyptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const addUser = async(req,res)=>{
    const {email , password } = req.body;
    if(!email || !password){
        res.status(400).json({message:"Eamil and password can't be empty"})
    }
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:'User alredy exciste'});
    }
    const hashedPassword = await bcyptjs.hash(password,10);
    const newUser = new User({
        email,
        password: hashedPassword
    })
    await newUser.save();
    let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:'7h'})
    return res.status(201).json({message:'User registered successfully',token,newUser})
}

const addUser1 = async(req,res)=>{
    const {email , password } = req.body;
    if(!email || !password){
        res.status(400).json({message:"Eamil and password are require "})
    }
    let user = await User.findOne({email});
    if(user && await bcyptjs.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:'7h'})
        return res.status(201).json({message:'User registered successfully',token,user})
    }
    else{
        return res.status(201).json({message : 'invalide email or password'})
    }
}

const getUser1 = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    res.status(202).json({user})
}

const deletUser = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user)
}
module.exports = {addUser, addUser1 , getUser1 , deletUser}