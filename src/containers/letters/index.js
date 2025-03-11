import React, { useRef, useEffect, useState } from 'react';
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TerminationLetterPDF from '../../components/TerminationLetterPdf';

const Letters = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [download, setDownload] = useState(false);
  const downloadLinkRef = useRef(null);

  useEffect(() => {
    if (download && downloadLinkRef.current) {
      downloadLinkRef.current.click();
      setDownload(false); // Reset download state after triggering the download
    }
  }, [download]);

  const handleDownload = (name) => {
    setSelectedLetter(name);
    setIsModalOpen(true);
    if (name === 'Termination Letter') {
      setDownload(true);
    }
  };

  const employeeData = {
    name: 'John Doe',
    id: '12345',
    location: 'New York',
    designation: 'Software Engineer',
    department: 'IT',
    date: 'March 7, 2025',
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLetter('');
  };

  const getOfferLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Offer Letter
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {[
              'Name',
              'Date of Join',
              'Basic Salary',
              'Branch',
              'Designation',
            ].map((label, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-md text-green-700"
              >
                {label} :
              </div>
            ))}
          </div>

          {/* Offer Letter Button */}
          <button className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition">
            Offer Letter
          </button>
        </div>
      </div>
    );
  };

  const getTerminationLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Termination Letter
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {[
              'Name',
              'Date of Join',
              'Date of Termination',
              'Branch',
              'Role',
              'Designation',
            ].map((label, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-md text-green-700"
              >
                {label} :
              </div>
            ))}
          </div>

          {/* Termination Letter Button */}
          <button
            onClick={() => handleDownload('Termination Letter')}
            className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"
          >
            Termination Letter
          </button>
        </div>
      </div>
    );
  };

  const getExperienceLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Experience Letter
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {[
              'Name',
              'Date of Join',
              'Date of Resignation',
              'Experience',
              'Designation',
              'Description',
            ].map((label, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-md text-green-700"
              >
                {label} :
              </div>
            ))}
          </div>

          {/* Experience Letter Button */}
          <button className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition">
            Experience Letter
          </button>
        </div>
      </div>
    );
  };

  const getPayrollLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Pay Roll
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {['Month', 'Year'].map((label, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-md text-green-700"
              >
                {label} :
              </div>
            ))}
          </div>

          {/* Pay Roll Letter Button */}
          <button className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition">
            Pay Roll Letter
          </button>
        </div>
      </div>
    );
  };

  const getRelievingLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Relieving Letter
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {['Name', 'Address', 'From', 'To', 'Description'].map(
              (label, index) => (
                <div
                  key={index}
                  className="bg-green-100 p-3 rounded-md text-green-700"
                >
                  {label} :
                </div>
              )
            )}
          </div>

          {/* Relieving Letter Button */}
          <button className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition">
            Relieving Letter
          </button>
        </div>
      </div>
    );
  };

  const getResignationLetterElement = () => {
    return (
      <div className="">
        <div className="bg-green-600 text-white font-bold p-3 rounded-t-lg text-lg">
          Resignation Letter
        </div>
        <div className="border border-green-500 p-5 bg-green-50 rounded-b-lg shadow-md">
          <div className="space-y-4">
            {/* Staff ID with Dropdown */}
            <div className="flex items-center bg-green-100 p-3 rounded-md">
              <span className="text-green-700 flex-1">Staff ID :</span>
              <FaChevronDown className="text-green-700 cursor-pointer" />
            </div>

            {/* Other Input Fields */}
            {[
              'Name',
              'Date of Joining',
              'Date of Resignation',
              'Designation',
              'Description',
            ].map((label, index) => (
              <div
                key={index}
                className="bg-green-100 p-3 rounded-md text-green-700"
              >
                {label} :
              </div>
            ))}
          </div>

          {/* Resignation Letter Button */}
          <button className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition">
            Resignation Letter
          </button>
        </div>
      </div>
    );
  };

  const getModalElement = () => {
    switch (selectedLetter) {
      case 'Offer Letter':
        return getOfferLetterElement();
      case 'Termination Letter':
        return getTerminationLetterElement();
      case 'Experience Letter':
        return getExperienceLetterElement();
      case 'Pay Roll':
        return getPayrollLetterElement();
      case 'Relieving Letter':
        return getRelievingLetterElement();
      case 'Resignation Letter':
        return getResignationLetterElement();
      default:
        return null;
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-3/4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            {getModalElement()}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Offer Letter</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Offer Letter')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Termination Letter</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Termination Letter')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Experience Letter</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Experience Letter')}
        />
      </div>

      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Pay Roll</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Pay Roll')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Relieving Letter</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Relieving Letter')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Resignation Letter</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Resignation Letter')}
        />
      </div>
      {download && (
        <PDFDownloadLink
          document={<TerminationLetterPDF employee={employeeData} />}
          fileName="Termination_Letter.pdf"
          className="hidden"
          ref={downloadLinkRef}
        >
          {({ loading }) => (loading ? 'Generating...' : 'Click to Download')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default Letters;
