import { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const StaffDropdown = ({ setStaffDetails }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");

  // Fetch staff dropdown list
  useEffect(() => {
    axios
      .post("https://sharontelematics.org/api/staff/getStaffNamesDropDown")
      .then((response) => {
        if (response.data.status) {
          setStaffList(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching staff list:", error));
  }, []);

  // Fetch staff details when a staff is selected
  const fetchStaffDetails = (staffId) => {
    console.log(staffId)
    setSelectedStaffId(staffId);
    axios
      .post("https://sharontelematics.org/api/staff/getStaffDetailsById", {
        staffId: staffId,companyCode: "WAY4TRACK", unitCode: "WAY4" // Sending staffId in the request body
      })
      .then((response) => {
        if (response.data.status) {
          setStaffDetails(response.data.data); // ✅ Correctly updating state via props
          console.log("rrr : ",response.data.data)
        }
      })
      .catch((error) => console.error("Error fetching staff details:", error));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Staff Dropdown */}
      <div className="relative">
        <div className="flex justify-between items-center w-full shadow-lg rounded-md p-4  border border-gray-200">
          <span className=" flex-1">Staff ID:</span>
          <select
            className=" text-green-700 outline-none border-none cursor-pointer"
            value={selectedStaffId}
            onChange={(e) => fetchStaffDetails(e.target.value)}
          >
            <option value="" disabled>Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.staffId}>
                {staff.staffId} - {staff.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StaffDropdown;
