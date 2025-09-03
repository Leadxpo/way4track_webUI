import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import hasPermission from '../../common/permission'

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [appointments, setAppointments] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [loading, setLoading] = useState(false);
  var permission = localStorage.getItem("userPermissions");
  const [columns, setColumns] = useState([]);

  const role = localStorage.getItem('role');
  const storedBranch = localStorage.getItem('branchName');

  const fetchAppointmentDetails = async (branchName = 'All') => {
    try {
      setLoading(true);

      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post(
        '/dashboards/getAllAppointmentDetails',
        payload
      );

      if (res.status) {
        const fetchedAppointments = res.data.appointments || [];
        setAppointments(fetchedAppointments);

        // Only update branch options if viewing all
        if (branchName === 'All') {
          const branchOptions = [
            { branchName: 'All' },
            ...(res.data.result || []).map((branch) => ({
              branchName: branch.branchName,
            })),
          ];
          setBranches(branchOptions);
        }

        // Dynamically set columns from first record if available
        if (fetchedAppointments.length > 0) {
          setColumns(Object.keys(fetchedAppointments[0]));
        }
      } else {
        setAppointments([]);
        if (branchName === 'All') setBranches([{ branchName: 'All' }]);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments =
    role === 'Branch Manager' && storedBranch
      ? appointments.filter((item) => item.branchName === storedBranch)
      : appointments;

  const deleteAppointmentDetails = async (appointmentId) => {
    setLoading(true);
    try {
      const payload = {
        appointmentId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post(
        '/api/appointment/deleteAppointmentDetails',
        payload
      );

      if (res.status) {
        setAppointments((prev) =>
          prev.filter((appt) => appt.appointmentId !== appointmentId)
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

  const handleDelete = (appt) => {
    if (
      window.confirm(
        `Are you sure you want to delete appointment ${appt.appointmentId}?`
      )
    ) {
      deleteAppointmentDetails(appt.appointmentId);
    }
  };

  const handleDetails = (appt) => {
    navigate('/appointment-details', {
      state: { appointmentDetails: appt },
    });
  };

  useEffect(() => {
    fetchAppointmentDetails(selectedBranch);
  }, [selectedBranch]);

  // Default columns for table display
  const staticColumns = [
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
  ];

  return (
    <div className="w-full  mx-auto">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {role !== 'Branch Manager' && (
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
      )}
{hasPermission(permission, "appointments", "add")&&
      <button
        onClick={() => navigate('/add-appointment')}
        className={`text-black font-bold p-2 rounded-md shadow-lg transition-all mb-4 ${
          hasPermission(permission, "appointments", "add")
            ? 'bg-yellow-600 hover:bg-blue-600 hover:bg-yellow-500'
            : 'bg-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        Create New Appointment
      </button>
}

      <Table
        columns={columns}
        columnNames={columns}
        data={filteredAppointments}
        showCreateBtn={false}
        showEdit={hasPermission(permission, "appointments", "edit")}
        showDelete={hasPermission(permission, "appointments", "delete")}
        showDetails={hasPermission(permission, "appointments", "view")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails} 
        loading={loading}
      />
    </div>
  );
};

export default Appointments;
