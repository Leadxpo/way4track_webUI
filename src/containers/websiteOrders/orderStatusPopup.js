import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderStatusPopup.css';
import ApiService, { initialAuthState } from '../../services/ApiService';
// import { useNavigate } from 'react-router';

const statusOptions = [
  'Pending',
  'Received',
  'Dispatched',
  'Delivered',
  'Aborted',
  'Cancelled',
];

const OrderStatusPopup = ({ order, onClose, onUpdate }) => {
  console.log(order, 'order details');
  const [status, setStatus] = useState(order.status || 'Pending');
  const navigate = useNavigate();
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';
  const [orderDate, setOrderDate] = useState(formatDate(order.orderDate) || '');
  const [deliveryDate, setDeliveryDate] = useState(
    formatDate(order.delivaryDate) || ''
  );
  console.log(deliveryDate, 'delivery date');

  const [isLoading, setIsLoading] = useState(false);

  //   const handleUpdate = () => {
  //     const updateData = {
  //       status: status.toUpperCase(),
  //       orderDate,
  //       deliveryDate,
  //     };
  //     onUpdate(order.id, updateData);
  //     onClose();
  //   };

  const handleUpdate = async () => {
    setIsLoading(true);

    const payload = {
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      id: order.id,
      orderStatus: status.toLowerCase(),
      delivaryDate: deliveryDate,
    };

    try {
      const response = await ApiService.post(
        '/order/handleCreateOrder',
        payload
      );

      if (response.status) {
        alert('Order Updated successfully:', response);
        // navigate('/order-success', { state: { order: response.data } });
      } else {
        throw new Error('Failed to update order');
      }
    } catch (err) {
      console.error('Error update order:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-status-modal-overlay">
      <div className="order-status-modal-box premium">
        <h2 className="order-status-title">Update Order Details</h2>

        <div className="field-block">
          <label className="field-label">Status</label>
          <select
            className="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} className="status-option">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="field-block">
          <label className="field-label">Order Date</label>
          <input
            type="date"
            className="date-input"
            disabled
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div className="field-block">
          <label className="field-label">Delivery Date</label>
          <input
            type="date"
            className="date-input"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPopup;
