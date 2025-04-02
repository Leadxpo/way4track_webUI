import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
const CreateWorkAllocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails;
  console.log(workAllocationData, '>>>>>>>>>>>>');
  console.log(workAllocationData.work.id, '+====}}}}}}}}}');

  const initialFormData = {
    id: workAllocationData.work.id || '',
    workAllocationNumber: workAllocationData?.workAllocationNumber || '',
    otherInformation: workAllocationData?.otherInformation || '',
    date: workAllocationData?.date || '',
    staffId: workAllocationData?.staffId || '', // Use staffId instead of assignedTo
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    voucherId: workAllocationData?.voucherId || null,
    clientId: workAllocationData?.clientId || null,
    clientName: workAllocationData?.clientName || '',
    clientAddress: workAllocationData?.clientAddress || '',
    clientPhoneNumber: workAllocationData?.clientPhoneNumber || '',
    productDetails: workAllocationData?.products || [], // Map to the 'products' field from API response
  };
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] =
    useState(initialFormData);
  const [client, setClient] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [staff, setStaff] = useState([]);
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('work-allocation');
    setPermissions(perms);
  }, []);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/work_allocation');
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await ApiService.post('/products/getAllproductDetails');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post(
          '/work-allocations/getWorkAllocationDetails',
          {
            id: workAllocationData.work.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        console.log(workAllocationData.id, '+====}}}}}}}}}');

        if (response.data?.length > 0) {
          const workAllocation = response.data;

          setSelectedWorkAllocation({
            ...initialFormData,
            ...workAllocation, // Merge fetched data
            productDetails: workAllocation.products || [], // Ensure product details are mapped correctly
          });
        }
      } catch (error) {
        console.error('Error fetching work allocation details:', error);
        alert('Failed to fetch work allocation details.');
      }
    };
    fetchClientDetails();
  }, [workAllocationData.work.id]);

  const handleProductItemChange = (index, e) => {
    const { value } = e.target;
    const selectedProduct = products.find(
      (product) => product.productName === value
    );

    const updatedItems = [...selectedWorkAllocation.productDetails];
    updatedItems[index]['productName'] = value;
    if (selectedProduct) {
      // updatedItems[index]['productId'] = selectedProduct.id;
      // updatedItems[index]['imeiNumber'] = selectedProduct.imeiNumber;
      // updatedItems[index]['install'] = selectedProduct.install;
    }
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: updatedItems,
    }));
  };

  const addNewItem = () => {
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: [...prevData.productDetails, { productName: '' }],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = selectedWorkAllocation.productDetails?.filter(
      (_, i) => i !== index
    );
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: updatedItems,
    }));
  };

  const handleDropdownChange = (e) => {
    const selectedStaffId = e.target.value;
    const selectedStaff = staff.find(
      (staffMember) => String(staffMember.staffId) === String(selectedStaffId)
    );

    setSelectedWorkAllocation((prev) => ({
      ...prev,
      staffId: selectedStaffId,
      assignedTo: selectedStaff?.name || '', // Ensure assigned name is displayed correctly
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedWorkAllocation({ ...selectedWorkAllocation, [name]: value });
  };
  // Fetch client data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        setClient(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setClient([]); // Ensure state is always an array
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const getVoucherNamesDropDown = async () => {
      try {
        const res = await ApiService.post('/voucher/getVoucherNamesDropDown');
        setVoucher(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setVoucher([]); // Ensure state is always an array
      }
    };
    getVoucherNamesDropDown();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...selectedWorkAllocation };
    console.log(payload, '+++++++++++++++++++++++');
    try {
      const endpoint = selectedWorkAllocation.workAllocationNumber
        ? '/work-allocations/handleWorkAllocationDetails'
        : '/work-allocations/handleWorkAllocationDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(
          selectedWorkAllocation.id
            ? 'workAllocation updated successfully!'
            : 'workAllocation added successfully!'
        );
        navigate('/workAllocations');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };
  return (
    <div className="p-10 bg-white">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form className="bg-white p-4" onSubmit={handleSave}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Client Name
                </label>
                {client.length > 0 && (
                  <select
                    name="clientId"
                    value={selectedWorkAllocation?.clientId || ''}
                    onChange={handleDropdownChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    {client.map((clientItem) => (
                      <option key={clientItem.id} value={clientItem.id}>
                        {clientItem.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {staff.length > 0 && (
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Assign To:</label>
                  <select
                    name="staffId"
                    value={selectedWorkAllocation?.staffId || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  >
                    <option value="" disabled>
                      Allocated to
                    </option>
                    {staff.map((staffMember) => (
                      <option key={staffMember.id} value={staffMember.id}>
                        {staffMember.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Other Information
                  </label>
                  <textarea
                    name="otherInformation"
                    className="w-full border p-2 rounded mb-4 focus:outline-none"
                    value={selectedWorkAllocation?.otherInformation || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Product Name
                  </label>
                  <textarea
                    name="productName"
                    className="w-full border p-2 rounded mb-4 focus:outline-none"
                    value={selectedWorkAllocation?.productName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full border p-2 rounded mb-4 focus:outline-none"
                    value={selectedWorkAllocation?.description || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="border p-2 rounded w-full focus:outline-none"
                  value={selectedWorkAllocation?.date || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Voucher ID
                </label>
                {voucher.length > 0 && (
                  <select
                    name="voucherId"
                    value={selectedWorkAllocation?.voucherId || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Voucher
                    </option>
                    {voucher.map((voucherItem) => (
                      <option key={voucherItem.id} value={voucherItem.id}>
                        {voucherItem.voucherId}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Service or Product
                </label>
                <input
                  name="serviceOrProduct"
                  value={selectedWorkAllocation?.serviceOrProduct || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              </div>
            </div>
            <button
              className="bg-green-700 w-fit mt-2 text-white p-2 rounded-md"
              onClick={handleEditClick}
            >
              Edit Work Allocation
            </button>
            <button
              className="bg-red-600 w-fit ml-4 mt-2 text-white p-2 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateWorkAllocation;
