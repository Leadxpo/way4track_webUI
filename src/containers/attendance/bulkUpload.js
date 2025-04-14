// import React, { useState } from 'react';
// import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

// const AttendanceUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const initialFormData = {
//     // staffId: '',
//     // day: '',
//     // branchName: '',
//     // inTime: '',
//     // outTime: '',
//     // inTimeRemark: '',
//     // staffName: '',
//     // outTimeRemark: '',
//     // status: AttendanceStatus,
//     // remarks: '',
//     file: null,
//   };
//   const [formData, setFormData] = useState(initialFormData);

//   const handleSave = async () => {

//     if (selectedFile) {
//       // Bulk upload logic
//       const bulkPayload = new FormData();
//       bulkPayload.append('file', selectedFile);

//       try {
//         const response = await ApiService.post('/attendance/upload', bulkPayload, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         if (response.data.status) {
//           alert('Bulk upload successful!');
//           navigate('/products');
//         } else {
//           alert('Bulk upload failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error during bulk upload:', error);
//         alert('Failed to upload bulk file. Please check your input.');
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-6 bg-white rounded-lg shadow-lg w-[500px] text-center">
//         <h2 className="text-lg font-semibold mb-4">
//           Upload Update Attendance{' '}
//           <span className="text-gray-500">(Excel File)</span>
//         </h2>

//         {/* File Upload Button */}
//         <label
//           htmlFor="file-upload"
//           className="border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition"
//         >
//           <FaUpload size={32} className="text-gray-500 mb-2" />
//           <p className="text-gray-500">
//             {selectedFile ? selectedFile.name : 'Click to Upload'}
//           </p>
//           <input
//             id="file-upload"
//             type="file"
//             accept=".xlsx, .xls"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </label>

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             type="button"
//             onClick={handleSave}
//             className="p-3 bg-blue-500 text-white rounded-md w-full"
//             disabled={isLoading}
//           >
//             <FaCheck /> OK
//           </button>
//           <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
//             <FaTimes /> Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceUpload;

import React, { useState } from 'react';
import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import * as XLSX from 'xlsx';

const AttendanceUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }
    const bulkPayload = new FormData();
    bulkPayload.append('file', selectedFile);

    console.log('FormData:', bulkPayload.get('file'));

    setIsLoading(true);
    try {
      const response = await ApiService.post(
        '/attendance/upload',
        bulkPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(response, '???????????????????????????');
      if (response.message) {
        alert('Bulk upload successful!');
        navigate('/attendance');
      }
    } catch (error) {
      console.error('Error during bulk upload:', error);
      alert(
        error.response?.data?.message ||
          'Failed to upload bulk file. Please check your input.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file && !file.name.match(/\.(xls|xlsx)$/)) {
  //     alert('Please upload a valid Excel file (.xls or .xlsx)');
  //     return;
  //   }

  //   setSelectedFile(file);
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const generateExcel = () => {
    const worksheetData = [
      {
        'Staff ID': '',
        Name: '',
        'Branch Name': '',
        'Month-Year': '',
        'Day 1 IN TIME': '',
        'Day 1 IN TIME Remarks': '',
        'Day 1 OUT TIME': '',
        'Day 1 OUT TIME Remarks': '',
        'Day 1 Remarks': '',
        'Day 1 Status': '',
        'Day 2 IN TIME': '',
        'Day 2 IN TIME Remarks': '',
        'Day 2 OUT TIME': '',
        'Day 2 OUT TIME Remarks': '',
        'Day 2 Remarks': '',
        'Day 2 Status': '',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Format');

    XLSX.writeFile(workbook, 'SampleAttendanceFormat.xlsx');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[500px] text-center">
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            onClick={generateExcel}
          >
            Download Sample format
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          Upload Update Attendance{' '}
          <span className="text-gray-500">(Excel File)</span>
        </h2>

        {/* File Upload */}
        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition"
        >
          <FaUpload size={32} className="text-gray-500 mb-2" />
          <p className="text-gray-500">
            {selectedFile ? selectedFile.name : 'Click to Upload'}
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="p-3 bg-blue-500 text-white rounded-md w-full flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaCheck /> {isLoading ? 'Uploading...' : 'OK'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpload;
