import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function EditTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

  const [designations, setDesignations] = useState([]);

  const [formData, setFormData] = useState({
    problem: "",
    date: new Date().toISOString().split("T")[0],
    addressingDepartment: "",
    workStatus: "",
    description: "",
  });

  const fetchTicketById = async () => {
    try {
      const response = await ApiService.post("/tickets/getTicketDetailsById", {
        id: ticket.id,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      
      console.log("fetch ticket details:", response);

      if (response.status && response.data.length > 0) {
        const ticketData = response.data[0]; // Since data is an array with one object
        setFormData({
          problem: ticketData.problem || "",
          date: ticketData.date ? ticketData.date.split("T")[0] : new Date().toISOString().split("T")[0],
          addressingDepartment: ticketData.addressingDepartment || "",
          workStatus: ticketData.workStatus || "",
          description: ticketData.description || "",
        });
      } else {
        console.error("Error: API response is invalid or no data found");
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
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

  useEffect(() => {
    if (ticket) {
      fetchTicketById();
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, id: ticket.id };

    try {
      const res = await ApiService.post("/tickets/handleTicketDetails", payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status) {
        alert("Ticket updated successfully!");
        navigate("/tickets");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Problem</label>
          <input
            type="text"
            name="problem"
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
