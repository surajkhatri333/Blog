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
        <div className="content-overview p-4 border rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Content Overview</h2>
            <p className="mb-2">Drafts: <span className="font-medium">{content.drafts}</span></p>
            <p className="mb-4">Published Blogs: <span className="font-medium">{content.published}</span></p>

            <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
            <ul className="list-disc list-inside space-y-1 max-h-40 overflow-y-auto">
                {content.scheduledPosts.length === 0 && <li>No scheduled posts.</li>}
                {content.scheduledPosts.map(post => (
                    <li key={post.id}>
                        {post.title} - {new Date(post.scheduledDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContentOverview;
