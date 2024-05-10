import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    //upload file on cloudinary
    const uploadAns = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("File Uploaded Successfully");
    console.log(uploadAns.url);
    return uploadAns;
  } catch (error) {
    fs.unlinkSync(filePath) //remove locally saved temporary files as the upload file got failed
    return null;
  }
};

export {uploadOnCloudinary};
