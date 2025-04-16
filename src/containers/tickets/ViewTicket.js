import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function ViewTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

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

  useEffect(() => {
    if (ticket) {
      fetchTicketById();
    }
  }, [ticket]);


  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">View Ticket</h2>
        <div>
          <label className="block text-sm font-medium">Problem</label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
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
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Addressing Department</label>
          <input
            type="text"
            name="addressingDepartment"
            value={formData.addressingDepartment}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Work Status</label>
          <input
            type="text"
            name="workStatus"
            value={formData.workStatus}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

    </div>
  );
}
