import styles from '../styles/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

export const Login = ({ onLogin }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [role,setrole] = useState('');
  const navigate = useNavigate();


  const handleLogin = useCallback(async (e) => {

    e.preventDefault();  // Prevent default form submit behavior
    if (!email || !password) {
      console.log("Email and password are required.");
      return;
    }
    try {
      console.log("login api is : ", `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/login`);
      const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/login`,
        { email, password, isAdmin: false },
        { withCredentials: true }
      );
      console.log(response.token)
      console.log(response.data.message);
      onLogin(email);
      navigate("/");
      console.log("succsfully login")
    } catch (err) {
      console.log("Error handling login:", err);
    }
  }, [email, password, onLogin, navigate])

  useEffect(() => {
    const checkToken = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (token) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/check`, { withCredentials: true });
          if (res.data.isLogin) {
            onLogin(res.data.userEmail); // This should just update the state, not call handleLogin
          }
        } catch (err) {
          console.error("Error verifying token", err);
          onLogin(null);
        }
      }
    };

    checkToken();
  }, [onLogin]);

  return (
    <>
      <form onSubmit={handleLogin} method='post'>
        <div className={styles.container}>

          <div className={styles.loginContainer}>
            <h1>LOGIN FORM</h1>
            <div className={styles.emails}>
              <label htmlFor="email">EMAIL</label>
              <input type="text"
                name='email'
                placeholder='Email or Username'
                value={email} onChange={(e) => { setemail(e.target.value) }} required />
            </div>
            <div className={styles.passwords}>
              <label htmlFor="password">PASSWORD</label>
              <input type="text"
                name='password'
                placeholder='Enter your password'
                value={password} onChange={(e) => { setpassword(e.target.value) }} required />
            </div>


            <div className={styles.submit}>
              {/* <button type='submit' ><Link to={"/"}>SUBMIT</Link></button> */}
              <button type='submit' >submit</button>
            </div>
          </div>


        </div>
      </form>

    </>
  )
}

Login.propTypes = {
  onLogin: propTypes.func.isRequired
}


