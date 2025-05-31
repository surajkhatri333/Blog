import BlogStatistics from './BlogStatistics.jsx';
import UserAnalytics from './UserAnalytics.jsx';

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-20 px-4 md:px-12 mt-10">
            <h1 className="text-2xl font-bold mb-10 text-center text-gray-800">📊 Admin Dashboard</h1>

            <div className="flex flex-wrap md:flex-nowrap justify-center gap-10 mt-10">
                <BlogStatistics />
                <UserAnalytics />
            </div>
        </div>
    );
};

export default Dashboard;
