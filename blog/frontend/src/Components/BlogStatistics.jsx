import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogStatistics = () => {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        recentBlogs: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogStatistic = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/blog/statistic`
                );
                setStats(response.data);
            } catch (error) {
                console.error("Blog statistic fetching error:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogStatistic();
    }, []);

    return (
        <div className="max-w-6xl w-4xl bg-white p-6 rounded-2xl shadow-md border border-gray-200 ">
            <h2 className="text-2xl text-center font-semibold mb-4 text-indigo-800">📝 Blog Statistics</h2>

            {loading ? (
                <p className="text-gray-500">Loading statistics...</p>
            ) : (
                <>
                    <p className="text-3xl text-gray-700 mb-2">
                        <span className="font-bold">Total Blogs:</span> {stats.totalBlogs}
                    </p>

                    <h3 className="text-md font-semibold mt-6 mb-3 text-gray-800">Recent Blogs</h3>
                    <ul className="max-h-48 overflow-y-auto space-y-3 pr-2 ">
                        {stats.recentBlogs.length === 0 ? (
                            <li className="text-gray-500">No recent blogs.</li>
                        ) : (
                            stats.recentBlogs.map((blog, index) => (
                                <li key={blog._id || index} className="flex items-center justify-between gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                                    <span className="text-gray-700">{blog.title}</span>
                                    <Link
                                        to={`/show/${blog._id}`}
                                        className="mt-4 text-indigo-600 font-medium hover:underline"
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image.replace('\\', '/')}`}
                                            alt="Blog"
                                            className="w-10 h-10 object-cover rounded-full border"
                                        />
                                    </Link>

                                </li>
                            ))
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default BlogStatistics;
