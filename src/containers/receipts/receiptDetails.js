import { useState } from 'react';

const ReceiptDetails = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      productName: 'Bike GPS Tracker',
      quantity: 1,
      rate: 3000,
      amount: 3000,
      hsnCode: '454RER454',
    },
    {
      id: 2,
      productName: 'Bike GPS Tracker',
      quantity: 1,
      rate: 3000,
      amount: 3000,
      hsnCode: '454RER454',
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        productName: 'Bike GPS Tracker',
        quantity: 1,
        rate: 3000,
        amount: 3000,
        hsnCode: '454RER454',
      },
    ]);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Receipt Details</h2>

      <div className="flex justify-end mb-4 pr-8">
        <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all">
          Generate Receipt
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Client:</strong> Krishnan
          </p>
          <p>
            <strong>Client Number:</strong> 9898989898
          </p>
          <p>
            <strong>Email ID:</strong> Krishnan@gmail.com
          </p>
        </div>
        <div>
          <p>
            <strong>Estimate Date:</strong> 01 Oct, 2024
          </p>
          <p>
            <strong>Expiry Date:</strong> 03 Oct, 2024
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded">
          <strong>Client Address</strong>
          <p>
            21-27, Double Road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra
            Pradesh 530009
          </p>
        </div>
        <div className="p-4 border rounded">
          <strong>Billing Address</strong>
          <p>
            21-27, Double Road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra
            Pradesh 530009
          </p>
        </div>
      </div>

      {rows.map((row) => (
        <div
          key={row.id}
          className="flex items-center gap-4 p-4 border rounded mb-4"
        >
          <p className="w-1/4 p-2 bg-gray-200 rounded">{row.productName}</p>
          <p className="w-1/4 p-2 bg-gray-200 rounded">{row.quantity}</p>
          <p className="w-1/6 p-2 bg-gray-200 rounded">{row.rate}</p>
          <p className="w-1/6 p-2 bg-gray-200 rounded">{row.amount}</p>
          <p className="w-1/6 p-2 bg-gray-200 rounded">{row.hsnCode}</p>
          <button
            onClick={addRow}
            className="p-2 bg-green-500 text-white rounded"
          >
            +
          </button>
          <button
            onClick={() => removeRow(row.id)}
            className="p-2 bg-red-500 text-white rounded"
          >
            -
          </button>
        </div>
      ))}

      <div className="mt-6">
        <p>
          <strong>Other Information</strong>
        </p>
        <textarea className="w-full border rounded p-2 mt-2 h-20"></textarea>
      </div>
    </div>
  );
};

export default ReceiptDetails;
