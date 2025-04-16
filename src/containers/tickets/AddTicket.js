import { useCallback, useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useNavigate } from "react-router";

export default function AddTicket() {
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState({
    problem: "",
    date: "",
    addressingDepartment: "",
    workStatus: "",
    description: "",
    designationRelation: null,
  });

  // Handle general form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the date is valid before calling toString() on it
    const formattedDate = formData.date ? formData.date.toString().split("T")[0] : ""; // Add a fallback value if date is undefined

    const payload = {
      problem: formData.problem,
      date: formattedDate, 
      addressingDepartment: formData.addressingDepartment,
      designationRelation:formData.designationRelation,
      workStatus: formData.workStatus,
      description: formData.description,
      companyCode: initialAuthState?.companyCode,
      unitCode: initialAuthState?.unitCode,
    };

    try {
      const res = await ApiService.post("/tickets/handleTicketDetails", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status) {
        alert("Ticket submitted successfully!");
        setFormData({
          problem: "",
          date: "",
          addressingDepartment: "",
          workStatus: "",
          description: "",
          designationRelation: null 
        });
        navigate("/tickets");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Failed to submit ticket.");
    }
  };

  // Fetch all designations
  const getDesignations = useCallback(async () => {
    try {
      const response = await ApiService.post("/designations/getAllDesignation");
      if (response.status && Array.isArray(response.data)) {
        setDesignations(response.data);
      } else {
        console.error("Failed to fetch designation details.");
      }
    } catch (error) {
      console.error("Error fetching designation details:", error);
    }
  }, []);

  useEffect(() => {
    getDesignations();
  }, [getDesignations]);

  // Handle designation selection change
  const handleDesignationChange = (event) => {
    const value = event.target.value;

    // Find the designation based on selected ID
    const selectedDesignation = designations.find(item => item.id === parseInt(value));

    // Update formData with the selected designation ID and designation name (addressingDepartment)
    setFormData(prevState => ({
      ...prevState,
      designationRelation: selectedDesignation ? selectedDesignation.id : null,
      addressingDepartment: selectedDesignation ? selectedDesignation.designation : "",
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ticket Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Problem</label>
          <input
            type="text"
            name="problem"
            placeholder="Problem"
            value={formData.problem}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Addressing Department</label>
          <select
            name="designation_id"
            value={formData.designationRelation || ""}
            onChange={handleDesignationChange}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none"
          >
            <option value="">Select a Designation</option>
            {designations.map((designation) => (
              <option key={designation.id} value={designation.id}>
                {designation.designation}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Work Status</label>
          <select
            name="workStatus"
            value={formData.workStatus}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="Processing">In Progress</option>
            <option value="completed">Completed</option>
            <option value="allocated">Allocated</option>
            <option value="incomplete">Incomplete</option>
            <option value="install">Install</option>
            <option value="accept">Accept</option>
            <option value="activate">Activate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Description"
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
