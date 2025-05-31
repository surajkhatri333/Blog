// temp.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Admin } from './public/src/models/Admin.model.js'; // ✅ Add `.js` extension

// Connect to MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/BLOGS", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function adminCreate() {
    const plainPassword = 'Suraj@321';
    const hashedPassword = await bcrypt.hash(plainPassword, 8); // ✅ Secure hashing

    const admin = await Admin.create({
        username: 'suraj khatri',
        email: 'surajkhatr1234567@gmail.com',
        password: hashedPassword,
        role: 'Admin',
        // profileAvatar: 'temp\\8e85fd13410e496d4aa51f04.png'
    });

    console.log("Admin created:", admin);
}

await adminCreate();
