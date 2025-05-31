import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

const Header = ({ isLogin, onLogout, userEmail }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmail}`, { withCredentials: true });
            setUserData(response.data.users);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        if (isLogin) {
            const checkAdminStatus = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/check`, { withCredentials: true });
                    setIsAdmin(response.data.isAdmin);
                } catch (error) {
                    console.error("Admin check failed", error);
                }
            };
            checkAdminStatus();
            fetchUserData();
        } else {
            setIsAdmin(false);
        }
    }, [isLogin]);

    return (
        <header className="fixed bg-white shadow-md z-50 flex justify-center items-center">
            
            <div className="w-full max-w-7xl max-h-14  mx-auto flex justify-around items-center">
                {/* Hamburger Menu (Mobile) */}
                <div className="pl-2 md:hidden">
                    <button onClick={toggleMenu}>
                        <i className="fa-solid fa-bars text-2xl text-gray-700"></i>
                    </button>
                </div>
                {/* Logo */}
                <div className="text-2xl font-semibold text-gray-800">
                    <Link to="/">YourBlog</Link>
                </div>

                {/* Nav Links (Desktop) */}
                <nav className="hidden md:flex gap-4 space-x-6 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/create" className="hover:text-blue-600 transition">Create Blog</Link>
                    <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="hover:text-blue-600 transition">Explore</button>
                    {isLogin && (
                        <Link to={`/Myblogs/${userEmail}`} className="hover:text-blue-600 transition">My Blogs</Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link to="/Dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
                            <Link to="/Admin" className="hover:text-blue-600 transition">Admin</Link>
                        </>
                    )}
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-5">
                    {isLogin ? (
                        <>
                            {userData && (
                                <img
                                    src={`${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                            )}
                            <button
                                onClick={onLogout}
                                className="w-20 h-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 m-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/sign up"
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2  rounded-md text-sm font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden w-full bg-white border-t border-gray-200 px-4 py-4 space-y-3">
                    <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/create" className="block text-gray-700 hover:text-blue-600">Create Blog</Link>
                    <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="block text-gray-700 hover:text-blue-600">Explore</button>
                    {isLogin && (
                        <Link to={`/Myblogs/${userEmail}`} className="block text-gray-700 hover:text-blue-600">My Blogs</Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link to="/Dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
                            <Link to="/Admin" className="block text-gray-700 hover:text-blue-600">Admin</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

Header.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    userEmail: PropTypes.string.isRequired,
};

export default Header;
