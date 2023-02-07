const router = require("express").Router();
const User= require('../models/User')
const bcrypt=require("bcrypt")

//register route

router.post("/register",async(req,res)=>{
 const checkuserbyname=await User.findOne({$or:[{username:req.body.username},{email:req.body.email}]})



     checkuserbyname && res.status(401).json("username or  email already exist");


try {
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })

    const saveduser=await user.save()
    console.log(saveduser);
    res.status(201).json(saveduser);

} catch (error) {
    console.log(error);
}


})


router.post("/login",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
    !user && res.status(404).json("User not found")
    console.log(user);

    const validPassword=await bcrypt.compare(req.body.password,user.password)
    !validPassword && res.status(400).json("Wrong password")
        res.status(200).json(user)
} 
    catch (error) {
       
        
    }
    





})




module.exports= router