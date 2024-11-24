import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { useEffect, useMemo, useState, } from "react";
import propTypes from 'prop-types'
import axios from 'axios';


const Header = ({ isLogin, onLogout, userEmail }) => {
    const [tab, settab] = useState(false);
    const [userdata, setuserData] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const showTab = () => {
        settab(prev => !prev)
    };
    const userData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${userEmail}`);
            setuserData(response.data.users);
            console.log("users are : ", userdata)
        }
        catch (Err) {
            console.log("Error in get user from backend", Err)
        }

    }
    useEffect(() => {
        if (isLogin) {
            const checkAdminStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/check', { withCredentials: true });
                    console.log(response);
                    setIsAdmin(response.data.isAdmin);
                }

                catch (error) {
                    console.error('Error verifying admin status:', error);
                }
            }

            checkAdminStatus();
            userData()
        }
        else {
            console.log("User is not logged in, skipping admin check.");
            setIsAdmin(false);
        }



    }, [isLogin]);



    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>LOGO</div>
                {/* <div className={styles.tabBar} style={{display : tab ? "block" : "none"}} > */}
                <div className={`${styles.tabBar} ${tab ? styles.show : ''}`} >
                    <div className={styles.tab} id="tabs1"><Link to="/">HOME</Link></div>
                    <div className={styles.tab} id="tabs2"><Link to="/create">CREATE BLOG</Link></div>
                    <div className={styles.tab} id="tabs2" style={{ color: "black" }} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} >EXPLORE BLOG</div>
                    {isLogin && (<div className={styles.tab} id="tabs3"><Link to={`/Myblogs/${userEmail}`} >MY BLOGS</Link></div>)}
                    {isAdmin && (
                        <>
                            <div className={styles.tab} id="tabs4"><Link to={"/Dashboard"}>Dashboard</Link></div>
                            <div className={styles.tab} id="tabs5"><Link to={"/Admin"}>ADMIN</Link></div>
                        </>
                    )}

                </div>
                <div className={styles.account}>
                    {isLogin ?
                        (
                            <>
                                <div id="profileinfo">
                                    <img
                                        src={`http://localhost:8080/${userdata.profileAvatar.replace('\\', '/')}`}
                                        alt="User Avatar"
                                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                    />
                                    <div id={styles.profile} ></div>
                                </div>

                                <button onClick={onLogout}>LOGOUT </button>
                            </>
                        ) :
                        (<button>
                            <Link to={"/login"}>Login</Link>
                        </button>)
                    }

                    <button>
                        <Link to={"/sign up"}>Sign Up</Link>
                    </button>
                </div>
                <i className="fa-solid fa-bars" id={styles.hamIcon} onClick={showTab}>
                    {/* {tab ? 'Close' : 'Menu'} */}
                </i>
            </div>


        </>

    )


}
Header.propTypes = {
    isLogin: propTypes.bool.isRequired,
    onLogout: propTypes.func.isRequired,
    userEmail: propTypes.string.isRequired,
    handleLogin: propTypes.func.isRequired
}

export default Header


