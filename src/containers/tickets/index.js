
import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

const Tickets = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ name: "" });
  const [ticket, setTicket] = useState([]);
  const [allTickets, setAllTickets] = useState([]); // Store full data
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ApiService.post("/tickets/getTicketDetails",{
        companyCode:initialAuthState?.companyCode,
          unitCode:initialAuthState?.unitCode,
      });
      console.log("fetch ticketss",response);
      if (response.status) {
        setTicket(response.data || []);
        setAllTickets(response.data || []); // Store original data
      } else {
        console.error("Error: API response is invalid");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();
  
    if (searchQuery === "") {
      setTicket(allTickets); // Reset if empty
    } else {
      const filteredData = allTickets.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchQuery)
        )
      );
      setTicket(filteredData);
    }
  };
  

  const handleInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    const payload={id:ticketId,companyCode:initialAuthState.companyCode,unitCode:initialAuthState.unitCode}
  
  
    try {
      const res = await ApiService.post(
        `/tickets/deleteTicketDetails`,
        payload
      );
        if(res.status){
          alert("Ticket deleted successfully!");
      fetchTickets();
        }
      
      // Refresh or update the UI after deletion
    } catch (error) {
      console.error("Error deleting Ticket:", error);
      alert("Failed to delete Ticket.");
    }
  };
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Tickets</h2>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/add-ticket")}
        >
          Add Ticket
        </button>
      </div>

      <div className="flex mb-4">
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="name"
            placeholder="Search"
            value={searchData.name}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b bg-blue-500 text-white text-left">
                <th className="px-6 py-3 text-left text-sm font-bold">Ticket No.</th>
                {/* <th className="px-6 py-3 text-left text-sm font-bold">Branch</th> */}
                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
               
                {/* <th className="px-6 py-3 text-left text-sm font-bold">Problem</th> */}
                {/* <th className="px-6 py-3 text-left text-sm font-bold">Addressing Department</th> */}
                
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {ticket.length > 0 ? (
                ticket.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    
                    <td className="px-6 py-4">{item.ticketNumber}</td>
                    {/* <td className="px-6 py-4">{item.branchName}</td> */}
                    {/* <td className="px-6 py-4">{item.problem}</td> */}
                    {/* <td className="px-6 py-4">{item.addressingDepartment}</td> */}
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(item.id);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === item.id && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/edit-ticket", { state: { ticket: item } })}>Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  onClick={() => handleDelete(item.id)}>Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  onClick={() => navigate("/view-ticket", { state: { ticket: item } })}>More Details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tickets;


