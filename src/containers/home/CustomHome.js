import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaDownload } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import * as XLSX from "xlsx";
const CustomHome = () => {
    const branchName = localStorage.getItem("branchName");
    console.log("Branch Name:", branchName);
    console.log("Branch Name:", Boolean(branchName));
    const [searchStaffData, setSearchStaffData] = useState({ name: '' });
    const [staffList, setStaffList] = useState([]);
    const [allStaffs, setAllStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showStaffModal, setShowStaffModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);



    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await ApiService.post('/staff/getStaffDetails');
                console.log("staff details:", res.data);
                const data = res.data || [];
                setStaffList(data);
                setAllStaffs(data);
            } catch (err) {
                console.error('Error fetching staff:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    // useEffect(() => {
    //     const fetchStaff = async () => {
    //         try {
    //             const res = await ApiService.post('/staff/getStaffDetails');
    //             console.log("staff details:", res.data);
    //             const allStaff = res.data || [];
    
    //             // Get branchName from localStorage
    //             const branchName = localStorage.getItem("branchName");
    
    //             // Filter staff by branchName if it exists
    //             const filteredStaff = branchName
    //                 ? allStaff.filter(staff => staff.branchName === branchName)
    //                 : allStaff;
    
    //             setStaffList(filteredStaff);
    //             setAllStaffs(allStaff); 
    //         } catch (err) {
    //             console.error('Error fetching staff:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchStaff();
    // }, []);
    
    const handleStaffSearch = () => {
        const query = searchStaffData.name.trim().toLowerCase();
        if (!query) {
            return setStaffList(allStaffs); // Changed from vehicleList
        }

        setStaffList(
            allStaffs.filter((s) => { // Changed from vehicleList
                return (
                    (s.name && s.name.toLowerCase().includes(query)) ||
                    (s.staffId && s.staffId.toLowerCase().includes(query)) ||
                    (s.email && s.email.toLowerCase().includes(query)) ||
                    (s.phoneNumber && s.phoneNumber.toLowerCase().includes(query)) ||
                    (s.description && s.description.toLowerCase().includes(query))
                );
            })
        );
    };

    const handleInputStaffChange = (e) => {
        setSearchStaffData({ ...searchStaffData, [e.target.name]: e.target.value });
    };

    const handleViewStaffDetails = (staff) => { // Changed from vehicle
        setSelectedStaff(staff); // Changed from selectedVehicle
        setShowStaffModal(true);
    };


    const [searchClientData, setSearchClientData] = useState({ name: '' });
    const [clientList, setClientList] = useState([]);
    const [allClients, setAllClients] = useState([]);
    //   const [loading, setLoading] = useState(true);
    const [showClientModal, setShowClientModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    // Fetch client data on component mount
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await ApiService.post('/client/getClientDetails');
                console.log("client details:", res.data);
                const data = res.data || [];
                setClientList(data); // Populate clientList
                setAllClients(data); // Keep a backup of all client data
            } catch (err) {
                console.error('Error fetching clients:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    // Search clients based on input data
    const handleClientSearch = () => {
        const query = searchClientData.name.trim().toLowerCase();
        if (!query) {
            return setClientList(allClients); // Reset to all clients when search query is empty
        }

        // Filter the client list based on search query
        setClientList(
            allClients.filter((client) => {
                return (
                    (client.name && client.name.toLowerCase().includes(query)) ||
                    (client.clientId && client.clientId.toLowerCase().includes(query)) ||
                    (client.email && client.email.toLowerCase().includes(query)) ||
                    (client.phoneNumber && client.phoneNumber.toLowerCase().includes(query)) ||
                    (client.description && client.description.toLowerCase().includes(query))
                );
            })
        );
    };

    // Handle input field changes for search
    const handleInputClientChange = (e) => {
        setSearchClientData({ ...searchClientData, [e.target.name]: e.target.value });
    };

    // Show modal for client details
    const handleViewClientDetails = (client) => {
        setSelectedClient(client);
        setShowClientModal(true);
    };


    const [searchWorkData, setSearchWorkData] = useState({ name: '' });
    const [workList, setWorkList] = useState([]);
    const [allWorks, setAllWorks] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [showWorkModal, setShowWorkModal] = useState(false);
    const [selectedWork, setSelectedWork] = useState(null);

    // Fetch work data on component mount
    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const res = await ApiService.post('/work-allocations/getWorkAllocationDetails');
                console.log("work details:", res.data);
                const data = res.data || [];
                setWorkList(data); // Populate workList
                setAllWorks(data); // Keep a backup of all work data
            } catch (err) {
                console.error('Error fetching works:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    // Search works based on input data
    const handleWorkSearch = () => {
        const query = searchWorkData.name.trim().toLowerCase();
        if (!query) {
            return setWorkList(allWorks); // Reset to all works when search query is empty
        }

        // Filter the work list based on search query
        setWorkList(
            allWorks.filter((work) => {
                return (
                    (work.name && work.name.toLowerCase().includes(query)) ||
                    (work.workId && work.workId.toLowerCase().includes(query)) ||
                    (work.email && work.email.toLowerCase().includes(query)) ||
                    (work.phoneNumber && work.phoneNumber.toLowerCase().includes(query)) ||
                    (work.description && work.description.toLowerCase().includes(query))
                );
            })
        );
    };

    // Handle input field changes for search
    const handleInputWorkChange = (e) => {
        setSearchWorkData({ ...searchWorkData, [e.target.name]: e.target.value });
    };

    // Show modal for work details
    const handleViewWorkDetails = (work) => {
        setSelectedWork(work);
        setShowWorkModal(true);
    };


    const [searchProductData, setSearchProductData] = useState({ name: '' });
    const [productList, setProductList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch product data on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await ApiService.post('/productType/getProductTypeDetails');
                console.log("product details:", res.data);
                const data = res.data || [];
                setProductList(data); 
                setAllProducts(data); // Keep a backup of all product data
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Search products based on input data
    const handleProductSearch = () => {
        const query = searchProductData.name.trim().toLowerCase();
        if (!query) {
            return setProductList(allProducts); // Reset to all products when search query is empty
        }

        // Filter the product list based on search query
        setProductList(
            allProducts.filter((product) => {
                return (
                    (product.name && product.name.toLowerCase().includes(query)) ||
                    (product.productId && product.productId.toLowerCase().includes(query)) ||
                    (product.category && product.category.toLowerCase().includes(query)) ||
                    (product.brand && product.brand.toLowerCase().includes(query)) ||
                    (product.description && product.description.toLowerCase().includes(query))
                );
            })
        );
    };

    // Handle input field changes for search
    const handleInputProductChange = (e) => {
        setSearchProductData({ ...searchProductData, [e.target.name]: e.target.value });
    };

    // Show modal for product details
    const handleViewProductDetails = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };



    // const handleDownload = (type) => {
    //     if (!staffList?.length) {
    //       alert("No data available to download.");
    //       return;
    //     }
      
    //     try {
    //       // Convert JSON data to a worksheet
    //       if(type==="staff")
    //       const worksheet = XLSX.utils.json_to_sheet(staffList);
    //     if(type==="client")
    //         const worksheet = XLSX.utils.json_to_sheet(clinetList);
    //     if(type==="work")
    //         const worksheet = XLSX.utils.json_to_sheet(workList);
    //     if(type==="product")
    //         const worksheet = XLSX.utils.json_to_sheet(productList);
    //       // Create a new workbook and append the worksheet
    //       const workbook = XLSX.utils.book_new();
    //       XLSX.utils.book_append_sheet(workbook, worksheet, type);
      
    //       // Trigger download
    //       XLSX.writeFile(workbook, `${type}.xlsx`);

    //     } catch (error) {
    //       console.error("Error generating Excel file:", error);
    //       alert("Failed to generate the Excel file. Please try again.");
    //     }
    //   };

    const handleDownload = (type) => {
        let data;
        let filename;
      
        switch (type) {
          case "staff":
            data = staffList;
            filename = "Staff.xlsx";
            break;
          case "client":
            data = clientList;
            filename = "Client.xlsx";
            break;
          case "work":
            data = workList;
            filename = "Work.xlsx";
            break;
          case "product":
            data = productList;
            filename = "Product.xlsx";
            break;
          default:
            alert("Invalid type selected.");
            return;
        }
      
        if (!data || data.length === 0) {
          alert("No data available to download.");
          return;
        }
      
        try {
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, type);
          XLSX.writeFile(workbook, filename);
        } catch (error) {
          console.error("Error generating Excel file:", error);
          alert("Failed to generate the Excel file. Please try again.");
        }
      };
      
    return (<>
        <div className="m-2">
        <div className="flex justify-between items-center py-4">
  <h2 className="text-2xl font-semibold text-gray-800">Staff</h2>
  <button
    onClick={()=>handleDownload("staff")}
    className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
  >
    <FaDownload className="text-white" />
    Download Excel
  </button>
</div>
            
            <div className="flex mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Search"
                    value={searchStaffData.name}
                    onChange={handleInputStaffChange}
                    className="flex-grow mx-2 h-12 border border-gray-300 rounded-md px-2"
                />
                <button
                    onClick={handleStaffSearch}
                    className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
                >
                    <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-6 py-3 text-sm font-bold">
                                    Staff Id
                                </th>
                                <th className="px-6 py-3 text-sm font-bold">Name</th>
                                <th className="px-6 py-3 text-sm font-bold">Email</th>
                                <th className="px-6 py-3 text-sm font-bold">Phone Number</th>
                                <th className="px-6 py-3 text-sm font-bold">Description</th>
                                <th className="px-6 py-3 text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.length > 0 ? (
                                staffList.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                        <td className="px-6 py-4">{item.staffId}</td>
                                        <td className="px-6 py-4">{item.name}</td>
                                        <td className="px-6 py-4">{item.email}</td>
                                        <td className="px-6 py-4">{item.phoneNumber}</td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewStaffDetails(item)} // Changed from handleViewVehicle
                                                className="p-2 bg-white rounded-md focus:outline-none"
                                            >
                                                <FaEye className="text-gray-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">
                                        No Staff found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showStaffModal && selectedStaff && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Staff Details</h3>

                        {/* Personnel Details Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Personnel Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Staff Id:</strong> {selectedStaff.staffId}</p>
                                <p><strong>Name:</strong> {selectedStaff.name}</p>
                                <p><strong>Email:</strong> {selectedStaff.email}</p>
                                <p><strong>Phone Number:</strong> {selectedStaff.phoneNumber}</p>
                                <p><strong>Gender:</strong> {selectedStaff.gender}</p>
                                <p><strong>Date of Birth:</strong> {selectedStaff.dob}</p>
                                <p><strong>Designation:</strong> {selectedStaff.designation}</p>
                                <p><strong>Status:</strong> {selectedStaff.staffStatus}</p>
                            </div>
                        </div>

                        {/* Education Details Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Education Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Qualifications:</strong> {selectedStaff.qualifications ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Experience Before Joining:</strong> {selectedStaff.beforeExperience} years</p> {/* Changed from selectedVehicle */}
                            </div>
                        </div>

                        {/* Bank Details Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Bank Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Bank Name:</strong> {selectedStaff.bankName}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Account Number:</strong> {selectedStaff.accountNumber ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Account Type:</strong> {selectedStaff.accountType}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Branch:</strong> {selectedStaff.accountBranch}</p> {/* Changed from selectedVehicle */}
                                <p><strong>IFSC Code:</strong> {selectedStaff.ifscCode ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                            </div>
                        </div>

                        {/* Employer Details Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Employer Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Department:</strong> {selectedStaff.department}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Branch:</strong> {selectedStaff.branchName}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Joining Date:</strong> {selectedStaff.joiningDate}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Resignation Date:</strong> {selectedStaff.resignationDate ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Final Settlement Date:</strong> {selectedStaff.finalSettlementDate ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                                <p><strong>Salary Date:</strong> {selectedStaff.salaryDate ?? 'N/A'}</p> {/* Changed from selectedVehicle */}
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowStaffModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>


        <div className="m-2">
        <div className="flex justify-between items-center py-4">
  <h2 className="text-2xl font-semibold text-gray-800">Client</h2>
  <button
    onClick={()=>handleDownload("client")}
    className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
  >
    <FaDownload className="text-white" />
    Download Excel
  </button>
</div>

            <div className="flex mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Search"
                    value={searchClientData.name}
                    onChange={handleInputClientChange}
                    className="flex-grow mx-2 h-12 border border-gray-300 rounded-md px-2"
                />
                <button
                    onClick={handleClientSearch}
                    className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
                >
                    <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-6 py-3 text-sm font-bold">Client Id</th>
                                <th className="px-6 py-3 text-sm font-bold">Name</th>
                                <th className="px-6 py-3 text-sm font-bold">Email</th>
                                <th className="px-6 py-3 text-sm font-bold">Phone Number</th>
                                <th className="px-6 py-3 text-sm font-bold">Description</th>
                                <th className="px-6 py-3 text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientList.length > 0 ? (
                                clientList.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                        <td className="px-6 py-4">{item.clientId}</td>
                                        <td className="px-6 py-4">{item.name}</td>
                                        <td className="px-6 py-4">{item.email}</td>
                                        <td className="px-6 py-4">{item.phoneNumber}</td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewClientDetails(item)}
                                                className="p-2 bg-white rounded-md focus:outline-none"
                                            >
                                                <FaEye className="text-gray-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No Client found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showClientModal && selectedClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Client Details</h3>

                        {/* Personal Details */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Client Id:</strong> {selectedClient.clientId}</p>
                                <p><strong>Name:</strong> {selectedClient.name}</p>
                                <p><strong>Email:</strong> {selectedClient.email}</p>
                                <p><strong>Phone Number:</strong> {selectedClient.phoneNumber}</p>
                                <p><strong>Gender:</strong> {selectedClient.gender}</p>
                                <p><strong>Date of Birth:</strong> {selectedClient.dob}</p>
                                <p><strong>Occupation:</strong> {selectedClient.occupation}</p>
                                <p><strong>Status:</strong> {selectedClient.clientStatus}</p>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Additional Info</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Preferred Contact Time:</strong> {selectedClient.contactTime ?? 'N/A'}</p>
                                <p><strong>Registration Date:</strong> {selectedClient.registrationDate}</p>
                                <p><strong>Referral Source:</strong> {selectedClient.referralSource ?? 'N/A'}</p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowClientModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="m-2">
        <div className="flex justify-between items-center py-4">
  <h2 className="text-2xl font-semibold text-gray-800">Work</h2>
  <button
    onClick={()=>handleDownload("work")}
    className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
  >
    <FaDownload className="text-white" />
    Download Excel
  </button>
</div>

            <div className="flex mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Search"
                    value={searchWorkData.name}
                    onChange={handleInputWorkChange}
                    className="flex-grow mx-2 h-12 border border-gray-300 rounded-md px-2"
                />
                <button
                    onClick={handleWorkSearch}
                    className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
                >
                    <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-6 py-3 text-sm font-bold">Work Id</th>
                                <th className="px-6 py-3 text-sm font-bold">Name</th>
                                <th className="px-6 py-3 text-sm font-bold">Email</th>
                                <th className="px-6 py-3 text-sm font-bold">Phone Number</th>
                                <th className="px-6 py-3 text-sm font-bold">Description</th>
                                <th className="px-6 py-3 text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workList.length > 0 ? (
                                workList.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                        <td className="px-6 py-4">{item.workId}</td>
                                        <td className="px-6 py-4">{item.name}</td>
                                        <td className="px-6 py-4">{item.email}</td>
                                        <td className="px-6 py-4">{item.phoneNumber}</td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewWorkDetails(item)}
                                                className="p-2 bg-white rounded-md focus:outline-none"
                                            >
                                                <FaEye className="text-gray-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No Work found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showWorkModal && selectedWork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Work Details</h3>

                        {/* General Details */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">General Info</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Work Id:</strong> {selectedWork.workId}</p>
                                <p><strong>Name:</strong> {selectedWork.name}</p>
                                <p><strong>Email:</strong> {selectedWork.email}</p>
                                <p><strong>Phone Number:</strong> {selectedWork.phoneNumber}</p>
                                <p><strong>Category:</strong> {selectedWork.category}</p>
                                <p><strong>Status:</strong> {selectedWork.status}</p>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">Additional Info</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                                <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
                                <p><strong>End Date:</strong> {selectedWork.endDate ?? 'N/A'}</p>
                                <p><strong>Assigned To:</strong> {selectedWork.assignedTo}</p>
                                <p><strong>Description:</strong> {selectedWork.description}</p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowWorkModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


        <div className="m-2">
        <div className="flex justify-between items-center py-4">
  <h2 className="text-2xl font-semibold text-gray-800">Product</h2>
  <button
    onClick={()=>handleDownload("product")}
    className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
  >
    <FaDownload className="text-white" />
    Download Excel
  </button>
</div>

            <div className="flex mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Search"
                    value={searchProductData.name}
                    onChange={handleInputProductChange}
                    className="flex-grow mx-2 h-12 border border-gray-300 rounded-md px-2"
                />
                <button
                    onClick={handleProductSearch}
                    className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
                >
                    <FaSearch className="mr-2" /> Search
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-6 py-3 text-sm font-bold">Product Id</th>
                                <th className="px-6 py-3 text-sm font-bold">Name</th>
                                <th className="px-6 py-3 text-sm font-bold">Type</th>
                                <th className="px-6 py-3 text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.length > 0 ? (
                                productList.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                        <td className="px-6 py-4">{item.id}</td>
                                        <td className="px-6 py-4">{item.name}</td>
                                        <td className="px-6 py-4">{item.type}</td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewProductDetails(item)}
                                                className="p-2 bg-white rounded-md focus:outline-none"
                                            >
                                                <FaEye className="text-gray-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No Product found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showProductModal && selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto relative">

      {/* Close Icon */}
      <button
        onClick={() => setShowProductModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h3>

      {/* Product Info */}
      <div className="mb-4">
        <h6 className="text-lg font-semibold text-gray-700 mb-3"><span className="font-medium">Product ID:</span> {selectedProduct.id}</h6>
        <h6 className="text-lg font-semibold text-gray-700 mb-3"><span className="font-medium">Name:</span> {selectedProduct.name}</h6>
        <h6 className="text-lg font-semibold text-gray-700 mb-3"><span className="font-medium">Type:</span> {selectedProduct.type}</h6>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm">
          <div><span className="font-medium">Product ID:</span> {selectedProduct.productId}</div>
          <div><span className="font-medium">Name:</span> {selectedProduct.name}</div>
          <div><span className="font-medium">Type:</span> {selectedProduct.type}</div>
        </div> */}
      </div>

      {/* Footer Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setShowProductModal(false)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

        </div>



    </>);
};

export default CustomHome;
