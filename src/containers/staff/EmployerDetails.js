import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ApiService from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';

const EmployerDetails = ({ setEmployerDetails ,employerDetails}) => {
  const [data, setData] = useState({
    branch: '',
    branchName:'',
    staffId: '',
    joiningDate: null,
    designation_id: '',
    department: '',
    monthlySalary: '',
    officeEmail: '',
    officePhoneNumber: '',
    bikeAllocation: 'No',
    bikeName: '',
    bikeNumber: '',
    mobileAllocation: 'No', 
    mobileBrand: 'No', 
    // resignationDate: null,
    // finalSettlementDate: null, 
    insuranceCompanyName: '',
    insuranceNumber: '',
    insuranceEligibilityDate: null,
    insuranceExpiryDate: null,
    password: '',
    description: '',
    mailAllocation: 'No',
  });
  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [errors, setErrors] = useState({});
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const perms = getPermissions('staff');
    setPermissions(perms);
  }, [permissions]); // Include getStaffSearchDetails in the dependency array

  const validate = (fieldName, value) => {
    let error = '';

    // General required field validation
    if (value.trim() === '') {
      error = `${fieldName} is required.`;
    }

    // Email validation
    if (fieldName === 'officeEmail' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email.';
    }

    // Phone number validation (10 digits)
    if (fieldName === 'officePhoneNumber' && value && !/^\d{10}$/.test(value)) {
      error = 'Phone number must be 10 digits.';
    }
    return error;
  };


  // Fetch Branches
  const fetchBranches = async () => {

    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');

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

    useEffect(() => {
      if (employerDetails && Object.keys(employerDetails).length > 0) {
        setData(employerDetails);
      }
    }, [employerDetails]);
  

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
      { label: 'Password', name: 'password', type: 'password' },
      { label: 'Joining Date', name: 'joiningDate', type: 'date' },
      { label: 'Department', name: 'department', type: 'text' },
      { label: 'Monthly Salary', name: 'monthlySalary', type: 'number' },
      { label: 'Insurance Company Name', name: 'insuranceCompanyName', type: 'text' },
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
      { label: 'Description', name: 'description', type: 'text' },
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Employer Details</h3>

      {/* Branch Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Branch</label>
        <select
          name="branchId"
          value={data?.branch?.id} // Store branchId as a number
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
          {(name === "officeEmail" || name === "officePhoneNumber") && errors[name] && (
            <span className="text-red-500 text-sm mt-2">{errors[name]}</span>
          )}
        </div>
      ))}

      {/* Allocation Fields First */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Bike Allocation (Yes/No)</label>
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

      {data.bikeAllocation === 'Yes' && (
        <>
        <div className="mb-4">
          <label className="block font-medium mb-1">Bike Name</label>
          <input
            type="text"
            name="bikeName"
            value={data.bikeName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Bike Number</label>
          <input
            type="text"
            name="bikeNumber"
            value={data.bikeNumber || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        </>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Mail Allocation (Yes/No)</label>
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

      {data.mailAllocation === 'Yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Office Email</label>
          <input
            type="email"
            name="officeEmail"
            value={data.officeEmail || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Driving Licence (Yes/No)</label>
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

      {data.drivingLicence === 'Yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Driving Licence Number</label>
          <input
            type="text"
            name="drivingLicenceNumber"
            value={data.drivingLicenceNumber || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Mobile Allocation (Yes/No)</label>
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

      {data.mobileAllocation === 'Yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Office Phone Number</label>
          <input
            type="text"
            name="officePhoneNumber"
            value={data.officePhoneNumber || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {data.mobileAllocation === 'Yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Mobile Brand</label>
          <input
            type="text"
            name="mobileBrand"
            value={data.mobileBrand || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

    </div>
  );
};

export default EmployerDetails;
