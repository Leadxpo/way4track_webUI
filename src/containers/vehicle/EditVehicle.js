import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function EditVehicle() {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicle = location.state?.vehicle;

  const [formData, setFormData] = useState({
    name:"",
    description: ""
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || "",
        description: vehicle.description || ""
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {name:formData.name,companyCode:initialAuthState.companyCode,unitCode:initialAuthState.unitCode,
      description: formData.description,id:vehicle.id
    }

    try {
      await ApiService.post("/VehicleType/handleVehicleTypeDetails", data, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert("vehicle updated successfully!");
      navigate("/vehicle");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("Failed to update vehicle.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
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
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>



        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
}
