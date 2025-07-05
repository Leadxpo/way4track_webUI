import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentDetails = location.state?.appointmentDetails || null;

  const [formData, setFormData] = useState({
    appointmentType: appointmentDetails?.appointmentType || '',
    name: appointmentDetails?.appointment_name || '',
    id: appointmentDetails?.appointment_id || null,
    status: appointmentDetails?.status || 'pending',
    assignedTo: appointmentDetails?.assignedTo || '',
    date: appointmentDetails?.date || '',
    slot: appointmentDetails?.slot || '00:00',
    period: appointmentDetails?.period || 'AM',
    branchId: appointmentDetails?.branchId || '',
    clientId: appointmentDetails?.clientId || '',
    clientName: appointmentDetails?.clientName || '',
    clientPhoneNumber: appointmentDetails?.clientPhoneNumber || '',
    clientAddress: appointmentDetails?.clientAddress || '',
    description: appointmentDetails?.description || '',
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
    const combinedDateTime = combineDateTime();

    const payload = {
      ...formData,
      dateTime: combinedDateTime,
      // staffId:
    };

    try {
      const endpoint = formData.id
        ? '/appointment/handleAppointmentDetails'
        : '/appointment/handleAppointmentDetails';
      const response = await ApiService.post(endpoint, payload);

      if (response.status) {
        alert(
          formData?.id
            ? 'Appointment updated successfully!'
            : 'Appointment created successfully!'
        );
        navigate('/customer-care-home');
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

export default AddAppointment;









// import { useEffect, useState } from "react";
// import ApiService, { initialAuthState } from "../../services/ApiService";
// import { useNavigate } from "react-router";

// export default function AddAppointment() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     clientPhonenumber: null,
//     clientName:"",
//     clientId:null,
//     appointmentType:"",
//     branchId:null,
//     appointmentDate:null,
//     appointmentTime:null,
//     description: "",
//   });
  
//   const [branchData, setBranchData] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
      
//     name:formData.clientName,
//     clientId:Number(formData.clientId),
//     // clientPhonenumber:formData.clientPhonenumber,
//     appointmentType:formData.appointmentType,
//     branchId:Number(formData.branchId),
//     date:formData.appointmentDate,
//     slot:formData.appointmentTime,
//       description: formData.description,
//       // teleCallerId:Number(localStorage.getItem("id")),
//       companyCode: initialAuthState.companyCode,
//       unitCode: initialAuthState.unitCode,
//     }


//     if(payload){
//       console.log("====+++",payload);
//     }
//     try {
//       const res = await ApiService.post("/appointment/handleAppointmentDetails", payload, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (res.status) {
//         alert("Appointment submitted successfully!");
//         setFormData({
//           clientPhonenumber: null,
//           clientName:"",
//           clientId:null,
//           appointmentType:"",
//           branchId:null,
//           appointmentDate:null,
//           description: "",
//         });
//         navigate("/appointment-table");
//       }

     
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit vehicle.");
//     }
//   };

// const fetchClients = async (phoneNumber) => {
//   try {
//     const res = await ApiService.post("/client/getClientDetails");
//     const matchedClient = res.data?.find(client => client.phoneNumber === phoneNumber); 

//     if (matchedClient) {
//       const { id, name } = matchedClient; 
//       setFormData((prev) => ({
//         ...prev,
//         clientId:id,
//         clientName: name,
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, clientId: null, clientName: "" })); 
//     }
    

//   } catch (err) {
//     console.error("Failed to fetch client details:", err);

//   }
// };




// const handlePhoneNumber = (e) => {
//   const value = e.target.value;

//   setFormData(prev => ({ ...prev, clientPhonenumber: value }));

//   if (value.length === 10) {
//     fetchClients(value);
//   } else {

//     setFormData(prev => ({ ...prev, clientName: "", clientId: null }));
//   }
// };

//     useEffect(() => {
//       const fetchBranches = async () => {
//         try {
//           const response = await ApiService.post('/branch/getBranchNamesDropDown');
//           if (response.status) {
//             setBranchData(response.data); // Set branches to state
//           } else {
//             console.error('Failed to fetch branches');
//           }
//         } catch (error) {
//           console.error('Error fetching branches:', error);
//         }
//       };
//       fetchBranches();
//     }, []);
// if(branchData){
// }

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Appointment Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Client Phone Number</label>
//           <input
//             type="number"
//             name="clientPhonenumber"
//             placeholder="client Phonenumber"
//             value={formData.clientPhonenumber}
//             onChange={handlePhoneNumber}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//           <div className="flex flex-col">
//             <label className="font-semibold mb-2">Client Name:</label>
//             <input
//             type="text"
//             name="clientName"
//             placeholder="client name"
//             value={formData.clientName}
//             // onChange={handlePhoneNumber}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//           </div>


//         <div className="flex flex-col">
//           <label className="font-semibold mb-2">Select Type:</label>
//           <select
//             name="appointmentType"
//             value={formData.appointmentType}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
//           >
//             <option value="" disabled>
//               Select Type
//             </option>
//             <option value="service">Service</option>
//             <option value="product">Product</option>
//           </select>
//         </div>

//           <div className="flex flex-col">
//             <label className="font-semibold mb-2">Branch:</label>
//             <select
//               name="branchId"
//               value={formData?.branchId}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
//             >
//               <option value="" disabled>
//                 Select Branch
//               </option>
//               {branchData.map((branchItem) => (
//                 <option key={branchItem.id} value={branchItem.id}>
//                   {branchItem.branchName}
//                 </option>
//               ))}
//             </select>
//           </div>

//         {/* <div>
//           <label className="block text-sm font-medium">Appointment Date</label>
//           <input
//             type="datetime-local"
//             name="appointmentDate"
//             placeholder="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md"
//           />
//         </div> */}
//         <div className="flex items-center gap-4">
//   {/* Date Input */}
//   <div className="flex-1">
//     <label className="block text-sm font-medium">Appointment Date</label>
//     <input
//       type="date"
//       name="appointmentDate"
//       placeholder="Select date"
//       value={formData.appointmentDate}
//       onChange={handleChange}
//       required
//       className="w-full p-2 border rounded-md"
//     />
//   </div>

//   {/* Time Input */}
//   <div className="flex-1">
//     <label className="block text-sm font-medium">Appointment Time</label>
//     <input
//       type="time"
//       name="appointmentTime"
//       placeholder="Select time"
//       value={formData.appointmentTime}
//       onChange={handleChange}
//       required
//       className="w-full p-2 border rounded-md"
//     />
//   </div>
// </div>


//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             placeholder="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md"
//           ></textarea>
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
