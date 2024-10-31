import styles from '../styles/Login.module.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

export const Login = ({onLogin}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submit behavior
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", { email, password },{withCredentials:true});
      console.log(response.data.message);
      onLogin(email);
      navigate("/");
    } catch (err) {
      console.log("Error handling login:", err);
    }
  }

  

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


