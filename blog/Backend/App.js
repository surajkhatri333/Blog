import express from 'express'
import mongoose, { trusted } from 'mongoose'
import path, { isAbsolute } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import { User } from './public/src/models/user.model.js'
import { upload } from './public/src/middleware/multer.middleware.js'
import cloudinary from './public/src/config/cloudinary/cloudinaryConfig.js'
import fs from 'fs'


const app = express();

app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'https://luxury-semifreddo-6566ae.netlify.app'
        ],// Your frontend's URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true, // Allow credentials (cookies, headers, etc.)
    }
));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser());
app.use("/temp", express.static("public/temp"))



//user routes
import { userRouter } from './public/src/routes/user.router.js'
import { ApiError } from './public/src/utils/ApiError.js'
import { Blog } from './public/src/models/blog.model.js'
import { ApiResponse } from './public/src/utils/ApiResponse.js'
import { verifyJwt } from './public/src/middleware/jwtVerify.middleware.js'
import adminRouter from './public/src/routes/adminRoutes.router.js'
import blogStatisticRouter from './public/src/routes/AdminDashboard/BlogStatistic.router.js'
import { Admin } from './public/src/models/Admin.model.js'
import { isAdmin } from './public/src/middleware/isAdmin.middleware.js'

//chatbot implementation
import chatbotRoute from "./public/src/routes/chatbot.js";
app.use("/api", chatbotRoute);


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter)

// admin dashboard
app.use("/api/v1/admin/dashbord/", verifyJwt, isAdmin, Blog)
app.get("/admin/users", verifyJwt, async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "User data is send", users })
    }
    catch (err) {
        return res.status(400).json({ message: "Server problem while catching user data " })
    }
})
app.get("/admin/blogs", verifyJwt, async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({ message: "User data is send", blogs })
    }
    catch (err) {
        return res.status(400).json({ message: "Server problem while catching user blogs " })
    }
})



app.get('/test', (req, res) => {
    res.send('Test route working!');
});

// app.use("/check", verifyJwt, (req, res) => {
//     // This route will only be reached if the token is valid
//     return res.status(200).json({ message: "token verified", isAdmin: req.user.isAdmin, isLogin: true }); // Send user details if needed
// });


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

app.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find({});
        const users = await User.find({});
        return res.status(200).json({ blogs, users });
    }
    catch (err) {
        console.log("Error in sending blog to frontend", err);
        return res.status(400).json(new ApiError(400, "server error"));
    }
})

app.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "User data is send", users })
    }
    catch (err) {
        return res.status(400).json({ message: "Server problem while catching user data " })
    }

})
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({ message: "Blog data is sent", blogs })
    }
    catch (err) {
        return res.status(400).json({ message: "Server problem while catching blog data " })
    }

})

//for header
app.get("/user/:email", async (req, res) => {
    try {
        const userEmail = req.params;
        // console.log(userEmail)
        const users = await User.findOne(userEmail) || await Admin.findOne(userEmail);

        // console.log(users)
        return res.status(200).json({ message: "User data is send", users })
    }
    catch (err) {
        return res.status(400).json({ message: "Server problem while catching user data " })
    }

})


//create blog
// app.post("/api/users/:owner", upload.single("image"), async (req, res) => {
//     const owner = req.params.owner;
//     const { title, short_headline, description } = req.body;
//     const { image } = req.file;
//     console.log(owner)
//     console.log(req.body)
//     console.log(req.file)

//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Image not provided" });
//         }
//         // const folderPath = `Blogs/userBlog/${owner}`;

//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: `Blogs/userBlog/${owner}`
//         });

//         fs.unlinkSync(req.file.path);
//         const user = await User.findOne({ email: owner });

//         if (!user) {
//             return res.status(400).json(new ApiError(400, "User is not register, Please sign up"));
//         }
//         const newBlog = await Blog.create(
//             {
//                 owner,
//                 image: result.secure_url,
//                 title,
//                 short_headline,
//                 description,
//                 like: [],
//                 comments: [],
//                 likescount: 0

//             });
//         console.log(user)
//         if (!newBlog) {
//             return res.status(500).json({ message: "server error" })
//         }

//         await User.updateOne({ _id: user._id }, { $set: { totalBlogs: user.totalBlogs + 1 } });
//         console.log(user)
//         await user.save();
//         newBlog.save()
//         return res.status(200).json(new ApiResponse(200, "Blog is created"));
//     }

//     catch (err) {
//         console.log(err);
//         console.log("frontend data is not received");
//         return res.status(200).json(new ApiError(400, "Blog is not created created"));

//     }
// })

const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // avg adult reading speed
    const words = text.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};

app.post("/api/users/:owner", upload.single("image"), async (req, res) => {
    const ownerEmail = req.params.owner;
    const { title, short_headline, description, category, tags, status } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image not provided" });
        }

        // ✅ Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `Blogs/userBlog/${ownerEmail}`,
        });

        // Remove file from server after upload
        fs.unlinkSync(req.file.path);

        // ✅ Find user
        const user = await User.findOne({ email: ownerEmail });
        if (!user) {
            return res
                .status(400)
                .json(new ApiError(400, "User is not registered, Please sign up"));
        }

        // ✅ Create blog
        const newBlog = await Blog.create({
            owner: user._id, // store ObjectId instead of email
            image: result.secure_url,
            title,
            short_headline,
            description,
            category: category || "Other",
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
            status: status || "Published",
            readingTime: calculateReadingTime(description),
        });

        if (!newBlog) {
            return res.status(500).json(new ApiError(500, "Server error"));
        }

        // ✅ Update user's total blogs count
        user.totalBlogs = (user.totalBlogs || 0) + 1;
        await user.save();

        return res
            .status(201)
            .json(new ApiResponse(201, "Blog created successfully", newBlog));
    } catch (err) {
        console.error("Error creating blog:", err);
        return res.status(500).json(new ApiError(500, "Blog could not be created"));
    }
});




app.get("/MyBlogs/:owner", async (req, res) => {
    try {
        const owner = req.params;
        console.log(owner)
        const myblog = await Blog.find(owner);
        res.json(myblog);
    }
    catch (err) {
        console.log(`error in sending my blog data to frontend :`, err.data);
        return res.status(400).json(new ApiError(400, "server error"));
    }

})


app.get("/show/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Blog.findById(id);
        res.json(data);
    }
    catch (err) {
        console.log("Unable to send data to frontend");
    }

})


//UPDATE ALREADY PRESENT BLOG DATA
app.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // console.log(id)
        // console.log(data);
        const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
        if (!updatedBlog) {
            return res.status(400).json({ message: "Blog not found" });
        }
        // console.log("updatedBlog : ",updatedBlog);
        return res.json(updatedBlog);
    }
    catch (err) {
        console.log("Blog is not updated in database")
    }
})

//comments added
app.post('/comments/:id', async (req, res) => {
    const blogId = req.params.id;
    const { comment, userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    const newComment = {
        comment,
        user: userId,
        createdAt: new Date(),
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { comments: newComment } },
        { new: true }
    );
    const addedComment = {
        comment: comment,
        user: {
            username: user.username,
            email: user.email,
        },
        createdAt: newComment.createdAt
    }
    return res.status(200).json({ newComments: addedComment });
});


//likes id
// app.put("/likes/:id", verifyJwt, async (req, res) => {
//     try {
//         const blogId = req.params.id;
//         console.log(blogId)
//         const blog = await Blog.findById(blogId);
//         if (!blog) {
//             return res.status(400).json({ message: "blog is not find" });
//         }

//         //check user likes before
//         const user = req.user.id;
//         console.log(user)
//         if (!blog.like.includes(user)) {
//             blog.like.push(user);
//             blog.likesCount += 1;
//             // const updateblog = await Blog.findByIdAndUpdate(blogId,{$inc: {likesCount : 1}},{new:true});
//             const updateblog = await blog.save();
//             return res.json({ blog: updateblog });
//         }
//         else {
//             blog.like.splice(user, 1);
//             blog.likesCount -= 1;
//             // const updateblog = await Blog.findByIdAndUpdate(blogId,{$inc: {likesCount : 1}},{new:true});
//             const updatesblog = await blog.save();
//             return res.json({ blog: updatesblog });
//             // res.status(400).json({message:"user is already like this blog"});
//         }
//     }
//     catch (err) {
//         console.log("Blog is not update like field");
//         return res.status(500).json({ message: "server error" });
//     }

// })

app.put("/likes/:id", verifyJwt, async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const userId = req.user.id; // from JWT

        blog.like = blog.like || blog.likes || [];
        blog.likesCount = blog.likesCount || blog.like.length;
        console.log("like count :" ,blog.likesCount);
        const alreadyLiked = blog.like.includes(userId);

        if (!alreadyLiked) {
            // Like
            blog.like.push(userId);
            blog.likesCount += 1;
        } else {
            // Unlike (fix: remove by index)
            blog.like = blog.like.filter((id) => id.toString() !== userId);
            blog.likesCount = Math.max(0, blog.likesCount - 1);
        }

        const updatedBlog = await blog.save();
        return res.json({
            blog: updatedBlog,
            liked: !alreadyLiked,
            likesCount: updatedBlog.likesCount,
        });
    } catch (err) {
        console.error("Error updating likes:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

//save blog
app.put("/save/:blogId", verifyJwt, async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const { userEmail } = req.body;
        console.log("save blog email is: ", userEmail);
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Prevent duplicates
        if (user.savedBlogs.includes(blogId)) {
            user.savedBlogs = user.savedBlogs.filter(id => id.toString() !== blogId);
            await user.save();
            return res.status(200).json({ savedBlogId: user.savedBlogs });
        }
        user.savedBlogs.push(blogId);
        await user.save();
        return res.status(200).json({ savedBlogId: user.savedBlogs });
    }
    catch (err) {
        console.log("Error saving blog:", err);
        return res.status(500).json({ message: "Server error" });
    }
})
app.get("/savedBlogs/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail;
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ savedBlogs: user.savedBlogs });
    }
    catch (err) {
        console.log("Error fetching saved blogs:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// user id
app.get("/userid", verifyJwt, async (req, res) => {
    try {
        console.log("User ID request received");
        return res.status(200).json({ user: req.user.id });
    }
    catch (err) {
        console.log("user id can not send");
    }
})

//API for end blog data for DASHBOARD
app.use("/api/v1/blog", blogStatisticRouter);

//API FOR USER BLOG DATA FOR DASHBOARD
app.use("/userAnalytics", async (req, res) => {
    const user = {
        totalUsers: await User.countDocuments(),
        newUsers: await User.find().sort({ createdAt: -1 }).limit(5),
        totalBlogs: await Blog.countDocuments()
    }
    res.status(200).json(user)

})


app.use("/api/v1/admin/blog/toggle/:blogId", async (req, res) => {
    const { blogId } = req.params;

    // 1. Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // 2. Toggle the 'active' field
    blog.active = !blog.active;
    await blog.save();

    // 3. Respond with success
    res.status(200).json({
        success: true,
        message: `Blog has been ${blog.active ? 'shown' : 'hidden'}`,
        blogId: blog._id,
        active: blog.active,
    });
});


export { app };
