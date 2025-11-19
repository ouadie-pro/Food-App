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

module.exports = {addUser}