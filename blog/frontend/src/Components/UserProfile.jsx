import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const { userEmail } = useParams();
    const [userData, setUserData] = useState(null)
    const [userBlogs, setUserBlogs] = useState([])
    useEffect(() => {
        fetchUserProfile();
        if (userEmail) {
            fetchUserBlogs();
        }
    }, [userEmail]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmail}`)
            if (!response) {
                throw new Error("failed to fetch user profile")
            }
            setUserData(response.data.users)
        }
        catch (error) {
            console.error("Error fetching user profile:", error);
        }

    }
    console.log("user email:", userEmail)
    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/MyBlogs/${userEmail}`, { withCredentials: true })
            if (!response) {
                throw new Error("failed to fetch user blofs")
            }
            setUserBlogs(response.data)
        } catch (error) {
            console.error("Error fetching user blogs:", error)
        }
    }
    // Fetch user profile and blogs when component mounts
    if (!userEmail) {
        return (
            <div className="text-center mt-20 text-xl text-red-500 font-semibold">
                ❌ User data not available. Please navigate from a valid source.
            </div>
        );
    }
    return (
        <>
            <div className='w-full max-w-7xl p-6 bg-white rounded-2xl shadow-md mt-16 flex md:flex-row gap-10 m-auto'>
                {userData ? (
                    <div className='flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md'>
                        <img
                            src={userData.profileAvatar
                                ? `${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`
                                : '/default-avatar.png'}
                            alt="User Avatar"
                        />
                        <p>{userData.username}</p>
                        <p>Contact : <span className='text-red-400'>{userData.email}</span></p>

                    </div>
                ) : (
                    <div className='text-center text-gray-500'>🔄 Loading user data...</div>
                )}
                <div className='flex flex-col gap-6 w-full'>
                    <h1 className='text-2xl font-bold text-gray-800'>User Blogs</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {userBlogs && userBlogs.length > 0 && userBlogs.map((blog) => (
                            <div key={blog._id} className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-hidden'>
                                <div className='h-48 w-full overflow-hidden'>
                                    <img src={blog.image} alt={blog.title} className='h-full w-full object-contain hover:scale-105 transition-transform duration-300' />
                                </div>
                                <div className='p-4 flex flex-col flex-grow'>
                                    <h2 className='text-xl font-semibold mb-2 text-gray-800'>{blog.title}</h2>
                                    <p className='text-gray-600 mb-4'>{blog.description}...</p>
                                    <Link
                                        to={`/show/${blog._id}`}
                                        className="mt-4 text-indigo-600 font-medium hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile