import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
const WorkAllocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails || {};

  const initialFormData = {
    id: workAllocationData?.id || '',
    workAllocationId: workAllocationData?.workAllocationId || '',
    workAllocationNumber: workAllocationData?.workAllocationNumber || '',
    serviceOrProduct: workAllocationData?.serviceOrProduct || '',
    otherInformation: workAllocationData?.otherInformation || '',
    date: workAllocationData?.date || '',
    staffId: workAllocationData?.assignedTo || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    voucherId: workAllocationData?.voucherId || null,
    install: workAllocationData?.install || false,
    clientId: workAllocationData?.clientId || null,
    productDetails: workAllocationData?.productDetails || [
      {
        productId: '',
        productName: '',
        imeiNumber: '',
        install: false,
      },
    ],
  };

  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] =
    useState(initialFormData);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [staff, setStaff] = useState([]);
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('work-allocation');
    setPermissions(perms);
  }, []);

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

  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedItems = [...selectedWorkAllocation.productDetails];
    updatedItems[index][name] = type === 'checkbox' ? checked : value;
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: updatedItems,
    }));
  };

  useEffect(() => {
    if (workAllocationData.id) {
      const fetchClientDetails = async () => {
        try {
          const response = await ApiService.post(
            '/work-allocations/getWorkAllocationDetails',
            {
              id: workAllocationData.id,
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );
          if (response.data?.length > 0) {
            const subDealer = response.data[0];
            setSelectedWorkAllocation({
              ...initialFormData,
              ...subDealer,
              productDetails: subDealer?.productDetails || [],
            });
          }
        } catch (error) {
          console.error('Error fetching work allocation details:', error);
          alert('Failed to fetch work allocation details.');
        }
      };
      fetchClientDetails();
    }
  }, [workAllocationData.id]);

  const handleProductItemChange = (index, e) => {
    const { value } = e.target;
    const selectedProduct = products.find(
      (product) => product.productName === value
    );

    const updatedItems = [...selectedWorkAllocation.productDetails];
    updatedItems[index]['productName'] = value;
    if (selectedProduct) {
      updatedItems[index]['productId'] = selectedProduct.id;
      updatedItems[index]['imeiNumber'] = selectedProduct.imeiNumber;
      updatedItems[index]['install'] = selectedProduct.install;
    }
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: updatedItems,
    }));
  };

  const addNewItem = () => {
    setSelectedWorkAllocation((prevData) => ({
      ...prevData,
      productDetails: [
        ...prevData.productDetails,
        { productId: '', productName: '', imeiNumber: '', install: false },
      ],
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

  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(initialFormData); // Use initialFormData instead of null
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDropdownChange = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = client.find(
      (clientDetails) =>
        String(clientDetails.clientId) === String(selectedClientId)
    );

    setSelectedWorkAllocation((prev) => ({
      ...prev,
      clientId: selectedClientId,
      clientName: selectedClient?.name || '',
      phoneNumber: selectedClient?.phoneNumber || '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedWorkAllocation({ ...selectedWorkAllocation, [name]: value });
  };
  const handleOpenModalForEdit = (initialFormData) => {
    setSelectedWorkAllocation(initialFormData);
    setIsEditMode(true);
    setIsModalOpen(true);
  };
  const handleEdit = (work) => {
    navigate('/edit-work-allocation', {
      state: { workAllocationDetails: { work } },
    });
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    console.log(voucher);
    setSelectedWorkAllocation(voucher);
    setIsMoreDetailsModalOpen(true);
  };
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
  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...selectedWorkAllocation };
    console.log(payload, '+++++++++++++++++++++++');
    try {
      const endpoint = selectedWorkAllocation.id
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
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Work Allocation</p>
        <button
          className={`h-12 px-8 text-white font-bold rounded-md hover:cursor-pointer  ${permissions.add ? 'bg-yellow-400 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          onClick={handleOpenModalForAdd}
          disabled={!permissions.add}
        >
          Create Work Allocation
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              {isEditMode ? 'Edit Work Allocation' : 'Create Work Allocation'}
            </h2>
            <form onSubmit={handleSave}>
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
                <div></div>

                <div>
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
                    Service / Product
                  </label>
                  <input
                    type="text"
                    name="serviceOrProduct"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={selectedWorkAllocation?.serviceOrProduct || ''}
                    onChange={handleInputChange}
                  />
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    workAllocation Number
                  </label>
                  <input
                    type="text"
                    name="workAllocationNumber"
                    value={selectedWorkAllocation.workAllocationNumber || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={selectedWorkAllocation?.address || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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
                <label className="block text-sm font-semibold mb-1">
                  Items
                </label>
                <div className="border border-gray-300 rounded-md">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2">
                    <span className="col-span-1 font-semibold">#</span>
                    <span className="col-span-3 font-semibold">Name</span>
                    <span className="col-span-3 font-semibold">
                      IMEI Number
                    </span>
                    <span className="col-span-3 font-semibold">Install</span>
                    <span className="col-span-2 font-semibold"></span>
                  </div>

                  {/* Items Rows */}
                  {selectedWorkAllocation.productDetails?.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 items-center p-2 border-t"
                    >
                      <span className="col-span-1">{index + 1}</span>

                      {/* Product Name Dropdown */}
                      <select
                        name="productName"
                        value={item.productName}
                        onChange={(e) => handleProductItemChange(index, e)}
                        className="col-span-3 p-2 border rounded-md"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.productName}>
                            {product.productName}
                          </option>
                        ))}
                      </select>

                      {/* IMEI Number Input */}
                      <input
                        type="text"
                        name="imeiNumber"
                        value={item.imeiNumber}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="IMEI Number"
                        className="col-span-3 p-2 border rounded-md"
                        disabled
                      />

                      {/* Install Checkbox */}
                      <input
                        type="checkbox"
                        name="install"
                        checked={item.install}
                        onChange={(e) => handleItemChange(index, e)}
                        className="col-span-3 p-2 border rounded-md"
                      />

                      {/* Remove Item Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="bg-gray-100 rounded-md w-fit p-2"
                      >
                        -
                      </button>
                    </div>
                  ))}

                  {/* Add New Item Button */}
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      onClick={addNewItem}
                      className="text-blue-500 text-sm font-semibold mt-2 ml-2"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block"
              >
                {isEditMode ? 'Save Changes' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isMoreDetailsModalOpen && selectedWorkAllocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[550px]">
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Work Allocation Details
            </h2>
            <div>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Work Allocation Number : </strong>{' '}
                {selectedWorkAllocation.workAllocationNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Name : </strong>{' '}
                {selectedWorkAllocation.clientName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Number : </strong>{' '}
                {selectedWorkAllocation.phoneNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date : </strong> {selectedWorkAllocation.date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Service / Product :</strong>{' '}
                {selectedWorkAllocation.serviceOrProduct}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Allocated to : </strong>{' '}
                {selectedWorkAllocation.assignedTo}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Address : </strong> {selectedWorkAllocation.address}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Other Information : </strong>{' '}
                {selectedWorkAllocation.otherInformation}
              </p>
            </div>
            {/* <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-500 mx-auto block mt-4">
              Download PDF
            </button> */}
          </div>
        </div>
      )}

      <TableWithSearchFilter
        type="work-allocations"
        onEdit={handleEdit}
        onDetails={handleOpenMoreDetailsModal}
        showCreateBtn={false}
        showDelete={permissions.delete}
        showEdit={permissions.edit}
        showDetails={permissions.view}
      />
    </div>
  );
};

export default WorkAllocation;
