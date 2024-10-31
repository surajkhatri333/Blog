// api.js
import axios from "axios";
export const fetchBlogStats = async () => {
    // Replace with actual API call
    // return {
    //     totalBlogs: 120,
    //     recentBlogs: [
    //         { id: 1, title: "How to Learn React" },
    //         { id: 2, title: "JavaScript Best Practices" }
    //     ],
    //     popularBlogs: [
    //         { id: 3, title: "Node.js Performance Tips", views: 5000 },
    //         { id: 4, title: "React Optimization", views: 4500 }
    //     ],
    //     pendingReviews: [
    //         { id: 5, title: "Understanding Redux" }
    //     ]
    // };
};

export const fetchBlog = async (req,res)=>{
    const fetchBlogData = await axios.get("/blogAnalytics");
    res.json(fetchBlogData);
    
}

export const fetchUserAnalytics = async () => {
    // Replace with actual API call
    return {
        newUsers: 10,
        totalUsers: 500,
        topUsers: [
            { id: 1, username: 'john_doe', activity: 50 },
            { id: 2, username: 'jane_smith', activity: 45 }
        ]
    };
};

export const fetchNotifications = async () => {
    // Replace with actual API call
    return {
        pendingComments: [
            { id: 1, content: "Great article!" },
            { id: 2, content: "I disagree with this point." }
        ],
        reportedBlogs: [
            { id: 3, title: "Offensive Content" }
        ]
    };
};

export const fetchContentOverview = async () => {
    // Replace with actual API call
    return {
        drafts: 5,
        published: 100,
        scheduledPosts: [
            { id: 1, title: "React Suspense Explained", scheduledDate: "2024-10-20" },
            { id: 2, title: "Introduction to GraphQL", scheduledDate: "2024-10-22" }
        ]
    };
};


// api.js
export const fetchBlogs = async () => {
    const response = await fetch('/api/admin/blogs');
    return response.json();
};

export const deleteBlog = async (id) => {
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
};

export const reviewBlog = async (id) => {
    await fetch(`/api/admin/blogs/${id}/review`, { method: 'POST' });
};

export const fetchUsers = async () => {
    const response = await fetch('/api/admin/users');
    return response.json();
};

export const banUser = async (id) => {
    await fetch(`/api/admin/users/${id}/ban`, { method: 'POST' });
};

export const unbanUser = async (id) => {
    await fetch(`/api/admin/users/${id}/unban`, { method: 'POST' });
};

export const fetchPendingComments = async () => {
    const response = await fetch('/api/admin/comments/pending');
    return response.json();
};

export const approveComment = async (id) => {
    await fetch(`/api/admin/comments/${id}/approve`, { method: 'POST' });
};

export const deleteComment = async (id) => {
    await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
};

export const fetchReportedContent = async () => {
    const response = await fetch('/api/admin/reports');
    return response.json();
};

export const resolveReport = async (id) => {
    await fetch(`/api/admin/reports/${id}/resolve`, { method: 'POST' });
};
