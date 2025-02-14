import React from 'react';
import Table from '../../components/Table';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import { useState } from 'react';
import { useEffect } from 'react';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
const SalesmanHome = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalSuccessAppointments, setTotalSuccessAppointments] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [chartData, setCardData] = useState([]);
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  const fetchAppointmentDetails = async (branchName = 'All') => {
    try {
      const payload = {
        staffId: localStorage.getItem('userId'),
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post('/dashboards/getAllAppointmentDetails', payload);

      if (res.status) {
        const appointmentsList = res.data.appointments || [];
        setAppointments(appointmentsList)
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setAppointments([]);
    }
  };

  const fetchWorkAllocationChart = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await ApiService.post(
        '/work-allocations/getMonthTotalWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          staffId: localStorage.getItem('userId'),
          year: currentYear,
        }
      );
      setCardData(response.data);
      const data = response.data;

      // Using reduce to calculate totals
      const totals = data.reduce(
        (acc, monthData) => {
          acc.totalAppointments += parseInt(monthData.totalAppointments, 10) || 0;
          acc.totalSuccessAppointments += parseInt(monthData.totalSuccessAppointments, 10) || 0;
          acc.totalSalesAmount += parseFloat(monthData.totalSalesAmount) || 0;
          return acc;
        },
        { totalAppointments: 0, totalSuccessAppointments: 0, totalSalesAmount: 0 }
      );

      setTotalAppointments(totals.totalAppointments);
      setTotalSuccessAppointments(totals.totalSuccessAppointments);
      setTotalSalesAmount(totals.totalSalesAmount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAppointmentDetails();
    fetchWorkAllocationChart();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchAttendanceData = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/staffAttendanceDetails',
          {
            staffId: localStorage.getItem('userId'),
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
  }, [selectedDate, localStorage.getItem('userId')]);
  return (
    <div>
      <div>
        <p className="my-4 font-bold">Total Appointments: {totalAppointments}</p>
        <p className="my-4 font-bold">Success Appointments: {totalSuccessAppointments}</p>
        <p className="my-4 font-bold">Total Sales Amount: {totalSalesAmount}</p>
      </div>
      <Table
        columns={[
          'appointmentId',
          'appointmentName',
          'clientName',
          'clientPhoneNumber',
          'clientAddress',
          'branchName',
          'appointmentType',
          'slot',
          'description',
          'status',
          'assignedTo',
        ]}
        showEdit={false}
        showDelete={false}
        showDetails={false}
        data={appointments}
        onEdit={() => { }}
        onDelete={() => { }}
        onDetails={() => { }}
      />
      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="white"
              horizontal
              vertical={false}
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#fff"
              strokeWidth={4}
              dot={{ fill: '#fff', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
    </div>
  );
};

export default SalesmanHome;
