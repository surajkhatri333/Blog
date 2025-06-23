// CommentManagement.js
import { useState, useEffect } from 'react';
import { fetchPendingComments, approveComment, deleteComment } from '../Services/api.js';

const CommentManagement = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchPendingComments().then(data => setComments(data));
    }, []);

    const handleApprove = (id) => {
        approveComment(id).then(() => {
            setComments(comments.filter(comment => comment.id !== id));
        });
    };

    const handleDelete = (id) => {
        deleteComment(id).then(() => {
            setComments(comments.filter(comment => comment.id !== id));
        });
    };

    return (
        <div className="comment-management">
            <h2>Comment Management</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <span>{comment.content} - {comment.author}</span>
                        <button onClick={() => handleApprove(comment.id)}>Approve</button>
                        <button onClick={() => handleDelete(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentManagement;
