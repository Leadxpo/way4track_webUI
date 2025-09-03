import React, { useState, useEffect, useRef } from 'react';
import ApiService, { initialAuthState } from '../services/ApiService';

const StaffInhandAutocomplete = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Fetch staff data from backend
  const fetchStaff = async () => {
    const branchName = localStorage.getItem('branchName');
    try {
      const payload = {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        ...(branchName && { branchName }),
      };

      const response = await ApiService.post('/dashboards/getTotalStaffDetails', payload);

      if (response.data) {
        const filteredStaff = response.data.staff.filter(
          (staff) =>
            staff.staffDesignation === 'Technician' || staff.staffDesignation === 'Sr.Technician'
        );

        // Map to consistent format for autocomplete
        const formattedStaff = filteredStaff.map((staff) => ({
          id: staff.id,
          name: staff.staffName,
        }));

        setStaffList(formattedStaff);
      } else {
        console.log('No staff data returned');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Sync selected staff from formData
  useEffect(() => {
    const selected = staffList.find((staff) => staff.id === formData.staffId);
    setInputValue(selected ? selected.name : '');
  }, [formData.staffId, staffList]);

  // Close dropdown when clicked outside
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

    const filtered = staffList.filter((staff) =>
      staff.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  const handleOptionClick = (staff) => {
    setInputValue(staff.name);
    setFormData((prev) => ({
      ...prev,
      staffId: staff.id,
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
          setFilteredOptions(staffList);
          setShowDropdown(true);
        }}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        placeholder="Select Staff"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-auto shadow-md rounded-md" style={{ top: 80 }}>
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

export default StaffInhandAutocomplete;
