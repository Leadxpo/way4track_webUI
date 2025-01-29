import React from 'react';
import Table from '../../components/Table';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';

const TechnicianHome = () => {
  return (
    <div>
      <p>Total Appointments: </p>
      <p>Success Appointments: </p>
      <Table />
      <AnalysisCardBarChart />
      <div className="w-full overflow-auto border border-gray-300 rounded-md">
        <div className="p-4 text-center font-semibold text-lg border-b border-gray-300 min-w-full">
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
                    {attendanceData?.length > 0 && attendanceData[i]?.inTime
                      ? new Date(attendanceData[i].inTime).toLocaleTimeString() // format the time properly
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
                    {attendanceData?.length > 0 && attendanceData[i]?.outTime
                      ? new Date(attendanceData[i].outTime).toLocaleTimeString() // format the time properly
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
                    {attendanceData?.length > 0 &&
                    attendanceData[i]?.totalHours > 0
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
                    {attendanceData?.length > 0 && attendanceData[i]?.status
                      ? attendanceData[i].status
                      : 'Absent'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianHome;
