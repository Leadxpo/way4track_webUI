import React, { useState, useEffect, useRef } from 'react';

const ClientAutocomplete = ({ client, formData, setFormData }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Set input field to selected client's name on form load or update
  useEffect(() => {
    const selected = client.find((c) => c.id === formData.clientId);
    setInputValue(selected ? selected.name : '');
  }, [formData.clientId, client]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter clients on input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = client.filter((c) =>
      c.name?.toLowerCase().includes(value?.toLowerCase())
    );

    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  // Handle selection from dropdown
  const handleOptionClick = (selectedClient) => {
    setInputValue(selectedClient.name);
    setFormData((prev) => ({
      ...prev,
      clientId: selectedClient.id, // Save the ID only
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
          setFilteredOptions(client);
          setShowDropdown(true);
        }}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        placeholder="Select Client"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border max-h-60 overflow-auto shadow-md rounded-md" style={{marginTop:90}}>
          {filteredOptions.map((clientItem) => (
            <li
              key={clientItem.id}
              onClick={() => handleOptionClick(clientItem)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {clientItem.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAutocomplete;
