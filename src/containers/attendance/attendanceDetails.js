import React, { useState } from 'react';

const mockClientData = {
  image: 'https://via.placeholder.com/150',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  gst: 'GST1234567890',
};

const mockAttendanceData = Array.from({ length: 30 }, (_, i) => ({
  inTime: i % 2 === 0 ? [`2025-03-${i + 1}T09:00:00`] : [],
  outTime: i % 2 === 0 ? [`2025-03-${i + 1}T17:00:00`] : [],
  totalHours: i % 2 === 0 ? 8 : 0,
  status: i % 2 === 0 ? 'Present' : 'Absent',
}));

const AttendanceDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const attendanceData = mockAttendanceData;
  const clientData = mockClientData;

  return (
    <div>
      <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
        {clientData.image && (
          <img
            src={clientData.image}
            alt="Client Profile"
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">Client Profile</h2>
          <p>Name: {clientData.name}</p>
          <p>Email: {clientData.email}</p>
          <p>Phone Number: {clientData.phone}</p>
          <p>GST: {clientData.gst}</p>
        </div>
      </div>
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
                {attendanceData.map((day, i) => (
                  <div
                    key={i}
                    className="table-cell p-1 border-r border-gray-300 text-center"
                  >
                    {day.inTime.length > 0
                      ? new Date(day.inTime[0]).toLocaleTimeString()
                      : 'No Data'}
                  </div>
                ))}
              </div>

              {/* Out Time Row */}
              <div className="table-row border-b border-gray-300">
                <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                  Out
                </div>
                {attendanceData.map((day, i) => (
                  <div
                    key={i}
                    className="table-cell p-1 border-r border-gray-300 text-center"
                  >
                    {day.outTime.length > 0
                      ? new Date(day.outTime[0]).toLocaleTimeString()
                      : 'No Data'}
                  </div>
                ))}
              </div>

              {/* Total Hours Row */}
              <div className="table-row border-b border-gray-300">
                <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                  Total Hrs
                </div>
                {attendanceData.map((day, i) => (
                  <div
                    key={i}
                    className="table-cell p-1 border-r border-gray-300 text-center"
                  >
                    {day.totalHours > 0 ? day.totalHours : 'No Data'}
                  </div>
                ))}
              </div>

              {/* Status Row */}
              <div className="table-row border-b border-gray-300">
                <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
                  Status
                </div>
                {attendanceData.map((day, i) => (
                  <div
                    key={i}
                    className="table-cell p-1 border-r border-gray-300 text-center"
                  >
                    {day.status ? day.status : 'Absent'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
