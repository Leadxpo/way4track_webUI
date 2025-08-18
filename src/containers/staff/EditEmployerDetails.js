import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ApiService from '../../services/ApiService';
import { useLocation, useNavigate } from 'react-router';

const EditEmployerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: '',
    staffId: '',
    branch:null,
    branchName: '',
    joiningDate: null,
    designation: '',
    department: '',
    monthlySalary: '',
    officeEmail: '',
    officePhoneNumber: '',
    bikeAllocation: 'No',
    bikeName: '',
    bikeNumber: '',
    mobileAllocation: 'No',
    mobileBrand:'',
    terminationDate: null,
    resignationDate: null,
    finalSettlementDate: null,
    insuranceCompanyName: '',
    insuranceNumber: '',
    insuranceEligibilityDate: null,
    insuranceExpiryDate: null,
    // password: '',
    description: '',
  });

  useEffect(() => {
    if (location.state?.data) {
      setData(location.state.data);
    }
  }, [location.state]);
  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);
 

  // Fetch Branches
  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      if (response.status) {

        setBranches(response.data);
      } else {
        console.error('Failed to fetch branch names.');
      }
    } catch (error) {
      console.error('Error fetching branch names:', error);
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
  }, [getDesignations]);

  const inputFields = useMemo(
    () => [
      // { label: "Staff ID", name: "staffId", type: "text" },
      { label: 'Joining Date', name: 'joiningDate', type: 'date' },
      { label: 'Department', name: 'department', type: 'text' },
      { label: 'Designation', name: 'designation', type: 'select' },

      { label: 'Bike Name', name: 'bikeName', type: 'text' },
      { label: 'Bike Number', name: 'bikeNumber', type: 'text' },
      { label: 'Mobile Brand', name: 'mobileBrand', type: 'text' },
      { label: 'Monthly Salary', name: 'monthlySalary', type: 'text' },
      { label: 'Office Email', name: 'officeEmail', type: 'email' },
      { label: 'Office Phone Number', name: 'officePhoneNumber', type: 'text' },
      { label: 'Termination Date', name: 'terminationDate', type: 'date' },
      { label: 'Resignation Date', name: 'resignationDate', type: 'date' },
      {
        label: 'Final Settlement Date',
        name: 'finalSettlementDate',
        type: 'date',
      },
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
      // { label: 'Password', name: 'password', type: 'password' },
      { label: 'Description', name: 'description', type: 'text' },
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log('data', data);
  };

  const handleSubmit = async () => {
    const formatDate = (date) => {
      if (!date || date === '') return null;
      return date;
    };

    const payload = {
      id: data.id ?? '',
      // staffId: "SFp-0002",
      branch:data?.branch ,
      branchName: data.branchName ?? '',
      designation: data.designation ?? '',
      department: data.department ?? '',
      monthlySalary: data.monthlySalary ?? '',
      officeEmail: data.officeEmail ?? '',
      officePhoneNumber: data.officePhoneNumber ?? '',
      bikeAllocation: data.bikeAllocation ?? '',
      bikeNumber: data.bikeNumber ?? '',
      mobileAllocation: data.mobileAllocation ?? '',
      mobileBrand: data.mobileBrand ?? '',
      insuranceNumber: data.insuranceNumber ?? '',
      description: data.description ?? '',

      // Date fields: actual null if not provided
      joiningDate: formatDate(data.joiningDate),
      terminationDate: formatDate(data.terminationDate),
      resignationDate: formatDate(data.resignationDate),
      finalSettlementDate: formatDate(data.finalSettlementDate),
      insuranceEligibilityDate: formatDate(data.insuranceEligibilityDate),
      insuranceExpiryDate: formatDate(data.insuranceExpiryDate),
    };

    try {
      const endpoint = '/staff/handleStaffDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status) {
        alert('Employer details updated successfully!');
        navigate(-1);
        return response.data;
      } else {
        alert('Failed to update employer details.');
        return null;
      }
    } catch (error) {
      console.error('Error updating employer details:', error);
      alert('An error occurred while updating employer details.');
      return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Employer Details</h3>
      {/* Dynamic Input Fields */}
      {inputFields.map(({ label, name, type }) => (
        <div className="mb-4" key={name}>
          <label className="block font-medium mb-1">{label}</label>
          {type === 'select' && name === 'designation' ? (
            <select
              name={name}
              value={data[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select {label}</option>
              {designations.map((designation) => (
                <option key={designation.id} value={designation.name}>
                  {designation.designation}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={data[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>
      ))}

      {/* Branch Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Branch Name</label>
        {/* <select
          name="branchName"
          value={data.branchName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none"
        >
          <option value="">Select a Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select> */}

      <select
          name="branch"
          value={data.branch}
          onChange={(e) => {
            const selectedId = e.target.value;
            console.log("gggg",e.target.value,branches)
            const selectedBranch = branches.find(
              (branch) => branch.id.toString() === selectedId
            );

            setData((prevData) => ({
              ...prevData,
              branch: selectedBranch?.id || '',
              branchName: selectedBranch?.branchName || '',
            }));
          }}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none"
        >
          <option value="">Select a Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

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
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditEmployerDetails;
