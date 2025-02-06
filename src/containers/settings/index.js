import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Settings = () => {
  const location = useLocation();
  const employeeData = location.state?.staffDetails || {};
  const [staffId, setStaffId] = useState('');
  const [staffData, setStaffData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [mockData, setMockData] = useState([]); // Holds all staff data
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const getStaffPermissions = async () => {
    try {
      const response = await ApiService.post(
        '/permissions/getStaffPermissions',
        {
          staffId: employeeData.staffId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.status) {
        const staff = response.data?.[0];
        setMockData(staff); // Save entire data for all staff
        console.log(staff, '_________________');
        setStaffData(staff || null); // Initial staff data from the first response
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearch = async () => {
    try {
      // const response = await ApiService.post('/staff/getStaffDetails', {
      //   userId: staffId,
      //   companyCode: initialAuthState?.companyCode,
      //   unitCode: initialAuthState?.unitCode,
      // });

      // if (response.status) {
      // setProfiles(response.data || []);
      setNotFound(false);
      getStaffPermissions()
      // } else {
      //   alert(
      //     response.data.internalMessage || 'Failed to fetch staff details.'
      //   );
      //   setNotFound(true);
      // }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      setNotFound(true);
      alert('Failed to fetch staff details.');
    }
  };
  const handleCheckboxChange = (permissionType, permissionName) => {
    setStaffData((prevData) => ({
      ...prevData,
      permissions: prevData.permissions.map((permission) =>
        permission.name === permissionName
          ? { ...permission, [permissionType]: !permission[permissionType] }
          : permission
      ),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await ApiService.post(
        '/permissions/handlePermissionDetails',
        {
          staffId: staffData.staffId,
          permissions: staffData.permissions, // Ensure you're sending the updated permissions
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.status) {
        alert('Permissions updated successfully!');
        // Optionally, you can also update the staffData or mockData after saving changes
        setStaffData((prevData) => ({
          ...prevData,
          permissions: [...staffData.permissions], // Make sure to update the state with the new permissions
        }));
      } else {
        alert('Failed to update permissions.');
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
      alert('Error while saving changes.');
    }
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
                      <th className="p-2 text-center">Add</th>
                      <th className="p-2 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.permissions &&
                      staffData.permissions.length > 0 ? (
                      staffData.permissions.map((permission, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{permission.name}</td>
                          <td className="p-2 text-center">
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={permission.view}
                                onChange={() =>
                                  handleCheckboxChange('view', permission.name)
                                }
                                className="accent-green-500 outline-none"
                              />
                            </td>
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="checkbox"
                              checked={permission.edit}
                              onChange={() =>
                                handleCheckboxChange('edit', permission.name)
                              }
                              className="accent-green-500 outline-none"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="checkbox"
                              checked={permission.add}
                              onChange={() =>
                                handleCheckboxChange('add', permission.name)
                              }
                              className="accent-green-500 outline-none"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="checkbox"
                              checked={permission.delete}
                              onChange={() =>
                                handleCheckboxChange('delete', permission.name)
                              }
                              className="accent-green-500 outline-none"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center p-2">
                          No permissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Staff Details Section */}
              <div className="bg-white p-4 rounded-lg shadow-md min-w-[35%] flex flex-col items-center flex-grow">
                <img
                  src={
                    staffData.staffPhoto || 'https://i.pravatar.cc/150?img=1'
                  } // Placeholder
                  alt="Staff"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
                />
                <div className="text-left mb-6 space-y-4">
                  <p>
                    <span className="font-bold">Name:</span>{' '}
                    {staffData.staffName}
                  </p>
                  <p>
                    <span className="font-bold">Number:</span>{' '}
                    {staffData.phoneNumber}
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
                    {staffData.branchName}
                  </p>
                  <p>
                    <span className="font-bold">Date Of Birth:</span>{' '}
                    {staffData.dob}
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
                <button
                  className="bg-green-700 text-white px-6 py-2 rounded-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
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
