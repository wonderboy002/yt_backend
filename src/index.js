import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
  path: "./env",
});
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
//allow express app to listen as soon as mongodb is connected
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server functional at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error encountered while connecting to mongodb!!!");
  });

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
