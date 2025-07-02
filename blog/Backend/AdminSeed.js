import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from './public/src/models/Admin.model.js';
import { DB_NAME } from './constants.js';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary from './public/src/config/cloudinary/cloudinaryConfig.js';
dotenv.config();



// MongoDB connection URI
const MONGODB_URI = `${process.env.mongodbURL}/${DB_NAME}`

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });

        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const imagePath = path.resolve('public/temp/5a31ecbae4b60848386cd887.jpeg');
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'Blogs/adminProfile',
        });

        const hashedPassword = await bcrypt.hash('Suraj@321', 10);

        const newAdmin = new Admin({
            username: 'Suraj',
            email: 'surajkhatr1234567@gmail.com',
            profileAvatar: result.secure_url,
            password: hashedPassword,
            isAdmin: true,
            role: 'Admin',
        });

        await newAdmin.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
