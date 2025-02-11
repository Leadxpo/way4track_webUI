import React from 'react';
import { useState } from 'react';
import Table from '../../components/Table';
const mockBranches = [
  {
    id: 1,
    name: 'Visakhapatnam',
    managerName: 'Visyavnad',
    managerPhone: '+91 44553 34455',
    staff: {
      technicities: 200,
      nonTechnicities: 50,
      marketing: 450,
      total: 500,
    },
    hiring: {
      requirementPersons: 12,
      numberOfRequirementPersons: 32,
    },
  },
  {
    id: 2,
    name: 'Hyderabad',
    managerName: 'Ramesh',
    managerPhone: '+91 98765 43210',
    staff: {
      technicities: 180,
      nonTechnicities: 60,
      marketing: 400,
      total: 480,
    },
    hiring: {
      requirementPersons: 15,
      numberOfRequirementPersons: 28,
    },
  },
  {
    id: 3,
    name: 'Vijayawada',
    managerName: 'Suresh',
    managerPhone: '+91 99887 77665',
    staff: {
      technicities: 150,
      nonTechnicities: 70,
      marketing: 420,
      total: 480,
    },
    hiring: {
      requirementPersons: 10,
      numberOfRequirementPersons: 25,
    },
  },
  {
    id: 4,
    name: 'Kakinada',
    managerName: 'Anil',
    managerPhone: '+91 88455 33221',
    staff: {
      technicities: 190,
      nonTechnicities: 55,
      marketing: 430,
      total: 495,
    },
    hiring: {
      requirementPersons: 18,
      numberOfRequirementPersons: 35,
    },
  },
];
const HrHome = () => {
  const [selectedBranch, setSelectedBranch] = useState(mockBranches[0]);

  return (
    <div>
      <div className="flex justify-between mx-6">
        {/* total branch */}
        <div className={`bg-red-300 rounded-2xl shadow-lg p-6 w-80 mr-4`}>
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Total Branch
          </p>
          <div className="text-6xl font-bold mt-4 text-white">500</div>
        </div>
        <div className={`bg-green-300 rounded-2xl shadow-lg p-6 w-80  mr-4`}>
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Technicians
          </p>
          <div className="text-6xl font-bold mt-4 text-white">500</div>
        </div>
        <div className={`bg-purple-300 rounded-2xl shadow-lg p-6 w-80  mr-4`}>
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Non Technicians
          </p>
          <div className="text-6xl font-bold mt-4 text-white">500</div>
        </div>
        <div className={`bg-blue-300 rounded-2xl shadow-lg p-6 w-80  mr-4`}>
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Sales Man
          </p>
          <div className="text-6xl font-bold mt-4 text-white">500</div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Branch Selection Tabs */}
        <div className="flex space-x-4">
          {mockBranches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`px-4 py-2 rounded-lg shadow-md font-semibold ${
                selectedBranch.id === branch.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        {/* Branch Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-600 text-white p-3 text-lg font-semibold flex justify-between">
            <span>Branch Name : {selectedBranch.name}</span>
            <button className="bg-white text-black px-3 py-1 rounded-md text-sm">
              More
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-300 p-3 rounded-lg">
              Branch Manager Name : {selectedBranch.managerName}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">
              Branch Manager Phone Number : {selectedBranch.managerPhone}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">
              Number of Technicities : {selectedBranch.staff.technicities}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">
              Number of Non Technicities :{' '}
              {selectedBranch.staff.nonTechnicities}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">
              Number of Marketing's : {selectedBranch.staff.marketing}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">
              Total Staff : {selectedBranch.staff.total}
            </div>
          </div>
        </div>

        {/* Hiring Program Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-600 text-white p-3 text-lg font-semibold">
            Hiring Program
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-300 p-3 rounded-lg text-lg font-semibold">
              Requirement Persons : {selectedBranch.hiring.requirementPersons}
            </div>
            <div className="bg-gray-300 p-3 rounded-lg text-lg font-semibold">
              Number of Requirement Persons :{' '}
              {selectedBranch.hiring.numberOfRequirementPersons}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Table />
      </div>
    </div>
  );
};

export default HrHome;
