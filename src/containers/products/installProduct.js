import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

const InstallProductsForm = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      items: [
        {
          name: '',
          quantity: '',
          hsncode: '',
          rate: '',
          totalAmount: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Install Products</h2>

      {/* Client Details */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Client Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <input type="file" {...register('clientImage')} />
          </div>
          <div>
            <label className="block font-medium">Client Name</label>
            <input
              type="text"
              {...register('clientName')}
              placeholder="Enter Client Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber')}
              placeholder="Enter Phone Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Client ID</label>
            <input
              type="text"
              {...register('clientId')}
              placeholder="Enter Client ID"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Branch</label>
            <select
              {...register('branch')}
              className="w-full p-2 border rounded"
            >
              <option>Select Branch</option>
              <option>Branch 1</option>
              <option>Branch 2</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              {...register('dob')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Email ID</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter Email ID"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Product Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <input type="file" {...register('productImage')} />
          </div>
          <div>
            <label className="block font-medium">Product Name</label>
            <select
              {...register('productName')}
              className="w-full p-2 border rounded"
            >
              <option>Select Product</option>
              <option>Product 1</option>
              <option>Product 2</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Date of Purchase</label>
            <input
              type="date"
              {...register('purchaseDate')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Vendor Name</label>
            <input
              type="text"
              {...register('vendorName')}
              placeholder="Enter Vendor Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Vendor Number</label>
            <input
              type="text"
              {...register('vendorNumber')}
              placeholder="Vendor Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Vendor Address</label>
            <input
              type="text"
              {...register('vendorAddress')}
              placeholder="Enter Address"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Vendor Email ID</label>
            <input
              type="email"
              {...register('vendorEmail')}
              placeholder="Enter Email ID"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">IMEI Number</label>
            <input
              type="text"
              {...register('imeiNumber')}
              placeholder="Enter IMEI Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Category Name</label>
            <input
              type="text"
              {...register('category')}
              placeholder="Category Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              {...register('price')}
              placeholder="Enter Price"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Estimate / Invoice Details:
        </h3>
        <div className="">
          <div className="mt-4">
            <label className="block font-medium">Estimate / Invoice</label>
            <input
              type="text"
              {...register('estimateInvoice')}
              placeholder="Enter Product Description"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Estimate Date</label>
            <input
              type="date"
              {...register('estimateDate')}
              className="w-full p-2 border rounded"
            />
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 items-center p-2 border-t"
            >
              <span className="col-span-1">{index + 1}</span>
              <input
                type="text"
                {...register(`items.${index}.name`)}
                placeholder="Name"
                className="col-span-2 p-2 border rounded-md"
              />
              <input
                type="text"
                {...register(`items.${index}.quantity`)}
                placeholder="Quantity"
                className="col-span-2 p-2 border rounded-md"
              />
              <input
                type="text"
                {...register(`items.${index}.rate`)}
                placeholder="Rate"
                className="col-span-2 p-2 border rounded-md"
              />
              <input
                type="number"
                {...register(`items.${index}.totalAmount`)}
                placeholder="Amount"
                className="col-span-2 p-2 border rounded-md"
              />
              <input
                type="text"
                {...register(`items.${index}.hsncode`)}
                placeholder="HSN code"
                className="col-span-2 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-gray-100 rounded-md w-fit p-2"
              >
                -
              </button>
            </div>
          ))}
          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={() =>
                append({
                  name: '',
                  quantity: '',
                  rate: '',
                  totalAmount: '',
                  hsncode: '',
                })
              }
              className="text-blue-500 text-sm font-semibold mt-2 ml-2"
            >
              + Add Item
            </button>
          </div>
          <div className="mt-4">
            <label className="block font-medium">Description</label>
            <textarea
              {...register('description')}
              placeholder="Enter Description"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Technician Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <input type="file" {...register('technicianImage')} />
          </div>
          <div>
            <label className="block font-medium">Work Allocation ID</label>
            <input
              type="text"
              {...register('workAllocationId')}
              placeholder="Enter Work Allocation ID"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register('technicianPhoneNumber')}
              placeholder="Enter Phone Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Branch</label>
            <select
              {...register('technicianBranch')}
              className="w-full p-2 border rounded"
            >
              <option>Select Branch</option>
              <option>Branch 1</option>
              <option>Branch 2</option>
            </select>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default InstallProductsForm;
