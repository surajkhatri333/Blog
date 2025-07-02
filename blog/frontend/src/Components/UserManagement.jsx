// import axios from "axios";
// import { useEffect, useState } from "react";

// export const UserManagement = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUser = async () => {
//         const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user`);
//         if (!response) {
//             return console.log("Failed to get user data");
//         }
//         setUsers(response.data.users);
//     };

//     const banUser = async (userId) => {
//         const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/ban/user/${userId}`);
//         if (!response) {
//             return console.log("Unable to fetch banned user");
//         }
//         setUsers(prevUser => {
//             return prevUser.map(user => {
//                 if (user._id === userId) {
//                     return { ...user, ban: !user.ban };
//                 }
//                 return user;
//             });
//         });
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     return (
//         <div className="max-w-5xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Management</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
//                     <thead className="bg-blue-600 text-white">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-sm font-medium uppercase">UserName</th>
//                             <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
//                             <th className="px-6 py-3 text-left text-sm font-medium uppercase">Total Blogs</th>
//                             <th className="px-6 py-3 text-left text-sm font-medium uppercase">Roles</th>
//                             <th className="px-6 py-3 text-center text-sm font-medium uppercase">Ban</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {users.map((user) => (
//                             <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.username}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.totalBlogs}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.role}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-center">
//                                     <i
//                                         className={`fa-solid fa-toggle-on text-2xl cursor-pointer transition-colors duration-300 ${user.ban ? "text-red-600" : "text-green-600"
//                                             }`}
//                                         onClick={() => banUser(user._id)}
//                                         title={user.ban ? "Unban User" : "Ban User"}
//                                     ></i>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };















import axios from "axios";
import { useEffect, useState } from "react";

export const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user`);
            setUsers(response.data.users);
        } catch (error) {
            console.log("Failed to get user data");
        }
    };

    const banUser = async (userId) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/ban/user/${userId}`);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, ban: !user.ban } : user
                )
            );
        } catch (error) {
            console.log("Unable to ban/unban user");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mt-20">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-10">
                User Management Panel
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className={`bg-white rounded-xl shadow-md p-6 border transition-transform duration-200 hover:scale-[1.02] ${user.ban ? "border-red-500 shadow-red-200" : "border-gray-200"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-semibold `}
                            >
                                {user?.role === "admin" ? "Admin" : "User"}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Total Blogs:</strong> {user.totalBlogs || 0}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <span
                                className={`text-sm font-medium ${user.ban ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {user.ban ? "User is Banned" : "Active User"}
                            </span>
                            <button
                                onClick={() => banUser(user._id)}
                                title={user.ban ? "Unban User" : "Ban User"}
                                className={` flex items-center justify-center w-14 h-10 rounded-full shadow-sm transition-colors duration-200 ${user.ban ? "bg-red-100 hover:bg-red-200" : "bg-green-100 hover:bg-green-200"
                                    }`}
                            >
                                <i
                                    className={`p-2 fa-solid fa-toggle-${user.ban ? "off" : "on"} text-xl ${user.ban ? "text-red-600" : "text-green-600"
                                        }`}
                                ></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
