import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const WarehouseManagerBranch = () => {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const getProductDetailsByBranch = async () => {
      try {
        const response = await ApiService.post(
          '/products/getProductDetailsByBranch',
          {
            // id: assetDetailsFromState.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          setData(response.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching client details data:', error);
        alert('Failed to fetch client details data.');
      }
    };
    getProductDetailsByBranch();
  }, []);
  const toggleExpand = (branchName) => {
    setExpandedLocation((prev) => (prev === branchName ? null : branchName));
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const branches = [
    {
      name: 'Visakhapatnam',
      products: [
        {
          id: 1,
          image: 'https://via.placeholder.com/80',
          name: 'Bike GPS Tracker',
          description:
            'Way4Track offers tracking and monitoring services for your personal vehicle.',
          total: '100',
          inHand: '55',
          remaining: 45,
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/80',
          name: 'Car GPS Tracker',
          description:
            'Advanced tracking for cars with live monitoring and alerts.',
          total: '80',
          inHand: '24',
          remaining: 56,
        },
      ],
    },
    {
      name: 'Hyderabad',
      products: [
        {
          id: 1,
          image: 'https://via.placeholder.com/80',
          name: 'Fleet GPS Tracker',
          description:
            'Monitor your fleet vehicles with accurate GPS tracking.',
          total: '120',
          inHand: '50',
          remaining: 70,
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/80',
          name: 'Personal GPS Tracker',
          description:
            'Compact GPS tracker for personal security and asset tracking.',
          total: '90',
          inHand: '40',
          remaining: 50,
        },
      ],
    },
    {
      name: 'Chennai',
      products: [
        {
          id: 1,
          image: 'https://via.placeholder.com/80',
          name: 'Pet GPS Tracker',
          description:
            'Keep track of your pets with real-time location updates.',
          total: '60',
          inHand: '30',
          remaining: 30,
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/80',
          name: 'Smartwatch GPS Tracker',
          description:
            'Ideal for kids and elderly tracking with safety alerts.',
          total: '75',
          inHand: '25',
          remaining: 50,
        },
      ],
    },
    {
      name: 'Bangalore',
      products: [
        {
          id: 1,
          image: 'https://via.placeholder.com/80',
          name: 'Vehicle GPS Tracker',
          description: 'Track commercial and personal vehicles efficiently.',
          total: '150',
          inHand: '70',
          remaining: 80,
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/80',
          name: 'Marine GPS Tracker',
          description:
            'Advanced GPS tracker for marine applications and vessels.',
          total: '50',
          inHand: '20',
          remaining: 30,
        },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-3xl font-bold mb-5 text-center">
        Branch <span className="text-green-600">Details</span>
      </h2>
      <div className="space-y-4">
        {data.map((branch, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-5 bg-green-600 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:bg-green-700"
            >
              {branch.name}
              <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                <ChevronDown size={24} />
              </motion.div>
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-5 bg-gray-100 text-gray-700"
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-semibold">
                      <tr>
                        <th className="py-3 px-6 text-left">No.</th>
                        <th className="py-3 px-6 text-left">Product</th>
                        <th className="py-3 px-6 text-left">Total</th>
                        <th className="py-3 px-6 text-left">In Hand</th>
                        <th className="py-3 px-6 text-left">Remaining</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {data.products.map((product, i) => (
                        <tr
                          key={product.id}
                          className="border-t border-gray-200"
                        >
                          <td className="py-4 px-6">{i + 1}</td>
                          <td className="py-4 px-6 flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-xs text-gray-500">
                                {product.description}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6">{product.total}</td>
                          <td className="py-4 px-6">{product.inHand}</td>
                          <td className="py-4 px-6 font-bold text-lg">
                            {product.remaining}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 p-6">No products assigned to the branches.</div>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <div
              className="bg-green-500 text-white px-4 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(item.branchName)}
            >
              <span>{item.branchName}</span>
              <span>{expandedLocation === item.branchName ? '▲' : '▼'}</span>
            </div>

            {expandedLocation === item.branchName &&
              item.products.length > 0 && (
                <div className="bg-white">
                  <table className="w-full text-left border-t">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">No.</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Number of Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products.map((product, index) => (
                        <tr key={product.id} className="border-b">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2 flex items-center">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                              <div className="font-bold">{product.name}</div>
                              <div className="text-sm text-gray-500">
                                WayTrack offers tracking and monitoring services
                                for your personal vehicle.
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2">{product.type}</td>
                          <td className="px-4 py-2 font-bold text-right">
                            {product.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            {expandedLocation === item.branchName &&
              item.products.length === 0 && (
                <div className="bg-white p-4 text-gray-500">
                  No products assigned to the branches.
                </div>
              )}
          </div>
        ))
      )}
    </div>
  );
};

export default WarehouseManagerBranch;
