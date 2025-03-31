import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ApiService from '../../services/ApiService';

const EmployerDetails = ({ setEmployerDetails }) => {
  const [data, setData] = useState({
    branch: '',
    staffId: '',
    joiningDate: '',
    designation_id: '',
    department: '',
    monthlySalary: '',
    officeEmail: '',
    officePhoneNumber: '',
    bikeAllocation: '',
    mobileAllocation: '',
    terminationDate: '',
    resignationDate: '',
    finalSettlementDate: '',
    insuranceNumber: '',
    insuranceEligibilityDate: '',
    insuranceExpiryDate: '',
    password: '',
    description: '',
    mailAllocation: '',
  });

  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);

  // Fetch Branches
  const fetchBranches = async () => {
    console.log('hiiiiii');
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      console.log('hiiiiii22', response);
      if (response.status && Array.isArray(response.data)) {
        setBranches(response.data);
      } else {
        console.error('Failed to fetch branches:', response);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Fetch Designations
  const getDesignations = useCallback(async () => {
    try {
      const response = await ApiService.post('/designations/getAllDesignation');
      if (response.status && Array.isArray(response.data)) {
        setDesignations(response.data);
      } else {
        console.error('Failed to fetch designation details.');
      }
    } catch (error) {
      console.error('Error fetching designation details:', error);
    }
  }, []);

  useEffect(() => {
    getDesignations();
  }, []);

  // Debounced state update to prevent infinite loops
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmployerDetails(data);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [data, setEmployerDetails]);

  const inputFields = useMemo(
    () => [
      { label: 'Staff ID', name: 'staffId', type: 'text' },
      { label: 'Joining Date', name: 'joiningDate', type: 'date' },
      { label: 'Department', name: 'department', type: 'text' },
      { label: 'Monthly Salary', name: 'monthlySalary', type: 'number' },
      { label: 'Office Email', name: 'officeEmail', type: 'email' },
      { label: 'Bike Number', name: 'bikeNumber', type: 'text' },
      {
        label: 'Driving Licence Number',
        name: 'drivingLicenceNumber',
        type: 'text',
      },
      { label: 'Office Phone Number', name: 'officePhoneNumber', type: 'text' },
      { label: 'Mobile Brand', name: 'mobileBrand', type: 'text' },
      { label: 'Termination Date', name: 'terminationDate', type: 'date' },
      { label: 'Resignation Date', name: 'resignationDate', type: 'date' },
      {
        label: 'Final Settlement Date',
        name: 'finalSettlementDate',
        type: 'date',
      },
      { label: 'Insurance Number', name: 'insuranceNumber', type: 'text' },
      {
        label: 'Insurance Eligibility Date',
        name: 'insuranceEligibilityDate',
        type: 'date',
      },
      {
        label: 'Insurance Expiry Date',
        name: 'insuranceExpiryDate',
        type: 'date',
      },
      { label: 'Password', name: 'password', type: 'password' },
      { label: 'Description', name: 'description', type: 'text' },
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Employer Details</h3>

      {/* Branch Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Branch</label>
        <select
          name="branchId"
          value={data.branchId} // Store branchId as a number
          onChange={(e) => {
            const selectedBranch = branches.find(
              (branch) => branch.id === Number(e.target.value)
            );
            setData((prevData) => ({
              ...prevData,
              branch: selectedBranch?.id || '', // Store branchId as a number
              branchName: selectedBranch?.branchName || '',
            }));
          }}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none"
        >
          <option value="">Select a Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {' '}
              {/* Use branch.id as value */}
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

      {/* Designation Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Designation</label>
        <select
          name="designation_id"
          value={data.designation_id}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none"
        >
          <option value="">Select a Designation</option>
          {designations.map((designation) => (
            <option key={designation.id} value={designation.id}>
              {designation.designation}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Input Fields */}
      {inputFields.map(({ label, name, type }) => (
        <div className="mb-4" key={name}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type={type}
            name={name}
            value={data[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      ))}

      {/* Bike Allocation Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Bike Allocation (Yes/No)
        </label>
        <select
          name="bikeAllocation"
          value={data.bikeAllocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Mail Allocation (Yes/No)
        </label>
        <select
          name="mailAllocation"
          value={data.mailAllocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Driving Licence (Yes/No)
        </label>
        <select
          name="drivingLicence"
          value={data.drivingLicence}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Mobile Allocation Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Mobile Allocation (Yes/No)
        </label>
        <select
          name="mobileAllocation"
          value={data.mobileAllocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
};

export default EmployerDetails;
