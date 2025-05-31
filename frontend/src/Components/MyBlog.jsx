import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export const MyBlogs = ({ userEmail }) => {
    const [data, setData] = useState([]);
    console.log(userEmail);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/MyBlogs/${userEmail}`);
                if (!response) {
                    alert("User is not logged in! Please sign in first.");
                    return;
                }
                setData(response.data);
            } catch (err) {
                console.log(`error fetching data : ${err}`);
            }
        };
        fetchData();
    }, [userEmail]);

    return (
        <div className="max-w-6xl mx-auto px-4 mt-30">
            {data.length === 0 && (
                <p className="text-center text-gray-500 italic ">No blogs found.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`}
                                alt={blog.title}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="p-4 flex-grow">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Title: {blog.title}</h3>
                            <p className="text-gray-600">Short Description: {blog.short_headline}</p>
                        </div>
                        <div className="p-4 border-t flex justify-end">
                            <Link
                                to={`/show/${blog._id}`}
                                className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

MyBlogs.propTypes = {
    userEmail: propTypes.string.isRequired,
};
