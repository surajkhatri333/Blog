// AdminSidebar.js
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <nav>
                <ul>
                    <li><Link to="/admin/blogs" target='_content'>Blog Management</Link></li>
                    <li><Link to="/admin/users" name="content">User Management</Link></li>
                    <li><Link to="/admin/comments">Comment Management</Link></li>
                    <li><Link to="/admin/reports">Reported Content</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
