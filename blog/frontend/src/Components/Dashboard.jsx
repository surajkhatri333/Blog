// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [totalBlogs, setTotalBlogs] = useState(0);
//     const [search, setSearch] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/admin/users`, { withCredentials: true });
//                 const blogRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/admin/blogs`, { withCredentials: true });
//                 const allUsers = userRes.data.users;

//                 setUsers(allUsers);
//                 setFilteredUsers(allUsers);
//                 setTotalUsers(allUsers.length);
//                 setTotalBlogs(blogRes.data.blogs.length);
//             } catch (err) {
//                 console.error("Admin Dashboard error:", err);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleSearch = (e) => {
//         const value = e.target.value.toLowerCase();
//         setSearch(value);
//         const filtered = users.filter(user =>
//             user.username.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
//         );
//         setFilteredUsers(filtered);
//     };

//     const handleViewUser = (email) => {
//         navigate(`/userDashboard?email=${email}`);
//     };

//     const sortBy = (key) => {
//         const sorted = [...filteredUsers].sort((a, b) => {
//             if (key === "blogs") return b.totalBlogs - a.totalBlogs;
//             if (key === "saved") return b.savedBlogs.length - a.savedBlogs.length;
//         });
//         setFilteredUsers(sorted);
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
//                     <p className="text-4xl font-bold text-blue-600">{totalUsers}</p>
//                 </div>
//                 <div className="bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Blogs</h3>
//                     <p className="text-4xl font-bold text-green-600">{totalBlogs}</p>
//                 </div>
//             </div>

//             {/* Search and Sort */}
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//                 <input
//                     type="text"
//                     value={search}
//                     onChange={handleSearch}
//                     placeholder="Search by name or email..."
//                     className="px-4 py-2 border rounded-md w-full sm:w-1/2 shadow-sm"
//                 />
//                 <div className="flex gap-3">
//                     <button onClick={() => sortBy('blogs')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sort by Blogs</button>
//                     <button onClick={() => sortBy('saved')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sort by Saved</button>
//                 </div>
//             </div>

//             {/* Users Table */}
//             <div className="bg-white shadow-lg rounded-xl p-4 overflow-x-auto">
//                 <h3 className="text-xl font-bold mb-4 text-gray-800">All Users</h3>
//                 {filteredUsers.length === 0 ? (
//                     <p className="text-gray-500 text-center py-10">No users found.</p>
//                 ) : (
//                     <table className="min-w-full text-left text-gray-700">
//                         <thead className="bg-gray-200 sticky top-0 z-10">
//                             <tr>
//                                 <th className="p-3">Name</th>
//                                 <th className="p-3">Email</th>
//                                 <th className="p-3">Blogs</th>
//                                 <th className="p-3">Saved Blogs</th>
//                                 <th className="p-3 text-center">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredUsers.map(user => (
//                                 <tr key={user._id} className="border-t hover:bg-gray-50">
//                                     <td className="p-3">{user.username}</td>
//                                     <td className="p-3">{user.email}</td>
//                                     <td className="p-3">{user.totalBlogs}</td>
//                                     <td className="p-3">{user.savedBlogs.length}</td>
//                                     <td className="p-3 text-center">
//                                         <button
//                                             onClick={() => handleViewUser(user.email)}
//                                             className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-full text-sm"
//                                         >
//                                             View
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;





import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBlog, FaSearch, FaEye } from 'react-icons/fa';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/admin/users`, { withCredentials: true });
                const blogRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/admin/blogs`, { withCredentials: true });
                const allUsers = userRes.data.users;

                setUsers(allUsers);
                setFilteredUsers(allUsers);
                setTotalUsers(allUsers.length);
                setTotalBlogs(blogRes.data.blogs.length);
            } catch (err) {
                console.error("Admin Dashboard error:", err);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    };

    const handleViewUser = (email) => {
        navigate(`/userDashboard?email=${email}`);
    };

    const sortBy = (key) => {
        const sorted = [...filteredUsers].sort((a, b) => {
            if (key === "blogs") return b.totalBlogs - a.totalBlogs;
            if (key === "saved") return b.savedBlogs.length - a.savedBlogs.length;
        });
        setFilteredUsers(sorted);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mt-10 mb-8 text-center">🌐 Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
                        <FaUsers />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm text-gray-500">Total Users</h3>
                        <p className="text-2xl font-bold text-blue-700">{totalUsers}</p>
                    </div>
                </div>
                <div className="flex items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
                        <FaBlog />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm text-gray-500">Total Blogs</h3>
                        <p className="text-2xl font-bold text-green-700">{totalBlogs}</p>
                    </div>
                </div>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full sm:w-1/2">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>
                <div className="flex gap-3">
                    <button onClick={() => sortBy('blogs')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Sort by Blogs
                    </button>
                    <button onClick={() => sortBy('saved')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                        Sort by Saved
                    </button>
                </div>
            </div>

            {/* User Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredUsers.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No users found.</p>
                ) : (
                    filteredUsers.map(user => (
                        <div key={user._id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-gray-800">{user.username}</h4>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                <div><span className="font-semibold">{user.totalBlogs}</span> Blogs</div>
                                <div><span className="font-semibold">{user.savedBlogs.length}</span> Saved</div>
                            </div>
                            <button
                                onClick={() => handleViewUser(user.email)}
                                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 flex items-center justify-center gap-2"
                            >
                                <FaEye /> View Profile
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
