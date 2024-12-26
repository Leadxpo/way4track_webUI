import React, { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import { useNavigate } from 'react-router';
import Table from '../../components/Table';
const Products = () => {
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
      vendorName: 'Vendor A',
      imeiNumber: '123456789012345',
      presentStock: 50,
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor B',
      imeiNumber: '987654321098765',
      presentStock: 30,
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor C',
      imeiNumber: '112233445566778',
      presentStock: 20,
    },
    {
      name: 'Fuel Monitoring System',
      description:
        'Basically, fuel is very important, and the cost of fuel is always a fear when it comes to cost-effectiveness and profit and hence fuel monitoring is an inevitable factor in fleet management to gain fuel efficiency.',
      vendorName: 'Vendor D',
      imeiNumber: '556677889900112',
      presentStock: 15,
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor B',
      imeiNumber: '223344556677889',
      presentStock: 40,
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor C',
      imeiNumber: '334455667788990',
      presentStock: 25,
    },
    {
      name: 'Bike GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor A',
      imeiNumber: '445566778899001',
      presentStock: 60,
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor B',
      imeiNumber: '556677889900112',
      presentStock: 35,
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor C',
      imeiNumber: '667788990011223',
      presentStock: 20,
    },
    {
      name: 'Fuel Monitoring System',
      description:
        'Basically, fuel is very important, and the cost of fuel is always a fear when it comes to cost-effectiveness and profit and hence fuel monitoring is an inevitable factor in fleet management to gain fuel efficiency.',
      vendorName: 'Vendor D',
      imeiNumber: '778899001122334',
      presentStock: 10,
    },
    {
      name: 'Car GPS Tracker',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor B',
      imeiNumber: '889900112233445',
      presentStock: 45,
    },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      description:
        'Way4Track offers tracking and monitoring services for your personal vehicle.',
      vendorName: 'Vendor C',
      imeiNumber: '990011223344556',
      presentStock: 30,
    },
  ];

  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        {/* Left: Staff Details Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>

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

          {/* Add Staff Button */}
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/in-hand-product')}
          >
            <span>In-Hand Products</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/add-product')}
          >
            <span>Add Product</span>
          </button>
        </div>
      </div>
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
      <div className="flex space-x-4 my-4">
        <input
          placeholder="Product ID"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          placeholder="Product Name"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedBranch}
          onChange={handleSelectChange}
          className="h-12 w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none "
        >
          <option value="" disabled>
            Select Branch
          </option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Vishakapatnam">Vishakapatnam</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Kakinada">Kakinada</option>
        </select>
        <button className="h-12 w-full bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500">
          Search
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {products.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-400"
            >
              {/* Static 3 dots */}
              <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
                <FaEllipsisVertical />
              </div>

              {/* Profile Picture */}
              <img
                className="rounded-full mx-auto h-24 w-24 object-cover"
                src={`https://i.pravatar.cc/150?img=${index + 1}`} // Placeholder image source
                alt="Profile"
              />

              {/* Name and Description */}
              <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-sm text-gray-500">
                  {truncateString(profile.description)}
                </p>
              </div>

              {/* Button */}
              <div className="mt-4 flex justify-center">
                <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={Object.keys(products[0])}
          data={products}
          onEdit={(profile) => console.log('Edit:', profile)}
          onDetails={(profile) => console.log('Details:', profile)}
        />
      )}
    </div>
  );
};

export default Products;
