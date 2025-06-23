import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogManagement = () => {
    const [data, setData] = useState({ blogs: [], users: [] });

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/`);
            if (!response) {
                throw new Error("No response from server");
            }
            setData(response.data);
        } catch (err) {
            toast.error("Failed to fetch blog data. Please try again.");
            
        }
    };

    const toggleBlog = async (blogId) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/blog/toggle/${blogId}`);

            setData(prevData => {
                const updatedBlogs = prevData.blogs.map(blog => {
                    if (blog._id === blogId) {
                        return { ...blog, active: !blog.active };
                    }
                    return blog;
                });
                return { ...prevData, blogs: updatedBlogs };
            });
        } catch (err) {
            toast.error("Failed to update blog status. Please try again.");
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="absolute top-[15%] w-full max-w-7xl mx-auto px-4">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-center">
                        <tr>
                            <th className="py-3 px-6 text-sm font-medium text-gray-700">Username</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-700">Blog Title</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-700">Blog Likes</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-700">Hide Blog</th>
                        </tr>
                    </thead>
                    <tbody className="text-justify">
                        {data.blogs.map((blog) => (
                            <tr key={blog._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{blog.owner}</td>
                                <td className="py-2 px-4">{blog.title}</td>
                                <td className="py-2 px-4">{blog.likesCount}</td>
                                <td className="py-2 px-4 text-center">
                                    <i
                                        className={`fa-solid fa-toggle-on cursor-pointer text-2xl transition-colors duration-300 ${blog.active ? 'text-green-600' : 'text-gray-600'
                                            }`}
                                        onClick={() => toggleBlog(blog._id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogManagement;
