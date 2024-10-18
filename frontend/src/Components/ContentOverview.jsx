// ContentOverview.js
import { useState, useEffect } from 'react';
import { fetchContentOverview } from '../Services/api.js';

const ContentOverview = () => {
    const [content, setContent] = useState({
        drafts: 0,
        published: 0,
        scheduledPosts: []
    });

    useEffect(() => {
        fetchContentOverview().then(data => {
            setContent(data);
        });
    }, []);

    return (
        <div className="content-overview">
            <h2>Content Overview</h2>
            <p>Drafts: {content.drafts}</p>
            <p>Published Blogs: {content.published}</p>
            <h3>Scheduled Posts</h3>
            <ul>
                {content.scheduledPosts.map(post => (
                    <li key={post.id}>{post.title} - {post.scheduledDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContentOverview;
