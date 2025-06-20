import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaPaperclip } from 'react-icons/fa6';
import jsPDF from 'jspdf';
import hasPermission from '../../common/permission'

const ViewBackendWorkDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const [workRecord, setWorkRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [newRemark, setNewRemark] = useState('');
  var permission = localStorage.getItem("userPermissions");
  const [remarks, setRemarks] = useState(null);

  const userId = localStorage.getItem('userId');
  const userProfile = localStorage.getItem('userProfile');

  const parsedProfile = JSON.parse(userProfile);
  const userName = parsedProfile?.data?.name;
  const [serviceOptions, setServiceOptions] = useState(null);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(data, 'remarks');
  const fetchRecords = async () => {
    if (!data?.id) {
      console.error('No valid ID found for API call.');
      return;
    }

    try {
      console.log('Fetching work details for ID:', data.id);
      const response = await ApiService.post(
        '/technician/getTechnicianDetailsById',
        {
          id: data.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response?.data) {
        console.log('API Response:', response.data);
        setWorkRecord(response.data);
        setEditedRecord(response.data);
        setRemarks(response.data.remark);
      } else {
        console.error('API responded with no data');
        setWorkRecord(null);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecord(null);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [data]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ApiService.post(
          '/ServiceType/getServiceTypeNamesDropDown',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        if (response?.data) {
          console.log(response.data, 'services');
          setServiceOptions(response.data);
        } else {
          console.error('API responded with no data');
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await ApiService.post(
          '/VehicleType/getVehicleTypeNamesDropDown',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response?.data) {
          setVehicleTypeOptions(response.data);
        } else {
          console.error('API responded with no data');
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchVehicleTypes();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e, key) => {
    setEditedRecord({ ...editedRecord, [key]: e.target.value });
  };

  const handleSave = async () => {
    if (!editedRecord?.id) {
      console.error('No valid ID found for updating record.');
      return;
    }

    try {
      const response = await ApiService.post(
        '/technician/handleTechnicianDetails',
        {
          id: editedRecord.id,
          staffId: data.staffId,
          branchId: data.branchId,
          backSupporterId: data.backSupporterId,
          service: editedRecord.service,
          workStatus: editedRecord.workStatus,
          paymentStatus: editedRecord.paymentStatus,
          date: editedRecord.date,
          attendedDate: editedRecord.attendedDate,
          productName: editedRecord.productName,
          imeiNumber: editedRecord.imeiNumber,
          vehicleType: editedRecord.vehicleType,
          vehicleNumber: editedRecord.vehicleNumber,
          chassisNumber: editedRecord.chassisNumber,
          engineNumber: editedRecord.engineNumber,
          name: editedRecord.name,
          email: editedRecord.email,
          phoneNumber: editedRecord.phoneNumber,
          address: editedRecord.address,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          technicianNumber: editedRecord.technicianNumber,
          amount: editedRecord.amount,
          vehiclePhotos: editedRecord.vehiclePhotos,
        }
      );

      console.log('Record updated successfully:', response.data);

      setWorkRecord(editedRecord);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDeleteImage = (index) => {
    setEditedRecord((prev) => {
      const updatedPhotos = [...prev.vehiclePhotos];
      updatedPhotos.splice(index, 1);
      return { ...prev, vehiclePhotos: updatedPhotos };
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    setEditedRecord((prev) => ({
      ...prev,
      vehiclePhotos: [...prev.vehiclePhotos, ...newImageURLs],
    }));
  };

  if (!data) {
    return <p className="text-red-500 text-center">No data available</p>;
  }

  const vehiclePhotos = workRecord
    ? [
        workRecord.vehiclePhoto1,
        workRecord.vehiclePhoto2,
        workRecord.vehiclePhoto3,
        workRecord.vehiclePhoto4,
      ].filter(Boolean)
    : [];

  const handleSend = async () => {
    if (newRemark.trim() === '' && !selectedFile) return;

    try {
      let fileTypeLabel = null;
      let fileKey = null;

      if (selectedFile) {
        const mimeType = selectedFile.type;

        if (mimeType.startsWith('image/')) {
          fileTypeLabel = 'Image';
          fileKey = 'image';
        } else if (mimeType.startsWith('video/')) {
          fileTypeLabel = 'Video';
          fileKey = 'videos';
        } else {
          fileTypeLabel = 'File';
          fileKey = 'file';
        }
      }

      const newRemarkObj = {
        staffId: userId,
        name: userName,
        date: new Date(),
        desc: newRemark,
        file: selectedFile ? { name: fileTypeLabel } : null,
      };

      const updatedRemarks = [newRemarkObj];

      const formData = new FormData();
      formData.append('id', workRecord.id);
      formData.append('companyCode', initialAuthState.companyCode);
      formData.append('unitCode', initialAuthState.unitCode);
      formData.append('remark', JSON.stringify(updatedRemarks));

      // ⬇️ Dynamically set file key
      if (selectedFile && fileKey) {
        formData.append(fileKey, selectedFile);
      }

      const response = await ApiService.post(
        '/technician/handleTechnicianDetails',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response?.data) {
        // setRemarks(updatedRemarks);
        fetchRecords();
        setSelectedFile(null);
      } else {
        console.error('API responded with error');
      }
    } catch (err) {
      console.error('Failed to send remark or file:', err);
      setWorkRecord(null);
    }

    setNewRemark('');
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    let y = 10;

    const addSectionTitle = (title) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 10, y);
      y += 8;
    };

    const addField = (label, value) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`${label}: ${value || '-'}`, 10, y);
      y += 6;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    };

    addSectionTitle('Work Record Details');

    // General Information
    addSectionTitle('General Information');
    addField('Service', editedRecord.service);
    addField('Work Status', editedRecord.workStatus);
    addField('Payment Status', editedRecord.paymentStatus);
    addField('Date', new Date(editedRecord.date).toLocaleString());
    addField(
      'Attend Date',
      new Date(editedRecord.attendedDate).toLocaleString()
    );

    // Product Details
    addSectionTitle('Product Details');
    addField('Product Name', editedRecord.productName);
    addField('IMEI Number', editedRecord.imeiNumber);

    // Vehicle Information
    addSectionTitle('Vehicle Information');
    addField('Vehicle Type', editedRecord.vehicleType);
    addField('Vehicle Number', editedRecord.vehicleNumber);
    addField('Chassis Number', editedRecord.chassisNumber);
    addField('Engine Number', editedRecord.engineNumber);

    // Client Details
    addSectionTitle('Client Details');
    addField('Client Name', editedRecord.name);
    addField('Email', editedRecord.email);
    addField('Phone Number', editedRecord.phoneNumber);
    addField('Address', editedRecord.address);

    // Company & Work Details
    addSectionTitle('Company & Work Details');
    addField('Technician Number', editedRecord.technicianNumber);
    addField('Amount', editedRecord.amount);

    // Payment Details
    addSectionTitle('Payment Details');
    addField('Amount', editedRecord.amount);
    addField('Paid Amount', editedRecord.paidAmount);
    addField('Payment Status', editedRecord.paymentStatus);

    // Backend Support Details
    if (editedRecord.backEndStaffRelation) {
      addSectionTitle('Backend Support Details');
      addField('ID', editedRecord.backEndStaffRelation.id);
      addField('Name', editedRecord.backEndStaffRelation.name);
      addField('Phone Number', editedRecord.backEndStaffRelation.phoneNumber);
    }
    // Remarks
    if (remarks && remarks.length) {
      addSectionTitle('Remarks');
      remarks.forEach((remark) => {
        addField(
          `${remark.name} (${new Date(remark.date).toLocaleString()})`,
          remark.desc
        );
      });
    }

    doc.save('work-record-details.pdf');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Work Record Details
      </h1>
      {workRecord ? (
        <div className="border p-6 rounded-md bg-gray-50 shadow-md">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Back
            </button>

            <div>
            {hasPermission(permission, "backend", "edit") &&

              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
}
              <button
                onClick={generatePDF}
                className="mb-4 px-4 py-2 ml-2 bg-green-600 text-white rounded"
              >
                Download PDF
              </button>
            </div>
          </div>

          <Section title="General Information">
            {/* <DetailRow label="ID" value={workRecord.id} editable={false} /> */}
            <DetailRow
              label="Service"
              value={editedRecord.service}
              editable={isEditing}
              onChange={handleChange}
              field="service"
              options={serviceOptions}
            />
            <DetailRow
              label="Work Status"
              value={editedRecord.workStatus}
              // editable={isEditing}
              onChange={handleChange}
              field="workStatus"
            />
            <DetailRow
              label="Payment Status"
              value={editedRecord.paymentStatus}
              // editable={isEditing}
              onChange={handleChange}
              field="paymentStatus"
            />
            <DetailRow
              label="Date"
              value={new Date(editedRecord.date).toLocaleString()}
              // editable={isEditing}
              onChange={handleChange}
              field="date"
            />
            <DetailRow
              label="Attend Date"
              value={new Date(editedRecord.attendedDate).toLocaleString()}
              // editable={isEditing}
              onChange={handleChange}
              field="attendedDate"
            />
          </Section>

          <Section title="Product Details">
            <DetailRow
              label="Product Name"
              value={editedRecord.productName}
              editable={isEditing}
              onChange={handleChange}
              field="productName"
            />
            <DetailRow
              label="IMEI Number"
              value={editedRecord.imeiNumber}
              editable={isEditing}
              onChange={handleChange}
              field="imeiNumber"
            />
          </Section>

          <Section title="Vehicle Information">
            <DetailRow
              label="Vehicle Type"
              value={editedRecord.vehicleType}
              editable={isEditing}
              onChange={handleChange}
              field="vehicleType"
              options={vehicleTypeOptions}
            />
            <DetailRow
              label="Vehicle Number"
              value={editedRecord.vehicleNumber}
              editable={isEditing}
              onChange={handleChange}
              field="vehicleNumber"
            />
            <DetailRow
              label="Chassis Number"
              value={editedRecord.chassisNumber}
              editable={isEditing}
              onChange={handleChange}
              field="chassisNumber"
            />
            <DetailRow
              label="Engine Number"
              value={editedRecord.engineNumber}
              editable={isEditing}
              onChange={handleChange}
              field="engineNumber"
            />
          </Section>

          <Section title="Client Details">
            <DetailRow
              label="Client Name"
              value={editedRecord.name}
              editable={isEditing}
              onChange={handleChange}
              field="name"
            />
            <DetailRow
              label="Email"
              value={editedRecord.email}
              editable={isEditing}
              onChange={handleChange}
              field="email"
            />
            <DetailRow
              label="Phone Number"
              value={editedRecord.phoneNumber}
              editable={isEditing}
              onChange={handleChange}
              field="phoneNumber"
            />
            <DetailRow
              label="Address"
              value={editedRecord.address}
              editable={isEditing}
              onChange={handleChange}
              field="address"
            />
          </Section>

          <Section title="Company & Work Details">
            {/* <DetailRow
              label="Company Code"
              value={editedRecord.companyCode}
              editable={isEditing}
              onChange={handleChange}
              field="companyCode"
            />
            <DetailRow
              label="Unit Code"
              value={editedRecord.unitCode}
              editable={isEditing}
              onChange={handleChange}
              field="unitCode"
            /> */}
            <DetailRow
              label="Technician Number"
              value={editedRecord.technicianNumber}
              editable={isEditing}
              onChange={handleChange}
              field="technicianNumber"
            />
            <DetailRow
              label="Amount"
              value={editedRecord.amount}
              editable={isEditing}
              onChange={handleChange}
              field="amount"
            />
          </Section>

          <Section title="Vehicle Images">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {vehiclePhotos.map((photo, index) => (
                <ImageBox
                  key={index}
                  src={photo}
                  alt={`Vehicle ${index + 1}`}
                  isEditing={isEditing}
                  onDeleteImage={() => handleDeleteImage(index)}
                />
              ))}
            </div>

            {/* {isEditing && (
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="mt-4"
              />
            )} */}
          </Section>

          <Section title="Payment Details">
            <DetailRow
              label="Amount"
              value={editedRecord.amount}
              editable={isEditing}
              onChange={handleChange}
              field="amount"
            />
            <DetailRow
              label="Paid Amount"
              value={editedRecord.paidAmount}
              editable={isEditing}
              onChange={handleChange}
              field="paidAmount"
            />
            <DetailRow
              label="Payment Status"
              value={editedRecord.paymentStatus}
              editable={isEditing}
              onChange={handleChange}
              field="paymentStatus"
            />

            {editedRecord.screenShot && (
              <ImageBox
                src={editedRecord.screenShot}
                alt="Payment Screenshot"
                isEditing={isEditing}
                // onDeleteImage={() => handleDeleteImage(index)}
              />
            )}
          </Section>

          {editedRecord.backEndStaffRelation && (
            <Section title="Backend Support Details">
              <DetailRow
                label="id"
                value={editedRecord.backEndStaffRelation.id}
                editable={isEditing}
                onChange={handleChange}
                field="id"
              />
              <DetailRow
                label="name"
                value={editedRecord.backEndStaffRelation.name}
                editable={isEditing}
                onChange={handleChange}
                field="name"
              />
              <DetailRow
                label="Phone Nmuber"
                value={editedRecord.backEndStaffRelation.phoneNumber}
                editable={isEditing}
                onChange={handleChange}
                field="phoneNumber"
              />

              {editedRecord.screenShot && (
                <ImageBox
                  src={editedRecord.screenShot}
                  alt="Payment Screenshot"
                  isEditing={isEditing}
                  // onDeleteImage={() => handleDeleteImage(index)}
                />
              )}
            </Section>
          )}

          <div className="mt-6 max-w-[1000px] min-h-[300px] border rounded-md p-4 bg-white shadow-md">
            <h1 className="text-xl font-bold mb-4">Remarks</h1>
            {/* Scrollable Chat Area */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {remarks?.map((remark, index) => {
                const isLoggedInUser = remark.name === userName;
                const isImage = remark?.file?.name === 'Image' && remark.image;
                const isVideo = remark?.file?.name === 'Video' && remark.video;

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isLoggedInUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[75%] shadow space-y-2 ${
                        isLoggedInUser
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{remark.desc}</p>

                      {isImage && (
                        <a
                          href={remark.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={remark.image}
                            alt="attached"
                            className="mt-2 rounded max-w-full max-h-[200px] hover:opacity-90 transition"
                            style={{
                              width: '200px',
                              height: '80px',
                              cursor: 'pointer',
                            }}
                          />
                        </a>
                      )}

                      {isVideo && (
                        <a
                          href={remark.video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <video
                            muted
                            className="mt-2 rounded max-w-full max-h-[250px] hover:opacity-90 transition"
                            style={{
                              width: '250px',
                              height: '200px',
                              cursor: 'pointer',
                            }}
                          >
                            <source src={remark.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {remark.name} • {new Date(remark.date).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Input and Send Button */}

            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                className="border rounded w-full p-2 text-sm"
                placeholder="Enter your remark..."
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
              />

              <input
                id="file-upload"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
              />

              <label
                htmlFor="file-upload"
                className="cursor-pointer p-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                <FaPaperclip className="w-5 h-5 text-gray-600" />
              </label>

              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">
          Failed to fetch data or no record available
        </p>
      )}
    </div>
  );
};

// const downloadImage = async (url) => {
//     try {
//       const response = await fetch(url, {
//         mode: 'cors', // will still fail if CORS is not allowed by the server
//       });
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const a = document.createElement('a');
//       a.href = blobUrl;
//       a.download = 'image.jpg';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error('Download failed:', err);
//     }
//   };

const Section = ({ title, children }) => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow-md border">
    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const DetailRow = ({
  label,
  value,
  editable,
  onChange,
  field,
  options = [],
}) => (
  <div className="flex justify-between items-center border-b py-2">
    <span className="font-semibold text-gray-600">{label}:</span>
    {editable ? (
      ['service', 'vehicleType'].includes(field) ? (
        <select
          className="border px-2 py-1"
          style={{ width: '50%' }}
          value={value}
          onChange={(e) => onChange(e, field)}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt.id} value={opt}>
              {opt.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          className="border px-2 py-1"
          value={value}
          onChange={(e) => onChange(e, field)}
        />
      )
    ) : (
      <span className="text-gray-800">{value}</span>
    )}
  </div>
);

const downloadImage = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream', // Force browser to download
      },
    });
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Download failed:', err);
  }
};

const ImageBox = ({ src, alt, isEditing, onDeleteImage }) => (
  <div className="relative group">
    <img
      src={src}
      alt={alt}
      className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
      onClick={() => window.open(src, '_blank')}
    />
    <a href={src} download="vehicle_photo.jpg">
      <button>Download Image</button>
    </a>

    {/* {isEditing && (
      <button
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDeleteImage}
      >
        Delete
      </button>
    )} */}
  </div>
);

export default ViewBackendWorkDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';

// const ViewBackendWorkDetails = () => {
//   const location = useLocation();
//   const { data } = location.state || {}; // Get data from navigation state
//   const [workRecord, setWorkRecord] = useState(null);

//   useEffect(() => {
//     const fetchRecords = async () => {
//       if (!data?.id) {
//         console.error('No valid ID found for API call.');
//         return;
//       }

//       try {
//         console.log('Fetching work details for ID:', data.id);
//         const response = await ApiService.post(
//           '/technician/getTechnicianDetailsById',
//           {
//             id: data.id,
//             companyCode: initialAuthState.companyCode,
//             unitCode: initialAuthState.unitCode,
//           }
//         );

//         if (response?.data) {
//           console.log('API Response:', response.data);
//           setWorkRecord(response.data);
//         } else {
//           console.error('API responded with no data');
//           setWorkRecord(null);
//         }
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//         setWorkRecord(null);
//       }
//     };

//     fetchRecords();
//   }, [data]);

//   if (!data) {
//     return <p className="text-red-500 text-center">No data available</p>;
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Work Record Details
//       </h1>

//       {workRecord ? (
//         <div className="border p-6 rounded-md bg-gray-50 shadow-md">
//           {/* General Info */}
//           <Section title="General Information">
//             <DetailRow label="ID" value={workRecord.id} />
//             <DetailRow label="Service" value={workRecord.service} />
//             <DetailRow label="Work Status" value={workRecord.workStatus} />
//             <DetailRow
//               label="Payment Status"
//               value={workRecord.paymentStatus}
//             />
//             <DetailRow
//               label="Date"
//               value={new Date(workRecord.date).toLocaleString()}
//             />
//             <DetailRow
//               label="Attended Date"
//               value={new Date(workRecord.attendedDate).toLocaleDateString()}
//             />
//           </Section>

//           {/* Product Details */}
//           <Section title="Product Details">
//             <DetailRow label="Product Name" value={workRecord.productName} />
//             <DetailRow
//               label="IMEI Number"
//               value={workRecord.imeiNumber || 'N/A'}
//             />
//             <DetailRow
//               label="Service/Product"
//               value={workRecord.serviceOrProduct || 'N/A'}
//             />
//           </Section>

//           {/* Vehicle Details */}
//           <Section title="Vehicle Information">
//             <DetailRow label="Vehicle Type" value={workRecord.vehicleType} />
//             <DetailRow
//               label="Vehicle Number"
//               value={workRecord.vehicleNumber || 'N/A'}
//             />
//             <DetailRow
//               label="Chassis Number"
//               value={workRecord.chassisNumber || 'N/A'}
//             />
//             <DetailRow
//               label="Engine Number"
//               value={workRecord.engineNumber || 'N/A'}
//             />
//           </Section>

//           {/* Client Details */}
//           <Section title="Client Details">
//             <DetailRow label="Client Name" value={workRecord.name || 'N/A'} />
//             <DetailRow label="Email" value={workRecord.email || 'N/A'} />
//             <DetailRow
//               label="Phone Number"
//               value={workRecord.phoneNumber || 'N/A'}
//             />
//             <DetailRow label="Address" value={workRecord.address || 'N/A'} />
//             <DetailRow
//               label="SIM Number"
//               value={workRecord.simNumber || 'N/A'}
//             />
//           </Section>

//           {/* Company Details */}
//           <Section title="Company & Work Details">
//             <DetailRow label="Company Code" value={workRecord.companyCode} />
//             <DetailRow label="Unit Code" value={workRecord.unitCode} />
//             <DetailRow
//               label="Technician Number"
//               value={workRecord.technicianNumber || 'N/A'}
//             />
//             <DetailRow label="Amount" value={workRecord.amount || 'N/A'} />
//             <DetailRow
//               label="Description"
//               value={workRecord.description || 'N/A'}
//             />
//           </Section>

//           {/* Images */}
//           <Section title="Vehicle Images">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//               {workRecord.vehiclePhoto1 && (
//                 <ImageBox src={workRecord.vehiclePhoto1} alt="Vehicle 1" />
//               )}
//               {workRecord.vehiclePhoto2 && (
//                 <ImageBox src={workRecord.vehiclePhoto2} alt="Vehicle 2" />
//               )}
//               {workRecord.vehiclePhoto3 && (
//                 <ImageBox src={workRecord.vehiclePhoto3} alt="Vehicle 3" />
//               )}
//               {workRecord.vehiclePhoto4 && (
//                 <ImageBox src={workRecord.vehiclePhoto4} alt="Vehicle 4" />
//               )}
//             </div>
//           </Section>
//         </div>
//       ) : (
//         <p className="text-red-500 text-center">
//           Failed to fetch data or no record available
//         </p>
//       )}
//     </div>
//   );
// };

// const Section = ({ title, children }) => (
//   <div className="mb-6 p-4 bg-white rounded-lg shadow-md border">
//     <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
//       {title}
//     </h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//   </div>
// );

// const DetailRow = ({ label, value }) => (
//   <div className="flex justify-between items-center border-b py-2">
//     <span className="font-semibold text-gray-600">{label}:</span>
//     <span className="text-gray-800">{value}</span>
//   </div>
// );

// const ImageBox = ({ src, alt }) => (
//   <img
//     src={src}
//     alt={alt}
//     className="w-full h-32 object-cover rounded-md shadow"
//   />
// );

// export default ViewBackendWorkDetails;
