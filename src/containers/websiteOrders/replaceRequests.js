import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import OrderStatusPopup from './orderStatusPopup';
import './replaceRequests.css';

export default function ReplaceRequests() {
  const [replacementOrders, setReplacementOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReplacementOrders();
  }, []);

  const fetchReplacementOrders = async () => {
    try {
      const response = await ApiService.post('/Refund/getRefundDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.status) {
        setReplacementOrders(response.data); 
      } else {
        alert('Error fetching refund requests');
      }
    } catch (error) {
      console.error('Error fetching refund details:', error);
      alert('Something went wrong.');
    }
  };

  const handleStatusClick = (refund) => {
    setSelectedOrder(refund);
    setShowModal(true);
  };

  const handleStatusUpdate = async (updatedRefund) => {
    // You can implement update logic here if needed
    fetchReplacementOrders();
    setShowModal(false);
  };

  return (
    <div className="replace-requests-container">
      <h2 className="replace-requests-title">Replacement Requests</h2>

      <div className="replace-requests-table-wrapper">
        <table className="replace-requests-table">
          <thead>
            <tr className="replace-requests-table-head-row">
              <th className="replace-requests-th">Order ID</th>
              <th className="replace-requests-th">Customer Name</th>
              <th className="replace-requests-th">Request Date</th>
              <th className="replace-requests-th">Status</th>
              <th className="replace-requests-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {replacementOrders.map((refund) => (
              <tr key={refund.id} className="replace-requests-row">
                <td className="replace-requests-td">{refund.orderId}</td>
                <td className="replace-requests-td">{refund.name}</td>
                <td className="replace-requests-td">
                  {new Date(refund.dateOfRequest).toLocaleDateString()}
                </td>
                <td className="replace-requests-td">
                  <button
                    onClick={() => handleStatusClick(refund)}
                    className="replace-requests-status-button"
                  >
                    {refund.refundStatus}
                  </button>
                </td>
                <td className="replace-requests-td">
                  <button
                    className="replace-requests-view-button"
                    onClick={() => navigate(`/order-details/${refund.orderId}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <OrderStatusPopup
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
