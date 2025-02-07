import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';


const DayBook = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterData, setFilteredData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const dayBook = location.state?.DayBook || {};

  useEffect(() => {
    const getDayBookDataForReport = async () => {
      try {
        const response = await ApiService.post('/dashboards/getDayBookDataForReport', {
          fromDate: dayBook?.generationDate,
          toDate: dayBook?.generationDate,
          branchName: dayBook?.branchName,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status) {
          setFilteredData(response.data);
        } else {
          alert(response.data.message || 'Failed to fetch day book details.');
        }
      } catch (error) {
        console.error('Error fetching day book details:', error);
        alert('Failed to fetch day book details.');
      }
    };

    getDayBookDataForReport();
  }, [dayBook?.generationDate, dayBook?.branchName]);

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
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Voucher Id</th>
              <th className="py-3 px-4">Product Type</th>
              <th className="py-3 px-4">Voucher Type</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">Credit Amount</th>
              <th className="py-3 px-4">Debit Amount</th>
              <th className="py-3 px-4">Balance Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filterData.map((record, index) => (
              <tr
                key={index}
                className={`${selectedRow === index ? 'bg-yellow-300' : 'bg-white'} cursor-pointer`}
                onClick={() => handleRowClick(index)}
              >
                <td className="py-2 px-4">{record.date}</td>
                <td className="py-2 px-4">{record.voucherId}</td>
                <td className="py-2 px-4">{record.productType}</td>
                <td className="py-2 px-4">{record.voucherType}</td>
                <td className="py-2 px-4">{record.purpose}</td>
                <td className="py-2 px-4">{record.creditAmount}</td>
                <td className="py-2 px-4">{record.debitAmount}</td>
                <td className="py-2 px-4">{record.balanceAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DayBook;

