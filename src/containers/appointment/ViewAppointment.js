import { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useLocation, useNavigate } from "react-router";

export default function ViewAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;
  
  const [formData, setFormData] = useState({
    clientPhonenumber: appointment?.clientPhoneNumber,
    clientName: appointment?.name,
    appointmentType: appointment?.appointmentType,
    branchId: appointment?.branchId,
    appointmentDate: appointment?.date,
    appointmentTime: appointment?.slot,
    description: appointment?.description,
  });
  
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchNamesDropDown');
        if (response.status) {
          setBranchData(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Appointment Details</h2>

      <div>
        <label className="block text-sm font-medium">Client Phone Number</label>
        <input
          type="number"
          name="clientPhonenumber"
          value={formData.clientPhonenumber}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Select Type:</label>
        <select
          name="appointmentType"
          value={formData.appointmentType}
          readOnly
          className="w-full p-3 border rounded-md bg-gray-100"
        >
          <option value="service">Service</option>
          <option value="product">Product</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Branch:</label>
        <select
          name="branchId"
          value={formData?.branchId}
          readOnly
          className="w-full p-3 border rounded-md bg-gray-100"
        >
          {branchData.map((branchItem) => (
            <option key={branchItem.id} value={branchItem.id}>
              {branchItem.branchName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate?.split('/').reverse().join('-') || ''}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Time Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium">Appointment Time</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100"
        ></textarea>
      </div>
    </div>
  );
}
