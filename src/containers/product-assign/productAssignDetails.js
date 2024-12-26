import React from 'react';

const productAssignData = {
  staffDetails: {
    name: 'K Praveen Sai',
    phone: '77788 77788',
    email: 'Way4track@gmail.com',
    branch: 'Visakhapatnam',
    dob: '03 Mar 1970',
    address: '***********************',
    profileImage: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  productDetails: {
    productType: 'Services',
    productName: 'Bike GPS Tracker',
    dateOfAssign: '*******************',
    numberOfProducts: '2343334',
    productImage: 'https://via.placeholder.com/100', // Replace with actual image URL
  },
};
const products = [
  { name: 'Bike GPS Tracker', image: 'https://via.placeholder.com/150' },
  { name: 'Car GPS Tracker', image: 'https://via.placeholder.com/150' },
  {
    name: 'AIS 140 VLTD for transport & commercial vehicles.',
    image: 'https://via.placeholder.com/150',
  },
];

const ProductAssignDetails = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Staff Details */}
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={productAssignData.staffDetails.profileImage}
          alt="Staff Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2 w-full">
          <p className="bg-gray-200 p-2 rounded">
            Staff Name: {productAssignData.staffDetails.name}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Phone number: {productAssignData.staffDetails.phone}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Email: {productAssignData.staffDetails.email}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Staff Branch: {productAssignData.staffDetails.branch}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Date of Birth: {productAssignData.staffDetails.dob}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Address: {productAssignData.staffDetails.address}
          </p>
        </div>
      </div>

      {/* Product Image */}
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

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
        <p className="bg-gray-200 p-2 rounded">
          Product Type: {productAssignData.productDetails.productType}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Product Name: {productAssignData.productDetails.productName}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Date of Assign: {productAssignData.productDetails.dateOfAssign}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Number of Product Assign:{' '}
          {productAssignData.productDetails.numberOfProducts}
        </p>
      </div>
    </div>
  );
};

export default ProductAssignDetails;
