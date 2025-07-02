// // AdminDashboard.js
// import AdminSidebar from './AdminSidebar';

// const AdminDashboard = () => {
//     return (
//         <div className="absolute top-[10%] w-full px-4">
//             <div className="flex flex-col lg:flex-row gap-6">
//                 {/* Sidebar */}
//                 <div className="w-full lg:w-1/4">
//                     <AdminSidebar />
//                 </div>

//                 {/* Content Area */}
//                 <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
//                     <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Panel</h1>
//                     <p className="text-gray-600">
//                         Welcome to the Admin Dashboard. Use the sidebar to manage blogs, users, comments, and more.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;







import { Link } from 'react-router-dom';

const navItems = [
    { name: "Blog Management", path: "/admin/blogs" },
    { name: "User Management", path: "/admin/users" },
    { name: "Comment Management", path: "/admin/comments" },
    { name: "Reported Content", path: "/admin/reports" },
];

const AdminDashboard = () => {
    return (
        <div className="mt-24 px-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 text-sm font-medium"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Dashboard Info */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome Admin!</h2>
                <p className="text-gray-600">
                    Use the options above to manage different parts of your application including blogs, users, comments, and reports.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
