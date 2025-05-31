import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
    const [blogVisible, setBlogVisible] = useState(9);
    const [data, setData] = useState({ blogs: [], users: [] });
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const loadMoreBlogs = () => setBlogVisible((prev) => prev + 6);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/`, {
                    withCredentials: true,
                });
                const { blogs, users } = response.data;

                const activeUsers = users.filter((user) => !user.ban);
                const activeUserEmails = new Set(activeUsers.map((user) => user.email));
                const validBlogs = blogs.filter((blog) => activeUserEmails.has(blog.owner));

                setData({ blogs, users });
                setFilteredBlogs(validBlogs);
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
            }
        };

        fetchBlog();
    }, []);

    return (
        <section className=" bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-100 py-16 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 p-3">
                    Explore Inspiring Blogs
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                    Curated content from active community members
                </p>
            </div>

            {/* Blog Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.blogs
                    .filter((blog) => blog.active)
                    .slice(0, blogVisible)
                    .map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`}
                                    alt={blog.title}
                                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-600 flex-grow">{blog.short_headline}</p>
                                <Link
                                    to={`/show/${blog._id}`}
                                    className="mt-4 text-indigo-600 font-medium hover:underline"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Load More Button */}
            {blogVisible < filteredBlogs.length && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={loadMoreBlogs}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base rounded-full shadow-lg transition duration-200"
                    >
                        Load More Blogs
                    </button>
                </div>
            )}
        </section>
    );
};

export default Blogs;
