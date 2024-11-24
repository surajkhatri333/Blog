import mongoose, { Schema } from 'mongoose'
import { User } from './user.model.js'

const blogSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        short_headline: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        like: {
            type: [mongoose.Schema.Types.ObjectId],
             ref : "User",
             default : []
        },
        likesCount : {
            type : Number,
            default : 0
        },
        comments: {
            type: [String],
            default : 0
        },
       
        active: {
            type: Boolean,
            default : true
        }
    },
    {
        timestamps: true
    }
)


export const Blog = mongoose.model("Blog", blogSchema);