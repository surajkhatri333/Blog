import { useState, useEffect } from 'react';
import { fetchReportedContent, resolveReport } from '../Services/api.js';

const ReportedContent = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReportedContent().then(data => setReports(data));
    }, []);

    const handleResolve = (id) => {
        resolveReport(id).then(() => {
            setReports(reports.filter(report => report.id !== id));
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reported Content</h2>
            <ul className="space-y-4">
                {reports.length === 0 && (
                    <li className="text-gray-500 italic">No reported content found.</li>
                )}
                {reports.map(report => (
                    <li
                        key={report.id}
                        className="flex justify-between items-center bg-red-50 border border-red-300 rounded-md p-4 shadow-sm"
                    >
                        <span className="text-red-700">{report.content}</span>
                        <button
                            onClick={() => handleResolve(report.id)}
                            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Resolve
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportedContent;
