import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
const Designation = () => {
  const [profiles, setProfiles] = useState([]);
  const [columns, setColumns] = useState(['staffId', 'designation']);
  useEffect(() => {
    getStaffSearchDetails();
  }, []);
  const getStaffSearchDetails = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getStaffSearchDetails',
        {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setProfiles(response.data || []);
      } else {
        alert(
          response.data.internalMessage || 'Failed to fetch staff details.'
        );
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    }
  };
  return (
    <div>
      <p className="font-bold text-xl">Designation Details</p>
      <div className="flex justify-end mb-4">
        <button
          className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          //onClick={handleCreateNew}
        >
          Add Designation
        </button>
      </div>
      <Table data={profiles} columns={columns} />
    </div>
  );
};

export default Designation;
