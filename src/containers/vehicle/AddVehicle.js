import { useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useNavigate } from "react-router";

export default function AddVehicle() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {name:formData.name,companyCode:formData.companyCode,unitCode:formData.unitCode,
      description: formData.description
    }

    try {
      const res=await ApiService.post("/VehicleType/handleVehicleTypeDetails", data, {
        headers: { 'Content-Type': 'application/json' }
      });
      if(res.status){
        alert("Vehicle submitted successfully!");
      }
      
      setFormData({
        name: "",
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        description: "",
      });
   navigate("/vehicle");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit vehicle.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Vehicle Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
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
