// Notifications.js
import  { useState, useEffect } from 'react';
import { fetchNotifications } from '../Services/api.js';

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        pendingComments: [],
        reportedBlogs: []
    });

    useEffect(() => {
        fetchNotifications().then(data => {
            setNotifications(data);
        });
    }, []);

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <h3>Pending Comments</h3>
            <ul>
                {notifications.pendingComments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
            <h3>Reported Blogs/Comments</h3>
            <ul>
                {notifications.reportedBlogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
