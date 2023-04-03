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

export const getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({})
    res.json(orders)
})

export const deleteOrder = asyncHandler(async(req,res)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
})

export const setDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
      order.isDelivered=true
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
})