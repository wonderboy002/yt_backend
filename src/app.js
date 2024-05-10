//creaate an express app in express.js
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();
app.use(cors({
    origin : process.env.CORS_ORIGIN 
}));

app.use(express.json({
    limit : "10kb"
}));

app.use(urlencoded({
    extended : true,
    limit : "16kb"
}));

app.use(express.static("public"));
app.use(cookieParser());

//import Routes
import userRouter from "./routes/user.routes.js";

//Routes Declaration
app.use("/api/v1/users",userRouter)

export default app;