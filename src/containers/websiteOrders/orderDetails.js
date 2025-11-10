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
        console.log("RESPONSE : ",  response)
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
    refund,
  } = order;

  console.log("ORDER : ", orderItems)


  const handleUpdateStatus = async (refundId, newStatus) => {
    try {
      const response = await ApiService.post('/Refund/handleRefundDetails', {
        id:refundId,
        refundStatus: newStatus,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
      if (response.status) {
        alert('Status updated successfully!');
        // Optionally refetch order to reflect changes
        window.location.reload();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Server error occurred');
    }
  };

  const refundStatusLabels = {
    pending: 'Pending',
    request_recived: 'Request Received',
    request_accept: 'Accepted',
    request_reject: 'Rejected',
    pick_scheduled: 'Pick Scheduled',
    item_picked_up: 'Item Picked Up',
    new_item_dispatched: 'New Item Dispatched',
    replaced_sucess: 'Replaced Successfully',
    returning: 'Returning',
  };

  return (
    <div className="order-details-container">
      <h1 className="order-details-page-title">Order Details</h1>

      <div className="order-details-card">
        <div className="order-details-summary">
          <div className="order-summary-item">
            <strong>Order ID:</strong> #{id}
          </div>
          <div className="order-summary-item">
            <strong>Customer:</strong> {name}
          </div>
          <div className="order-summary-item">
            <strong>Order Date:</strong> {formatDate(orderDate)}
          </div>
          <div className="order-summary-item">
            <strong>Delivery Date:</strong> {formatDate(delivaryDate)}
          </div>
          <div className="order-summary-item">
            <strong>Delivery Address:</strong> {deliveryAddress || 'N/A'}
          </div>
          <div className="order-summary-item">
            <strong>Order Status:</strong>
            <span
              className={`order-details-status-tag ${orderStatus?.toLowerCase()}`}
            >
              {orderStatus}
            </span>
          </div>
          <div className="order-summary-item">
            <strong>Payment Status:</strong>
            <span
              className={`order-details-status-tag ${paymentStatus?.toLowerCase()}`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>

        <div className="order-details-order-items-container">
          <h2 className="order-details-section-title">Items</h2>
          <div className="order-details-items-list">
            {orderItems?.map((item, index) => {
              console.log("REFUND : ", refund)
              const associatedRefund = refund?.find(
                (r) => r.id === item.deviceId
              );
              return (
                <div key={index} className="order-details-item-card">
                  <div className="order-details-item-name">{item.name}</div>
                  <div className="order-details-item-description">
                    <strong>Description:</strong> {item.desc}
                  </div>
                  <div className="order-details-item-qty">
                    <strong>Qty:</strong> {item.qty}
                  </div>
                  <div className="order-details-item-amount">
                    <strong>Amount:</strong> ₹{item.amount}
                  </div>
                  <div className="order-details-item-network">
                    <strong>Network:</strong> {item.network}
                  </div>
                  <div className="order-details-item-subscription">
                    <strong>Subscription:</strong> {item.subscriptionType}
                  </div>
                  <div className="order-details-item-relay">
                    <strong>Relay:</strong> {item.is_relay ? 'Yes' : 'No'}
                  </div>

                  {associatedRefund && (
                    <div className="order-details-refund-details">
                      <h3 className="order-details-refund-title">
                        Replace Item Requests
                      </h3>
                      <div className="order-details-refund-status">
                        <strong>Replace Status:</strong>
                        <select
                          value={associatedRefund.refundStatus}
                          onChange={(e) =>
                            handleUpdateStatus(
                              associatedRefund.id,
                              e.target.value
                            )
                          }
                          className="order-details-status-select"
                        >
                          {Object.entries(refundStatusLabels).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="order-details-refund-description">
                        <strong>Description:</strong>{' '}
                        {associatedRefund.description}
                      </div>
                      <div className="order-details-refund-requested-on">
                        <strong>Requested On:</strong>{' '}
                        {formatDate(associatedRefund.dateOfRequest)}
                      </div>
                      <div className="order-details-refund-replacement-date">
                        <strong>Replacement Date:</strong>{' '}
                        {formatDate(associatedRefund.dateOfReplace)}
                      </div>
                      {associatedRefund.damageImage && (
                        <div className="order-details-refund-photo">
                          <strong>Photo:</strong>
                          <br />
                          <img
                            src={associatedRefund.damageImage}
                            alt="damage"
                            className="order-details-refund-photo-image"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
