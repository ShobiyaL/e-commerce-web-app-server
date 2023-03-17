import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';

// console.log(process.env.JWT_SECRET_KEY)

const generateToken =  (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:'60d'})
};

export const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
   
    
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401).send({message:'Invalid password or email'})
        // throw new Error('Invalid password or email')
    }


});

export const register = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('we already have an account with that email address')
    }

    const user = await User.create({
        email,name,password
    })

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).send({message:"Couldn't resgister"})
        throw new Error('something went wrong');
    }

    

})

// export const profile = asyncHandler(async(req,res)=>{
//     const {name,email} = req.user;
//     console.log(name,email)
     
// })

export const updateProfile = asyncHandler(async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password){
                user.password = req.body.password
            }

            const updatedUser = await user.save();
            res.json({
                _id:updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token:generateToken(updatedUser._id),
                createdAt: updatedUser.createdAt
            })
        }else{
            res.status(404)
            throw new Error('user not found')
        }
    } catch (error) {
       
        res.status(500)
        throw new Error('something went wrong')
    }
})

export const getUserOrders = asyncHandler(async(req,res)=>{
    // console.log(req.params.id)
    const orders = await Order.find({user:req.params.id})
    if(orders){
        res.json({orders})
    }else{
        res.status(404)
        throw new Error('Orders not found')
    }
})