import React, { useState, useEffect, useRef } from 'react';

const ClientAutocomplete = ({ clientData, formData, setFormData }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // When formData.requestTo changes (e.g., on form load), update inputValue
  useEffect(() => {
    const selected = clientData.find((client) => client.id === formData.requestTo);
    setInputValue(selected ? selected.name : '');
  }, [formData.requestTo, clientData]);

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
    const filtered = clientData.filter((client) =>
      client.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  const handleOptionClick = (client) => {
    setInputValue(client.name);
    setFormData((prev) => ({
      ...prev,
      requestTo: client.id, // Save the ID only
    }));
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col relative" ref={containerRef}>
      <label className="font-semibold mb-2">Client:</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredOptions(clientData);
          setShowDropdown(true);
        }}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        placeholder="Select Request To"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-auto shadow-md rounded-md" style={{top:80}}>
          {filteredOptions.map((client) => (
            <li
              key={client.id}
              onClick={() => handleOptionClick(client)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {client.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAutocomplete;
