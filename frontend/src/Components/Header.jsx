// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const Header = ({ isLogin, setisLogin, onLogout, userEmail }) => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);

//     const toggleMenu = () => setMenuOpen(!menuOpen);

//     const fetchUserData = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user/${userEmail}`, { withCredentials: true });
//             setUserData(response.data.users);
//         } catch (error) {
//             console.error("Failed to fetch user data", error);
//         }
//     };
//     useEffect(() => {
//         if (isLogin) {
//             const checkAdminStatus = async () => {
//                 try {
//                     const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`, { withCredentials: true }); console.log(response)
//                     setIsAdmin(response.data.user.isAdmin);
//                 } catch (error) {
//                     console.error("Admin check failed", error);
//                     setisLogin(false)
//                 }
//             };
//             fetchUserData()
//             checkAdminStatus();
//         } else {
//             setIsAdmin(false);
//             setisLogin(false)
//         }
//     }, [userEmail]);


//     return (
//         <header className="w-full h-15 fixed bg-white shadow-md z-1 md:flex justify-center items-center">

//             <div className="w-full max-w-7xl  max-h-16 px-5 flex justify-between items-center  ">
//                 {/* Hamburger Menu (Mobile) */}
//                 <div className="pt-4 flex items-center md:hidden">
//                     <button onClick={toggleMenu}>
//                         <i className="fa-solid fa-bars text-2xl text-gray-700"></i>
//                     </button>
//                 </div>
//                 {/* Logo */}
//                 <div className="hidden md:block text-2xl font-semibold text-gray-800 ">
//                     <Link to="/">YourBlog</Link>
//                 </div>

//                 {/* Nav Links (Desktop) */}
//                 <nav className="hidden md:flex  gap-4 space-x-6 text-gray-700 font-medium">
//                     <Link to="/" className="hover:text-blue-600 transition">Home</Link>
//                     <Link to="/create" className="hover:text-blue-600 transition">Create Blog</Link>
//                     <Link to={`/savedBlog/${userEmail}`} className="hover:text-blue-600 transition">Saved Blog</Link>
//                     <Link to="/userDashboard" className="hover:text-blue-600 transition">Dashboard</Link>
//                     {/* <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="hover:text-blue-600 transition">Explore</button> */}
//                     {isLogin && (
//                         <Link to={`/Myblogs/${userEmail}`} className="hover:text-blue-600 transition">My Blogs</Link>
//                     )}
//                     {isAdmin && (
//                         <>
//                             <Link to="/Dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
//                             <Link to="/Admin" className="hover:text-blue-600 transition">Admin</Link>
//                         </>
//                     )}
//                 </nav>

//                 {/* Auth Buttons */}
//                 <div className=" md:flex items-center gap-5">
//                     {isLogin ? (
//                         <>
//                             {userData && (
//                                 <img
//                                     src={`${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`}
//                                     alt="User Avatar"
//                                     className="w-10 h-10  rounded-full object-contain border"
//                                 />
//                             )}
//                             <button
//                                 onClick={onLogout}
//                                 className="hidden md:block w-20 h-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 m-2 rounded-md text-sm font-medium"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link
//                                 to="/login"
//                                 className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                             >
//                                 Login
//                             </Link>
//                             <Link
//                                 to="/signup"
//                                 className="hidden md:block bg-green-500 hover:bg-green-600 text-white px-4 py-2  rounded-md text-sm font-medium"
//                             >
//                                 Sign Up
//                             </Link>
//                         </>
//                     )}
//                 </div>


//             </div>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <nav className="md:hidden min-w-80 min-h-40 fixed top-12 bg-white border-t border-gray-200 px-4 py-4 space-y-10">
//                     <Link to="/" className="block  text-2xl text-gray-700 hover:text-blue-900 hover:underline">Home</Link>
//                     <Link to="/create" className="block  text-2xl text-gray-700 hover:text-blue-600 hover:underline">Create Blog</Link>
//                     <Link to={`/savedBlog/${userEmail}`} className="block  text-2xl text-gray-700 hover:text-blue-600 hover:underline">Saved Blog</Link>
//                     <Link to="/userDashboard" className="block  text-2xl text-gray-700 hover:text-blue-600 hover:underline">Dashboard</Link>
//                     {/* <span onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="block text-gray-700 text-2xl hover:text-blue-600 hover:underline">Explore</span> */}
//                     {isLogin && (
//                         <Link to={`/Myblogs/${userEmail}`} className="block  text-2xl text-gray-700 hover:text-blue-600 hover:underline">My Blogs</Link>
//                     )}
//                     {isAdmin && (
//                         <>
//                             <Link to="/Dashboard" className="block text-2xl text-gray-700 hover:text-blue-600 hover:underline">Dashboard</Link>
//                             <Link to="/Admin" className="block text-2xl text-gray-700 hover:text-blue-600 hover:underline">Admin</Link>
//                         </>
//                     )}
//                     {/* Auth Buttons */}
//                     <div className="flex gap-5 md:hidden ">
//                         {isLogin ? (
//                             <>
//                                 {/* {userData && (
//                                     <img
//                                         src={`${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`}
//                                         alt="User Avatar"
//                                         className="w-10 h-10 rounded-full object-cover border"
//                                     />
//                                 )} */}
//                                 <button
//                                     onClick={onLogout}
//                                     className="w-40 h-10  bg-red-500 hover:bg-red-900 text-white px-4 py-2 m-2 rounded-3xl text-sm font-medium"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-md font-medium"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/signup"
//                                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2  rounded-md text-md font-medium"
//                                 >
//                                     Sign Up
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </nav>
//             )}
//         </header>
//     );
// };

// Header.propTypes = {
//     isLogin: PropTypes.bool.isRequired,
//     setisLogin: PropTypes.func.isRequired,
//     onLogout: PropTypes.func.isRequired,
//     userEmail: PropTypes.string.isRequired,
// };

// export default Header;


import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ isLogin, setisLogin, onLogout, userEmail }) => {
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
                    const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`, { withCredentials: true });
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
        {name : "Home",path : "/"},
        {name : "Create Blog",path : "/create"},
        {name : "Saved Blog",path : `/savedBlog/${userEmail}`},
        {name : "Dashboard",path : "/userDashboard"},   
        {name : "My Blogs",path : `/Myblogs/${userEmail}`},
    ];
    const adminHeader = [
        {name : "Home",path : "/"},
        {name : "Dashboard",path : "/Dashboard"},
        {name : "Admin",path : "/Admin"},
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
                                    src={`${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`}
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
{/*             
                    <Link to="/" className="block text-lg text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/create" className="block text-lg text-gray-700 hover:text-blue-600">Create Blog</Link>
                    <Link to={`/savedBlog/${userEmail}`} className="block text-lg text-gray-700 hover:text-blue-600">Saved Blog</Link>
                    <Link to="/userDashboard" className="block text-lg text-gray-700 hover:text-blue-600">Dashboard</Link>
                    {isLogin && (
                        <Link to={`/Myblogs/${userEmail}`} className="block text-lg text-gray-700 hover:text-blue-600">My Blogs</Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link to="/Dashboard" className="block text-lg text-gray-700 hover:text-blue-600">Dashboard</Link>
                            <Link to="/Admin" className="block text-lg text-gray-700 hover:text-blue-600">Admin</Link>
                        </>
                    )} */}
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
                        src={`${import.meta.env.VITE_APP_REQUEST_API}/${userData.profileAvatar.replace('\\', '/')}`}
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
    userEmail: PropTypes.string.isRequired,
};

export default Header;
