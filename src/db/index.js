import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB=async ()=>{
     try {
       const returnObj=await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
       console.log(`MongoDB connected!!! dbHost : ${returnObj.connection.host}`);
     }
     catch (e){
        console.log("Error while connected to db ",e);
     }
}
export default connectDB;