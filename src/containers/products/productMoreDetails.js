import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const ProductDetails = () => {
    const location = useLocation();
    const ProductDetail = location.state?.ProductDetails || {};
    const [productDetails, setProductDetails] = useState({});
    const [productDetailsData, setProductDetailsData] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ApiService.post('/products/getproductDetails', {
                    productId: ProductDetail.id,
                    companyCode: initialAuthState.companyCode,
                    unitCode: initialAuthState.unitCode,
                });
                if (response.status) {
                    const product = response.data;
                    setProductDetails({
                        ...product,
                        name: product.productName,
                        phone: product.vendorPhoneNumber,
                        email: product.vendorId.emailId,
                        branch: product.location,
                        dob: product.dateOfPurchase,
                        address: product.vendorId.address,
                        productPhoto: product.productPhoto || 'default_photo_url', // You can replace with a default photo URL if null
                    });
                    setProductDetailsData(product.voucherId || []); // Set voucherId as the data table (empty if none)
                } else {
                    setProductDetails({});
                    setProductDetailsData([]);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                alert('Failed to fetch product details.');
            }
        };

        fetchProductDetails();
    }, [ProductDetail.id]);

    return (
        <div className="p-6 space-y-8">
            {/* Product Information */}
            <p className="font-bold text-xl">Product Details</p>
            <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
                <img
                    src={productDetails.productPhoto}
                    alt="Product"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <div className="space-y-2">
                    <p className="text-gray-800 font-bold text-xl">Product Name: {productDetails.name}</p>
                    <p className="text-gray-800">Device Model: {productDetails.deviceModel}</p>
                    <p className="text-gray-800">Email: {productDetails.email}</p>
                    <p className="text-gray-800">Vendor Name: {productDetails.vendorId?.name}</p>
                    <p className="text-gray-800">Phone: {productDetails.phone}</p>
                    <p className="text-gray-800">Address: {productDetails.address}</p>
                </div>
            </div>

            {/* Client Voucher Table */}
            <p className="font-bold text-xl">Client Vouchers</p>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600">
                            <th className="py-2 px-4">Voucher Id</th>
                            <th className="py-2 px-4">Voucher Name</th>
                            <th className="py-2 px-4">Product Type</th>
                            <th className="py-2 px-4">Quantity</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDetailsData.length > 0 ? (
                            productDetailsData.map((voucher, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="py-2 px-4 text-center">{voucher.voucherId}</td>
                                    <td className="py-2 px-4 text-center">{voucher.voucherName}</td>
                                    <td className="py-2 px-4 text-center">{voucher.productType}</td>
                                    <td className="py-2 px-4 text-center">{voucher.quantity}</td>
                                    <td className="py-2 px-4 text-center">{voucher.amount}</td>
                                    <td className="py-2 px-4 text-center">{voucher.paymentStatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-600">No voucher data available</td>
                            </tr>
                        )}
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

export default ProductDetails;
