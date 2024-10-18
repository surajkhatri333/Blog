import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import { User } from './public/src/models/user.model.js'
import { upload } from './public/src/middleware/multer.middleware.js'


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser());
app.use("/public/temp", express.static("public/temp"))



//user routes
import { userRouter } from './public/src/routes/user.router.js'
import { ApiError } from './public/src/utils/ApiError.js'
import { Blog } from './public/src/models/blog.model.js'
import { ApiResponse } from './public/src/utils/ApiResponse.js'
import { verifyJwt } from './public/src/middleware/jwtVerify.middleware.js'



app.use("/api/v1/user", userRouter);

app.get("/check",verifyJwt,(req, res) => {
    // This route will only be reached if the token is valid
    res.status(200).json({ isLogin: true, userEmail: req.user.email }); // Send user details if needed
});


app.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (!user) {
            // Create new user
            // user = new User({ username, email, password });
            // await user.save();

            User.create(
                { username, email, password }
            )
        }

        res.status(201).json({ success: true, user });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.post("/api/users/:owner", upload.single("image"), async (req, res) => {
    const owner = req.params.owner;
    const {  title, short_headline, description } = req.body;
    const { image } = req.file;
    console.log(owner)
    console.log(req.body)
    console.log(req.file)

    try {
        const user = await User.findOne({email: owner});
        if (!user) {
            return res.status(400).json(new ApiError(400, "User is not register, Please sign up"));
        }
        await Blog.create(
            {
                owner,
                image: req.file.path,
                title,
                short_headline,
                description

            });
        return res.status(200).json(new ApiResponse(200, "Blog is created"));
    }

    catch (err) {
        console.log(err);
        console.log("frontend data is not received");
        return res.status(200).json(new ApiError(400, "Blog is not created created"));

    }
})



app.get("/MyBlogs/:owner", async (req, res) => {
    try {
        const owner  = req.params;
        console.log(owner)
        const myblog = await Blog.find(owner);
        res.json(myblog);
        console.log(myblog)
    }
    catch (err) {
        console.log(`error in sending my blog data to frontend :`,err.data);
        return res.status(400).json(new ApiError(400, "server error"));
    }

})

app.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    }
    catch (err) {
        console.log("Error in sending blog to frontend", err);
        res.status(400).json(new ApiError(400, "server error"));
    }
})

app.get("/show/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Blog.findById(id);
        res.json(data);
    }
    catch(err){
        console.log("Unable to send data to frontend");
    }
    
})





export { app };