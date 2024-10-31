import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import {  useState, } from "react";
import propTypes from 'prop-types'
// import axios from 'axios';


const Header = ( { isLogin ,onLogout ,userEmail} ) => {
    const [tab, settab] = useState(false);
    console.log(isLogin,onLogout,userEmail)

    // useEffect(() => async ()=>{
    //     // Check if token exists in cookies
    //     const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    //     if (token) {
    //         // Token exists, make a request to verify it
    //          await axios.get("http://localhost:8080/check", { withCredentials: true })
    //             .then((res) => {
    //                 if (res.data.isLogin) {
    //                     isLogin(res.data.userEmail); // Assuming handleLogin sets the state
    //                     // setisLogin(true);
    //                     // setuserEmail(res.data.userEmail);
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error("Error verifying token", err);
    //                 isLogin(null);
    //             });
    //     }
    // }, [handleLogin]);
      

    const showTab = () => {
        settab(prev => {
            const newTab = !prev;
            if (newTab === true) {
                document.querySelector(".tabBar").style.display = 'block';
            }
            else {
                document.querySelector(".tabBar").style.display = 'none';
            }
            return newTab;
        })

    };
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>LOGO</div>
                <div className={styles.tabBar}>
                    <div className={styles.tab} id="tabs1"><Link to="/">HOME</Link></div>
                    <div className={styles.tab} id="tabs2"><Link to="/create">CREATE BLOG</Link></div>
                    <div className={styles.tab} id="tabs3"><Link to={`/Myblogs/${userEmail}`} >MY BLOGS</Link></div>
                    <div className={styles.tab} id="tabs4"><Link to ={"/Dashboard"}>Dashboard</Link></div>
                    <div className={styles.tab} id="tabs5"><Link to ={"/Admin"}>ADMIN</Link></div>
                </div>
                <div className={styles.account}>

                    {
                        isLogin ?
                            (<button onClick={onLogout}>
                                Logout
                            </button>
                            ) :
                            (<button >
                                <Link to={"/login"}>login</Link>
                            </button>
                            )
                    }
                   
                        <button>
                            <Link to={"/sign up"}>Sign Up</Link>
                        </button>
                    



                </div>
                <i className="fa-duotone fa-solid fa-bars" id={styles.hamIcon} onClick={showTab} value={tab} >AAA</i>

            </div>

           
        </>
        
    )

    
}
Header.propTypes = {
    isLogin : propTypes.bool.isRequired,
    onLogout : propTypes.func.isRequired,
    userEmail : propTypes.string.isRequired,
    handleLogin : propTypes.func.isRequired
}

export default Header



