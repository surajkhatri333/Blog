
import './App.css'
import Blogs from './Components/Blogs.jsx'
import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import {Hero} from './Components/Hero.jsx'
import CreateBlog from './Components/CreateBlog.jsx'
import { ShowBlog } from './Components/ShowBlog.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyBlogs } from './Components/MyBlog.jsx'
import { Login } from './Components/Login.jsx'
import { Signup } from './Components/Signup.jsx'
import { useState } from 'react'
import Dashboard from './Components/Dashboard.jsx';
import axios from 'axios'
import './App.css';


import AdminDashboard from './Components/AdminDashboard.jsx';
import BlogManagement from './Components/BlogManagment.jsx';
import {UserManagement} from './Components/UserManagement.jsx';
import CommentManagement from './Components/CommnetMangment.jsx';
import ReportedContent from  './Components/ReportedContent.jsx';


function App() {
  const [isLogin, setisLogin] = useState(false);
  const [email, setuserEmail] = useState('');


   const handleLogin = (userEmail) => {
    setisLogin(true);
    setuserEmail(userEmail);
  }

  const handleLogout = async () => {
    // setisLogin(false);
    // setuserEmail('');

    try{
      const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/logout`, {}, { withCredentials: true })
        setisLogin(false);
        setuserEmail(null); // Clear user email
        console.log("user logout successfully");
    }
    catch(error) {
        console.error("Logout failed", error);
    }
  }


  return (
    <>

      <BrowserRouter>
        <Header isLogin={isLogin} handleLogin={handleLogin} onLogout={handleLogout} userEmail={email} />

        <Routes>
          <Route path="/" element={
            <>
             <Hero/>
              <Blogs />
              <CreateBlog />
              <Footer />
            </>
            
          } />
          <Route path="/create" element={<CreateBlog userEmail={email} login ={isLogin} />} />
          <Route path="/show/:id" element={<ShowBlog/>} />
          <Route path="/MyBlogs/:email" element={<MyBlogs userEmail={email} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* <Route path="/login" element={<Logout onLogin={onLogout} />} /> */}
          <Route path="/sign up" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/comments" element={<CommentManagement />} />
          <Route path="/admin/reports" element={<ReportedContent />} />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
