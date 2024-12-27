import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const StaffDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if data is available from the location state
  const employeeData = location.state?.staffDetails || {};

  // Initialize form data, using employeeData if available
  const initialFormData = {
    name: employeeData.name || '',
    phoneNumber: employeeData.phoneNumber || '',
    staffId: employeeData.staffId || '', // Will be ignored during creation
    designation: employeeData.designation || '',
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
    password: employeeData.password
  };

  const [formData, setFormData] = useState(initialFormData);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // If employee data is present, update form data
    if (employeeData) {
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action
    navigate('/staff');
  };

  const fetchStaffList = async () => {
    try {
      const response = await ApiService.post('/dashboards/getStaffSearchDetails', {
        staffId: employeeData?.staffId,
        name: employeeData?.name,
        branchName: employeeData?.branchName,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      if (response.data.success) {
        setStaffList(response.data.data);
      } else {
        alert(response.data.message || 'Failed to fetch branch list.');
      }
    } catch (error) {
      console.error('Error fetching branch list:', error);
      alert('Failed to fetch branch list.');
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);
  const handleCancel = () => {
    // Handle cancel action
    navigate('/staff');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Other fields follow the same pattern */}
          {/* Number */}
          <div>
            <p className="font-semibold mb-1">Number</p>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Staff ID */}
          <div>
            <p className="font-semibold mb-1">Staff ID</p>
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
              placeholder="Enter Staff ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Designation */}
          <div>
            <p className="font-semibold mb-1">Designation</p>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Enter Designation"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Branch */}
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            >
              <option value="" disabled>
                Select a Branch
              </option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="font-semibold mb-1">Date of Birth</p>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Email */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Aadhar */}
          <div>
            <p className="font-semibold mb-1">Aadhar Number</p>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleInputChange}
              placeholder="Enter Aadhar Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>

          <div className="flex w-full space-x-4">
            {/* Date Picker */}
            <div className="w-1/2">
              <DatePicker
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                popperClassName="z-10"
              />
            </div>

            {/* Search Button */}
            <div className="w-3/4">
              <button className="w-full bg-green-700 text-white px-6 py-2 rounded-md flex items-center justify-center space-x-2">
                <span>Search</span>
              </button>
            </div>
          </div>

          {/*attendance*/}
          <div className="w-full overflow-auto border border-gray-300 rounded-md">
            <div className=" p-4 text-center font-semibold text-lg border-b border-gray-300 min-w-full">
              Monthly Attendance Summary For Month October 2024
            </div>
            <div className="table w-full border-collapse">
              <div className="table-header-group bg-gray-100 border-b border-gray-300">
                <div className="table-row border-b border-gray-300">
                  <div className="table-cell p-2 border-r border-gray-300 text-center font-semibold">
                    Day
                  </div>
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className="table-cell p-2 border-r border-gray-300 text-center font-semibold"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="table-row-group">
                <div className="table-row border-b border-gray-300">
                  <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                    In
                  </div>
                  {Array.from({ length: 30 }, () => (
                    <div className="table-cell p-1 border-r border-gray-300"></div>
                  ))}
                </div>
                <div className="table-row border-b border-gray-300">
                  <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                    Out
                  </div>
                  {Array.from({ length: 30 }, () => (
                    <div className="table-cell p-1 border-r border-gray-300"></div>
                  ))}
                </div>
                <div className="table-row border-b border-gray-300">
                  <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold whitespace-nowrap">
                    Total Hrs
                  </div>
                  {Array.from({ length: 30 }, () => (
                    <div className="table-cell p-1 border-r border-gray-300"></div>
                  ))}
                </div>
                <div className="table-row border-b border-gray-300">
                  <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                    Status
                  </div>
                  {Array.from({ length: 30 }, () => (
                    <div className="table-cell p-1 border-r border-gray-300"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
