import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddEditEmployeeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if data is available from the location state
  const employeeData = location.state?.staffDetails || {};
  // const [staffList, setStaffList] = useState([]);

  // Initialize form data with defaults
  const initialFormData = {
    id: employeeData.id || null,
    name: employeeData.name || '',
    phoneNumber: employeeData.phoneNumber || '',
    staffId: employeeData.staffId || '', // Will be ignored during creation
    designation: employeeData.designation || '',
    // branchId: employeeData.branchId || '',
    branch: employeeData.branchName || '', // Initialize branch with existing data
    dob: employeeData.dob || '',
    email: employeeData.email || '',
    aadharNumber: employeeData.aadharNumber || '',
    address: employeeData.address || '',
    companyCode: initialAuthState.companyCode,
    photo: employeeData?.photo || null,
    unitCode: initialAuthState.unitCode,
    joiningDate: employeeData.joiningDate,
    attendance: employeeData.attendance,
    basicSalary: employeeData.basicSalary,
    beforeExperience: employeeData.beforeExperience,
    password: employeeData.password,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState(employeeData?.photo || '');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input (photo)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        photo: selectedFile,
      }));
    }
  };

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    const fetchStaffDetails = async () => {
      if (!location.state?.staffDetails) return;
      try {
        const response = await ApiService.post('/staff/getStaffDetailsById', {
          staffId: location.state?.staffDetails.staffId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (!response.status) {
          throw new Error('Staff not found');
        }
        if (response.status && response.data.length > 0) {
          const fetchedData = response.data[0]; // Extract the first staff object

          // Map API response fields to formData structure
          const updatedFormData = {
            id: fetchedData.id || null,
            name: fetchedData.name || '',
            phoneNumber: fetchedData.phoneNumber || '',
            staffId: fetchedData.staffId || '',
            designation: fetchedData.designation || '',
            branch: fetchedData.branchName || '',
            dob: fetchedData.dob || '',
            email: fetchedData.email || '',
            aadharNumber: fetchedData.aadharNumber || '',
            address: fetchedData.address || '',
            companyCode:
              fetchedData.companyCode || initialAuthState.companyCode,
            unitCode: fetchedData.unitCode || initialAuthState.unitCode,
            joiningDate: fetchedData.joiningDate || '',
            attendance: fetchedData.attendance || '',
            basicSalary: fetchedData.basicSalary || '',
            beforeExperience: fetchedData.beforeExperience || 0,
            password: '', // Leave password empty for security reasons
            photo: fetchedData.staffPhoto || null,
          };

          setFormData(updatedFormData);
          setImage(fetchedData.staffPhoto || '');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStaffDetails();
    fetchBranches();
  }, []);

  // Handle save button
  const handleSave = async () => {
    if (!formData.phoneNumber) {
      alert('Phone number is required.');
      return; // Prevent submission if phone number is missing
    }
    const { id, ...payloadData } = formData;
    const payload = new FormData();
    Object.entries(payloadData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });

    try {
      const endpoint = formData.id
        ? '/staff/handleStaffDetails'
        : '/staff/handleStaffDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(
          formData.id
            ? 'Employee updated successfully!'
            : 'Employee added successfully!'
        );
        navigate('/staff');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };

  // Fetch branch list
  // const fetchStaffList = async () => {
  //   try {
  //     const response = await ApiService.post('/staff/getStaffDetails', {
  //       companyCode: initialAuthState?.companyCode,
  //       unitCode: initialAuthState?.unitCode,
  //     });
  //     if (response.data.success) {
  //       setStaffList(response.data.data);
  //     } else {
  //       alert(response.data.message || 'Failed to fetch branch list.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching branch list:', error);
  //     alert('Failed to fetch branch list.');
  //   }
  // };

  // useEffect(() => {
  //   fetchStaffList();
  // }, []);

  // Handle cancel button
  const handleCancel = () => {
    navigate('/staff');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {employeeData?.id ? 'Edit Employee' : 'Add Employee'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            name="photo"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
          {formData.photo && (
            <button
              onClick={() => {
                setFormData({ ...formData, photo: null });
                setImage('');
              }}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          )}
        </div>

        {/* Branch Dropdown */}
        {branches.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Branch</p>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select a Branch
                </option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <p className="font-semibold mb-1">Designation</p>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="">Select designation</option>
            <option value="CEO">CEO</option>
            <option value="HR">HR</option>
            <option value="Accountant">Accountant</option>
            <option value="BranchManager">Branch Manager</option>
            <option value="SubDealer">Sub Dealer</option>
            <option value="Technician">Technician</option>
            <option value="SalesMan">Sales Man</option>
            <option value="CallCenter">Call Center</option>
            <option value="Warehouse Manager">Warehouse Manager</option>
          </select>
        </div>
        {/* Form Fields */}
        <div className="space-y-4">
          {[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              placeholder: 'Enter Name',
            },
            {
              label: 'Number',
              name: 'phoneNumber',
              type: 'text',
              placeholder: 'Enter Number',
            },
            {
              label: 'Before Experience',
              name: 'beforeExperience',
              type: 'float',
              placeholder: 'Enter Before Experience',
            },
            {
              label: 'BasicSalary',
              name: 'basicSalary',
              type: 'float',
              placeholder: 'Enter BasicSalary',
            },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Joining Date', name: 'joiningDate', type: 'date' },
            {
              label: 'Email ID',
              name: 'email',
              type: 'email',
              placeholder: 'Enter Email ID',
            },
            {
              label: 'Aadhar Number',
              name: 'aadharNumber',
              type: 'text',
              placeholder: 'Enter Aadhar Number',
            },
            {
              label: 'Address',
              name: 'address',
              type: 'text',
              placeholder: 'Enter Address',
            },
            {
              label: 'password',
              name: 'password',
              type: 'text',
              placeholder: 'Enter password',
            },
          ].map((field) => (
            <div key={field.name}>
              <p className="font-semibold mb-1">{field.label}</p>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-700 transition-all"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployeeForm;
