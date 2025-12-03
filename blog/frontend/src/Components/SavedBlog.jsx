import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlogCard from './BlogCard.jsx';
import axios from 'axios';
import { useContext } from 'react';
import { LoginContext } from '../Context/LoginContext.jsx';


const SavedBlog = () => {
    const {isLogin:onLogin} = useContext(LoginContext);
    const [userEmail, setUserEmail] = useState("");
    const [savedBlogsId, setSavedBlogsId] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);


    useEffect(() => {
        if (onLogin) {
            const token = JSON.parse(localStorage.getItem("BlogUser"));
            if (token && token.email) {
                setUserEmail(token.email);
            }
        }
    }, [onLogin]);

    
    
    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                if (userEmail) {
                    const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/savedBlogs/${userEmail}`);
                    if (response && response.data) {
                        setSavedBlogsId(response.data.savedBlogs);
                    }
                }
            } catch (error) {
                console.error("Error fetching saved blogs:", error);
            }
        };
        fetchSavedBlogs();
    }, [userEmail]);

    const fetchBlogs = async () => {
        try {
            const blogs = await Promise.all(savedBlogsId.map(async (blogId) => {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${blogId}`);
                if (response && response.data) {
                    return response.data;
                }
                throw new Error(`No data found for blog Id: ${blogId}`);
            }));
            setSavedBlogs(blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (savedBlogsId.length > 0) {
            fetchBlogs();
        } else {
            setSavedBlogs([]);
        }
    }, [savedBlogsId]);

    return (
        <div className="relative top-10 w-full min-h-screen px-6 py-10">
            {onLogin ? (
                savedBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                        {savedBlogs.map((blog) => (
                            <div key={blog._id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No saved blogs found.</div>
                )
            ) : (
                <div className="text-center text-lg text-red-500 font-medium">Please log in to see your saved blogs.</div>
            )}
        </div>
    );
};
SavedBlog.propTypes = {
    onLogin: PropTypes.func,
};

export default SavedBlog;
