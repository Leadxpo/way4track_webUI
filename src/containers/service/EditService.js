import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function EditService() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [formData, setFormData] = useState({
    name:"",
    description: "",
    duration:""
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        duration:service.duration || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {name:formData.name,companyCode:initialAuthState.companyCode,unitCode:initialAuthState.unitCode,
      description: formData.description,duration:formData.duration,id:service.id
    }

    try {
      const res=await ApiService.post("/ServiceType/handleServiceTypeDetails", data, {
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.status){
        alert("Service updated successfully!");
        navigate("/service");
      }
      
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Service</h2>
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
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
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
