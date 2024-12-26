import React, { useState } from 'react';

const DayBook = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const records = [
    {
      date: '10-Oct-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '03',
      debitAmount: '88,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '15-Oct-2024',
      particular: 'Akshaya Traders WB',
      vchType: 'Purchase Order',
      vchNo: '10',
      debitAmount: '1,50,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '16-Oct-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '13',
      debitAmount: '94,000.00',
      creditAmount: '97,000.00',
    },
    {
      date: '18-Oct-2024',
      particular: 'Akshaya Traders WB',
      vchType: 'Sales',
      vchNo: '24',
      debitAmount: '88,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '21-Oct-2024',
      particular: 'Ramesh Exporter',
      vchType: 'Purchase Order',
      vchNo: '02',
      debitAmount: '88,000.00',
      creditAmount: '58,000.00',
    },
    {
      date: '22-Oct-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Debit Noel',
      vchNo: '09',
      debitAmount: '88,000.00',
      creditAmount: '22,000.00',
    },
    {
      date: '27-Oct-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '53',
      debitAmount: '88,000.00',
      creditAmount: '23,000.00',
    },
    {
      date: '10-Nov-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '03',
      debitAmount: '88,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '15-Nov-2024',
      particular: 'Akshaya Traders WB',
      vchType: 'Purchase Order',
      vchNo: '10',
      debitAmount: '1,50,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '16-Nov-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '13',
      debitAmount: '94,000.00',
      creditAmount: '97,000.00',
    },
    {
      date: '28-Nov-2024',
      particular: 'Akshaya Traders WB',
      vchType: 'Sales',
      vchNo: '24',
      debitAmount: '88,000.00',
      creditAmount: '88,000.00',
    },
    {
      date: '01-Nov-2024',
      particular: 'Ramesh Exporter',
      vchType: 'Purchase Order',
      vchNo: '02',
      debitAmount: '88,000.00',
      creditAmount: '58,000.00',
    },
    {
      date: '10-Dec-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Debit Noel',
      vchNo: '09',
      debitAmount: '88,000.00',
      creditAmount: '22,000.00',
    },
    {
      date: '13-DEC-2024',
      particular: 'Sheetal Enterprise',
      vchType: 'Purchase Order',
      vchNo: '53',
      debitAmount: '88,000.00',
      creditAmount: '23,000.00',
    },
  ];

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Day Book</h1>
      <div className="flex justify-end text-gray-600 text-lg font-semibold">
        01 - Oct, 2024
      </div>

      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-blue-200 text-gray-800 font-semibold">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Particular</th>
              <th className="py-3 px-4">Vch Type</th>
              <th className="py-3 px-4">Vch No.</th>
              <th className="py-3 px-4">Debit Amount</th>
              <th className="py-3 px-4">Credit Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr
                key={index}
                className={`${selectedRow === index ? 'bg-yellow-300' : 'bg-white'} cursor-pointer`}
                onClick={() => handleRowClick(index)}
              >
                <td className="py-2 px-4">{record.date}</td>
                <td className="py-2 px-4">{record.particular}</td>
                <td className="py-2 px-4">{record.vchType}</td>
                <td className="py-2 px-4">{record.vchNo}</td>
                <td className="py-2 px-4">{record.debitAmount}</td>
                <td className="py-2 px-4">{record.creditAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DayBook;
