
import './App.css'
import Blogs from './Components/Blogs.jsx'
import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import CreateBlog from './Components/CreateBlog.jsx'
import { ShowBlog } from './Components/ShowBlog.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {MyBlogs} from './Components/MyBlog.jsx'
import { Login } from './Components/Login.jsx'
import { Signup } from './Components/Signup.jsx'
import { useState } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'


function App() {
  const [isLogin , setisLogin] = useState(false);
  const [email , setuserEmail] = useState('');

  const handleLogin = (userEmail)=>{
    setisLogin(true);
    setuserEmail(userEmail);
  }

  const handleLogout = ()=>{
    setisLogin(false);
    setuserEmail('');
  }

  return (
    <>

      <BrowserRouter>
        <Header isLogin={isLogin} onLogout={handleLogout} userEmail={email} />
        <Routes>
          <Route path="/" element={
            <>
              <Blogs /> 
              <CreateBlog />
              <Footer/>
            </>

          } />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/show/:id" element={<ShowBlog />} />
          <Route path="/MyBlogs/:email" element={<MyBlogs  userEmail={email} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign up" element={<Signup />} />
          
        </Routes>
       
      </BrowserRouter>
      
    </>
  )
}

export default App
