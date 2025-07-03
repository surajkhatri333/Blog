import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ isLogin, setisLogin, onLogout, userEmail }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmail}`, { withCredentials: true });
            console.log("User data response:", response);
            setUserData(response.data.users);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        if (isLogin) {
            const checkAdminStatus = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`, { withCredentials: true });
                    console.log("Admin status response:", response);
                    setIsAdmin(response.data.user.isAdmin);
                } catch (error) {
                    console.error("Admin check failed", error);
                    setisLogin(false);
                }
            };
            fetchUserData();
            checkAdminStatus();
        } else {
            setIsAdmin(false);
            setisLogin(false);
        }
    }, [userEmail]);

    const userHeader = [
        { name: "Home", path: "/" },
        { name: "Create Blog", path: "/create" },
        { name: "Saved Blog", path: `/savedBlog/${userEmail}` },
        { name: "Dashboard", path: "/userDashboard" },
        { name: "My Blogs", path: `/Myblogs/${userEmail}` },
    ];
    const adminHeader = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/Dashboard" },
        { name: "Admin", path: "/Admin" },
    ];

    return (
        <header className="w-full fixed top-0 bg-white shadow z-10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">YourBlog</Link>
                {
                    isAdmin ? (
                        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                            {adminHeader.map((item) => (
                                <Link key={item.name} to={item.path} className="hover:text-blue-600">{item.name}</Link>
                            ))}
                        </nav>
                    ) : (
                        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                            {userHeader.map((item) => (
                                <Link key={item.name} to={item.path} className="hover:text-blue-600">{item.name}</Link>
                            ))}
                        </nav>
                    )
                }

                {/* Auth & Avatar */}
                <div className="hidden md:flex items-center gap-4">
                    {isLogin ? (
                        <>
                            {userData && (
                                <img
                                    src={userData.profileAvatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border object-cover"
                                />
                            )}
                            <button
                                onClick={onLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Login</Link>
                            <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-700">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-4 shadow-lg">

                    {
                        isAdmin ? (
                            adminHeader.map((item) => (
                                <Link key={item.name} to={item.path} className="block text-lg text-gray-700 hover:text-blue-600">{item.name}</Link>
                            ))
                        ) : (
                            userHeader.map((item) => (
                                <Link key={item.name} to={item.path} className="block text-lg text-gray-700 hover:text-blue-600">{item.name}</Link>
                            ))
                        )
                    }

                    <div className="pt-4 border-t border-gray-300 flex flex-col gap-2">
                        {isLogin ? (
                            <button
                                onClick={onLogout}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="bg-blue-500 text-center hover:bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link>
                                <Link to="/signup" className="bg-green-500 text-center hover:bg-green-600 text-white px-4 py-2 rounded-md">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            {isLogin && userData && (
                <div className="md:hidden absolute top-15 right-4">
                    <img
                        src={userData.profileAvatar}
                        alt="User Avatar"
                        className="w-15 h-15 rounded-full object-cover border"
                    />
                </div>
            )}
        </header>
    );
};

Header.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setisLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    userEmail: PropTypes.string,
};

export default Header;






// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// const Header = ({ isLogin, setisLogin, onLogout, userEmail }) => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(null); // initially null
//     const [loading, setLoading] = useState(true); // loading state

//     const toggleMenu = () => setMenuOpen(!menuOpen);

//     const fetchUserData = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmail}`, { withCredentials: true });
//             setUserData(response.data.users);
//         } catch (error) {
//             console.error("Failed to fetch user data", error);
//         }
//     };

//     const checkAdminStatus = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`, { withCredentials: true });
//             setIsAdmin(response.data.user?.isAdmin);
//         } catch (error) {
//             console.error("Admin check failed", error);
//             setIsAdmin(false);
//         } finally {
//             setLoading(false); // stop loading whether admin or not
//         }
//     };

//     useEffect(() => {
//         if (isLogin && userEmail) {
//             fetchUserData();
//             checkAdminStatus();
//         } else {
//             setIsAdmin(false);
//             setUserData(null);
//             setLoading(false);
//         }
//     }, [isLogin, userEmail]); // added isLogin dependency

//     const userHeader = [
//         { name: "Home", path: "/" },
//         { name: "Create Blog", path: "/create" },
//         { name: "Saved Blog", path: `/savedBlog/${userEmail}` },
//         { name: "Dashboard", path: "/userDashboard" },
//         { name: "My Blogs", path: `/Myblogs/${userEmail}` },
//     ];
//     const adminHeader = [
//         { name: "Home", path: "/" },
//         { name: "Dashboard", path: "/Dashboard" },
//         { name: "Admin", path: "/Admin" },
//     ];

//     // ✅ Wait for role check to finish
//     if (loading) return null;

//     return (
//         <header className="w-full fixed top-0 bg-white shadow z-10">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//                 <Link to="/" className="text-2xl font-bold text-gray-800">YourBlog</Link>

//                 {/* ✅ Role-based nav */}
//                 <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
//                     {(isAdmin ? adminHeader : userHeader).map((item) => (
//                         <Link key={item.name} to={item.path} className="hover:text-blue-600">{item.name}</Link>
//                     ))}
//                 </nav>

//                 <div className="hidden md:flex items-center gap-4">
//                     {isLogin ? (
//                         <>
//                             {userData && (
//                                 <img
//                                     src={userData.profileAvatar}
//                                     alt="User Avatar"
//                                     className="w-10 h-10 rounded-full border object-cover"
//                                 />
//                             )}
//                             <button
//                                 onClick={onLogout}
//                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Login</Link>
//                             <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">Sign Up</Link>
//                         </>
//                     )}
//                 </div>

//                 {/* Hamburger */}
//                 <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-700">
//                     <i className="fa-solid fa-bars"></i>
//                 </button>
//             </div>

//             {/* Mobile menu */}
//             {menuOpen && (
//                 <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-4 shadow-lg">
//                     {(isAdmin ? adminHeader : userHeader).map((item) => (
//                         <Link key={item.name} to={item.path} className="block text-lg text-gray-700 hover:text-blue-600">{item.name}</Link>
//                     ))}

//                     <div className="pt-4 border-t border-gray-300 flex flex-col gap-2">
//                         {isLogin ? (
//                             <button
//                                 onClick={onLogout}
//                                 className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//                             >
//                                 Logout
//                             </button>
//                         ) : (
//                             <>
//                                 <Link to="/login" className="bg-blue-500 text-center hover:bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link>
//                                 <Link to="/signup" className="bg-green-500 text-center hover:bg-green-600 text-white px-4 py-2 rounded-md">Sign Up</Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Avatar on mobile */}
//             {isLogin && userData && (
//                 <div className="md:hidden absolute top-15 right-4">
//                     <img
//                         src={userData.profileAvatar}
//                         alt="User Avatar"
//                         className="w-15 h-15 rounded-full object-cover border"
//                     />
//                 </div>
//             )}
//         </header>
//     );
// };

// Header.propTypes = {
//     isLogin: PropTypes.bool.isRequired,
//     setisLogin: PropTypes.func.isR
// }
// export default Header
