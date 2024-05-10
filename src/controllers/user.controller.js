import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from  "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser=asyncHandler(async (req,res)=>{
     //extract information from frontend/postman
     const {username,email,password}=req.body;
     console.log(username,email,password);

     //validation check
     if (
        [username,email,password].some((field)=>field?.trim()==="")
     ){
        throw new ApiError(400,"Enter all Fields")
     }

     //check whether user exists
     const existingUser=await User.findOne({
        $or : [{username,email}]
     })
     if (existingUser){
        throw new ApiError(409,"User already exists")
     }

     //check for files
     const avatarLocalPath=req.files?.avatar[0]?.path;
     const coverImgLocalPath=req.files?.coverImg[0]?.path;

     if (!avatarLocalPath){
        throw new ApiError(400,"Avatar Image is Required");
     }

     //upload to cloudinary
     const avatarUrl=await uploadOnCloudinary(avatarLocalPath)
     const coverImg=await uploadOnCloudinary(coverImgLocalPath)

     //check if avatar has been uploaded
     if (!avatarUrl){
        throw new ApiError(409,"Something Went Wrong while uploading avatar image on cloudinary")
     }
     

     //create a user in db
     const createdUser=await User.create({
        fullName,
        avatar : avatarUrl.url,
        cover : coverImg?.url || "",
        email,
        password,
        username : username.toLowerCase()
     })

     //check whether user is successfully created
     const check=await User.findById(createdUser._id).select(
        "-password -refreshToken"
     )

     if (!check){
        throw new ApiError(500,"Something went wrong while Registering user!!")
     }

     return res.status(201).json(new ApiResponse(200,createdUser,"User Registered Successfully!!!"));
    //  res.send("ok")
});
export {registerUser}