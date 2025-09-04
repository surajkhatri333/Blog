import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast("Welcome! to the  login", { autoClose: 2000, draggable: true, pauseOnHover: true, theme: "light", hideProgressBar: false });

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-green-200 px-6 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to continue exploring YourBlog
        </p>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            placeholder="Enter your email"
            autoFocus
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
          >
            Login
          </button>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:text-blue-800">
            Sign up
          </a>
        </p>
      </form>
    </div>

  );
};

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};