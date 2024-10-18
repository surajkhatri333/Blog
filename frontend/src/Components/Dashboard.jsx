// Dashboard.js
import BlogStatistics from './BlogStatistics.jsx';
import UserAnalytics from './UserAnalytics.jsx';
import Notifications from './Notifications.jsx';
import ContentOverview from './ContentOverview.jsx';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <BlogStatistics />
                <UserAnalytics />
                <Notifications />
                <ContentOverview />
            </div>
        </div>
    );
};

export default Dashboard;
