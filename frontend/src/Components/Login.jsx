import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast("Welcome! to the  login",{autoClose:2000,draggable:true,pauseOnHover:true,theme:"light",hideProgressBar:false});

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/login`,
        { email, password, isAdmin: false },
        { withCredentials: true }
      );

      const { token } = response.data;

      const userData = {
        email,
        token,
        isAdmin: false,
      };

      localStorage.setItem("BlogUser", JSON.stringify(userData));
      onLogin(email);
      navigate('/');
      toast.success("Login successful!");
    } catch (err) {
      console.log("Error handling login:", err);
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
          if (storedUser) onLogin(storedUser.email);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-green-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login to YourBlog</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your email"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};
