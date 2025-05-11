import React, { useEffect, useState } from 'react';
import './orderDetails.css';
import ApiService, { initialAuthState } from '../../services/ApiService';

import { useParams } from 'react-router';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const orderId = useParams('orderId');

  console.log(orderId, 'Orderid');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ApiService.post('/order/getOrderById', {
          id: Number(orderId.orderId),
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          setOrder(response.data);
        } else {
          alert('Error fetching order');
        }
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (loading) return <div className="OrderDetails-loading">Loading...</div>;
  if (!order) return <div className="OrderDetails-error">Order not found.</div>;

  const {
    id,
    name,
    totalAmount,
    paymentStatus,
    orderDate,
    delivaryDate,
    deliveryAddress,
    orderStatus,
    orderItems,
    companyCode,
    unitCode,
  } = order;

  console.log(order.orderItems, 'order Items');

  return (
    <div className="OrderDetails-container">
      <h1 className="OrderDetails-page-title">Order Details</h1>

      <div className="OrderDetails-card">
        <div className="OrderDetails-summary">
          <div>
            <strong>Order ID:</strong> #{id}
          </div>
          <div>
            <strong>Customer:</strong> {name}
          </div>
          <div>
            <strong>Company:</strong> {companyCode}
          </div>
          <div>
            <strong>Unit Code:</strong> {unitCode}
          </div>
          <div>
            <strong>Order Date:</strong> {formatDate(orderDate)}
          </div>
          <div>
            <strong>Delivery Date:</strong> {formatDate(delivaryDate)}
          </div>
          <div>
            <strong>Delivery Address:</strong> {deliveryAddress || 'N/A'}
          </div>
          <div>
            <strong>Order Status:</strong>
            <span
              className={`OrderDetails-status-tag ${orderStatus?.toLowerCase()}`}
            >
              {orderStatus}
            </span>
          </div>
          <div>
            <strong>Payment Status:</strong>
            <span
              className={`OrderDetails-status-tag ${paymentStatus?.toLowerCase()}`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>

        <div>
          <h2 className="OrderDetails-section-title">Items</h2>
          <div className="OrderDetails-items-list">
            {orderItems?.map((item, index) => (
              <div key={index} className="OrderDetails-item-card">
                <div className="OrderDetails-item-name">{item.name}</div>
                <div>
                  <strong>Description:</strong> {item.desc}
                </div>
                <div>
                  <strong>Qty:</strong> {item.qty}
                </div>
                <div>
                  <strong>Amount:</strong> ₹{item.amount}
                </div>
                <div>
                  <strong>Network:</strong> {item.network}
                </div>
                <div>
                  <strong>Subscription:</strong> {item.subscriptionType}
                </div>
                <div>
                  <strong>Relay:</strong> {item.is_relay ? 'Yes' : 'No'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="OrderDetails-total-amount">
          <strong>Total Amount:</strong> ₹{totalAmount}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
