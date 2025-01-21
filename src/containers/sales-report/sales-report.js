import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const SalesReport = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [filterData, setFilteredData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const sales = location.state?.SalesReport || {};

    useEffect(() => {
        const getSalesReportDataForReport = async () => {
            try {
                const response = await ApiService.post('/dashboards/getTotalSalesForReport', {
                    fromDate: sales?.generationDate,
                    toDate: sales?.generationDate,
                    branchName: sales?.branchName,
                    companyCode: ApiService.initialAuthState?.companyCode,
                    unitCode: ApiService.initialAuthState?.unitCode,
                });

                if (response.status) {
                    setFilteredData(response.data);
                    console.log(response.data, "{{{{{{{{{{{{{{{{{{{{{{{{{{")
                } else {
                    alert(response.data.message || 'Failed to fetch day book details.');
                }
            } catch (error) {
                console.error('Error fetching day book details:', error);
                alert('Failed to fetch day book details.');
            }
        };

        getSalesReportDataForReport();
    }, [sales?.generationDate, sales?.branchName]);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleDownloadClick = () => {
        if (filterData.length === 0) {
            alert('No data available for download!');
            return;
        }
        navigate('/download', { state: { filterData } });
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Day Book</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleDownloadClick}
            >
                Download
            </button>
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-blue-200 text-gray-800 font-semibold">
                            <th className="py-3 px-4">Branch Name</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Sales</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filterData.map((record, index) => (
                            <tr
                                key={index}
                                className={`${selectedRow === index ? 'bg-yellow-300' : 'bg-white'} cursor-pointer`}
                                onClick={() => handleRowClick(index)}
                            >
                                <td className="py-2 px-4">{record.branchName}</td>
                                <td className="py-2 px-4">{record.date}</td>
                                <td className="py-2 px-4">{record.serviceSales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SalesReport;

