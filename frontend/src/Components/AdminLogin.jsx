// /* eslint-disable react/prop-types */
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminLogin = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = useCallback(async (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             console.log('Email and password are required.');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/login`,
//                 { email, password, isAdmin: true },
//                 { withCredentials: true }

//             );

//             const { token, message } = response.data
//             const userData = {
//                 email,
//                 token,
//                 isAdmin: true,
//             }
//             localStorage.setItem("BlogUser", JSON.stringify(userData))
//             console.log(response.data.message);
//             onLogin(email);
//             navigate('/'); // adjust path if needed
//         } catch (err) {
//             console.error('Login failed:', err);
//         }
//     }, [email, password, onLogin, navigate]);

//     useEffect(() => {
//         const checkToken = async () => {
//             const storedUser = JSON.parse(localStorage.getItem("BlogUser"));
//             if (storedUser && storedUser.token) {
//                 try {
//                     const res = await axios.get(
//                         `${import.meta.env.VITE_APP_REQUEST_API}/check`,
//                         { withCredentials: true }
//                     );

//                     if (res.data.isLogin) {
//                         onLogin(storedUser.email);
//                     } else {
//                         localStorage.removeItem("BlogUser");
//                         onLogin(null);
//                     }
//                 } catch (err) {
//                     console.error("Error verifying token", err);
//                     localStorage.removeItem("BlogUser");
//                     onLogin(null);
//                 }
//             } else {
//                 onLogin(null);
//             }
//         };

//         checkToken();
//     }, [onLogin]);


//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//             <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                         type="text"
//                         id="email"
//                         className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter email"
//                         required
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter password"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;







/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        if (!email || !password) {
            console.log('Email and password are required.');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/login`,
                { email, password, isAdmin: true },
                { withCredentials: true }
            );

            const { token } = response.data;

            const userData = {
                email,
                token,
                isAdmin: true,
            };

            localStorage.setItem("BlogUser", JSON.stringify(userData));
            onLogin(email);
            navigate('/');
            toast.success("Admin Login successful!");
        } catch (err) {
            console.error('Login failed:', err);
            toast.error("Login failed. Please check your email and password.");
        }
    }, [email, password, onLogin, navigate]);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`,
                    { withCredentials: true }
                );

                if (res.data.isLogin) {
                    const storedUser = JSON.parse(localStorage.getItem("BlogUser"));
                    if (storedUser) {
                        onLogin(storedUser.email);
                    }
                } else {
                    localStorage.removeItem("BlogUser");
                    onLogin(null);
                }
            } catch (err) {
                console.error("Token verification failed", err);
                localStorage.removeItem("BlogUser");
                onLogin(null);
            }
        };
        checkToken();
    }, [onLogin]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        autoFocus
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
