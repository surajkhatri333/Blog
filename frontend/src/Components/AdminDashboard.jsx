// AdminDashboard.js
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
    return (
        <>
            <div className="container" style={{position:"absolute", top:"10%"}}>
                <div className="admin-dashboard">
                    <AdminSidebar />
                </div>
                <div className="admin-content" >
                        <h1>Admin Panel</h1>
                        <p>Welcome to the Admin Dashboard. Use the sidebar to manage blogs, users, comments, and more.</p>
                     
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
