import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderStatusPopup.css';
import ApiService, { initialAuthState } from '../../services/ApiService';

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Success', value: 'success' },
  { label: 'Aborted', value: 'aborted' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Received', value: 'received' },
  { label: 'Dispatched', value: 'dispatched' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Request Raised', value: 'request_raised' },
  { label: 'Request Approved', value: 'request_approved' },
  { label: 'Request Rejected', value: 'request_reject' },
  { label: 'Request Success', value: 'request_sucess' },
];

const OrderStatusPopup = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(
    order.status?.toLowerCase() || 'pending'
  );
  const [orderDate, setOrderDate] = useState(formatDate(order.orderDate) || '');
  const [deliveryDate, setDeliveryDate] = useState(
    formatDate(order.delivaryDate) || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const clientDbId = localStorage.getItem('client_db_id');
  console.log(order, 'ckjbfjef');

  function formatDate(dateStr) {
    return dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';
  }

  const handleUpdate = async () => {
    setIsLoading(true);

    const payload = {
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      id: order.id,
      orderStatus: status,
      delivaryDate: deliveryDate,
      clientId:order.client.id,
      deliveryAddressId: order.deliveryAddressId.id,
      buildingAddressId: order.buildingAddressId.id,
    };

    try {
      const response = await ApiService.post(
        '/order/handleCreateOrder',
        payload
      );

      if (response.status) {
        alert('Order updated successfully');
        onUpdate?.(order.id, payload);
        onClose();
      } else {
        throw new Error('Failed to update order');
      }
    } catch (err) {
      console.error('Error updating order:', err);
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
              <option key={option.value} value={option.value}>
                {option.label}
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
          <button
            className="update-button"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          <button
            className="cancel-button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPopup;
