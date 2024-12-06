import axios from "axios"
import styles from '../styles/BlogManagement.module.css'
import { useEffect, useState } from "react";
export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const fetchUser = async () => {
        const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/user`);
        if (!response) {
            return console.log("Failed to get user data");
        }
        setUsers(response.data.users);
        console.log(response.data.users)
        // console.log("Successfull in getting user data", response);
    }
   const banUser = async (userId)=>{
    const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/ban/user/${userId}`);
    if(!response){
        return console.log("Unable to fetch baned user");
    }
    setUsers(prevUser=>{
        return prevUser.map(user=>{
            if(user._id === userId){
                return {...user, ban : !user.ban};
            }
            return user;
        })
    })
   }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <>
            <div className="UsermanageContainer" >
                <table style={{ position: "absolute", top: "15%" }}>
                    <thead>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>TotalBlogs</th>
                        <th>Roles</th>
                        <th>Ban</th>
                    </thead>

                    <tbody>
                        {
                            users.map((user) => {
                                return (
                                    <>
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.totalBlogs}</td>
                                            <td>{user.role}</td>
                                            {/* <td>{user.totaLLikes}</td> */}
                                            <td >
                                                <i className="fa-solid fa-toggle-on" id={user._id}
                                                    style={{ color: user.ban ? "green" : "black" }} 
                                                    onClick={()=>banUser(user._id)}>
                                                </i>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>

                </table>
            </div>
        </>
    )
}