import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddEditAppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentDetails = location.state?.appointmentDetails || null;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);        // Ref to trigger file input
  const [formData, setFormData] = useState({
    appointmentType: appointmentDetails?.appointmentType || '',
    name: appointmentDetails?.appointment_name || '',
    callType: appointmentDetails?.callType || '',
    service: appointmentDetails?.service || '',
    id: appointmentDetails?.appointment_id || null,
    status: appointmentDetails?.status || 'pending',
    assignedTo: appointmentDetails?.staffId || '',
    date: appointmentDetails?.date.split("T")[0] || '',
    slot: appointmentDetails?.slot || '00:00',
    period: appointmentDetails?.period || 'AM',
    branchId: appointmentDetails?.branchId || '',
    clientId: appointmentDetails?.clientId || '',
    clientName: appointmentDetails?.clientName || '',
    clientPhoneNumber: appointmentDetails?.clientPhoneNumber || '',
    clientAddress: appointmentDetails?.clientAddress || '',
    description: appointmentDetails?.description || '',
    photo: appointmentDetails?.image || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });



  const [branchData, setBranchData] = useState([]);
  const [client, setClient] = useState([]);
  const [staff, setStaff] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...(prev || []), ...newPreviews]); // ensure imagePreviews is array

    setSelectedFiles(files);
  };

  const handleReplaceImage = (index) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => {
          const updated = [...prev.photo];
          updated[index] = file;
          return { ...prev, photo: updated };
        });
        setImagePreviews((prev) => {
          const updated = [...prev];
          updated[index] = URL.createObjectURL(file);
          return updated;
        });
      }
    };
    fileInput.click();
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.photo];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      photo: updatedImages,
    }));
  };

  // Handle client dropdown change and update client-related fields
  const handleDropdownChange = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = client.find(
      (clientDetails) => clientDetails.clientId === selectedClientId
    );

    setFormData((prev) => ({
      ...prev,
      clientId: selectedClientId,
      clientName: selectedClient?.name || '',
      clientPhoneNumber: selectedClient?.phoneNumber || '',
      clientAddress: selectedClient?.address || '',
    }));
  };

  // Fetch branch data

  useEffect(() => {
    if (appointmentDetails) {
      setImagePreviews(appointmentDetails?.image)
    }
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
  // Fetch client data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        setClient(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setClient([]);
      }
    };
    fetchClients();
  }, []);

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

  // Combine date and time for submission
  const combineDateTime = () => {
    const { date, slot, period } = formData;
    const [day, month, year] = date.split('-');
    const adjustedHours =
      period === 'PM' && slot.split(':')[0] !== '12'
        ? parseInt(slot.split(':')[0], 10) + 12
        : slot.split(':')[0];
    return `${year}-${month}-${day}T${adjustedHours}:${slot.split(':')[1]}:00`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myID = localStorage.getItem("Id")
    const combinedDateTime = combineDateTime();
    const formDataToSend = new FormData();
    selectedFiles.length > 0 && (
      selectedFiles.forEach((file) => {
        formDataToSend.append('photo', file);
      })
    )

    if (formData.photo && Array.isArray(formData.photo)) {
      await Promise.all(
        formData.photo?.map(async (item) => {
          if (typeof item === 'string') {
            const response = await fetch(item);
            const blob = await response.blob();
            const filename = item?.split('/').pop();
            const file = new File([blob], filename, { type: blob.type });
            formDataToSend.append("photo", file);
          }else{
            formDataToSend.append("photo", item);
          }
        })
      );
    }

    // Append all fields
    const payload = {
      ...formData,
      dateTime: combinedDateTime,
      createdBy: myID,
    };

    for (let key in payload) {
      if (payload[key] !== undefined && payload[key] !== null && key !== 'photo') {
        formDataToSend.append(key, payload[key]);
      }
    }
    try {
      const endpoint = formData.id
        ? '/appointment/handleAppointmentDetails'
        : '/appointment/handleAppointmentDetails';
      const response = await ApiService.post(endpoint, formDataToSend);

      if (response.status) {
        alert(
          formData?.id
            ? 'Appointment updated successfully!'
            : 'Appointment created successfully!'
        );
        navigate('/appointments');
      } else {
        alert('Failed to save appointment details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving appointment details:', error);
      alert('Failed to save appointment details. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 rounded-lg space-y-6"
    >
      <h1 className="text-3xl font-bold mb-4">
        {appointmentDetails ? 'Edit Appointment' : 'Create Appointment'}
      </h1>

      {/* Appointment Type */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Select Type:</label>
        <select
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="Service">Service</option>
          <option value="Product">Product</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Select Call Type:</label>
        <select
          name="callType"
          value={formData.callType}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="" disabled>
            Select Call Type
          </option>
          <option value="INBOND">INBOND</option>
          <option value="OUTBOND">OUTBOND</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Select Service Type:</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="" disabled>
            Select Service Type
          </option>
          <option value="RENEWAL">RENEWAL</option>
          <option value="SALE_PITCHING">SALE_PITCHING</option>
          <option value="FOLLOW_UP">FOLLOW_UP</option>
        </select>
      </div>

      {/* Name */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Enter Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Name"
        />
      </div>

      {/* Assign To */}
      {staff.length > 0 && (
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Assign To:</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="" disabled>
              Select Staff
            </option>
            {staff.map((staffMember) => (
              <option key={staffMember.id} value={staffMember.id}>
                {staffMember.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
      </div>

      {/* Time Slot */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Time:</label>
        <input
          type="time"
          name="slot"
          value={formData.slot}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
      </div>

      {/* Period */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Period:</label>
        <select
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>


      {/* Branch */}
      {branchData.length > 0 && (
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Branch:</label>
          <select
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="" disabled>
              Select Branch
            </option>
            {branchData.map((branchItem) => (
              <option key={branchItem.id} value={branchItem.id}>
                {branchItem.branchName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Client Details */}
      {client.length > 0 && (
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Client:</label>
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleDropdownChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="" disabled>
              Select Client
            </option>
            {client.map((clientItem) => (
              <option key={clientItem.id} value={clientItem.id}>
                {clientItem.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          rows={4}
          placeholder="Enter Description"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Package Images:</label>
        <input
          type="file"
          multiple
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews?.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => handleReplaceImage(index)}
              />
              <span className="text-xs absolute bottom-1 left-1 bg-white/80 px-1 rounded-sm">
                Click to Replace
              </span>
            </div>
          ))}
        </div>
      </div>

      {formData.id && <div className="flex flex-col">
        <label className="font-semibold mb-2">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="sent">Sent</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
      </div>}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
      >
        {formData.id ? 'Update Appointment' : 'Create Appointment'}
      </button>
    </form>
  );
};

export default AddEditAppointmentForm;
