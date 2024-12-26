import React, { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
const BranchDetails = () => {
  const [managerMenuOpen, setManagerMenuOpen] = useState(false);
  const toggleMenu = () => {
    setManagerMenuOpen(!managerMenuOpen);
  };
  return (
    <div className="space-y-10 px-8 py-4">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <img
          src="logo-square.png"
          alt="Branch Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-3xl font-bold text-green-600">Visakhapatnam</h1>
      </div>

      {/* Branch Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <strong>Branch Name:</strong>
          <p>Visakhapatnam</p>
        </div>
        <div>
          <strong>Branch Number:</strong> <p>+91 91107 29757</p>
        </div>
        <div>
          <strong>Branch Opening:</strong>
          <p> 01-01-2010</p>
        </div>
        <div>
          <strong>Email ID:</strong> <p>sharontelmaticspvtltd@gmail.com</p>
        </div>
        <div className="col-span-2">
          <strong>Branch Address:</strong>{' '}
          <p>
            21-27, Double Road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra
            Pradesh 530009
          </p>
        </div>
      </div>

      {/* Branch Photos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branch Photos</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <img
            src="logo.png"
            alt="Branch Photo 1"
            className="w-32 h-32 rounded-md"
          />
          <img
            src="logo.png"
            alt="Branch Photo 2"
            className="w-32 h-32 rounded-md"
          />
          <img
            src="logo.png"
            alt="Branch Photo 3"
            className="w-32 h-32 rounded-md"
          />
          {/* Additional photos here */}
        </div>
      </div>

      {/* Branch Manager */}
      <div className={`relative bg-white p-6 rounded-lg shadow-lg w-fit`}>
        {/* Static 3 dots */}
        <div
          className="absolute top-4 right-4 text-gray-400 cursor-pointer"
          onClick={toggleMenu}
        >
          <FaEllipsisVertical />
        </div>

        {/* Dropdown Menu */}
        {managerMenuOpen && (
          <div className="absolute top-10 right-4 bg-white border border-gray-300 rounded-md shadow-md p-2 z-10">
            <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
              Edit
            </button>
            <button className="block w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100">
              Delete
            </button>
            <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
              More Details
            </button>
          </div>
        )}

        {/* Profile Picture */}
        <img
          className={'rounded-full object-cover mx-auto h-24 w-24'}
          src={`https://i.pravatar.cc/150?img=4`} // Placeholder image source
          alt="Profile"
        />

        {/* Name, Designation, and Branch */}
        <div className={`text-center mt-4`}>
          <h2 className="text-lg font-semibold">Chaitanya</h2>
          <p className="text-gray-500">CEO</p>
          <p className="text-gray-400">Vishakapatnam</p>
        </div>

        {/* Buttons for Grid View */}
        <div className="mt-4 flex justify-center space-x-4">
          <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer">
            Message
          </button>
          <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer">
            View Profile
          </button>
        </div>
      </div>

      {/* Branch Assets */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branch Assets</h2>
        <div className="flex justify-between mb-4">
          <select className="border p-2 rounded-md w-60 focus:outline-none bg-gray-300">
            <option>Assets</option>
            {/* Additional options here */}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example Asset Cards */}
          <AssetCard
            name="Motorbike"
            location="Visakhapatnam"
            amount="₹50000"
            paymentStatus="2 EMI Pending"
          />
          <AssetCard
            name="Boss Chair"
            location="Visakhapatnam"
            amount="₹35000"
            paymentStatus="Payment Done"
          />
          {/* Additional assets */}
        </div>
      </div>

      {/* Branch Staff */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branch Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Example Staff Cards */}
          <StaffCard
            name="P. Chaitanya"
            position="CEO"
            location="Visakhapatnam"
          />
          <StaffCard name="Srinu" position="Manager" location="Visakhapatnam" />
          <StaffCard
            name="S. Ravi Krishna"
            position="HR"
            location="Visakhapatnam"
          />
          {/* Additional staff members */}
        </div>
      </div>
    </div>
  );
};

// Asset Card Component
const AssetCard = ({ name, location, amount, paymentStatus }) => (
  <div className="relative bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4 w-full max-w-lg">
    {/* Image Section */}
    <div className="flex-shrink-0">
      <img
        src={`https://i.pravatar.cc/150?img=2`}
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
      <button className="text-sm text-gray-400 rounded-md px-1 py-1 border border-gray-300 hover:bg-gray-200">
        More Details
      </button>
    </div>
  </div>
);

// Staff Card Component
const StaffCard = ({ name, position, location }) => (
  <div className=" p-4 rounded-lg shadow-md text-center space-y-2">
    <div className={`relative p-6 rounded-lg w-fit`}>
      {/* Static 3 dots */}
      <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
        <FaEllipsisVertical />
      </div>

      {/* Dropdown Menu */}

      {false && (
        <div className="absolute top-10 right-4 bg-white border border-gray-300 rounded-md shadow-md p-2 z-10">
          <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
            Edit
          </button>
          <button className="block w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100">
            Delete
          </button>
          <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
            More Details
          </button>
        </div>
      )}

      {/* Profile Picture */}
      <img
        className={'rounded-full object-cover mx-auto h-24 w-24'}
        src={`https://i.pravatar.cc/150?img=4`} // Placeholder image source
        alt="Profile"
      />

      {/* Name, Designation, and Branch */}
      <div className={`text-center mt-4`}>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">{position}</p>
        <p className="text-gray-400">{location}</p>
      </div>

      {/* Buttons for Grid View */}
      <div className="mt-4 flex justify-center space-x-2">
        <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer text-sm">
          Message
        </button>
        <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer text-sm">
          View Profile
        </button>
      </div>
    </div>
  </div>
);

export default BranchDetails;
