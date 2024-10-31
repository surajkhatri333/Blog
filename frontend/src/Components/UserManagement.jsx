// UserManagement.js
import { useState, useEffect } from 'react';
import { fetchUsers, banUser, unbanUser } from '../Services/api.js';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    const handleBan = (id) => {
        banUser(id).then(() => {
            setUsers(users.map(user => user.id === id ? { ...user, banned: true } : user));
        });
    };

    const handleUnban = (id) => {
        unbanUser(id).then(() => {
            setUsers(users.map(user => user.id === id ? { ...user, banned: false } : user));
        });
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <span>{user.username}</span>
                        {user.banned ? (
                            <button onClick={() => handleUnban(user.id)}>Unban</button>
                        ) : (
                            <button onClick={() => handleBan(user.id)}>Ban</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
