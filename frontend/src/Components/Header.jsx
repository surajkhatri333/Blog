// import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { useState } from "react";
import propTypes from 'prop-types'

// import axios from 'axios'

const Header = ( { isLogin ,onLogout ,userEmail} ) => {
    // const { logout, isAuthenticated, loginWithRedirect, user } = useAuth0();
    // console.log(user)
    const [tab, settab] = useState(false);
    console.log(isLogin,onLogout,userEmail)

    // connect user register with backend

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         sendUserToBackend()
    //     }
    // }, [isAuthenticated, user]);


   

    // const sendUserToBackend = async () => {

    //     try {
    //         const response = await axios.post("http://localhost:8080/api/users", {
    //             username: user.name,
    //             email: user.email,
    //         });

    //         console.log("User data send to backend", response.data);
    //     }
    //     catch (err) {
    //         console.log("error in sending user to backend", err);
    //     }
    // }


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
    // console.log(isAuthenticated);
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>LOGO</div>
                <div className={styles.tabBar}>
                    <div className={styles.tab} id="tabs1"><Link to="/">HOME</Link></div>
                    <div className={styles.tab} id="tabs2"><Link to="/create">CREATE BLOG</Link></div>
                    <div className={styles.tab} id="tabs3"><Link to={`/Myblogs/${userEmail}`} >MY BLOGS</Link></div>
                    <div className={styles.tab} id="tabs4">CONTACT</div>
                </div>
                <div className={styles.account}>

                    {/* {
                        isAuthenticated ?
                            (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>)
                            : (<button onClick={() => loginWithRedirect()}>log In</button>)
                    } */}

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
                    <div>
                        <button>
                            <Link to={"/sign up"}>Sign Up</Link>
                        </button>
                    </div>



                </div>
                <i className="fa-duotone fa-solid fa-bars" id={styles.hamIcon} onClick={showTab} value={tab} >AAA</i>

            </div>

           
        </>
        
    )

    
}
Header.propTypes = {
    isLogin : propTypes.bool.isRequired,
    onLogout : propTypes.func.isRequired,
    userEmail : propTypes.string.isRequired
}

export default Header



