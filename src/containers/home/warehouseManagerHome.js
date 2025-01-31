import React from 'react';
import Table from '../../components/Table';
import { formatString } from '../../common/commonUtils';
// Color Mapping Function
const getColorClasses = (color) => {
  switch (color) {
    case 'blue':
      return { border: 'border-blue-700', bg: 'bg-blue-700' };
    case 'red':
      return { border: 'border-red-700', bg: 'bg-red-700' };
    case 'green':
      return { border: 'border-green-700', bg: 'bg-green-700' };
    case 'orange':
      return { border: 'border-orange-700', bg: 'bg-orange-700' };
    default:
      return { border: 'border-gray-700', bg: 'bg-gray-700' };
  }
};

const tableData = [
  {
    id: 1,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 223,
    value2: 346,
    status: 'Available',
  },
  {
    id: 2,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 345,
    value2: 568,
    status: 'Available',
  },
  {
    id: 3,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 234,
    value2: 234,
    status: 'Out of stock',
  },
  {
    id: 4,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 345,
    value2: 345,
    status: 'Out of stock',
  },
  {
    id: 5,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 223,
    value2: 346,
    status: 'Available',
  },
  {
    id: 6,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 345,
    value2: 568,
    status: 'Available',
  },
  {
    id: 7,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 234,
    value2: 234,
    status: 'Out of stock',
  },
  {
    id: 8,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 278,
    value2: 400,
    status: 'Available',
  },
  {
    id: 9,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 300,
    value2: 320,
    status: 'Out of stock',
  },
  {
    id: 10,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 500,
    value2: 600,
    status: 'Available',
  },
];

const requestsData = [
  {
    location: 'Visakhapatnam',
    color: 'blue',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Hyderabad',
    color: 'red',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Vijayawada',
    color: 'green',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Kakinada',
    color: 'orange',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
];

const WarehouseManagerHome = () => {
  return (
    <div className="p-6">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div className="w-full">
          <h2 className="text-xl font-semibold p-3 bg-gray-200 rounded-md m-2">
            Name: Vikram.
          </h2>
          <p className="p-3 m-2 bg-gray-200 rounded-md">
            Phone number: 99999 99999
          </p>
          <p className="p-3 m-2 bg-gray-200 rounded-md">
            Email: Way4track@gmail.com
          </p>
        </div>
      </div>

      {/* Requests Section */}
      <h2 className="text-2xl font-bold mt-8">Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {requestsData.map((location) => {
          const { border, bg } = getColorClasses(location.color);
          return (
            <div
              key={location.location}
              className={`border-2 ${border} rounded-lg shadow-md`}
            >
              {location.requests.map((req, index) => (
                <p key={index} className="text-sm font-medium ml-4 mt-4">
                  {req.name}: <span className="font-bold">{req.count}</span>
                </p>
              ))}
              <h3 className={`${bg} text-white font-semibold text-lg mt-4 p-3`}>
                {location.location}
              </h3>
            </div>
          );
        })}
      </div>
      <select className="h-12 block w-1/3 mt-6 border-gray-300 rounded-md shadow-sm border border-gray-500 px-1 focus:outline-none">
        <option value="" disabled>
          Select a Branch
        </option>
      </select>
      <div className="mt-6">
        <Table data={tableData} columns={Object.keys(tableData[0])} />
      </div>
    </div>
  );
};

export default WarehouseManagerHome;
