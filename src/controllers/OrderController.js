import mongoose from 'mongoose';
import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';

export const createOrder = asyncHandler(async(req,res)=>{
    const {orderItems,userInfo,shippingAddress,shippingPrice,totalPrice,
    paymentMethod,paymentDetails}= req.body;

    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No order items found')
    }else{
        const order = new Order({
           orderItems,
           user:userInfo._id,
           username:userInfo.name,
           email:userInfo.email,
           shippingAddress,
           shippingPrice,
           totalPrice,
           paymentMethod,
           paymentDetails,
        })

        const createOrder = await order.save();
        // console.log(createOrder)
        res.status(200).json(createOrder)       
    }
});

