import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import path from 'path'


cloudinary.config({
    cloud_name : BLOGS,
    api_key :526169656524713,
    api_secret : aWHEvYLo585mLMGo9fbD43xX9qY
});


const uploadOnCloudinary = async (localfile) =>{
    try{
        console.log(response);
        if(!localfile) return null;
        const response = await cloudinary.uploader.upload(localfile,{resource_type: auto});
        console.log("File is uploaded on cloudinary");
        return response;

    }
    catch(err){
        fs.unlinkSync(localfile);
        return null;
    }
};

export {uploadOnCloudinary};