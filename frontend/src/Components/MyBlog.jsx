import axios from 'axios';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import BlogCard from './BlogCard';

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
        <>
            {data.length === 0 && (
                <p className="text-center text-gray-500 italic ">No blogs found.</p>
            )}
            <div className="relative top-20 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                <div className='p-5'>
                    {
                        data.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

MyBlogs.propTypes = {
    userEmail: propTypes.string.isRequired,
};
