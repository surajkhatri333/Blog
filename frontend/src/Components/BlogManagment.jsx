// BlogManagement.js
import { useEffect, useState } from 'react';
import { fetchBlogs, deleteBlog, reviewBlog } from '../Services/api.js';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs().then(data => setBlogs(data));
    }, []);

    const handleDelete = (id) => {
        deleteBlog(id).then(() => {
            setBlogs(blogs.filter(blog => blog.id !== id));
        });
    };

    const handleReview = (id) => {
        reviewBlog(id).then(() => {
            setBlogs(blogs.map(blog => blog.id === id ? { ...blog, reviewed: true } : blog));
        });
    };

    return (
        <div className="blog-management">
            <h2>Manage Blogs</h2>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <span>{blog.title} - {blog.author}</span>
                        <button onClick={() => handleReview(blog.id)} disabled={blog.reviewed}>Review</button>
                        <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogManagement;
