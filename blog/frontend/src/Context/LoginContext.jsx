import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLogin, setisLogin] = useState(false);
    const [userEmail, setuserEmail] = useState('');

    const handleLogout = async () => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/logout`, {}, { withCredentials: true })
            if (!response) {
                console.error("Logout failed: No response from server");
                toast.error("Logout failed, please try again.");
                return;
            }
            localStorage.removeItem("BlogUser")
            setisLogin(false);
            setuserEmail(null); // Clear user email
            console.log("user logout successfully");
            toast.success("Logout successful!");
        }
        catch (error) {
            console.error("Logout failed", error);
        }
    }

    const handleLogin = async () => {
        try {
            const token = localStorage.getItem("BlogUser");
            const cookie = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/getcookie`,{withCredentials : true});
            console.log(cookie)
            if (token) {
                const parsedToken = JSON.parse(token);
                setisLogin(true);
                setuserEmail(parsedToken.email);
            }
        } catch (error) {
            throw Error("Login Falied : ", error.message )
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);
    return (
        <>
            <LoginContext.Provider value={{ isLogin, setisLogin, handleLogin, userEmail, handleLogout }} >
                {children}
            </LoginContext.Provider>
        </>
    )
}
LoginProvider.propTypes = {
    children: PropTypes.node.isRequired
}
