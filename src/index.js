import dotenv from 'dotenv';
dotenv.config();

import dbConnect from './config/database.js';
import app from './app.js';

const port = process.env.PORT || 8001;

dbConnect();
app.listen(port,()=>{
   console.log(`Server is running on port: ${port}`)
});