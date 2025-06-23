import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAnalytics = () => {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState({
        newUsers: [],
        totalUsers: 0,
        totalBlogs: 0,
    });

    useEffect(() => {
        const fetchUserAnalytics = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/userAnalytics`);
                setAnalytics(response.data);
            } catch (error) {
                console.error("Error fetching user analytics:", error);
            }
        };
        fetchUserAnalytics();
    }, []);

    return (
        <div className="w-4xl bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl text-center font-semibold mb-4 text-indigo-800">👥 User Analytics</h2>

            <div className="mb-4">
                <p className="font-bold text-3xl text-gray-700 mb-2">
                    <span>New Users:</span>{analytics.totalUsers}
                    </p>
                <ul className="max-h-48 overflow-y-auto space-y-2 pr-2 ">

                    {analytics.newUsers.length === 0 ? (
                        <li className="text-gray-500">No new users found.</li>
                    ) : (
                        analytics.newUsers.map(user => (
                            <li key={user._id} className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-md">
                                <img
                                    src={
                                        user.profileAvatar
                                            ? `${import.meta.env.VITE_APP_REQUEST_API}/${user.profileAvatar.replace('\\', '/')}`
                                            : '/default-avatar.png' 
                                    }
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover border hover:cursor-pointer"
                                    onClick={() => navigate(`/userProfile/${user.email}`)}
                                />
                                <span className="text-gray-700">{user.email}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="space-y-1 text-gray-800">
                <p><span className="font-semibold">Total Users:</span> <span className="text-indigo-600">{analytics.totalUsers}</span></p>
                <p><span className="font-semibold">Total Blogs:</span> <span className="text-indigo-600">{analytics.totalBlogs}</span></p>
            </div>
        </div>
    );
};

export default UserAnalytics;
