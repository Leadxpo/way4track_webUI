import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';

// const getColorClasses = (color) => {
//   switch (color) {
//     case 'blue':
//       return { border: 'border-blue-700', bg: 'bg-blue-700' };
//     case 'red':
//       return { border: 'border-red-700', bg: 'bg-red-700' };
//     case 'green':
//       return { border: 'border-green-700', bg: 'bg-green-700' };
//     case 'orange':
//       return { border: 'border-orange-700', bg: 'bg-orange-700' };
//     default:
//       return { border: 'border-gray-700', bg: 'bg-gray-700' };
//   }
// };
const BranchManagerHome = () => {
  // const [productDetailsByBranch, setProductDetailsByBranch] = useState([]);
  // const [creditAndDebitPercentages, setCreditAndDebitPercentages] = useState([]);
  // const [assertsCardData, setAssertsCardData] = useState([]);
  // const [requestBranchWiseData, setRequestBranchWiseData] = useState([]);
  // const [totalStaffDetails, setTotalStaffDetails] = useState([]);

  // const fetchProductDetailsByBranch = async () => {
  //   try {

  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };

  //     if (payload.role === 'Branch Manager') {
  //       payload.branch = localStorage.getItem('branchName');
  //     }

  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/dashboards/getProductDetailsByBranch', payload);
  //     }
  //     if (response.status) {
  //       setProductDetailsByBranch(response.data || []);
  //     } else {
  //       alert(response.message || 'Failed to fetch ticket details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tickets data:', error);
  //     //alert('Failed to fetch tickets data.');
  //   }
  // };

  // const branchProductData = productDetailsByBranch[0]; // Assuming only one branch in response
  // const totalQuantity = branchProductData?.products?.reduce(
  //   (sum, product) => sum + product.totalProducts,
  //   0
  // ) || 0;




  // const fetchCreditAndDebitPercentages = async () => {
  //   try {
  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };

  //     if (payload.role === 'Branch Manager') {
  //       payload.branchName = localStorage.getItem('branchName');
  //     }

  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', payload);
  //     }
  //     //  else {
  //     //   response = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', payload);
  //     // }
  //     if (response.status) {
  //       setCreditAndDebitPercentages(response.data || []);
  //     } else {
  //       alert(response.data.message || 'Failed to fetch ticket details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tickets data:', error);
  //     //alert('Failed to fetch tickets data.');
  //   }
  // };

  // const fetchAssertsCardData = async () => {
  //   try {

  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };

  //     if (payload.role === 'Branch Manager') {
  //       payload.branch = localStorage.getItem('branchName');
  //     }

  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/dashboards/assertsCardData', payload);
  //     }

  //     if (response.status) {
  //       setAssertsCardData(response.data || []);
  //     } else {
  //       alert(response.data.message || 'Failed to fetch ticket details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tickets data:', error);
  //     //alert('Failed to fetch tickets data.');
  //   }
  // };

  // const fetchRequestBranchWise = async () => {
  //   try {
  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };

  //     if (payload.role === 'Branch Manager') {
  //       payload.branchName = localStorage.getItem('branchName');
  //     }

  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/requests/getTodayRequestBranchWise', payload);
  //     }

  //     // Ensure response.data is always an array
  //     if (response?.status && Array.isArray(response.data)) {
  //       setRequestBranchWiseData(response.data);
  //     } else {
  //       setRequestBranchWiseData([]); // Prevent undefined
  //     }
  //   } catch (error) {
  //     console.error('Error fetching request data:', error);
  //     setRequestBranchWiseData([]); // Handle errors gracefully
  //   }
  // };



  // const TotalStaffDetails = async (staff_branchName) => {
  //   try {
  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };

  //     if (payload.role === 'Branch Manager') {
  //       payload.branchName = localStorage.getItem('branchName');
  //     }

  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/dashboards/getTotalStaffDetails', payload);
  //     }

  //     if (response.status) {
  //       setTotalStaffDetails(response.data || []);
  //     } else {
  //       alert(response.data.message || 'Failed to fetch ticket details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tickets data:', error);
  //     //alert('Failed to fetch tickets data.');
  //   }
  // };
  // useEffect(() => {
  //   fetchProductDetailsByBranch();
  // }, []);

  // const fetchData = async () => {
  //   await Promise.all([
  //     fetchCreditAndDebitPercentages(),
  //     fetchProductDetailsByBranch(),
  //     fetchAssertsCardData(),
  //     fetchRequestBranchWise(),
  //     TotalStaffDetails(),
  //   ]);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);


  // const branchData = creditAndDebitPercentages?.[0] || {};

  // return (
  //   <div className="p-6">
  //     {/* branch card Section */}
  //     <div className="flex justify-center mt-10 mb-6">
  //       <div
  //         className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200"
  //         style={{ width: "80%" }}
  //       >
  //         <div className="flex justify-between items-center mb-4">
  //           <div className="absolute -top-6 left-4">
  //             <img
  //               src="/logo-square.png"
  //               alt="Branch Logo"
  //               className="w-14 h-14 rounded-md shadow-md bg-white"
  //             />
  //           </div>
  //           <span className="text-2xl font-semibold text-gray-800 mt-4">
  //             {branchData.branchName || "N/A"}
  //           </span>
  //         </div>

  //         <div className="space-y-4">
  //           <div className="text-green-600 flex items-center text-xl font-bold">
  //             <span>Credit Percentage:</span>
  //             <span className="ml-2">
  //               {branchData.creditPercentage !== undefined ? `${branchData.creditPercentage}%` : "N/A"}
  //             </span>
  //           </div>
  //           <div className="bg-gray-200 rounded-full h-6">
  //             <div
  //               className="bg-green-600 h-6 rounded-full"
  //               style={{ width: `${branchData.creditPercentage || 0}%` }}
  //             ></div>
  //           </div>

  //           <div className="text-red-500 flex items-center text-xl font-bold">
  //             <span>Debit Percentage:</span>
  //             <span className="ml-2">
  //               {branchData.debitPercentage !== undefined ? `${branchData.debitPercentage}%` : "N/A"}
  //             </span>
  //           </div>
  //           <div className="bg-gray-200 rounded-full h-6">
  //             <div
  //               className="bg-red-600 h-6 rounded-full"
  //               style={{ width: `${branchData.debitPercentage || 0}%` }}
  //             ></div>
  //           </div>
  //         </div>
  //       </div>

  //     </div>
  //     {/* cards Section */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
  //       {Array.isArray(requestBranchWiseData) && requestBranchWiseData.length > 0 ? (
  //         requestBranchWiseData.map((location) => {
  //           // Ensure color is defined or provide a default
  //           const { border, bg } = getColorClasses(location.color || "gray");

  //           // Calculate total requests count dynamically
  //           const totalRequests = location.requests.reduce((sum, req) => sum + req.count, 0);

  //           return (
  //             <div key={location.location} className={`border-2 ${border} rounded-lg shadow-md`}>
  //               <h3 className={`${bg} text-white font-semibold text-lg p-3 flex justify-between`}>
  //                 <span>{location.location}</span>
  //                 <span>Total: {totalRequests}</span> {/* Dynamic total */}
  //               </h3>

  //               {location.requests.map((req, index) => (
  //                 <p key={index} className="text-sm font-medium ml-4 mt-4">
  //                   {req.name}: <span className="font-bold">{req.count}</span>
  //                 </p>
  //               ))}
  //             </div>
  //           );
  //         })
  //       ) : (
  //         <p>No data available</p>
  //       )}
  //     </div>


  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
  //       {/* Assets Summary Card */}
  //       <div className="border-2 border-gray-500 rounded-lg shadow-md">
  //         <h3 className="bg-gray-500 text-white font-semibold text-lg p-3">
  //           Assets Summary
  //         </h3>
  //         <div className="p-4 space-y-2">
  //           <p className="text-sm font-medium">
  //             Office Assets: <span className="font-bold text-blue-600">{assertsCardData?.officeAsserts || 0}</span>
  //           </p>
  //           <p className="text-sm font-medium">
  //             Transport Assets: <span className="font-bold text-green-600">{assertsCardData?.transportAsserts || 0}</span>
  //           </p>
  //           <p className="text-sm font-medium">
  //             Total Assets: <span className="font-bold text-purple-600">{assertsCardData?.totalAsserts || 0}</span>
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="mt-6">
  //       {/* Staff Summary Card */}
  //       <div className="border-2 border-gray-500 rounded-lg shadow-md p-4 mb-6">
  //         <h3 className="bg-gray-500 text-white font-semibold text-lg p-3">
  //           Staff Summary
  //         </h3>

  //         <div className="p-4">
  //           <p className="text-sm font-medium mb-2">
  //             Total Staff: <span className="font-bold">{totalStaffDetails?.data?.result[0]?.totalStaff || 0}</span>
  //           </p>
  //           <p className="text-sm font-medium mb-2">
  //             Total Technicians: <span className="font-bold">{totalStaffDetails?.data?.result[0]?.totalTechnicians || 0}</span>
  //           </p>
  //           <p className="text-sm font-medium mb-2">
  //             Total Sales: <span className="font-bold">{totalStaffDetails?.data?.result[0]?.totalSales || 0}</span>
  //           </p>
  //           <p className="text-sm font-medium">
  //             Total Non-Technicians: <span className="font-bold">{totalStaffDetails?.data?.result[0]?.totalNonTechnicians || 0}</span>
  //           </p>
  //         </div>
  //       </div>
  //       <Table
  //         dataSource={totalStaffDetails?.data?.staff || []}
  //         columns={[
  //           {
  //             title: "Staff ID",
  //             dataIndex: "staffId",
  //             key: "staffId",
  //           },
  //           {
  //             title: "Staff Name",
  //             dataIndex: "staffName",
  //             key: "staffName",
  //           },
  //           {
  //             title: "Designation",
  //             dataIndex: "staffDesignation",
  //             key: "staffDesignation",
  //           },
  //           {
  //             title: "Branch Name",
  //             dataIndex: "branchName",
  //             key: "branchName",
  //           },
  //         ]}
  //         pagination={{ pageSize: 5 }}
  //         rowKey="staffId"
  //       />
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
  //       {/* Product Summary Card */}
  //       <div className="border-2 border-gray-500 rounded-lg shadow-md">
  //         <h3 className="bg-gray-500 text-white font-semibold text-lg p-3">
  //           {branchData.branchName} - Product Summary
  //         </h3>
  //         <div className="p-4 space-y-2">
  //           <p className="text-sm font-medium">
  //             Total Products: <span className="font-bold text-purple-600">{totalQuantity}</span>
  //           </p>
  //         </div>
  //       </div>

  //       {/* Products List Card */}
  //       <div className="border-2 border-gray-400 rounded-lg shadow-md">
  //         <h3 className="bg-gray-400 text-white font-semibold text-lg p-3">Product Details</h3>
  //         <div className="p-4 space-y-2">
  //           {branchData.products.map((product) => (
  //             <p key={product.id} className="text-sm font-medium">
  //               {product.name}: <span className="font-bold text-blue-600">{product.totalProducts}</span>
  //             </p>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>)

}
export default BranchManagerHome;


