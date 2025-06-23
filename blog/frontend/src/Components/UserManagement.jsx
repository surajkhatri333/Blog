import axios from "axios";
import { useEffect, useState } from "react";

export const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const fetchUser = async () => {
        const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user`);
        if (!response) {
            return console.log("Failed to get user data");
        }
        setUsers(response.data.users);
    };

    const banUser = async (userId) => {
        const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/ban/user/${userId}`);
        if (!response) {
            return console.log("Unable to fetch banned user");
        }
        setUsers(prevUser => {
            return prevUser.map(user => {
                if (user._id === userId) {
                    return { ...user, ban: !user.ban };
                }
                return user;
            });
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">UserName</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Total Blogs</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Roles</th>
                            <th className="px-6 py-3 text-center text-sm font-medium uppercase">Ban</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.totalBlogs}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <i
                                        className={`fa-solid fa-toggle-on text-2xl cursor-pointer transition-colors duration-300 ${user.ban ? "text-red-600" : "text-green-600"
                                            }`}
                                        onClick={() => banUser(user._id)}
                                        title={user.ban ? "Unban User" : "Ban User"}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
