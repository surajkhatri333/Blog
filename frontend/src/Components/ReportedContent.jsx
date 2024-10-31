// ReportedContent.js
import  { useState, useEffect } from 'react';
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
        <div className="reported-content">
            <h2>Reported Content</h2>
            <ul>
                {reports.map(report => (
                    <li key={report.id}>
                        <span>{report.content}</span>
                        <button onClick={() => handleResolve(report.id)}>Resolve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportedContent;
