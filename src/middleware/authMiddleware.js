import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

 const authentication = asyncHandler(async(req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
          token = req.headers.authorization.split(' ')[1];
          //  console.log(token,"token....")
          const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
// console.log(decoded);
          req.user = User.findById(decoded.id);
          // console.log(req.user," from authmiddleware")
          next()
        }catch(error){
console.log(error);
res.status(401)
throw new Error('Not authorized,token failed')
        }
    }
    if(!token){
res.status(401)
throw new Error('No token available')
    }

});

const admin = (req,res,next)=>{
 if(req.user && req.user.isAdmin !== 'false'){
next();
 }else{
    res.status(401).json({message:'Not authorized as admin'})
    throw new Error('Not authorized as admin')
 }
}

export { authentication, admin};