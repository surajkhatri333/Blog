import mongoose, { Schema } from 'mongoose'
import { User } from './user.model.js'

const blogSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // link blog to actual user
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        short_headline: {
            type: String,
            required: true,
            maxlength: 200, // limit short headline length
        },
        description: {
            type: String,
            required: true,
        },

        // ✅ New fields
        category: {
            type: String,
            enum: ["Technology", "AI","Education","Travel","Law","Gaming", "Lifestyle", "Health", "Food", "Other"],
            default: "Other",
        },
        tags: {
            type: [String], // example: ["AI", "React", "Node"]
            default: [],
        },

        // ✅ Likes
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        likesCount: {
            type: Number,
            default: 0,
        },

        // ✅ Comments
        comments: {
            type: [
                {
                    comment: {
                        type: String,
                        required: true,
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
            default: [],
        },

        // ✅ Meta
        readingTime: {
            type: String, // e.g., "5 min read"
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Published",
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);

export const Blog = mongoose.model("Blog", blogSchema);