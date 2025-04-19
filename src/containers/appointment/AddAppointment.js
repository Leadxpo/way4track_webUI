import { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useNavigate } from "react-router";

export default function AddAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientPhonenumber: null,
    clientName:"",
    clientId:null,
    appointmentType:"",
    branchId:null,
    appointmentDate:null,
    appointmentTime:null,
    description: "",
  });
  
  const [branchData, setBranchData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      
    name:formData.clientName,
    clientId:Number(formData.clientId),
    // clientPhonenumber:formData.clientPhonenumber,
    appointmentType:formData.appointmentType,
    branchId:Number(formData.branchId),
    date:formData.appointmentDate,
    slot:formData.appointmentTime,
      description: formData.description,
      // teleCallerId:Number(localStorage.getItem("id")),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    }


    if(payload){
      console.log("====+++",payload);
    }
    try {
      const res = await ApiService.post("/appointment/handleAppointmentDetails", payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.status) {
        alert("Appointment submitted successfully!");
        setFormData({
          clientPhonenumber: null,
          clientName:"",
          clientId:null,
          appointmentType:"",
          branchId:null,
          appointmentDate:null,
          description: "",
        });
        navigate("/appointment-table");
      }

     
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit vehicle.");
    }
  };

const fetchClients = async (phoneNumber) => {
  try {
    const res = await ApiService.post("/client/getClientDetails");
    const matchedClient = res.data?.find(client => client.phoneNumber === phoneNumber); 

    if (matchedClient) {
      const { id, name } = matchedClient; 
      setFormData((prev) => ({
        ...prev,
        clientId:id,
        clientName: name,
      }));
    } else {
      setFormData((prev) => ({ ...prev, clientId: null, clientName: "" })); 
    }
    

  } catch (err) {
    console.error("Failed to fetch client details:", err);

  }
};




const handlePhoneNumber = (e) => {
  const value = e.target.value;

  setFormData(prev => ({ ...prev, clientPhonenumber: value }));

  if (value.length === 10) {
    fetchClients(value);
  } else {

    setFormData(prev => ({ ...prev, clientName: "", clientId: null }));
  }
};

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
if(branchData){
  console.log("++++++eee",branchData)
}

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Appointment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Client Phone Number</label>
          <input
            type="number"
            name="clientPhonenumber"
            placeholder="client Phonenumber"
            value={formData.clientPhonenumber}
            onChange={handlePhoneNumber}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Client Name:</label>
            <input
            type="text"
            name="clientName"
            placeholder="client name"
            value={formData.clientName}
            // onChange={handlePhoneNumber}
            required
            className="w-full p-2 border rounded-md"
          />
          </div>


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
            <option value="service">Service</option>
            <option value="product">Product</option>
          </select>
        </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Branch:</label>
            <select
              name="branchId"
              value={formData?.branchId}
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

        {/* <div>
          <label className="block text-sm font-medium">Appointment Date</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            placeholder="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div> */}
        <div className="flex items-center gap-4">
  {/* Date Input */}
  <div className="flex-1">
    <label className="block text-sm font-medium">Appointment Date</label>
    <input
      type="date"
      name="appointmentDate"
      placeholder="Select date"
      value={formData.appointmentDate}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded-md"
    />
  </div>

  {/* Time Input */}
  <div className="flex-1">
    <label className="block text-sm font-medium">Appointment Time</label>
    <input
      type="time"
      name="appointmentTime"
      placeholder="Select time"
      value={formData.appointmentTime}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded-md"
    />
  </div>
</div>


        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
