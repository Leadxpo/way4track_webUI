import React, { useState } from 'react';

const Settings = () => {
  const [staffId, setStaffId] = useState('');
  const [staffData, setStaffData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const mockData = [
    {
      staffId: '001',
      name: 'V Ravi Krishna',
      number: '9999999999',
      designation: 'Branch Manager',
      branch: 'vizag',
      dateOfBirth: '06/06/1996',
      email: 'ravi@way4track@gmail.com',
      aadharNumber: '**** **** ****',
      address:
        '21-27 Double road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530000',
      modules: [
        {
          name: 'Home',
          permissions: { view: true, edit: true, delete: false },
        },
        {
          name: 'Branches',
          permissions: { view: true, edit: false, delete: false },
        },
      ],
    },
    {
      staffId: '002',
      name: 'S Kumar',
      number: '8888888888',
      designation: 'Technician',
      branch: 'Hyderabad',
      dateOfBirth: '12/12/1985',
      email: 'kumar@way4track@gmail.com',
      aadharNumber: '**** **** ****',
      address: '25/1 M G Road, Hyderabad, Telangana 500000',
      modules: [
        {
          name: 'Home',
          permissions: { view: true, edit: false, delete: false },
        },
        {
          name: 'Staff',
          permissions: { view: true, edit: true, delete: false },
        },
      ],
    },
  ];

  const handleSearch = () => {
    const foundStaff = mockData.find((staff) => staff.staffId === staffId);
    if (foundStaff) {
      setStaffData(foundStaff);
      setNotFound(false);
    } else {
      setStaffData(null);
      setNotFound(true);
    }
  };

  const handleCheckboxChange = (moduleIndex, permissionType) => {
    setStaffData((prevData) => {
      const updatedModules = prevData.modules.map((module, index) => {
        if (index === moduleIndex) {
          return {
            ...module,
            permissions: {
              ...module.permissions,
              [permissionType]: !module.permissions[permissionType],
            },
          };
        }
        return module;
      });
      return { ...prevData, modules: updatedModules };
    });
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl px-8 pb-8">
        {/* Header Section */}
        <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
          Roles & Permissions
        </h2>

        {/* Top Input Section */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Staff ID"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
            onChange={(e) => setStaffId(e.target.value)}
          />
          <button
            className="bg-green-700 text-white px-6 py-2 rounded-lg flex items-center"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>

        {/* Main Content Section */}
        <div className="flex space-x-4">
          {notFound ? (
            <p className="text-red-500 font-bold">Staff ID not found.</p>
          ) : staffData ? (
            <div className="flex space-x-4 w-full">
              {/* Permissions Table */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner flex-grow overflow-auto min-w-[60%]">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="p-2">Module</th>
                      <th className="p-2 text-center">View</th>
                      <th className="p-2 text-center">Edit</th>
                      <th className="p-2 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.modules.map((module, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{module.name}</td>
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.view}
                            onChange={() => handleCheckboxChange(index, 'view')}
                            className="accent-green-500 outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.edit}
                            onChange={() => handleCheckboxChange(index, 'edit')}
                            className="accent-green-500 outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.delete}
                            onChange={() =>
                              handleCheckboxChange(index, 'delete')
                            }
                            className="accent-green-500 outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Staff Details Section */}
              <div className="bg-white p-4 rounded-lg shadow-md min-w-[35%] flex flex-col items-center flex-grow">
                <img
                  src="https://i.pravatar.cc/150?img=1" // Placeholder
                  alt="Staff"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
                />
                <div className="text-left mb-6 space-y-4">
                  <p>
                    <span className="font-bold">Name:</span> {staffData.name}
                  </p>
                  <p>
                    <span className="font-bold">Number:</span>{' '}
                    {staffData.number}
                  </p>
                  <p>
                    <span className="font-bold">Staff ID:</span>{' '}
                    {staffData.staffId}
                  </p>
                  <p>
                    <span className="font-bold">Designation:</span>{' '}
                    {staffData.designation}
                  </p>
                  <p>
                    <span className="font-bold">Branch:</span>{' '}
                    {staffData.branch}
                  </p>
                  <p>
                    <span className="font-bold">Date Of Birth:</span>{' '}
                    {staffData.dateOfBirth}
                  </p>
                  <p>
                    <span className="font-bold">Email ID:</span>{' '}
                    {staffData.email}
                  </p>
                  <p>
                    <span className="font-bold">Aadhar Number:</span>{' '}
                    {staffData.aadharNumber}
                  </p>
                  <p>
                    <span className="font-bold">Address:</span>{' '}
                    {staffData.address}
                  </p>
                </div>
                <button className="bg-green-700 text-white px-6 py-2 rounded-lg">
                  DONE
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Please search for a staff ID to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
