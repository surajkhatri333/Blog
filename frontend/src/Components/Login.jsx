import styles from '../styles/Login.module.css'
import {useNavigate} from 'react-router-dom'
import { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

export const Login = ({onLogin}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role,setrole] = useState('');
  const navigate = useNavigate();


  const handleLogin = useCallback(async (e) => {

    e.preventDefault();  // Prevent default form submit behavior
    if (!email || !password) {
      console.log("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", 
        { email, password ,isAdmin : false},
        {withCredentials:true}
      );
      console.log(response.data.message);
      onLogin(email);
      navigate("/");
      console.log("succsfully login")
    } catch (err) {
      console.log("Error handling login:", err);
    }
  }, [email, password, onLogin, navigate])

  useEffect(() => async ()=>{
    // Check if token exists in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
        // Token exists, make a request to verify it
         await axios.get("http://localhost:8080/check", { withCredentials: true })
            .then((res) => {
                if (res.data.isLogin) {
                    handleLogin(res.data.userEmail); // Assuming handleLogin sets the state
                    // setisLogin(true);
                    // setuserEmail(res.data.userEmail);
                }
            })
            .catch((err) => {
                console.error("Error verifying token", err);
                handleLogin(null);
            });
    }
}, [handleLogin]);

  return (
    <>
      <form  onSubmit={handleLogin} method='post'>
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
  onLogin : propTypes.func.isRequired
}


