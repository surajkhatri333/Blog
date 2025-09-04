// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//     LineChart, Line, CartesianGrid, Legend
// } from 'recharts';
// import { Link, useLocation } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const UserDashboard = ({ userEmail }) => {
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const userEmailFromParams = params.get('email') || userEmail;

//     const [user, setUser] = useState(null);
//     const [blogs, setBlogs] = useState([]);
//     const [savedBlogs, setSavedBlogs] = useState([]);
//     const [savedBlogDetails, setSavedBlogDetails] = useState([]);
//     console.log("userEmail", userEmail);

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmailFromParams}`);
//                 setUser(userRes.data.users);

//                 const blogsRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/MyBlogs/${userEmailFromParams}`);
//                 setBlogs(blogsRes.data);

//                 const savedRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/savedBlogs/${userEmailFromParams}`);
//                 setSavedBlogs(savedRes.data.savedBlogs);

//                 const detailPromises = savedRes.data.savedBlogs.map(id =>
//                     axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`)
//                 );
//                 const detailResponses = await Promise.all(detailPromises);
//                 setSavedBlogDetails(detailResponses.map(res => res.data));
//             } catch (error) {
//                 console.error("Error fetching dashboard data:", error);
//             }
//         };

//         if (userEmail) fetchUserDetails();
//     }, [userEmail]);

//     const blogStats = [
//         { name: 'My Blogs', count: blogs.length },
//         { name: 'Saved Blogs', count: savedBlogs.length },
//     ];

//     const monthlyStats = blogs.reduce((acc, blog) => {
//         const month = new Date(blog.createdAt).toLocaleString('default', { month: 'short' });
//         acc[month] = (acc[month] || 0) + 1;
//         return acc;
//     }, {});
//     const monthlyData = Object.keys(monthlyStats).map(month => ({ month, blogs: monthlyStats[month] }));

//     const recentActivity = [...blogs, ...savedBlogDetails]
//         .map(b => ({ ...b, type: blogs.includes(b) ? 'Created' : 'Saved' }))
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="max-w-7xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h2>

//                 {/* User Info */}
//                 {user && (
//                     <div className="bg-white shadow-md p-6 rounded mb-6">
//                         <h3 className="text-xl font-semibold mb-2 text-gray-700">User Info</h3>
//                         <p><strong>Username:</strong> {user.username}</p>
//                         <p><strong>Email:</strong> {user.email}</p>
//                         <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//                     </div>
//                 )}

//                 {/* Graphs Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                     {/* Bar Chart */}
//                     <div className="bg-white shadow-md p-4 rounded">
//                         <h3 className="text-xl font-semibold mb-4 text-gray-700">Blog Count</h3>
//                         <ResponsiveContainer width="100%" height={250}>
//                             <BarChart data={blogStats}>
//                                 <XAxis dataKey="name" />
//                                 <YAxis allowDecimals={false} />
//                                 <Tooltip />
//                                 <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* Line Chart */}
//                     <div className="bg-white shadow-md p-4 rounded">
//                         <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Blog Activity</h3>
//                         <ResponsiveContainer width="100%" height={250}>
//                             <LineChart data={monthlyData}>
//                                 <XAxis dataKey="month" />
//                                 <YAxis allowDecimals={false} />
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Line type="monotone" dataKey="blogs" stroke="#10B981" strokeWidth={3} />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* Blog Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     {/* My Blogs */}
//                     <div className="bg-white shadow-md p-6 rounded">
//                         <h3 className="text-xl font-semibold mb-4 text-blue-700">My Blogs ({blogs.length})</h3>
//                         <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                             {blogs.map(blog => (
//                                 <Link to={`/show/${blog._id}`} key={blog._id} className="flex items-center gap-4 p-2 border-b hover:bg-gray-50 rounded">
//                                     <img src={blog.image} alt="blog" className="w-16 h-16 object-cover rounded" />
//                                     <div>
//                                         <h4 className="font-medium text-blue-700">{blog.title}</h4>
//                                         <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Saved Blogs */}
//                     <div className="bg-white shadow-md p-6 rounded">
//                         <h3 className="text-xl font-semibold mb-4 text-green-700">Saved Blogs ({savedBlogDetails.length})</h3>
//                         <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                             {savedBlogDetails.map(blog => (
//                                 <Link to={`/show/${blog._id}`} key={blog._id} className="flex items-center gap-4 p-2 border-b hover:bg-gray-50 rounded">
//                                     <img src={blog.image} alt="saved" className="w-16 h-16 object-cover rounded" />
//                                     <div>
//                                         <h4 className="font-medium text-green-700">{blog.title}</h4>
//                                         <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="bg-white shadow-md p-6 rounded mb-6">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
//                     <ul className="divide-y max-h-[300px] overflow-y-auto">
//                         {recentActivity.map((item, index) => (
//                             <li key={index} className="py-3 flex justify-between">
//                                 <span className="text-sm text-gray-600">
//                                     <strong>{item.type}</strong> - {item.title}
//                                 </span>
//                                 <span className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Actions */}
//                 <div className="bg-white shadow-md p-6 rounded flex gap-4">
//                     <button className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300">
//                         <FaEdit /> Edit Profile
//                     </button>
//                     <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//                         <FaTrash /> Delete Account
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;














import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserDashboard = ({ userEmail }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userEmailFromParams = params.get('email') || userEmail;

    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [savedBlogDetails, setSavedBlogDetails] = useState([]);

    const userId = useRef(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmailFromParams}`, { withCredentials: true });
                userId.current = response.data.users._id;

                const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmailFromParams}`);
                setUser(userRes.data.users);

                if (userId.current) {
                    const blogsRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/MyBlogs/${userId.current}`);
                    setBlogs(blogsRes.data);
                }

                const savedRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/savedBlogs/${userEmailFromParams}`);
                setSavedBlogs(savedRes.data.savedBlogs);

                const detailPromises = savedRes.data.savedBlogs.map(id =>
                    axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`)
                );
                const detailResponses = await Promise.all(detailPromises);
                setSavedBlogDetails(detailResponses.map(res => res.data));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        if (userEmailFromParams) fetchUserDetails();
    }, [userEmailFromParams]);

    const blogStats = [
        { name: 'My Blogs', count: blogs.length },
        { name: 'Saved Blogs', count: savedBlogs.length },
    ];

    const monthlyStats = blogs.reduce((acc, blog) => {
        const month = new Date(blog.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    const monthlyData = Object.keys(monthlyStats).map(month => ({ month, blogs: monthlyStats[month] }));

    const recentActivity = [...blogs, ...savedBlogDetails]
        .map(b => ({ ...b, type: blogs.includes(b) ? 'Created' : 'Saved' }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-10 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-10 mt-15">
                <h1 className="text-3xl font-bold text-center mb-6 p-4">📘 User Dashboard</h1>

                {user && (
                    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-200">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">👤 {user.username}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <FaEdit /> Edit Profile
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <FaTrash /> Delete Account
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-xl font-bold mb-4">📊 Blog Summary</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={blogStats}>
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-xl font-bold mb-4">📈 Monthly Blog Activity</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={monthlyData}>
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="blogs" stroke="#10B981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">📝 My Blogs ({blogs.length})</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {blogs.map(blog => (
                                <Link to={`/show/${blog._id}`} key={blog._id} className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition">
                                    <img src={blog.image} alt="blog" className="w-16 h-16 object-cover rounded-xl" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">{blog.title}</h4>
                                        <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 text-green-700">💾 Saved Blogs ({savedBlogDetails.length})</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {savedBlogDetails.map(blog => (
                                <Link to={`/show/${blog._id}`} key={blog._id} className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition">
                                    <img src={blog.image} alt="saved" className="w-16 h-16 object-cover rounded-xl" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">{blog.title}</h4>
                                        <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">📅 Recent Activity</h3>
                    <ul className="divide-y max-h-80 overflow-y-auto">
                        {recentActivity.map((item, index) => (
                            <li key={index} className="py-3 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    <strong>{item.type}</strong> - {item.title}
                                </span>
                                <span className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;