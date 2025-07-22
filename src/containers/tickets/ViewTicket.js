import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function ViewTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

  const [formData, setFormData] = useState({
    problem: "",
    remark: "",
    date: new Date().toISOString().split("T")[0],
    ticketNumber: "",
    workStatus: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, id: ticket.id };

    try {
      const res = await ApiService.post("/tickets/handleTicketDetails", {id:ticket.id,remark:formData.remark,workStatus:formData.workStatus}, {
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

  const fetchTicketById = async () => {
    try {
      const response = await ApiService.post("/tickets/getTicketDetailsById", {
        id: ticket.id,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      console.log("fetch ticket details: fetchTicketById view", response.data);

      if (response.status && response.data) {
        const ticketData = response.data;
        setFormData({
          problem: ticketData.problem || "",
          remark: ticketData.remark || "",
          date: ticketData.date ? ticketData.date.split("T")[0] : new Date().toISOString().split("T")[0],
          designationRelation: ticketData.designationRelation.designation,
          ticketNumber: ticketData.ticketNumber || "",
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
        <label className="block text-sm font-medium">
          Ticket Number
        </label>
        <input
          type="text"
          name="addressingDepartment"
          value={formData.ticketNumber}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
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
        <label className="block text-sm font-medium">Designation Relation</label>
        <input
          type="text"
          name="problem"
          value={formData.designationRelation}
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
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          required
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>


      <div className="p-6 bg-primary rounded-lg shadow-md">
        <h1 className="m-3 text-l text-white font-bold" style={{fontWeight:'bold'}}>Update Status</h1>
        <label className="block text-sm font-medium text-white ">Work Status</label>
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

        <div>
          <label className="block text-sm font-medium text-white ">Remark</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <button type="button" className="w-50 mt-3 text-black p-2 rounded-md" style={{backgroundColor:'white'}} onClick={(e)=>handleSubmit(e)}>
          Update
        </button>

      </div>
    </div>
  );
}
