import { useState, useEffect } from 'react';
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
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Notifications</h2>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Pending Comments</h3>
                {notifications.pendingComments.length === 0 ? (
                    <p className="text-gray-500 italic">No pending comments</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1 max-h-40 overflow-y-auto text-gray-700">
                        {notifications.pendingComments.map(comment => (
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Reported Blogs/Comments</h3>
                {notifications.reportedBlogs.length === 0 ? (
                    <p className="text-gray-500 italic">No reported items</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1 max-h-40 overflow-y-auto text-gray-700">
                        {notifications.reportedBlogs.map(blog => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Notifications;
