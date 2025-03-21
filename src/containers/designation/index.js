import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPermissions } from '../../common/commonUtils';
import ApiService from '../../services/ApiService';

const Designation = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const [profiles, setProfiles] = useState([]);

  const getStaffSearchDetails = useCallback(async () => {
    try {
      const response = await ApiService.post('/designations/getAllDesignation');

      if (response.status) {
        setProfiles(response.data || []);
      } else {
        alert(response.data.internalMessage || 'Failed to fetch designation details.');
      }
    } catch (error) {
      console.error('Error fetching designation details:', error);
      alert('Failed to fetch designation details.');
    }
  }, []);

  useEffect(() => {
    setPermissions(getPermissions('designation'));
    getStaffSearchDetails();
  }, [getStaffSearchDetails]);

  const handleDetails = (designationDetails) => {
    navigate('/designation-details', { state: { designationDetails } });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 text-white rounded-md transition 
            ${permissions.add ? 'bg-yellow-600 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`
          }
          onClick={() => navigate('/add-designation')}
          // disabled={!permissions.add}
        >
          Add Designation
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((emp, index) => (
              <tr key={emp.id || index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3">
                  <button
                    className={`px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 
                      ${permissions.view ? '' : 'cursor-not-allowed opacity-50'}`}
                    onClick={() => handleDetails(emp)}
                    // disabled={!permissions.view}
                  >
                    More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Designation;
