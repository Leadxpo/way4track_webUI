import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';

const OverallReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await ApiService.post('/review/getReviewDetails', {});
      const data = response.data || [];
      
      // Filter reviews where deviceId and orderId are null
      const filtered = data.filter(review => 
        review.deviceId === null && review.orderId === null
      );
      
      // Sort by createdAt in descending order (newest first)
      const sortedReviews = filtered.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      // Reset IDs to sequential numbers starting from 1
      const reviewsWithResetIds = sortedReviews.map((review, index) => ({
        ...review,
        displayId: index + 1
      }));
      
      setReviews(reviewsWithResetIds);
      setFilteredReviews(reviewsWithResetIds);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews([]);
      setFilteredReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReviews(reviews);
      return;
    }

    const filtered = reviews.filter(review =>
      review.review?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Reset display IDs for filtered results as well
    const filteredWithResetIds = filtered.map((review, index) => ({
      ...review,
      displayId: index + 1
    }));
    
    setFilteredReviews(filteredWithResetIds);
  }, [searchTerm, reviews]);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Overall Reviews</p>
        <button
          onClick={fetchReviews}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search reviews by content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-500 px-4 py-2 rounded h-10 w-full max-w-md"
        />
        <div className="text-sm text-gray-500 mt-1">
          Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="overflow-x-auto" style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="text-center text-gray-500 text-lg p-5">
            Loading reviews...
          </div>
        ) : filteredReviews?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg p-5">
            {searchTerm ? 'No matching reviews found' : 'No reviews available'}
          </div>
        ) : (
          <div
            className="overflow-y-auto"
            style={{ maxHeight: '500px', maxWidth: '100%' }}
          >
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Review</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className={`border-b`}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F7F7F7',
                    }}
                  >
                    <td className="p-3 font-semibold text-center">
                      {review.displayId}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600 mt-1">
                          ({review.rating}/5)
                        </span>
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="break-words">
                        {review.review || 'No review content'}
                      </div>
                    </td>
                    <td className="p-3">
                      {formatDate(review.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallReviews;