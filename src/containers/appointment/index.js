import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [appointments, setAppointments] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [loading, setLoading] = useState(false);
  const fetchAppointmentDetails = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post('/dashboards/getAllAppointmentDetails', payload);

      if (res.status) {
        setAppointments(res.data.appointments);
        if (branchName === 'All') {
          const branchOptions = [
            { branchName: 'All' },
            ...res.data.result.map((branch) => ({
              branchName: branch.branchName,
            })),
          ];
          setBranches(branchOptions);
        }
      } else {
        setAppointments([]);
        if (branchName === 'All') setBranches([{ branchName: 'All' }]);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setAppointments([]);
    }
  };

  const deleteAppointmentDetails = async (appointmentId) => {
    setLoading(true);
    try {
      const payload = {
        appointmentId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post('/appointment/deleteAppointmentDetails', payload);

      if (res.status) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appt) => appt.appointmentId !== appointmentId)
        );
        alert('Appointment deleted successfully.');
      } else {
        alert('Failed to delete the appointment.');
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
      alert('An error occurred while deleting the appointment.');
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelection = (branch) => {
    setSelectedBranch(branch);
  };

  const handleEdit = (appt) => {
    navigate('/add-appointment', { state: { appointmentDetails: appt } });
  };

  // const handleDelete = (appt) => {
  //   navigate('/delete-appointment');
  // };
  const handleDelete = (appt) => {
    if (window.confirm(`Are you sure you want to delete appointment ${appt.appointmentId}?`)) {
      deleteAppointmentDetails(appt.appointmentId);
    }
  };
  const handleDetails = (appt) => {
    navigate('/appointment-details', {
      state: { appointmentDetails: appt },
    });
  };

  // useEffect(() => {
  //   fetchAppointmentDetails();
  // }, []);

  useEffect(() => {
    fetchAppointmentDetails(selectedBranch);
  }, [selectedBranch]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      <div className="mb-4">
        <label htmlFor="branchDropdown" className="font-medium mr-2">
          Select Branch:
        </label>
        <select
          id="branchDropdown"
          value={selectedBranch}
          onChange={(e) => handleBranchSelection(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => navigate('/add-appointment')}
        className="bg-yellow-400 text-black font-bold p-2 rounded-md shadow-lg hover:bg-yellow-500 transition-all mb-4"
      >
        Create New Appointment
      </button>

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
        data={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
        loading={loading}
      />
    </div>
  );
};

export default Appointments;
