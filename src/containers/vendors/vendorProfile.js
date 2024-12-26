import React from 'react';

const VendorProfile = () => {
  const vendorInfo = {
    name: 'K Praveen Sai',
    phone: '77788 77788',
    email: 'Way4track@gmail.com',
    branch: 'Visakhapatnam',
    dob: '03 Mar 1970',
    address: '***********************',
  };

  const products = [
    { name: 'Bike GPS Tracker', image: 'https://via.placeholder.com/150' },
    { name: 'Car GPS Tracker', image: 'https://via.placeholder.com/150' },
    {
      name: 'AIS 140 VLTD for transport & commercial vehicles.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const pitchers = [
    {
      no: '01',
      date: '01-03-2025',
      product: 'Car GPS Tracker',
      items: 12,
      numberOfItems: '12',
      price: '₹2099',
      status: 'Paid',
    },
    {
      no: '02',
      date: '01-03-2025',
      product: 'Fuel Monitoring System',
      items: 34,
      numberOfItems: '34',
      price: '₹5469',
      status: 'Pending',
    },
    {
      no: '03',
      date: '01-03-2025',
      product: 'Car GPS Tracker',
      items: 56,
      numberOfItems: '56',
      price: '₹2099',
      status: 'Paid',
    },
    {
      no: '04',
      date: '01-03-2025',
      product: 'Fuel Monitoring System',
      items: 87,
      numberOfItems: '87',
      price: '₹5469',
      status: 'Pending',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Vendor Information */}
      <p className="font-bold text-xl">Vendor ID</p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={'https://i.pravatar.cc/150?img=5'}
          alt="Vendor"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            Client Name : {vendorInfo.name}
          </p>
          <p className="text-gray-800">Phone number : {vendorInfo.phone}</p>
          <p className="text-gray-800">Email : {vendorInfo.email}</p>
          <p className="text-gray-800">Client Branch : {vendorInfo.branch}</p>
          <p className="text-gray-800">Date of Birth : {vendorInfo.dob}</p>
          <p className="text-gray-800">Address : {vendorInfo.address}</p>
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex space-x-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 w-48 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 mx-auto rounded-full object-cover"
            />
            <p className="mt-4 text-gray-800 font-medium">{product.name}</p>
          </div>
        ))}
      </div>

      {/* Vendor Pitchers Table */}
      <p className="font-bold text-xl">Vendor Pitchers</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Number Of Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {pitchers.map((pitcher, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4 text-center">{pitcher.no}</td>
                <td className="py-2 px-4 text-center">{pitcher.date}</td>
                <td className="py-2 px-4 text-center">{pitcher.product}</td>
                <td className="py-2 px-4 text-center">{pitcher.items}</td>
                <td className="py-2 px-4 text-center">
                  {pitcher.numberOfItems}
                </td>
                <td className="py-2 px-4 text-center">{pitcher.price}</td>
                <td
                  className={`py-2 px-4 text-center font-semibold ${pitcher.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {pitcher.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-center space-x-4">
        <button className="px-8 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600">
          Save
        </button>
        <button className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VendorProfile;
