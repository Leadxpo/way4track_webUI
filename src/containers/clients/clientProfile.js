import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const ClientProfile = () => {
  const location = useLocation();
  const clientDetailsFromState = location.state?.clientDetails || {};
  console.log(location.state?.clientDetails, 'ww:::::::');

  console.log(clientDetailsFromState, ':::::::');
  const [clientDetails, setClientDetails] = useState({});
  const [clientDetailsData, setClientDetailsData] = useState([]);
  const [clientSearchDetailsData, setClientSearchDetailsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log(clientDetails, 'clientDetails');

  useEffect(() => {
    const fetchClientDetailsData = async () => {
      try {
        const response = await ApiService.post(
          '/technician/getClientDataForTechniciansTable',
          {
            clientId: clientDetailsFromState.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        setClientDetailsData(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } catch (error) {
        console.error('Error fetching client details data:', error);
        setClientDetailsData([]); // Fallback to an empty array
      }
    };
    fetchClientDetailsData();
  }, [clientDetailsFromState.clientId]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/client/getClientDetailsById', {
          clientId: clientDetailsFromState.clientId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          console.log("yyyypppp",response.data);
          const client = response.data;
          setClientDetails({
            name: client.name,
            phoneNumber: client.phoneNumber,
            email: client.email,
            GSTNumber: client.GSTNumber,
            dob: client.dob,
            address: client.address,
            gstNumber: client.gstNumber,
            clientPhoto: client.clientPhoto,
          });
        } else {
          setClientDetails({});
        }
      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
      }
    };
    fetchClientDetails();
  }, [clientDetailsFromState.clientId]);

  useEffect(() => {
    const fetchClientSearchDetailsData = async () => {
      try {
        const payload = {
          phoneNumber: clientDetailsFromState.phoneNumber,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };
        const response = await ApiService.post(
          '/technician/getClientDataForTablePhoneNumber',
          payload
        );
        console.log('Client Details search Data:', response.data);
        setClientSearchDetailsData(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error('Error fetching client details data:', error);
        setClientSearchDetailsData([]); // Fallback to an empty array
      }
    };
    fetchClientSearchDetailsData();
  }, [clientDetailsFromState.clientId]);




  const handleViewClick = (purchase) => {
    setSelectedRow(purchase);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Vendor Information */}
      <p className="font-bold text-xl">
        Customer ID : {clientDetails.clientId}
      </p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={clientDetails.clientPhoto}
          alt="Vendor"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            Customer Name : {clientDetails.name}
          </p>
          <p className="text-gray-800">
            Phone number : {clientDetails.phoneNumber}
          </p>
          <p className="text-gray-800">Email : {clientDetails.email || "N/A"}</p>
          {/* <p className="text-gray-800">
            Customer Branch : {clientDetails.branch}
          </p> */}
          <p className="text-gray-800">
            GST Number : {clientDetails.GSTNumber || "N/A"}
          </p>
          {/* <p className="text-gray-800">Joining Date : {clientDetails.joiningDate}</p> */}
          <p className="text-gray-800">Address : {clientDetails.address || "N/A"}</p>
        </div>
      </div>

       {/* Client Purchases Table */}
       <p className="font-bold text-xl mb-2">Customer Purchases</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Work Id</th>
              <th className="py-2 px-4">Product Type</th>
              <th className="py-2 px-4">Vehicle Number</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clientSearchDetailsData) && clientSearchDetailsData.length > 0 ? (
              clientSearchDetailsData.map((purchase, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="py-2 px-4 text-center">{purchase.technicianNumber}</td>
                  <td className="py-2 px-4 text-center">{purchase.pt_type}</td>
                  <td className="py-2 px-4 text-center">{purchase.ve_vehicle_number}</td>
                  <td className="py-2 px-4 text-center">{purchase.paidAmount}</td>
                  <td className="py-2 px-4 text-center">{purchase.paymentStatus}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleViewClick(purchase)}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


 {/* Modal */}
 {showModal && selectedRow && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-auto p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Customer Purchase Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700" style={{paddingTop:100}}>
        <div><strong>Client Name:</strong> {selectedRow.clientName}</div>
        <div><strong>Phone Number:</strong> {selectedRow.phoneNumber}</div>
        <div><strong>Email:</strong> {selectedRow.ve_email}</div>
        <div><strong>Work Id:</strong> {selectedRow.technicianNumber}</div>
        <div><strong>Vehicle Number:</strong> {selectedRow.ve_vehicle_number}</div>
        <div><strong>Vehicle Type:</strong> {selectedRow.ve_vehicle_type || 'N/A'}</div>
        <div><strong>Chassis Number:</strong> {selectedRow.ve_chassis_number}</div>
        <div><strong>Engine Number:</strong> {selectedRow.ve_engine_number}</div>
        <div><strong>Vehicle IMEI:</strong> {selectedRow.ve_imei_number}</div>
        <div><strong>Product Name:</strong> {selectedRow.productName}</div>
        <div><strong>Product Type:</strong> {selectedRow.pt_type || 'N/A'}</div>
        <div><strong>Service:</strong> {selectedRow.service || 'N/A'}</div>
        <div><strong>Technician:</strong> {selectedRow.staff_name +"( "+selectedRow.staff_staff_id+" )" || 'N/A'}</div>
        <div><strong>Total Amount:</strong> {selectedRow.totalAmount ?? 'N/A'}</div>
        <div><strong>Paid Amount:</strong> {selectedRow.paidAmount ?? 'N/A'}</div>
        <div><strong>Payment Status:</strong> {selectedRow.paymentStatus}</div>
        <div><strong>Work Status:</strong> {selectedRow.workStatus}</div>
        <div><strong>Start Date:</strong> {new Date(selectedRow.ve_start_date).toLocaleString()}</div>
        <div><strong>Installation Address:</strong> {selectedRow.ve_installation_address}</div>
        <div><strong>User Name:</strong> {selectedRow.userName}</div>
        <div><strong>Application Name:</strong> {selectedRow.applicationName || 'N/A'}</div>
      </div>

      {/* Display vehicle images if available */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Vehicle Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(10)].map((_, i) => {
            const key = `ve_vehicle_photo_${i + 1}`;
            const url = selectedRow[key];
            return (
              url && (
                <img
                  key={i}
                  src={url}
                  alt={`Vehicle ${i + 1}`}
                  className="w-full h-40 object-cover rounded border"
                />
              )
            );
          })}
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ClientProfile;
