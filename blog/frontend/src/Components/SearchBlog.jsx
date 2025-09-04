import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const BlogSearch = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // search & filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("latest");

    // ✅ fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_REQUEST_API}/blogs`
                );
                setBlogs(response.data.blogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // ✅ filter + search + sort
    const filteredBlogs = useMemo(() => {
        let filtered = blogs;

        // Search by title
        if (searchTerm.trim()) {
            filtered = filtered.filter((blog) =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (category !== "all") {
            filtered = filtered.filter((blog) => blog.category === category);
        }

        // Sort by date
        if (sortOrder === "latest") {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        } else {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        }

        return filtered;
    }, [blogs, searchTerm, category, sortOrder]);

    if (loading) {
        return <p className="text-center text-blue-500">Loading blogs...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 mt-30">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search blogs by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 p-2 border rounded-lg focus:ring focus:ring-blue-400"
                />

                {/* Filters */}
                <div className="flex gap-4">
                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value="all">All Categories</option>
                        <option value="Technology">Tech</option>
                        <option value="AI">AI</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Law">Law</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>

                    {/* Sort Filter */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            {/* Blog Results */}
            {filteredBlogs.length === 0 ? (
                <p className="text-center text-gray-500 italic">No blogs found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogSearch;
