import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { useState } from "react";
import propTypes from 'prop-types'


const Header = ( { isLogin ,onLogout ,userEmail} ) => {
    const [tab, settab] = useState(false);
    console.log(isLogin,onLogout,userEmail)

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
                    <div className={styles.tab} id="tabs4">CONTACT</div>
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



