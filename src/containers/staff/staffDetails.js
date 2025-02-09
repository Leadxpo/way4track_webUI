import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const StaffDetails = () => {
  const location = useLocation();
  const employeeData = location.state?.staffDetails || {};
  const [staffDetails, setStaffDetails] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch staff details when the component loads
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffDetailsById', {
          staffId: employeeData.staffId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          const staff = response.data?.[0];
          setStaffDetails({
            name: staff.name,
            phoneNumber: staff.phoneNumber,
            address: staff.address,
            email: staff.email,
            staffPhoto: staff.staffPhoto,
            dob: staff.dob,
            aadharNumber: staff.aadharNumber,
            joiningDate: staff.joiningDate,
            basicSalary: staff.basicSalary,
            branchName: staff.branchName,
            designation: staff.designation,
            staffId: staff.staffId,
          });
        }
      } catch (error) {
        console.error('Error fetching staff details:', error);
        alert('Failed to fetch staff details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffDetails();
  }, [employeeData.staffId]);

  // Fetch attendance details when a date is selected
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAttendanceData = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/staffAttendanceDetails',
          {
            staffId: employeeData.staffId,
            date: selectedDate,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          setAttendanceData(response.data);
        }
      } catch (error) {
        console.error('Error fetching attendance details:', error);
        alert('Failed to fetch attendance details.');
      }
    };

    fetchAttendanceData();
  }, [selectedDate, employeeData.staffId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {isLoading ? (
          <p className="text-center text-lg font-semibold">
            Loading staff details...
          </p>
        ) : (
          <>
            {/* Photo Section */}
            <div className="flex items-center space-x-2 mb-6">
              <img
                src={staffDetails.staffPhoto}
                alt="Employee"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            {/* Staff Details */}
            <div className="space-y-4">
              {/* Form field for Name */}
              <div>
                <p className="font-semibold mb-1">Name</p>
                <p>{staffDetails.name}</p>
              </div>
              {/* Other fields follow the same pattern */}
              {/* Number */}
              <div>
                <p className="font-semibold mb-1">Number</p>
                <p>{staffDetails.phoneNumber}</p>
              </div>
              {/* Staff ID */}
              <div>
                <p className="font-semibold mb-1">Staff ID</p>
                <p>{staffDetails.staffId}</p>
              </div>
              {/* Designation */}
              <div>
                <p className="font-semibold mb-1">Designation</p>
                <p>{staffDetails.designation}</p>
              </div>
              {/* Branch */}
              <div>
                <p className="font-semibold mb-1">Branch</p>
                <p>{staffDetails.branchName}</p>
              </div>
              {/* Date of Birth */}
              <div>
                <p className="font-semibold mb-1">Date of Birth</p>
                <p>{staffDetails.dob}</p>
              </div>
              {/* Email */}
              <div>
                <p className="font-semibold mb-1">Email ID</p>
                <p>{staffDetails.email}</p>
              </div>
              {/* Aadhar */}
              <div>
                <p className="font-semibold mb-1">Aadhar Number</p>
                <p>{staffDetails.aadharNumber}</p>
              </div>
              {/* Address */}
              <div>
                <p className="font-semibold mb-1">Address</p>
                <p>{staffDetails.address}</p>
              </div>
            </div>

            {/* Date Picker */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-center mb-4">
                Select Date for Attendance
              </h2>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select a date"
              />
            </div>

            {/* Attendance Table */}
            {selectedDate && (
              <div className="w-full overflow-auto border border-gray-300 rounded-md mt-6">
                <div className="p-4 text-center font-semibold text-lg border-b border-gray-300 min-w-full">
                  Monthly Attendance Summary For{' '}
                  {selectedDate.toLocaleString('default', { month: 'long' })}{' '}
                  {selectedDate.getFullYear()}
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
                    {/* In Time Row */}
                    <div className="table-row border-b border-gray-300">
                      <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                        In
                      </div>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="table-cell p-1 border-r border-gray-300 text-center"
                        >
                          {attendanceData[i]?.inTime.length > 0
                            ? new Date(
                                attendanceData[i].inTime[0]
                              ).toLocaleTimeString()
                            : 'No Data'}
                        </div>
                      ))}
                    </div>

                    {/* Out Time Row */}
                    <div className="table-row border-b border-gray-300">
                      <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                        Out
                      </div>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="table-cell p-1 border-r border-gray-300 text-center"
                        >
                          {attendanceData[i]?.outTime.length > 0
                            ? new Date(
                                attendanceData[i].outTime[0]
                              ).toLocaleTimeString()
                            : 'No Data'}
                        </div>
                      ))}
                    </div>

                    {/* Total Hours Row */}
                    <div className="table-row border-b border-gray-300">
                      <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                        Total Hrs
                      </div>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="table-cell p-1 border-r border-gray-300 text-center"
                        >
                          {attendanceData[i]?.totalHours > 0
                            ? attendanceData[i].totalHours
                            : 'No Data'}
                        </div>
                      ))}
                    </div>

                    {/* Status Row */}
                    <div className="table-row border-b border-gray-300">
                      <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                        Status
                      </div>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="table-cell p-1 border-r border-gray-300 text-center"
                        >
                          {attendanceData[i]?.status
                            ? attendanceData[i].status
                            : 'Absent'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StaffDetails;
