// AdminDashboard.js
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
    return (
        <div className="absolute top-[10%] w-full px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4">
                    <AdminSidebar />
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Panel</h1>
                    <p className="text-gray-600">
                        Welcome to the Admin Dashboard. Use the sidebar to manage blogs, users, comments, and more.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

