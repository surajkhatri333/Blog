// // AdminSidebar.js
// import { Link } from 'react-router-dom';

// const AdminSidebar = () => {
//     return (
//         <div className="admin-sidebar">
//             <nav>
//                 <ul>
//                     <li><Link to="/admin/blogs" >Blog Management</Link></li>
//                     <li><Link to="/admin/users" >User Management</Link></li>
//                     <li><Link to="/admin/comments">Comment Management</Link></li>
//                     <li><Link to="/admin/reports">Reported Content</Link></li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default AdminSidebar;





import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { name: "Blog Management", path: "/admin/blogs" },
  { name: "User Management", path: "/admin/users" },
  { name: "Comment Management", path: "/admin/comments" },
  { name: "Reported Content", path: "/admin/reports" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <>
      {/* Fixed Top Nav */}
      <div className="fixed top-16 left-0 w-full z-50 bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 justify-center md:justify-start">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-[120px] px-4 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AdminSidebar;
