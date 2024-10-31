// AdminDashboard.js
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
    return (
        <>
        <div className="container">
       

            <div className="admin-dashboard">
                <AdminSidebar />

            </div>
            <iframe target="content" >
                <div className="admin-content">
                    
                        <h1>Admin Panel</h1>
                        <p>Welcome to the Admin Dashboard. Use the sidebar to manage blogs, users, comments, and more.</p>
    
                </div>
                </iframe>
        </div>
        </>
    );
};

export default AdminDashboard;
