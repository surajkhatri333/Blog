// UserAnalytics.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchUserAnalytics } from '../Services/api';

const UserAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        newUsers: [],
        totalUsers: 0,
        totalBlog : 0
        // topUsers: []
    });

    useEffect(() => {
        const fetchUserAnalytics = async () => {
            const userResponse = await axios.get("http://localhost:8080/userAnalytics");
            if (!userResponse) return console.log("user data is not get from backend")
            setAnalytics(userResponse.data);
            console.log(userResponse.data)
        }
        fetchUserAnalytics()
    }, []);

    return (

        <div className="user-analytics">
            <h2>User Analytics</h2>
            <p>New Users:</p>
            {
                <ul>
                   { analytics.newUsers.map(newUser =>(
                    <>
                        <li key={newUser.id}>{newUser.email}</li>
                    </>
                    ))}
                </ul>
            }
            <p>Total Users: {analytics.totalUsers}</p>
            {/* <h3>Top Active Users</h3>
            <ul>
                {analytics.topUsers.map(user => (
                    <li key={user.id}>{user.username} - {user.activity} actions</li>
                ))}
            </ul> */}
        </div>
    );
};

export default UserAnalytics;
