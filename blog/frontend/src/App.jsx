
import './App.css'
import Blogs from './Components/Blogs.jsx'
import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import { Hero } from './Components/Hero.jsx'
import CreateBlog from './Components/CreateBlog.jsx'
import { ShowBlog } from './Components/ShowBlog.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyBlogs } from './Components/MyBlog.jsx'
import { Login } from './Components/Login.jsx'
import { Signup } from './Components/Signup.jsx'
import { useEffect, useState, useCallback } from 'react'
import Dashboard from './Components/Dashboard.jsx';
import axios from 'axios'
import './App.css';


import AdminDashboard from './Components/AdminDashboard.jsx';
import AdminSidebar from './Components/AdminSidebar.jsx';
import BlogManagement from './Components/BlogManagment.jsx';
import { UserManagement } from './Components/UserManagement.jsx';
import CommentManagement from './Components/CommnetMangment.jsx';
import ReportedContent from './Components/ReportedContent.jsx';
import AdminLogin from './Components/AdminLogin.jsx'
import UserProfile from './Components/UserProfile.jsx'
import SavedBlog from './Components/SavedBlog.jsx'
import UserDashboard from './Components/UserDashboard.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isLogin, setisLogin] = useState(false);
  const [email, setuserEmail] = useState('');


  const handleLogout = async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/logout`,{}, { withCredentials: true })
      if(!response){
        console.error("Logout failed: No response from server");
        toast.error("Logout failed, please try again.");
        return;
      }
      localStorage.removeItem("BlogUser")
      setisLogin(false);
      setuserEmail(null); // Clear user email
      console.log("user logout successfully");
      toast.success("Logout successful!");

    }
    catch (error) {
      console.error("Logout failed", error);
    }
  }
  const handleLogin = useCallback((userEmail) => {
    setisLogin(true);
    setuserEmail(userEmail);
  }, [setisLogin]);


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
            handleLogin(storedUser.email);
          }
        } else {
          localStorage.removeItem("BlogUser");
          handleLogin(null);
        }
      } catch (err) {
        console.error("Token verification failed", err);
        localStorage.removeItem("BlogUser");
        handleLogin(null);
      }
    };

    checkToken();
  }, [setisLogin]);

  return (
    <>

      <BrowserRouter>
        <Header isLogin={isLogin} setisLogin={setisLogin} handleLogin={handleLogin} onLogout={handleLogout} userEmail={email} />

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Blogs />
              <CreateBlog />
              <Footer />
            </>

          } />
          <Route path="/create" element={<CreateBlog userEmail={email} login={isLogin} />} />
          <Route path="/show/:id" element={<ShowBlog isLogin={handleLogin} userEmail={email} />} />
          <Route path="/MyBlogs/:email" element={<MyBlogs userEmail={email} />} />
          <Route path="/userDashboard" element={<UserDashboard userEmail={email} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/savedBlog/:userEmail" element={<SavedBlog onLogin={handleLogin} />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          {/* <Route path="/login" element={<Logout onLogin={onLogout} />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/comments" element={<CommentManagement />} />
          <Route path="/admin/reports" element={<ReportedContent />} />
          <Route path="/userProfile/:userEmail" element={<UserProfile />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
