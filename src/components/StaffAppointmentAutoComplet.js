import React, { useState, useEffect, useRef } from 'react';

const StaffAppointmentAutocomplete = ({ staffData, formData, setFormData }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // When formData.requestTo changes (e.g., on form load), update inputValue
  useEffect(() => {
    const selected = staffData.find((staff) => staff.id === formData.assignedTo);
    setInputValue(selected ? selected.name : '');
  }, [formData.assignedTo, staffData]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = staffData.filter((staff) =>
      staff.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  const handleOptionClick = (staff) => {
    setInputValue(staff.name);
    setFormData((prev) => ({
      ...prev,
      assignedTo: staff.id, // Save the ID only
    }));
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col relative" ref={containerRef}>
      <label className="font-semibold mb-2">Assign To:</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredOptions(staffData);
          setShowDropdown(true);
        }}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        placeholder="Select Request To"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-auto shadow-md rounded-md" style={{top:80}}>
          {filteredOptions.map((staff) => (
            <li
              key={staff.id}
              onClick={() => handleOptionClick(staff)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {staff.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffAppointmentAutocomplete;
