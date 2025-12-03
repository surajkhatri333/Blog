import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronUp, FaThumbsUp, FaEyeSlash, FaEye } from 'react-icons/fa';

const BlogManagement = () => {
    const [groupedBlogs, setGroupedBlogs] = useState({});
    const [expandedUser, setExpandedUser] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/`);
            if (!response || !response.data?.blogs) {
                throw new Error("No response from server");
            }

            const grouped = response.data.blogs.reduce((acc, blog) => {
                if (!acc[blog.owner]) acc[blog.owner] = [];
                acc[blog.owner].push(blog);
                return acc;
            }, {});

            setGroupedBlogs(grouped);
        } catch (err) {
            toast.error("Failed to fetch blog data. Please try again.");
        }
    };

    const toggleBlog = async (blogId, owner) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/blog/toggle/${blogId}`);
            setGroupedBlogs(prev => ({
                ...prev,
                [owner]: prev[owner].map(blog =>
                    blog._id === blogId ? { ...blog, active: !blog.active } : blog
                )
            }));
        } catch (err) {
            toast.error("Failed to update blog status. Please try again.");
        }
    };

    const toggleExpand = (username) => {
        setExpandedUser(prev => (prev === username ? null : username));
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="py-20 px-7 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8">Blog Management</h1>

            {Object.entries(groupedBlogs).map(([username, blogs]) => (
                <div
                    key={username}
                    className="bg-white rounded-xl shadow-lg mb-6 transition-all duration-300"
                >
                    <div
                        className="flex justify-between items-center px-6 py-4 bg-blue-500 text-white cursor-pointer rounded-t-xl"
                        onClick={() => toggleExpand(username)}
                    >
                        <div className="flex items-center gap-3 text-lg font-semibold">
                            {expandedUser === username ? <FaChevronUp /> : <FaChevronDown />}
                            {username}
                        </div>
                        <span className="text-sm bg-white text-indigo-600 font-semibold px-3 py-1 rounded-full">
                            {blogs.length} Blog{blogs.length > 1 ? 's' : ''}
                        </span>
                    </div>

                    {expandedUser === username && (
                        <div className="divide-y divide-gray-200 px-6 py-4">
                            {blogs.map(blog => (
                                <div
                                    key={blog._id}
                                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-gray-800">{blog.title}</h3>
                                        <div className="flex items-center gap-4 mt-1 text-gray-500 text-sm">
                                            <div className="flex items-center gap-1">
                                                <FaThumbsUp className="text-blue-500" /> {blog.likesCount} likes
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {blog.active ? "Visible" : "Hidden"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => toggleBlog(blog._id, username)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all 
                                            ${blog.active
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                }`}
                                        >
                                            {blog.active ? <FaEyeSlash /> : <FaEye />}
                                            {blog.active ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BlogManagement;
