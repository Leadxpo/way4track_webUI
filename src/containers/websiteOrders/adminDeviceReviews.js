import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import ApiService, { initialAuthState } from '../../services/ApiService';
import './adminDeviceReviews.css';

const filters = [
  'All',
  'Overall',
  'Look',
  'Colour',
  'Comfort',
  'Material Quality',
  'Light Weight',
  'True to Specs',
];

const AdminDeviceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [deviceFilter, setDeviceFilter] = useState('');
  const [orderIdFilter, setOrderIdFilter] = useState('');

  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState('');

  const clientDbId = localStorage.getItem('client_db_id');
  const clientUniqueId = localStorage.getItem('client_id');

  console.log(reviews, 'client id');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await ApiService.post('review/getReviewDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
      if (response.status) {
        const data = response.data;
        // const deviceReviews = data.filter(
        //   (item) => item.deviceId.id === device.id
        // );
        setReviews(data);
        console.log(data, ' device reviews');
      } else {
        console.error('Error while fetching the reviews');
      }
    } catch (err) {
      console.error('Error fetching revies');
    }
  };

  useEffect(() => {
    let tempReviews = [...reviews];

    if (selectedFilter !== 'All') {
      tempReviews = tempReviews.filter((r) => r.category === selectedFilter);
    }

    if (deviceFilter.trim()) {
      const lowerDevice = deviceFilter.toLowerCase();
      tempReviews = tempReviews.filter((r) => {
        const deviceNameVal = r.deviceId?.name;
        return (
          typeof deviceNameVal === 'string' &&
          deviceNameVal.toLowerCase().includes(lowerDevice)
        );
      });
    }

    if (orderIdFilter.trim()) {
      const lowerOrder = orderIdFilter.toLowerCase();
      tempReviews = tempReviews.filter((r) =>
        String(r.orderId?.id).toLowerCase().includes(lowerOrder)
      );
    }

    setFilteredReviews(tempReviews);
  }, [reviews, selectedFilter, deviceFilter, orderIdFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const openReplyPopup = (index) => {
    setCurrentReplyIndex(index);
    const existingReply = reviews[index].adminReply || '';
    setReplyText(existingReply);
    setShowReplyPopup(true);
  };

  const closeReplyPopup = () => {
    setShowReplyPopup(false);
    setCurrentReplyIndex(null);
    setReplyText('');
  };

  //   const submitReply = () => {
  //     if (!replyText.trim()) return;

  //     const updatedReviews = [...reviews];
  //     if (!updatedReviews[currentReplyIndex].reply) {
  //       updatedReviews[currentReplyIndex].reply = replyText.trim();
  //     } else {
  //       updatedReviews[currentReplyIndex].reply += '\n' + replyText.trim();
  //     }
  //     setReviews(updatedReviews);
  //     closeReplyPopup();
  //   };

  const submitReply = async () => {
    if (!replyText.trim()) return;

    const updatedReviews = [...reviews];
    const currentReview = updatedReviews[currentReplyIndex];

    // Append or set the reply text
    // if (!currentReview.adminReply) {
    //   currentReview.adminReply = replyText.trim();
    // } else {
    //   currentReview.adminReply += '\n' + replyText.trim();
    // }

    currentReview.adminReply = replyText.trim();

    try {
      const response = await ApiService.post('/review/handleReviewDetails', {
        id: currentReview.id,
        adminReply: currentReview.adminReply,
      });

      if (response.status) {
        alert('Reply submitted successfully.');
        setReviews(updatedReviews);
        closeReplyPopup();
        fetchReviews(); // Optional: refresh reviews from server after update
      } else {
        alert('Failed to submit reply.');
      }
    } catch (error) {
      console.error('Submit reply error:', error);
      alert('Something went wrong while submitting the reply.');
    }
  };

//   const handleDeleteReview = (indexToDelete) => {
//     const updatedReviews = reviews.filter((_, idx) => idx !== indexToDelete);
//     setReviews(updatedReviews);
//   };

const handleDeleteReview = async (reviewId) => {
  const updatedReviews = reviews.filter((review) => review.id !== reviewId);

  try {
    const response = await ApiService.post('/review/deleteReviewDetails', {
      id: reviewId,
    });

    if (response.status) {
      alert('Review deleted successfully.');
      setReviews(updatedReviews);
      fetchReviews(); // Optional: to sync with the latest server data
    } else {
      alert('Failed to delete review.');
    }
  } catch (error) {
    console.error('Delete review error:', error);
    alert('Something went wrong while deleting the review.');
  }
};


  return (
    <div className="AdminDeviceReviews-container">
      <div className="AdminDeviceReviews-filterSection">
        <h1>Reviews & Ratings</h1>
        <p className="AdminDeviceReviews-filterTitle">
          Filter reviews by category:
        </p>
        {/* <div className="AdminDeviceReviews-filterButtons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`AdminDeviceReviews-filterButton ${
                selectedFilter === filter ? 'active' : ''
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div> */}
        {/* New filters for Device Name and Order ID */}
        <div style={{ marginTop: 12 }}>
          <input
            type="text"
            placeholder="Filter by Device Name"
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            style={{ marginRight: 8, padding: '6px 8px' }}
          />
          <input
            type="text"
            placeholder="Filter by Order ID"
            value={orderIdFilter}
            onChange={(e) => setOrderIdFilter(e.target.value)}
            style={{ padding: '6px 8px' }}
          />
        </div>
      </div>

      <div className="AdminDeviceReviews-reviewList">
        {filteredReviews.length === 0 && <p>No reviews found.</p>}
        {filteredReviews.map((review, index) => (
          <div key={index} className="AdminDeviceReviews-reviewItem">
            <div className="AdminDeviceReviews-reviewHeader">
              <span className="AdminDeviceReviews-starBadge">
                {review.rating}★
              </span>
              <span className="AdminDeviceReviews-reviewTitle">
                {review.review}
              </span>
              {/* {review.emojis &&
                review.emojis.map((emoji, idx) => (
                  <span key={idx} className="AdminDeviceReviews-emoji">
                    {emoji}
                  </span>
                ))} */}

              {/* Delete Icon */}
              <button
                className="AdminDeviceReviews-deleteButton"
                onClick={() => handleDeleteReview(review.id)}
                title="Delete Review"
              >
                <MdDeleteForever size={30} />
              </button>
            </div>
            <div className="AdminDeviceReviews-reviewMeta">
              <span className="AdminDeviceReviews-reviewAuthor">
                {review.clientId.name}
              </span>
              <span> · Order ID: {review.orderId.id}</span>
              <span> · Device: {review.deviceId.name}</span>
              <span>
                · Comment Date:{' '}
                {review.updatedAt &&
                  new Date(review.updatedAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
              </span>

              <div className="AdminDeviceReviews-reviewLocation">
                ✔ Certified Buyer
                {/* , {review.location} */}
              </div>
            </div>

            {/* <div className="AdminDeviceReviews-reviewFeedback">
              <span>👍 {review.helpful}</span>
              <span>👎 {review.notHelpful}</span>
            </div> */}

            {review.adminReply && (
              <div className="AdminDeviceReviews-reviewReply">
                <strong>Reply:</strong>
                <p>
                  {review.adminReply.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            )}

            <button
              className="AdminDeviceReviews-replyButton"
              onClick={() => openReplyPopup(index)}
            >
              {review.adminReply ? 'Edit' : 'Reply'}
            </button>
          </div>
        ))}
      </div>

      {/* Reply popup */}
      {showReplyPopup && (
        <div
          className="AdminDeviceReviews-popupOverlay"
          onClick={closeReplyPopup}
        >
          <div
            className="AdminDeviceReviews-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Reply to Review</h3>
            <textarea
              className="AdminDeviceReviews-replyTextarea"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply here..."
            ></textarea>
            <div className="AdminDeviceReviews-popupButtons">
              <button onClick={submitReply}>Submit</button>
              <button
                onClick={closeReplyPopup}
                className="AdminDeviceReviews-cancelButton"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeviceReviews;
