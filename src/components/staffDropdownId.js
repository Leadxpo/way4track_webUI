import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const StaffDropdown = ({ setStaffDetails }) => {
  const [staffList, setStaffList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Fetch staff dropdown list
  useEffect(() => {
    axios
      .post("https://sharontelematics.org/api/staff/getStaffNamesDropDown")
      // .post("http://localhost:3000/api/staff/getStaffNamesDropDown")
      .then((response) => {
        if (response.data.status) {
          setStaffList(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching staff list:", error));
  }, []);

  // Handle input change and filter staff list
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = staffList.filter((staff) =>
      staff.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  // Handle option selection
  const handleOptionClick = (staff) => {
    setInputValue(staff.name);
    fetchStaffDetails(staff.staffId);
    setShowDropdown(false);
  };

  // Fetch staff details by ID
  const fetchStaffDetails = (staffId) => {
    axios
        .post("https://sharontelematics.org/api/staff/getStaffDetailsById", {
        // .post("http://localhost:3000/api/staff/getStaffDetailsById", {
        staffId: staffId,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      })
      .then((response) => {
        if (response.data.status) {
          setStaffDetails(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching staff details:", error));
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto" ref={containerRef}>
      <label className="block text-sm font-medium mb-1">Select Staff</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredOptions(staffList);
          setShowDropdown(true);
        }}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        placeholder="Start typing staff name..."
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 max-h-60 overflow-auto shadow-md rounded-md">
          {filteredOptions.map((staff) => (
            <li
              key={staff.staffId}
              onClick={() => handleOptionClick(staff)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {staff.staffId} - {staff.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffDropdown;
