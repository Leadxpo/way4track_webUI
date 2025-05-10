import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import Modal from './Model.jsx';
import DashboardForm from './DashboardForm';

const DashboardSessionDetails = () => {
  const [promotion, setPromotion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { promotiondata } = location.state || {};

  useEffect(() => {
    if (promotiondata) {
      setPromotion(promotiondata);
    }
  }, [promotiondata]);

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    navigate('/Ceoui', { replace: true });
  };

  if (!promotion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white rounded-lg shadow-sm text-center">
          <p className="text-lg text-gray-600">No promotion found.</p>
          <button 
            onClick={() => navigate('/Ceoui')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">{promotion.header}</h2>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
            <p className="mt-2 text-gray-600">{promotion.shortDescription}</p>
          </div>
          
          <div className="p-6">
            {promotion.image && (
              <div className="mb-6">
                <img
                  src={promotion.image}
                  alt="Promotion"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}

            {promotion.list && promotion.list.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promotion.list.map((item, index) => (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden" key={index}>
                      {item.photo && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={item.photo}
                            alt={`Item ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{item.name || `Item ${index + 1}`}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/Ceoui')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Dashboard Theme"
        size="large"
      >
        <DashboardForm
          initialData={promotion}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditModalOpen(false)}
          isEdit={true}
        />
      </Modal>
    </div>
  );
};

export default DashboardSessionDetails;