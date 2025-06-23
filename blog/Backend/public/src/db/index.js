import mongoose from 'mongoose'
import { DB_NAME } from '../../../constants.js';

const connectDB = async ()=>{
    try{
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
        console.log("Database connect successfully");
    }
    catch(err){
        console.log("Database connection failed");
    }
}

export  {connectDB};
