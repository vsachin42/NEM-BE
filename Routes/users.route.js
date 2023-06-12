const express = require("express");
const bcrypt = require("bcrypt");
const {userModel} = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req,res) => {
   const {name,email,gender,password,age,city, is_married} = req.body;
   try{
           const existingUser = await userModel.findOne({email});
           if(existingUser){
               res.status(400).json({msg: "User already exit please login using another email"})
           }else{
               bcrypt.hash(password, 5, async (err, hash) => {
                   if(err){
                       res.status(200).json({error:err});
                    }else{
                        const user = new userModel({name,email,gender,password:hash,age,city,is_married});
                        await user.save();
                        res.status(200).json({msg:"User updated successfully", user:req.body});
                    }
                })
            }
            }catch(err){
                res.status(400).json({error:err});
        }
})


userRouter.post("/login", async (req,res) => {
    const {email,password} = req.body;
        try{
            const user = await userModel.findOne({email});
          if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    const token = jwt.sign({userId:user._id, user:user.name}, "masai");
                    res.send(200).json({msg: "Loggen In", token});
                }else{
                    res.status(400).json({errpr:err});
                }
            })
          }
         }catch(err){
             res.status(400).json({error:err.meassage});
         }
})








module.exports = {userRouter};