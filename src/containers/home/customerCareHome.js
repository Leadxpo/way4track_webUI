import React, { useState } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';

class CommonReq {
  constructor(unitCode, companyCode, userId, userName) {
    this.unitCode = unitCode;
    this.companyCode = companyCode;
    this.userId = userId;
    this.userName = userName;
  }
}

const CustomerCareHome = () => {
  const [isPurchaseSelected, setIsPurchaseSelected] = useState('');
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const getPurchaseTable = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return;
    }

    try {
      const payload = new CommonReq(
        initialAuthState.unitCode,
        initialAuthState.companyCode,
        phoneNumber
      );

      const response = await ApiService.post(
        '/dashboards/getClientPurchaseOrderDataTable',
        payload
      );
      const data = response.data;

      setTableData(data);
      setColumns(Object.keys(data[0] || []));
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select className="border rounded-md px-4 py-2">
            <option>All</option>
            <option>Visakhapatnam</option>
          </select>
          <input
            type="text"
            placeholder="Total Tickets :340"
            disabled
            className="border rounded-md px-4 py-2 w-48 text-center"
          />
          <input
            type="text"
            placeholder="Pending's : 200"
            disabled
            className="border rounded-md px-4 py-2 w-48 text-center"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="border p-2 mr-2"
          />
          <button
            onClick={getPurchaseTable}
            className="bg-green-700 text-white p-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Customer Details */}
      <div className="border border-green-500 rounded-md p-6 flex justify-between items-center">
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> Praveen
          </p>
          <p>
            <strong>Phone Number:</strong> +91 99887 66554
          </p>
          <p>
            <strong>Address:</strong> *******************************
          </p>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'purchase' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => setIsPurchaseSelected('purchase')}
            >
              Purchase
            </button>
            <button
              className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'appointment' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => setIsPurchaseSelected('appointment')}
            >
              Appointment
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Customer"
            className="rounded-md border w-32 h-32 object-cover"
          />
        </div>
      </div>

      {/* Table Data */}
      {tableData.length > 0 && <Table data={tableData} columns={columns} />}

      {/* Description */}
      <p className="text-gray-600">
        <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </p>
    </div>
  );
};

export default CustomerCareHome;
