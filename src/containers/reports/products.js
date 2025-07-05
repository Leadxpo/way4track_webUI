import React, { useState, useEffect } from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSubdealer, setSelectedSubdealer] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isProductPreviewOpen, setisProductPreviewOpen] = useState(false);
  const [isClientPreviewOpen, setisClientPreviewOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [branchDropData, setBranchDropData] = useState([]);
  const [productDropData, setProductDropData] = useState([]);
  const [subdealerDropData, setSubdealerDropData] = useState([]);
  const [staffDropData, setStaffDropData] = useState([]);
  const [clientDropData, setClientDropData] = useState([]);
  const [serviceDropData, setServiceDropData] = useState([]);

  useEffect(() => {
    fetchBranchDropDown();
    fetchProductTypes();
    fetchEmployees();
    fetchSubDealer();
    fetchClients();
    fetchService();
  }, [selectedBranch]);



  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);


  const fetchProductStockDetails = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const response = await ApiService.post('/products/getAllproductDetails', payload);
      const allProducts = response?.data || [];

      // Filter based on selected filters
      const filteredProducts = allProducts.filter((item) => {
        const matchesBranch = selectedBranch ? item?.branchId?.branchName === selectedBranch : true;
        const matchesProduct = selectedProduct ? item?.productType === selectedProduct : true;
        const matchesSubdealer = selectedSubdealer ? String(item?.subDealerId?.id) === String(selectedSubdealer) : true;
        const matchesStaff = selectedStaff ? String(item?.staffId?.id) === String(selectedStaff) : true;

        // Convert to Date objects and strip time
        const inDate = new Date(item.inDate);
        const inDateOnly = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate());

        const from = fromDate ? new Date(fromDate) : null;
        const fromOnly = from ? new Date(from.getFullYear(), from.getMonth(), from.getDate()) : null;

        const to = toDate ? new Date(toDate) : null;
        const toOnly = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate()) : null;

        const matchesDate =
          (!fromOnly || inDateOnly >= fromOnly) &&
          (!toOnly || inDateOnly <= toOnly);

        return matchesBranch && matchesProduct && matchesSubdealer && matchesStaff && matchesDate;
      });

      console.log("Filtered products count:", filteredProducts.length);
      setData(filteredProducts);
      handlePreview(filteredProducts);
    } catch (error) {
      console.error('Error fetching products inventory details:', error?.response?.data || error.message);
      setData([]);
    }
  };

  const fetchClientInventory = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      let response = await ApiService.post('/technician/getBackendSupportWorkAllocation', payload);
      const allData = response?.data || [];
      const filteredProducts = allData.filter((item) => {
        const matchesBranch = selectedBranch ? item?.branchName === selectedBranch : true;
        const matchesProduct = selectedProduct ? item?.productName === selectedProduct : true;
        const matchesSubdealer = selectedSubdealer ? String(item?.subDealerId) === String(selectedSubdealer) : true;
        const matchesStaff = selectedStaff ? String(item?.staffId) === String(selectedStaff) : true;
        const matchesServices = selectedService ? String(item?.service) === String(selectedService) : true;
        const matchesClient = selectedClient ? String(item?.clientName) === String(selectedClient) : true;

        const inDate = new Date(item.startDate);
        const inDateOnly = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate());

        const from = fromDate ? new Date(fromDate) : null;
        const fromOnly = from ? new Date(from.getFullYear(), from.getMonth(), from.getDate()) : null;

        const to = toDate ? new Date(toDate) : null;
        const toOnly = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate()) : null;

        const matchesDate =
          (!fromOnly || inDateOnly >= fromOnly) &&
          (!toOnly || inDateOnly <= toOnly);

        return matchesBranch && matchesProduct && matchesSubdealer && matchesStaff && matchesServices && matchesClient && matchesDate;
      });

      console.log("Filtered products count:", filteredProducts.length);
      setData(filteredProducts);
      handlePreview(filteredProducts);
      console.log("============>", filteredProducts);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setData([]);
    }
  };

  const handleOpenModal = name => {
    setSelectedStock(name);
    setIsModalOpen(true);
  };

  const fetchBranchDropDown = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      const response = await ApiService.post("/branch/getBranchNamesDropDown", payload);
      setBranchDropData(response?.data || []);
    } catch (error) {
      console.error("Error fetching products inventory details:", error);
      setBranchDropData([]);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalStaffDetails',
        {
          branchName: selectedBranch,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.data) {

        setStaffDropData(
          response.data.staff.filter(
            (staff) => staff.staffDesignation === 'Technician' || staff.staffDesignation === 'Sr.Technician'
          )
        );
      } else {
        console.log('Failed to fetch employee data.');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchSubDealer = async () => {
    try {
      const response = await ApiService.post(
        '/subdealer/getSubDealerNamesDropDown',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.data) {
        setSubdealerDropData(response.data);
        console.log(response.data, 'sub delear');
      } else {
        console.error('Invalid API:');
      }
    } catch (error) {
      console.error('Error fetching sub delears names:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await ApiService.post('/client/getClientNamesDropDown');
      setClientDropData(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setClientDropData([]); // Ensure state is always an array
    }
  };

  const fetchService = async () => {
    try {
      const res = await ApiService.post('/ServiceType/getServiceTypeNamesDropDown');
      setServiceDropData(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setServiceDropData([]); // Ensure state is always an array
    }
  };


  const dropdownOptions = branchDropData.map(item => item.branchName); // Adjust key if necessary
  const productDropdownOptions = productDropData.map(item => item.name); // Adjust key if necessary
  const clientDropdownOptions = clientDropData.map(item => item.name); // Adjust key if necessary
  const serviceDropdownOptions = serviceDropData.map(item => item.name); // Adjust key if necessary

  const handleSelect = (branch) => {
    console.log("branch :", branch)
    setSelectedBranch(branch)
  };

  const handleProductSelect = (product) => {
    console.log("product :", product)
    setSelectedProduct(product)
  };

  const handleSubdealerSelect = (subdealerId) => {
    console.log("subdealerId :", subdealerId)
    setSelectedSubdealer(subdealerId)
  };

  const handleStaffSelect = (staffId) => {
    console.log("staffId :", staffId)
    setSelectedStaff(staffId)
  };

  const handleClientSelect = (client) => {
    console.log("client :", client)
    setSelectedClient(client)
  };

  const handleServiceSelect = (service) => {
    console.log("service :", service)
    setSelectedService(service)
  };

  const handleType = (type) => {
    console.log("type :", type)
    setSelectedType(type)

    switch (type) {
      case "Subdealer":
        setSelectedStaff("");
        break;
      case "Staff":
        setSelectedSubdealer("");
        break;

      default:
        setSelectedSubdealer("");
        setSelectedStaff("");
        break;
    }
  };

  const handlePreview = (filteredProducts) => {
    if (!filteredProducts.length) {
      alert('No data available to preview.');
      return;
    }
    setPreviewData(filteredProducts);
    if (selectedStock.includes('Products')) {
      setisProductPreviewOpen(true);
      setisClientPreviewOpen(false)
    } else {
      setisClientPreviewOpen(true);
      setisProductPreviewOpen(false)
    }
  };

  const handleDownload = () => {
    if (!previewData.length) {
      alert('No data available to download.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(previewData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Report.xlsx');
    setisProductPreviewOpen(false);
    setisClientPreviewOpen(false);
  };

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post(
        '/productType/getProductTypeDetails'
      );
      if (response.data) {
        setProductDropData(response.data);
      } else {
        console.error('Invalid API response');
        setProductDropData([])
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Product Inventory</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal('Products Inventory')} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">client Inventory</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal('Client Inventory')} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-center text-green-600 font-bold">{selectedBranch}</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg justify-between">
              <div>
                <label>From Date</label>
                <input
                  type="date"
                  className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                />
              </div>
              <div>
                <label>To Date</label>
                <input
                  type="date"
                  className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                />
              </div>

            </div>

            <div className="relative mt-4">
              <select
                value={selectedBranch}
                onChange={(e) => handleSelect(e.target.value)}
                className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
              >
                <option value={"Select Branch"} className="text-black">
                  select Branches
                </option>
                {dropdownOptions.map((stock, index) => (
                  <option key={index} value={stock} className="text-black">
                    {stock}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                <FaChevronDown />
              </div>
            </div>
            <div className="relative mt-4">
              <select
                value={selectedProduct}
                onChange={(e) => handleProductSelect(e.target.value)}
                className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
              >
                <option value={"Select Branch"} className="text-black">
                  select Product
                </option>
                {productDropdownOptions.map((stock, index) => (
                  <option key={index} value={stock} className="text-black">
                    {stock}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                <FaChevronDown />
              </div>
            </div>
            <div className="relative mt-4">
              <select
                value={selectedType}
                onChange={(e) => handleType(e.target.value)}
                className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
              >
                <option value={"Select Type"} className="text-black"> select Type</option>
                <option value={"Subdealer"} className="text-black"> Subdealer</option>
                <option value={"Staff"} className="text-black"> Staff</option>

              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                <FaChevronDown />
              </div>
            </div>
            {
              selectedType === "Subdealer" && (
                <div className="relative mt-4">
                  <select
                    value={selectedSubdealer}
                    onChange={(e) => handleSubdealerSelect(e.target.value)}
                    className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
                  >
                    <option value={"Select Subdealer"} className="text-black">
                      select Subdealer
                    </option>
                    {subdealerDropData.map((stock, index) => (
                      <option key={index} value={stock.id} className="text-black">
                        {stock.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                    <FaChevronDown />
                  </div>
                </div>

              )
            }
            {
              selectedType === "Staff" && (
                <div className="relative mt-4">
                  <select
                    value={selectedStaff}
                    onChange={(e) => handleStaffSelect(e.target.value)}
                    className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
                  >
                    <option value={"Select Staff"} className="text-black">
                      select Staff
                    </option>
                    {staffDropData.map((stock, index) => (
                      <option key={index} value={stock.id} className="text-black">
                        {stock.staffName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                    <FaChevronDown />
                  </div>
                </div>

              )
            }
            {
              selectedStock === "Client Inventory" && (
                <div className="relative mt-4">
                  <select
                    value={selectedClient}
                    onChange={(e) => handleClientSelect(e.target.value)}
                    className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
                  >
                    <option value={"Select Client"} className="text-black">
                      select Client
                    </option>
                    {clientDropdownOptions.map((stock, index) => (
                      <option key={index} value={stock} className="text-black">
                        {stock}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                    <FaChevronDown />
                  </div>
                </div>

              )
            }
            {
              selectedStock === "Client Inventory" && (
                <div className="relative mt-4">
                  <select
                    value={selectedService}
                    onChange={(e) => handleServiceSelect(e.target.value)}
                    className="block w-full bg-green-600 text-white p-3 rounded-md cursor-pointer appearance-none"
                  >
                    <option value={"Select Service"} className="text-black">
                      select Service
                    </option>
                    {serviceDropdownOptions.map((stock, index) => (
                      <option key={index} value={stock} className="text-black">
                        {stock}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                    <FaChevronDown />
                  </div>
                </div>

              )
            }
            <button
              className="w-64 bg-green-600 text-white py-2 rounded-md mt-4 block mx-auto"
              onClick={() => {
                if (selectedStock.includes("Products")) {
                  fetchProductStockDetails()
                  setIsModalOpen(false);
                } else {
                  fetchClientInventory()
                  setIsModalOpen(false);
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isProductPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg max-w-6xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setisProductPreviewOpen(false)}
            >
              ✕
            </button>
            <h4 className="text-xl font-semibold mb-4">Preview Data - Products Inventory</h4>

            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto mb-4">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Product Type</th>
                    <th className="border px-4 py-2">Branch Name</th>
                    <th className="border px-4 py-2">Assign Stock</th>
                    <th className="border px-4 py-2">Install Stock</th>
                    <th className="border px-4 py-2">In Hand Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.productDescription || '-'}</td>
                      <td className="border px-4 py-2">{item.location}</td>
                      <td className="border px-4 py-2">{item.productType}</td>
                      <td className="border px-4 py-2">{item.branchName}</td>
                      <td className="border px-4 py-2">{item.inAssignStock}</td>
                      <td className="border px-4 py-2">{item.installStock}</td>
                      <td className="border px-4 py-2">{item.inHandStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleDownload}>
              Download Excel
            </button>
          </div>
        </div>
      )}

      {isClientPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setisClientPreviewOpen(false)}
            >
              ✕
            </button>
            <h4 className="text-xl font-semibold mb-4">Preview Data - Payments</h4>

            {/* Table to show Payments data */}
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto mb-4">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border px-4 py-2">Work ID</th>
                    <th className="border px-4 py-2">Technician Name</th>
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Received Amount</th>
                    <th className="border px-4 py-2">IMEI Number</th>
                    <th className="border px-4 py-2">Vehicle Number</th>
                    <th className="border px-4 py-2">Branch Name</th>
                    <th className="border px-4 py-2">Client Name</th>
                    <th className="border px-4 py-2">Service</th>
                    <th className="border px-4 py-2">Installation Address</th>
                    <th className="border px-4 py-2">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{item.id}</td>
                      <td className="border px-4 py-2">{item.staffName}</td>
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.paidAmount || "—"}</td>
                      <td className="border px-4 py-2">{item.imeiNumber}</td>
                      <td className="border px-4 py-2">{item.vehicleNumber}</td>
                      <td className="border px-4 py-2">{item.branchName}</td>
                      <td className="border px-4 py-2">{item.clientName}</td>
                      <td className="border px-4 py-2">{item.service}</td>
                      <td className="border px-4 py-2">{item.installationAddress}</td>
                      <td className="border px-4 py-2">{item.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleDownload}>
              Download Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
