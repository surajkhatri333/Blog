// UserAnalytics.js
import { useState, useEffect } from 'react';
import { fetchUserAnalytics } from '../Services/api.js';

const UserAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        newUsers: 0,
        totalUsers: 0,
        topUsers: []
    });

    useEffect(() => {
        fetchUserAnalytics().then(data => {
            setAnalytics(data);
        });
    }, []);

    return (
        
        <div className="user-analytics">
            <h2>User Analytics</h2>
            <p>New Users: {analytics.newUsers}</p>
            <p>Total Users: {analytics.totalUsers}</p>
            <h3>Top Active Users</h3>
            <ul>
                {analytics.topUsers.map(user => (
                    <li key={user.id}>{user.username} - {user.activity} actions</li>
                ))}
            </ul>
        </div>
    );
};

export default UserAnalytics;
