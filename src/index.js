import dotenv from "dotenv";
dotenv.config({
  path : './env'
});
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
const app=express();
connectDB();








/*async function connectDB(){
    try {
      await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
      app.listen(process.env.PORT,()=>{
        console.log(`Server listening on port ${process.env.PORT}`);
      });
    }
    catch(e){
        console.log("Error while connecting to database ",e);
    }
}
connectDB();*/