import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
console.log("process.env.CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);    
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary configuration loaded successfully");
export default cloudinary;