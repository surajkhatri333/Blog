import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (email, admin = false) => {
        setIsLogin(true);
        setUserEmail(email);
        setIsAdmin(admin);
    };

    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/logout`, {}, { withCredentials: true });
        setIsLogin(false);
        setUserEmail('');
        setIsAdmin(false);
        localStorage.removeItem("BlogUser");
    };

    // CHECK COOKIE WHEN PAGE LOADS
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/check`, {
                    withCredentials: true,
                });
                if (res.data.isLogin) {
                    setIsLogin(true);
                    setUserEmail(res.data.user.email);
                    setIsAdmin(res.data.user.isAdmin);
                }
            } catch {
                setIsLogin(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, userEmail, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
