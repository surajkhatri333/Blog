// api.js
export const fetchBlogStats = async () => {
    // Replace with actual API call
    return {
        totalBlogs: 120,
        recentBlogs: [
            { id: 1, title: "How to Learn React" },
            { id: 2, title: "JavaScript Best Practices" }
        ],
        popularBlogs: [
            { id: 3, title: "Node.js Performance Tips", views: 5000 },
            { id: 4, title: "React Optimization", views: 4500 }
        ],
        pendingReviews: [
            { id: 5, title: "Understanding Redux" }
        ]
    };
};

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
