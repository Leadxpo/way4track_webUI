import React, { useState } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';

const appointmentsData = [
  {
    No: 1,
    Id: 'APT001',
    AppointmentTime: '10:30 AM',
    Type: 'Consultation',
    AssignPerson: 'Dr. John Doe',
    Slot: '10:30',
    Status: 'Accepted',
    Branch: 'Visakhapatnam',
  },
  {
    No: 2,
    Id: 'APT002',
    AppointmentTime: '11:45 AM',
    Type: 'Follow-Up',
    AssignPerson: 'Dr. Jane Smith',
    Slot: '11:45',
    Status: 'Sent',
    Branch: 'Hyderabad',
  },
  {
    No: 3,
    Id: 'APT003',
    AppointmentTime: '01:15 PM',
    Type: 'Surgery',
    AssignPerson: 'Dr. Emily Johnson',
    Slot: '13:15',
    Status: 'Accepted',
    Branch: 'Vijayawada',
  },
  {
    No: 4,
    Id: 'APT004',
    AppointmentTime: '02:00 PM',
    Type: 'Consultation',
    AssignPerson: 'Dr. Mark Lee',
    Slot: '14:00',
    Status: 'Declined',
    Branch: 'Kakinada',
  },
  {
    No: 5,
    Id: 'APT005',
    AppointmentTime: '03:30 PM',
    Type: 'Diagnostics',
    AssignPerson: 'Dr. Sarah Brown',
    Slot: '15:30',
    Status: 'Sent',
    Branch: 'Visakhapatnam',
  },
  {
    No: 6,
    Id: 'APT006',
    AppointmentTime: '09:00 AM',
    Type: 'Consultation',
    AssignPerson: 'Dr. David Wilson',
    Slot: '09:00',
    Status: 'Accepted',
    Branch: 'Hyderabad',
  },
  {
    No: 7,
    Id: 'APT007',
    AppointmentTime: '10:00 AM',
    Type: 'Follow-Up',
    AssignPerson: 'Dr. Laura Taylor',
    Slot: '10:00',
    Status: 'Declined',
    Branch: 'Vijayawada',
  },
  {
    No: 8,
    Id: 'APT008',
    AppointmentTime: '01:45 PM',
    Type: 'Consultation',
    AssignPerson: 'Dr. Michael White',
    Slot: '13:45',
    Status: 'Sent',
    Branch: 'Kakinada',
  },
  {
    No: 9,
    Id: 'APT009',
    AppointmentTime: '04:00 PM',
    Type: 'Surgery',
    AssignPerson: 'Dr. Anna Harris',
    Slot: '16:00',
    Status: 'Accepted',
    Branch: 'Visakhapatnam',
  },
  {
    No: 10,
    Id: 'APT010',
    AppointmentTime: '05:15 PM',
    Type: 'Diagnostics',
    AssignPerson: 'Dr. Chris Martin',
    Slot: '17:15',
    Status: 'Declined',
    Branch: 'Hyderabad',
  },
];

const cities = ['All', 'Visakhapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada'];

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('All');
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointmentsData);

  // Handle city selection and update filtered appointments
  const handleCitySelection = (city) => {
    setSelectedCity(city);
    if (city === 'All') {
      setFilteredAppointments(appointmentsData);
    } else {
      setFilteredAppointments(
        appointmentsData.filter((appointment) => appointment.Branch === city)
      );
    }
  };

  const handleEdit = (appt) => {
    navigate('/add-appointment', { state: { appointmentDetails: appt } });
  };

  const handleDelete = (appt) => {
    navigate('/delete-appointment');
  };

  const handleDetails = (appt) => {
    navigate('/appointment-details', {
      state: { appointmentDetails: appt },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleCitySelection(city)}
            className={`px-4 py-2 font-medium ${
              selectedCity === city ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {city}
          </button>
        ))}
        <button
          onClick={() => navigate('/add-appointment')}
          className="bg-yellow-400 text-black font-bold p-2 rounded-md shadow-lg hover:bg-yellow-500 transition-all"
        >
          Create New Appointment
        </button>
      </div>

      <Table
        columns={Object.keys(appointmentsData[0])}
        data={filteredAppointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />
    </div>
  );
};

export default Appointments;
