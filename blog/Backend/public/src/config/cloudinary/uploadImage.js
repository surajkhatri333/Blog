import fs from "fs"
import cloudinary from "./cloudinaryConfig"

const uploadImage = async (filePath , folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{folder : `Blogs/${folder}`})
        fs.unlinkSync(filePath);
    }
        catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    } 
}
