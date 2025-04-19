import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

const AppointmentTable = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ name: "" });
 // Store full data
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
const [appointment, setAppointment] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await ApiService.post("/appointment/getAllAppointmentDetails");
      if (response.data) {
        setAppointment(response.data || []);
        setAllAppointments(response.data || []); // Store original data
        console.log("hi",response.data)
      } else {
        console.error("Error: API response is invalid");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();
  
    if (searchQuery === "") {
      setAppointment(allAppointments); // Reset if empty
    } else {
      const filteredData = allAppointments.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchQuery)
        )
      );
      setAppointment(filteredData);
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

  const handleDelete = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    const payload={id:appointmentId,companyCode:initialAuthState.companyCode,unitCode:initialAuthState.unitCode}
  
  
    try {
      const res = await ApiService.post(
        `/appointment/deleteAppointmentDetails`,
        payload
      );
        if(res.status){
          alert("Appointment deleted successfully!");
      fetchAppointments();
        }
      
      // Refresh or update the UI after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/create-appointment")}
        >
          Create Appointment
        </button>
      </div>

      <div className="flex mb-4">
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
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
              <th className="px-6 py-3 text-left text-sm font-bold">Appointment Id</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Appointment Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{item.appointmentId}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    

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
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/edit-appointment", { state: { appointment: item } })}>Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  onClick={() => handleDelete(item.id)}>Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/view-appointment", { state: { appointment: item } })}>More details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Appointments found
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

export default AppointmentTable;

