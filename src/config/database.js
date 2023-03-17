//connection to database
import mongoose from 'mongoose';

const dbConnect = async () => {
    const mongoConnectionString = process.env.MONGODB_URI;
    try {
        mongoose.set('strictQuery', false)
     const connect = await mongoose.connect(mongoConnectionString);
      console.log("MongoDB connection established successfully");
    } catch (error) {
      console.log("Unable to establish connection with the Database", error);
    }
  };
  
 export default dbConnect; 