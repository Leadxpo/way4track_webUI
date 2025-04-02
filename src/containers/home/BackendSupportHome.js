import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const BackendSupportHome = () => {
  const [popupData, setPopupData] = useState(null);
  const [records, setRecords] = useState([
    {
      id: '01',
      productName: 'Product A',
      serviceName: 'Service X',
      staffName: 'John Doe',
      branchName: 'Branch 1',
      clientName: 'Client A',
      phoneNumber: '1234567890',
      simNumber: '9876543210',
      vehicleType: 'Car',
      date: '11 Mar 2029',
      status: 'Install',
    },
    {
      id: '02',
      productName: 'Product B',
      serviceName: 'Service Y',
      staffName: 'Jane Smith',
      branchName: 'Branch 2',
      clientName: 'Client B',
      phoneNumber: '0987654321',
      simNumber: '1234567890',
      vehicleType: 'Bike',
      date: '12 Mar 2029',
      status: 'Accepted',
    },
    {
      id: '03',
      productName: 'Product C',
      serviceName: 'Service Z',
      staffName: 'Alice Brown',
      branchName: 'Branch 3',
      clientName: 'Client C',
      phoneNumber: '1122334455',
      simNumber: '5566778899',
      vehicleType: 'Truck',
      date: '13 Mar 2029',
      status: 'Install',
    },
    {
      id: '04',
      productName: 'Product D',
      serviceName: 'Service W',
      staffName: 'Bob White',
      branchName: 'Branch 4',
      clientName: 'Client D',
      phoneNumber: '2233445566',
      simNumber: '6677889900',
      vehicleType: 'Van',
      date: '14 Mar 2029',
      status: 'Accepted',
    },
  ]);

  const [workRecords, setWorkRecords] = useState([]);
  const [workRecordsCount, setWorkRecordsCount] = useState([]);

  // Fetch records from an API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await ApiService.post(
          '/technician/getBackendSupportWorkAllocation',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        console.log(response.data, 'setWorkRecords');
        setWorkRecords(response.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setWorkRecords([]);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await ApiService.post(
          '/technician/getWorkStatusCards',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        console.log(response.data, 'setWorkRecordsCount');
        setWorkRecordsCount(response.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setWorkRecordsCount([]);
      }
    };

    fetchRecords();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, status: newStatus } : record
      )
    );
  };

  return (
    <div className="p-6">
      {['Install'].map((status) => (
        <div key={status} className="mb-6">
          <h3 className="text-lg font-bold mb-2">{status}</h3>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 whitespace-nowrap">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Service Name</th>
                  <th className="px-4 py-2">Staff Name</th>
                  <th className="px-4 py-2">Branch Name</th>
                  <th className="px-4 py-2">Client Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Sim Number</th>
                  <th className="px-4 py-2">Vehicle Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .filter((item) => item.status === status)
                  .map((item) => (
                    <tr key={item.id} className="bg-white border-b">
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">{item.serviceName}</td>
                      <td className="px-4 py-2">{item.staffName}</td>
                      <td className="px-4 py-2">{item.branchName}</td>
                      <td className="px-4 py-2">{item.clientName}</td>
                      <td className="px-4 py-2">{item.phoneNumber}</td>
                      <td className="px-4 py-2">{item.simNumber}</td>
                      <td className="px-4 py-2">{item.vehicleType}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                          className="border rounded p-1"
                        >
                          <option value="Install">Install</option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <FaEye
                          className="cursor-pointer text-blue-500"
                          onClick={() => setPopupData(item)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Horizontal Cards Section */}
      <div className="flex justify-between gap-4 my-6">
        {[
          'Total works Install',
          'Total works Accept',
          'Total works Activated',
        ].map((title, index) => (
          <div
            key={index}
            className="flex-1 bg-white shadow-md rounded-lg p-4 text-left border border-gray-300"
            style={{ height: '150px' }}
          >
            <h4
              className="text-lg font-semibold text-gray-700"
              style={{ fontSize: '25px' }}
            >
              {title}
            </h4>
            <p
              className="text-xl font-bold text-blue-600"
              style={{ fontSize: '45px', marginTop: '25px' }}
            >
              {Math.floor(Math.random() * 100)}
            </p>
          </div>
        ))}
      </div>

      {['Accepted'].map((status) => (
        <div key={status} className="mb-6">
          <h3 className="text-lg font-bold mb-2">{status}</h3>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 whitespace-nowrap">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Service Name</th>
                  <th className="px-4 py-2">Staff Name</th>
                  <th className="px-4 py-2">Branch Name</th>
                  <th className="px-4 py-2">Client Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Sim Number</th>
                  <th className="px-4 py-2">Vehicle Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .filter((item) => item.status === status)
                  .map((item) => (
                    <tr key={item.id} className="bg-white border-b">
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">{item.serviceName}</td>
                      <td className="px-4 py-2">{item.staffName}</td>
                      <td className="px-4 py-2">{item.branchName}</td>
                      <td className="px-4 py-2">{item.clientName}</td>
                      <td className="px-4 py-2">{item.phoneNumber}</td>
                      <td className="px-4 py-2">{item.simNumber}</td>
                      <td className="px-4 py-2">{item.vehicleType}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                          className="border rounded p-1"
                        >
                          <option value="Accepted">Accepted</option>
                          <option value="Activated">Activated</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <FaEye
                          className="cursor-pointer text-blue-500"
                          onClick={() => setPopupData(item)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackendSupportHome;
