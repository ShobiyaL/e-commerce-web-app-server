import mongoose from 'mongoose';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const getAllProducts = async (req,res)=>{
    try{
     const products = await Product.find({});
    //  console.log(products);
     res.json(products);
    }catch(error){
      console.log(error)
    }
}

//get product by id
export const getProduct = async (req,res)=>{
  // console.log(req.params)
  const productId = req.params.id
  try{
    const product = await Product.findById(productId);
    //  console.log(product);
    if(product){
res.json(product);
    }else{
      res.status(404);
      throw new Error ('Product not found')
    }
    
  }catch(error){
   console.log(error);
  }
}

export const writeProductReview = asyncHandler(async(req,res)=>{
const {title,comment,userId,rating} = req.body
const product = await Product.findById(req.params.id)
const user = await User.findById(userId)

if(product){
  const alreadyreviewed = product.reviews.find((rev)=>rev.user.toString()===userId.toString())
  if(alreadyreviewed){
    res.json(400)
    throw new Error('Product was already reviewed by this user')
  }
  const review = {
    name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
  }
  //  console.log(review,"created review")
  
  product.reviews.push(review);
  
  product.numberOfReviews = product.reviews.length

  product.rating = product.reviews.reduce((acc,item)=>item.rating + acc , 0 )/ product.reviews.length
  
  //  console.log(product.rating,"reset")
 await product.save()
 res.status(201).json({ message: 'Review has been saved.' });
}
else{
  res.status(404)
  throw new Error('Product not found')
}
})