import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';

const AddInhandProduct = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    assignTime: '',
    productTypeId: 0, // Default as number
    numberOfProducts: 0,
  });
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [bulkFile, setBulkFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Staff List
  const fetchEmployees = async () => {
    const branchName =localStorage.getItem("branchName");
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalStaffDetails',
        {
          branchName: branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      console.log('check2');

      console.log(
        'qqqqq',
        response.data.staff.filter(
          (staff) => staff.staffDesignation === 'Technician' || staff.staffDesignation === 'Sr.Technician'
        )
      );
      if (response.data) {
        setStaffList(
          response.data.staff.filter(
            (staff) => staff.staffDesignation === 'Technician' || staff.staffDesignation === 'Sr.Technician'
          )
        );
      } else {
        console.log('Failed to fetch employee data.');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === 'productTypeId' || name === 'numberOfProducts'
          ? Number(value)
          : value,
    }));
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     !formData.staffId ||
  //     !formData.assignTime ||
  //     !formData.productTypeId
  //     // !formData.numberOfProducts
  //   ) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   try {
  //     const response = await ApiService.post(
  //       '/products/bulk-upload',
  //       {
  //         ...formData,
  //         productTypeId: Number(formData.productTypeId),
  //         numberOfProducts: Number(formData.numberOfProducts),
  //         companyCode: initialAuthState.companyCode,
  //         unitCode: initialAuthState.unitCode,
  //       }
  //     );

  //     console.log('Submitting:', response);
  //     alert('Product Handover successfully!');

  //     // Reset Form
  //     setFormData({
  //       staffId: '',
  //       assignTime: '',
  //       productTypeId: 0,
  //       numberOfProducts: 0,
  //     });
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     alert('Submission failed.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.staffId ||
      !formData.assignTime ||
      !formData.productTypeId
      // !formData.numberOfProducts
    ) {
      alert('Please fill all required fields.');
      return;
    }

    setIsLoading(true);

    const payload = new FormData();
    payload.append('staffId', formData.staffId);
    payload.append('assignTime', formData.assignTime);
    payload.append('productTypeId', formData.productTypeId);
    payload.append('companyCode', initialAuthState.companyCode);
    payload.append('unitCode', initialAuthState.unitCode);

    if (bulkFile) {
      payload.append('file', bulkFile);
    }

    try {
      const response = await ApiService.post('/products/bulk-upload', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert('Product handover successfully!');
        // Reset form
        setFormData({
          staffId: '',
          assignTime: '',
          productTypeId: 0,
          numberOfProducts: 0,
        });
        navigate('/products');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Submission failed. Please check your input.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post(
        '/productType/getProductTypeDetails'
      );
      if (response.data) {
        setProductTypes(response.data);
        console.log('qazwsxedc', response.data);
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
    }
  };

  const handleBulkFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setBulkFile(selectedFile);
    }
  };

  const generateExcel = () => {
    const worksheetData = [
      {
        'Product Name': '',
        'IMEI Number': '',
        'SIM Number': '',
        'Date Of Purchase': '',
        'Vendor Name': '',
        'Vendor Email ID': '',
        'Vendor Address': '',
        'Supplier Name': '',
        'Serial Number': '',
        'Primary No': '',
        'Secondary No': '',
        'Primary Network': '',
        'Secondary Network': '',
        'Category Name': '',
        Price: '',
        'Product Description': '',
        'Company Code': '',
        'Vendor Phone Number': '',
        'Device Model': '',
        'Unit Code': '',
        'SIM Status': '',
        'Plan Name': '',
        'Remarks 1': '',
        Quantity: '',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample Format');

    XLSX.writeFile(workbook, 'SampleProductXlFormat.xlsx');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Assign In-Hand Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Staff Selection */}
        <div>
          <label className="block text-sm font-medium">Staff</label>
          <select
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.staffId} value={staff.id}>
                {staff.staffName}
              </option>
            ))}
          </select>
        </div>

        {/* Assign Time */}
        <div>
          <label className="block text-sm font-medium">Assign Time</label>
          <input
            type="date"
            name="assignTime"
            value={formData.assignTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Product Type Selection */}
        <div>
          <label className="block text-sm font-medium">Product Type</label>
          <select
            name="productTypeId"
            value={formData.productTypeId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Product</option>
            {productTypes
              .filter((type) => type.type === 'PRODUCT')
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>
        </div>

        {/* Number of Products */}
        {/* <div>
          <label className="block text-sm font-medium">
            Number of Products
          </label>
          <input
            type="number"
            name="numberOfProducts"
            value={formData.numberOfProducts}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div> */}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          onClick={generateExcel}
        >
          Download Sample format
        </button>

        <div>
          <label className="font-semibold mb-1 block">Bulk Upload File</label>
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleBulkFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInhandProduct;
