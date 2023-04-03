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

//Create a product
export const createNewProduct = asyncHandler(async(req,res)=>{
  const {brand,name,category,stock,price,image,productIsNew,description} =req.body

  const newProduct = Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description
  })
  // await newProduct.save();
const products = await Product.find({})
  if(newProduct){
    res.json(products)
  }else{
res.status(404)
throw new Error ('Product could not be uploaded')
  }
})

//Delete a product
export const deleteProduct = asyncHandler(async(req,res)=>{
  const product = await Product.findByIdAndDelete(req.params.id)
  if(product){
res.json(product)
  }else{
res.status(404)
throw new Error ('Product not found')
  }
})


//Update a product

export const updateProduct = asyncHandler(async(req,res)=>{
  const {brand,name,category,stock,price,id,image,productIsNew,description} =req.body

  const product = await Product.findById(id)
  if(product){
      product.brand=brand,
      product.name=name,
      product.category=category,
      product.stock=stock,
      product.price=price,
      product.image=image,
      product.productIsNew=productIsNew,
      product.description=description  

      const updatedProduct = await product.save();
  res.json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Product could not be updated')
  }
  
})

export const removeProductReview = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.productId)
    const updatedReview = product.reviews.filter((rev)=>rev._id.valueOf() !==req.params.reviewId)
    if(product){
      product.reviews = updatedReview;
      product.numberOfReviews= product.reviews.length;
      if(product.numberOfReviews>0){
        product.rating = product.reviews.reduce((acc,item)=>item.rating+acc,0) /product.reviews.length
      }else{
        product.rating=1
      }
await product.save();
res.json({message:'Review has been removed'})
    }else{
      res.status(404)
      throw new Error ('Product not found')
    }
})