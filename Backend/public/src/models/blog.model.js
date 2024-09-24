import mongoose, { Schema } from 'mongoose'
import {User} from './user.model.js'

const blogSchema = new mongoose.Schema(
    {
        owner : {
            type :String,
            require:true
        },
        image : {
            type : String,
            require : true
        },
        title :{
            type :String,
            require : true
        },
        short_headline : {
            type : String,
            require : true
        },
        description : {
            type : String,
            require : true
        }

    }
)


export const Blog = mongoose.model("Blog",blogSchema);