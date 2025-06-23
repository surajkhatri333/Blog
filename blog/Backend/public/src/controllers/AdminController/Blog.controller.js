import { Blog } from "../../models/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
export const blogPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }
        blog.active = !blog.active
        await blog.save();
        return res.status(200).json({ message: "blog active state is update", blog })
    }
    catch (err) {
        console.log("Blog active field is not upadated");
        return res.status(400).json("Erorr in server")
    }

})


export const blogStatistic = async (req, res) => {
    try {
        const blog = {
            totalBlogs: await Blog.countDocuments(),
            recentBlogs: await Blog.find().sort({ createdAt: -1 }).limit(10)
        };
        console.log(blog);
        return res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog statistics:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}