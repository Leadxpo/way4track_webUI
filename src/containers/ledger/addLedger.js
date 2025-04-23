import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const CustomerForm = ({ editData }) => {
  const navigate = useNavigate();
  
  const [groupData, setGroupData] = useState([]);
  const [formData, setFormData] = useState({
    name: editData?.customerName || '',
    groupId: editData?.groupId || '',
    groupName: editData?.groupName || '',
    state: editData?.state || '',
    country: editData?.country || '',
    panNumber: editData?.panNumber || '',
    registrationType: editData?.registrationType || '',
    tcsDeductable: editData?.tcsDeductable || '',
    tdsDeductable: editData?.tdsDeductable || '',


    gstNumber: editData?.gstNumber || '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        name: formData.customerName,
        group: formData.groupName,
        groupId:formData.groupId,
        state: formData.state,
        country: formData.country,
        panNumber: formData.panNumber,
        registrationType: formData.registrationType,
        tcsDeductable: Boolean(formData.tcsDeductable),
tdsDeductable: Boolean(formData.tdsDeductable),
        gstUinNumber: formData.gstNumber,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      };
      

    const url = editData ? '/ledger/updateStatus' : '/ledger/handleLedgerDetails';

    try {
      const response = await ApiService.post(url, payload);

      if (response.status) {
        alert(`Ledger ${editData ? 'updated' : 'created'} successfully!`);
        navigate('/ledger'); // ✅ Navigate to Ledger list page
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save ledger. Please try again.');
    }
  };


    const fetchGroups = async () => {
      try {
        const response = await ApiService.post('/groups/getGroupDataForTable', {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        });


        console.log("pppppp uuuuuuu",response.data)
  
        if (response.status) {
          setGroupData(response.data);
         if(groupData){
          console.log("pppppp uuuuuuu groupData",groupData)
         }
        } else {
          console.error('Failed to fetch group data');
          setGroupData([]);
          // setFilteredData([]);
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    useEffect(() => {
        fetchGroups();
      }, []);

      const handleGroupChange = (e) => {
        const selectedId = Number(e.target.value);
        const selectedGroup = groupData.find(
          (group) => group.id === selectedId
        );
      
        if (selectedGroup) {
          setFormData((prev) => ({
            ...prev,
            groupName: selectedGroup.name,
            groupId: selectedId,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            groupName: '',
            groupId: '',
          }));
        }
      };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">{editData ? 'Edit Ledger' : 'Add Ledgers'}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter Name"
              required
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">Group</label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder="Group"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div> */}

<div>
  <label className="block text-gray-700 font-semibold mb-1">Group</label>
  <select
    name="group"
    value={formData.groupId}
    onChange={handleGroupChange}
    className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <option value="">Select Group</option>
    {groupData.map((group) => (
      <option key={group.id} value={group.id}>
        {group.name}
      </option>
    ))}
  </select>
</div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter Country"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">Tcs Deductable</label>
            <input
              type="text"
              name="tcsDeductable"
              value={formData.tcsDeductable}
              onChange={handleChange}
              placeholder="Enter Tcs Deductable"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tds Deductable</label>
            <input
              type="text"
              name="tdsDeductable"
              value={formData.tdsDeductable}
              onChange={handleChange}
              placeholder="Enter Tcs Deductable"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div> */}


<div>
  <label className="block text-gray-700 font-semibold mb-1">TCS Deductable</label>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="tcsDeductable"
      checked={formData.tcsDeductable}
      onChange={(e) =>
        handleChange({
          target: { name: 'tcsDeductable', value: e.target.checked },
        })
      }
    />
    <span>{formData.tcsDeductable ? 'Yes' : 'No'}</span>
  </div>
</div>

<div>
  <label className="block text-gray-700 font-semibold mb-1">TDS Deductable</label>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="tdsDeductable"
      checked={formData.tdsDeductable}
      onChange={(e) =>
        handleChange({
          target: { name: 'tdsDeductable', value: e.target.checked },
        })
      }
    />
    <span>{formData.tdsDeductable ? 'Yes' : 'No'}</span>
  </div>
</div>


          <div>
            <label className="block text-gray-700 font-semibold mb-1">Pan Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN Number"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Registration Type</label>
            <select
              name="registrationType"
              value={formData.registrationType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Select</option>
              <option value="unknown">unknown</option>
              <option value="composition">composition</option>
              <option value="regular">regular</option>
              <option value="unregistered">unregistered</option>

            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">GST / UIN no.</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST / UIN"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
            >
              {editData ? 'Update Ledger' : 'Add Ledger'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
