// BlogStatistics.js
import { useState, useEffect } from 'react';
import { fetchBlogStats } from '../Services/api.js';

const BlogStatistics = () => {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        recentBlogs: [],
        popularBlogs: [],
        pendingReviews: []
    });

    useEffect(() => {
        fetchBlogStats().then(data => {
            setStats(data);
        });
    }, []);

    return (
        <div className="blog-statistics">
            <h2>Blog Statistics</h2>
            <p>Total Blogs: {stats.totalBlogs}</p>
            <h3>Recent Blogs</h3>
            <ul>
                {stats.recentBlogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
            <h3>Most Popular Blogs</h3>
            <ul>
                {stats.popularBlogs.map(blog => (
                    <li key={blog.id}>{blog.title} - {blog.views} views</li>
                ))}
            </ul>
            <h3>Pending Reviews</h3>
            <ul>
                {stats.pendingReviews.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogStatistics;
