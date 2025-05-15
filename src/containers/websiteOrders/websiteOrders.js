import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import OrderStatusPopup from './orderStatusPopup';
import './websiteOrders.css';

export default function WebsiteOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await ApiService.post('/order/getOrderList', {
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    });
    if (response.status) {
      setOrders(response.data);
    } else {
      alert('Error fetching orders');
    }
  };

  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleStatusUpdate = async (updatedOrder) => {
    // const response = await ApiService.post('/order/updateStatus', updatedOrder);
    // if (response.status) {
      setShowModal(false);
      fetchOrders();
    // }
  };

  return (
    <div className="website-orders-container">
      
      <div className="replace-request-button-container">
        <h2 className="website-orders-title">Customer Orders</h2>
        <Link to="/replace-requests" className='website-replace-request-button'>
          {/* <button type="button" className="website-orders-title"> */}
          Replace Requests
          {/* </button> */}
        </Link>
      </div>

      <div className="website-orders-table-wrapper">
        <table className="website-orders-table">
          <thead>
            <tr className="website-orders-table-head-row">
              <th className="website-orders-th">Order ID</th>
              <th className="website-orders-th">Customer Name</th>
              <th className="website-orders-th">Order Date</th>
              <th className="website-orders-th">Total (₹)</th>
              <th className="website-orders-th">Order Status</th>
              <th className="website-orders-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="website-orders-row">
                <td className="website-orders-td">{order.id}</td>
                <td className="website-orders-td">{order?.name}</td>
                <td className="website-orders-td">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="website-orders-td">₹{order.totalAmount}</td>
                <td className="website-orders-td">
                  <button
                    onClick={() => handleStatusClick(order)}
                    className="website-orders-status-button"
                  >
                    {order.orderStatus}
                  </button>
                </td>
                <td className="website-orders-td">
                  <button
                    className="website-orders-view-button"
                    onClick={() => navigate(`/order-details/${order.id}`)}
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
