// import { useEffect, useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import ApiService, { initialAuthState } from '../../services/ApiService';
// import { useNavigate } from "react-router-dom";

// export default function GroupForm({ editData = null }) {
//   const [groupName, setGroupName] = useState("");
//   const [underGroup, setUnderGroup] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [underType, setUnderType] = useState("");

//   const navigate = useNavigate();


//   useEffect(() => {
//     if (editData) {
//       setGroupName(editData.name);
//       setUnderGroup(editData.underGroup);
//       setUnderType(editData.tds);
//     }
//   }, [editData]);

//   const handleDropdownSelect = (value) => {
//     setUnderType(value);
//     setDropdownOpen(false);
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       name: groupName,
//       underGroup: underGroup,
//       underType: underType,
      

//       companyCode: initialAuthState?.companyCode,
//       unitCode: initialAuthState?.unitCode,
//     };

//     try {
//       const url = editData ? "/groups/update" : "/groups/create";
//       const response = await ApiService.post(url, payload);

//       if (response.status) {
//         alert(`Group ${editData ? "updated" : "created"} successfully!`);
//         navigate("/groups"); // ✅ Go back to Group list
//       } else {
//         alert(response.data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       alert("Failed to save group. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl space-y-6">
//         <h2 className="text-xl font-bold">{editData ? "Edit Group" : "Create Group"}</h2>

//         <div>
//           <label className="block font-semibold mb-2">Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             className="w-full p-3 bg-gray-300 rounded shadow-inner outline-none"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-2">Under Group:</label>
//           <input
//             type="text"
//             value={underGroup}
//             onChange={(e) => setUnderGroup(e.target.value)}
//             className="w-full p-3 bg-gray-300 rounded shadow-inner outline-none"
//           />
//         </div>

//         <div className="relative">
//           <label className="block font-semibold mb-2">Under Type:</label>
//           <div
//             className="w-full bg-green-600 text-white p-3 rounded flex justify-between items-center cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {underType || "Under Type:"}
//             <FaChevronDown />
//           </div>
//           {dropdownOpen && (
//             <div className="absolute w-full bg-gray-300 mt-1 rounded shadow z-10">
//               <p
//                 className="p-3 hover:bg-gray-200 cursor-pointer font-semibold"
//                 onClick={() => handleDropdownSelect("Primary")}
//               >
//                 Primary
//               </p>
//               <p
//                 className="p-3 hover:bg-gray-200 cursor-pointer font-semibold"
//                 onClick={() => handleDropdownSelect("Secondary")}
//               >
//                 Secondary
//               </p>
//             </div>
//           )}
//         </div>

//         {/* <div>
//           <label className="block font-semibold mb-2">TDS Deductible</label>
//           <div className="flex items-center space-x-2 bg-gray-300 p-2 rounded shadow-inner w-fit">
//             <button
//               className={`px-4 py-2 rounded ${
//                 tdsDeductible === "Yes" ? "bg-green-600 text-white" : "bg-white text-black"
//               }`}
//               onClick={() => setTdsDeductible("Yes")}
//             >
//               Yes
//             </button>
//             <button
//               className={`px-4 py-2 rounded ${
//                 tdsDeductible === "No" ? "bg-green-600 text-white" : "bg-white text-black"
//               }`}
//               onClick={() => setTdsDeductible("No")}
//             >
//               No
//             </button>
//           </div>
//         </div> */}

//         <div>
//           <button
//             onClick={handleSubmit}
//             className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded"
//           >
//             {editData ? "Update Group" : "Add Group"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

export default function GroupForm() {
  const location = useLocation();
  console.log("Location Location",location?.state?.item);
  const editData =  location?.state?.item
  console.log("Location Location",location?.state?.item);
  const [groupName, setGroupName] = useState("");
  const [under, setUnder] = useState(""); 
  const [underType, setUnderType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subTypeDropdownOpen, setSubTypeDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const primaryOptions = ["assets", "liabilities", "expenses", "income"];
  const secondaryOptions = [
    "bank_accounts", "bank_od", "branch_division", "capital_account", "cash_in_hand",
    "current_assets", "current_liabilities", "Commission Received", "deposits",
    "direct_expenses", "direct_incomes", "duties_and_taxes", "indirect_expenses",
    "indirect_income", "fixed_assets", "investments", "Interest Income",
    "loans_and_advances", "loans", "Miscellaneous_expenses", "provisions",
    "purchase_account", "reserves_and_surplus", "retained_earnings", "Rental Income",
    "sales_account", "secured_loans", "stock_in_hand", "sundry_creditors",
    "sundry_debtors", "suspense_account", "unsecured_loans", "Manufacturing_Expenses"
  ];

  const optionsToRender = underType === "primary" ? primaryOptions : secondaryOptions;

  useEffect(() => {
    if (editData) {
      console.log("Edit Data: ", editData); // Debugging line to check editData
      setGroupName(editData?.name);
      setUnder(editData?.under || ""); // Ensure it's set to an empty string if undefined
      setUnderType(editData?.underType || ""); // Changed from 'tds' to 'underType'
      setSelectedSubType(editData?.under || "");
    }
  }, [editData]);

  const handleDropdownSelect = (value) => {
    setUnderType(value);
    setSelectedSubType(""); // Reset subtype when underType changes
    setDropdownOpen(false);
  };

  const handleSubTypeSelect = (value) => {
    setSelectedSubType(value);
    setSubTypeDropdownOpen(false);
  };

  const handleSubmit = async () => {
    const payload = {
      name: groupName,
    
      underType: underType,
      under: selectedSubType,
      companyCode: initialAuthState?.companyCode,
      unitCode: initialAuthState?.unitCode,
    };

    if (editData?.id) {
      payload.id = editData.id;
    }

    try {
      const url = editData ? "/groups/update" : "/groups/create";
      const response = await ApiService.post(url, payload);

      if (response.status) {
        alert(`Group ${editData ? "updated" : "created"} successfully!`);
        navigate("/groups");
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to save group. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl space-y-6">
        <h2 className="text-xl font-bold">{editData ? "Edit Group" : "Create Group"}</h2>

        <div>
          <label className="block font-semibold mb-2">Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-3 bg-gray-300 rounded shadow-inner outline-none"
          />
        </div>

        {/* Under Type Dropdown */}
        <div className="relative">
          <label className="block font-semibold mb-2">Under Type:</label>
          <div
            className="w-full bg-green-600 text-white p-3 rounded flex justify-between items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {underType || "Under Type:"}
            <FaChevronDown />
          </div>
          {dropdownOpen && (
            <div className="absolute w-full bg-gray-300 mt-1 rounded shadow z-10">
              <p
                className="p-3 hover:bg-gray-200 cursor-pointer font-semibold"
                onClick={() => handleDropdownSelect("primary")}
              >
                Primary
              </p>
              <p
                className="p-3 hover:bg-gray-200 cursor-pointer font-semibold"
                onClick={() => handleDropdownSelect("secondary")}
              >
                Secondary
              </p>
            </div>
          )}
        </div>

        {/* Under Group Dropdown */}
        {underType && (
          <div className="relative">
            <label className="block font-semibold mb-2">
              Under Group:
            </label>
            <div
              className="w-full bg-blue-600 text-white p-3 rounded flex justify-between items-center cursor-pointer"
              onClick={() => setSubTypeDropdownOpen(!subTypeDropdownOpen)}
            >
              {selectedSubType || (under ? `Select ${under} option` : "Select an option")}
              <FaChevronDown />
            </div>
            {subTypeDropdownOpen && (
              <div className="absolute w-full bg-gray-300 mt-1 max-h-60 overflow-y-auto rounded shadow z-10">
                {optionsToRender.map((opt, i) => (
                  <p
                    key={i}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSubTypeSelect(opt)}
                  >
                    {opt}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded"
          >
            {editData ? "Update Group" : "Add Group"}
          </button>
        </div>
      </div>
    </div>
  );
}
