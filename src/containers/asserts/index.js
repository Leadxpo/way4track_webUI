import React, { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus, FaSearch } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import TableWithDateFilter from '../tablesDateFilter';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
const Asserts = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [totalBranch, setTotalBranch] = useState('All Branches');
  const [inHandBranch, setInHandBranch] = useState('All Branches');
  const [installationBranch, setInstallationBranch] = useState('All Branches');
  const handleSelectChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const products = [
    {
      name: 'Bike GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 1,
      Month: 'January',
      Amount: 1000,
      'Voucher Id': 'VCH001',
      'Mode Of Payment': 'Cash',
      Status: 'Success',
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 2,
      Month: 'February',
      Amount: 2000,
      'Voucher Id': 'VCH002',
      'Mode Of Payment': 'UPI',
      Status: 'Processing',
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 3,
      Month: 'March',
      Amount: 1500,
      'Voucher Id': 'VCH003',
      'Mode Of Payment': 'Bank Transfer',
      Status: 'Success',
    },
    {
      name: 'Fuel Monitoring System',
      description:
        'Basically, fuel is very important, and the cost of fuel is always a fear when it comes to cost-effectiveness and profit and hence fuel monitoring is an inevitable factor in fleet management to gain fuel efficiency.',
      No: 4,
      Month: 'April',
      Amount: 1800,
      'Voucher Id': 'VCH004',
      'Mode Of Payment': 'Card',
      Status: 'Processing',
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 5,
      Month: 'May',
      Amount: 2100,
      'Voucher Id': 'VCH005',
      'Mode Of Payment': 'Cash',
      Status: 'Success',
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 6,
      Month: 'June',
      Amount: 1900,
      'Voucher Id': 'VCH006',
      'Mode Of Payment': 'UPI',
      Status: 'Processing',
    },
    {
      name: 'Bike GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 7,
      Month: 'July',
      Amount: 2200,
      'Voucher Id': 'VCH007',
      'Mode Of Payment': 'Bank Transfer',
      Status: 'Success',
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 8,
      Month: 'August',
      Amount: 2500,
      'Voucher Id': 'VCH008',
      'Mode Of Payment': 'Card',
      Status: 'Processing',
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 9,
      Month: 'September',
      Amount: 2300,
      'Voucher Id': 'VCH009',
      'Mode Of Payment': 'Cash',
      Status: 'Success',
    },
    {
      name: 'Fuel Monitoring System',
      description:
        'Basically, fuel is very important, and the cost of fuel is always a fear when it comes to cost-effectiveness and profit and hence fuel monitoring is an inevitable factor in fleet management to gain fuel efficiency.',
      No: 10,
      Month: 'October',
      Amount: 2600,
      'Voucher Id': 'VCH010',
      'Mode Of Payment': 'UPI',
      Status: 'Processing',
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 11,
      Month: 'November',
      Amount: 2400,
      'Voucher Id': 'VCH011',
      'Mode Of Payment': 'Bank Transfer',
      Status: 'Success',
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      No: 12,
      Month: 'December',
      Amount: 2700,
      'Voucher Id': 'VCH012',
      'Mode Of Payment': 'Card',
      Status: 'Processing',
    },
  ];

  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        {/* Left: Staff Details Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">Asserts</h2>

        {/* Right: Icons and Add Staff Button */}
        <div className="flex items-center space-x-4">
          {/* List View Icon */}
          <button
            className={`p-2 cursor-pointer ${!isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(false)}
          >
            <FaList size={18} />
          </button>

          {/* Grid View Icon */}
          <button
            className={`p-2 cursor-pointer ${isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(true)}
          >
            <FaTh size={18} />
          </button>
          {/* Add Assert Button */}
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/add-asset')}
          >
            <span>Add Assert</span>
          </button>
        </div>
      </div>
      {isGridView && (
        <div className="flex justify-between mx-6">
          <DropdownCard
            bgColor="red"
            title="Total Products"
            count={500}
            selectedBranch={totalBranch}
            setSelectedBranch={setTotalBranch}
          />
          <DropdownCard
            bgColor="green"
            title="In Hand Products"
            count={220}
            selectedBranch={inHandBranch}
            setSelectedBranch={setInHandBranch}
          />
          <DropdownCard
            bgColor="purple"
            title="Installation Products"
            count={280}
            selectedBranch={installationBranch}
            setSelectedBranch={setInstallationBranch}
          />
        </div>
      )}

      {isGridView ? (
        <div
          className={
            'mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'
          }
        >
          {products.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4 w-full max-w-lg"
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt="Motorbike"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-grow space-y-2">
                <h2 className="text-2xl font-bold text-black">Motorbike</h2>
                <p className="text-gray-500">Visakhapatnam</p>
                <p className="text-red-500 font-medium">2 EMI Pending</p>
                <h3 className="text-2xl font-bold text-black mt-2">₹50000/-</h3>
              </div>

              {/* Button Section */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="text-gray-400 rounded-md px-1 py-1 border border-gray-300 hover:bg-gray-200"
                  onClick={() => navigate('/asset-details')}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Filters Row */}
          <div className="flex mb-4">
            <div className="flex-grow mr-2">
              <input
                type="date"
                id="dateFrom"
                value={''}
                placeholder="From"
                onChange={() => {}}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>

            <div className="flex-grow mx-2">
              <input
                type="date"
                id="dateTo"
                value={''}
                placeholder="To"
                onChange={() => {}}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>

            <button
              onClick={() => {}}
              className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
          <Table
            columns={Object.keys(products[0])}
            data={products}
            onDetails={() => {}}
            showEdit={false}
            showDelete={false}
            showDetails={true}
            editText="Edit"
            deleteText="Delete"
            detailsText="More Details"
          />
        </div>
      )}
    </div>
  );
};

export default Asserts;
