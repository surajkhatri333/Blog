import axios from 'axios';
import styles from '../styles/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
export const Signup = () => {

    const [name , setname] = useState('');
    const [email , setemail] = useState('');
    const [password,setpassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/register",{name , email ,password});
            console.log(response.data.messsage);
            navigate("/login");
            
        } catch (err) {
            console.log("Error handling signup :",err);
        }
    }
    return (
        <>
            <form onSubmit={handleSignup} method='post'>
                <div className={styles.container}>
                    <div className={styles.loginContainer}>
                        <h1>LOGIN FORM</h1>
                        <div className={styles.username}>
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' value={name} onChange={(e)=>setname(e.target.value)} required />
                        </div>
                        <div className={styles.emails}>
                            <label htmlFor="email">EMAIL</label>
                            <input type="text" name='email' placeholder='Email or Username' value={email} onChange={(e)=>setemail(e.target.value)} required />
                        </div>
                        <div className={styles.passwords}>
                            <label htmlFor="password">PASSWORD</label>
                            <input type="text" name='password' placeholder='Enter your password'value={password} onChange={(e)=>setpassword(e.target.value)} required />
                        </div>

                        <div className={styles.submit}>
                            <button type='submit'>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
