import mongoose from 'mongoose'
// schema for user

const userSchema = new mongoose.Schema({
    profileAvatar: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: "false"
    },
    totalBlogs: {
        type: Number,
        default: 0
    },
    savedBlogs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
        default: []
    },
    ban: {
        type: Boolean,
        require: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);