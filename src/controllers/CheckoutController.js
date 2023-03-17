import asyncHandler from 'express-async-handler'
import Razorpay from 'razorpay'
import shortid from 'shortid'
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id:process.env.RZP_KEY_ID,
    key_secret:process.env.RZP_KEY_SECRET,
  });


 export const checkout = asyncHandler(async(req,res)=>{
  const {amount} = req.body
   console.log(amount)
    
    var options = {
        amount:Number(amount*100),  // amount in the smallest currency unit
        currency: 'INR',
        receipt:shortid.generate(),
      };
      
       const paymentOrder = await razorpayInstance.orders.create(options)

        if(paymentOrder){
            res.json({
             paymentOrder
            })  
        }
        else{
            res.status(500)
           throw new Error('Something went wrong') 
        }
      
    
      });
  
      // export const paymentVerification = asyncHandler(async(req,res)=>{
      //   receipt:shortid.generate(),
      //   const {razorPay_order_id,razorpay_payment_id,razorpay_signature} = req.body
        
      //   const body = razorPay_order_id + "|" + razorpay_payment_id;

      // })