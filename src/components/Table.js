import React, { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';

const getStatusStyle = (status) => {
  switch (status) {
    case 'Paid':
    case 'Present':
    case 'Accepted':
    case 'Approved':
    case 'Success':
      return {
        textColor: 'text-green-600',
        backgroundColor: 'bg-green-100',
      };
    case 'FAILED':
    case 'Absent':
    case 'Declined':
    case 'Unpaid':
    case 'Failed':
      return {
        textColor: 'text-red-600',
        backgroundColor: 'bg-red-100',
      };
    case 'IN PROGRESS':
    case 'Off Leave':
    case 'Sent':
    case 'Overdue':
    case 'Pending':
    case 'Processing':
      return {
        textColor: 'text-orange-600',
        backgroundColor: 'bg-orange-100',
      };
    default:
      return {
        textColor: 'text-gray-600',
        backgroundColor: 'bg-gray-100',
      };
  }
};

const checkColumn = (col) => {
  return (
    col === 'Status' ||
    col === 'status' ||
    col === 'attendance' ||
    col === 'paymentStatus'
  );
};

const Table = ({
  columns,
  data,
  onEdit,
  onDetails,
  onDelete,
  showEdit = true,
  showDelete = true,
  showDetails = true,
  editText = 'Edit',
  deleteText = 'Delete',
  detailsText = 'More Details',
}) => {
  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleActionClick = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow">
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
                  style={{ textTransform: "capitalize" }}
                >
                  {column}
                </th>
              ))}
              <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border-b border-gray-300 px-4 py-2 text-sm text-gray-600 ${checkColumn(column)
                        ? `${getStatusStyle(row[column]).textColor} ${getStatusStyle(row[column]).backgroundColor}`
                        : ''
                      }`}
                  >
                    {row[column]}
                  </td>
                ))}
                <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600 relative">
                  <span
                    onClick={() => handleActionClick(rowIndex)}
                    className="cursor-pointer"
                  >
                    <FaEllipsisVertical />
                  </span>
                  {openRowIndex === rowIndex && (
                    <div className="absolute top-8 right-0 w-32 bg-white border rounded shadow-lg z-10">
                      {showEdit && (
                        <button
                          onClick={() => {
                            onEdit(row);
                            setOpenRowIndex(null);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          {editText}
                        </button>
                      )}
                      {showDelete && (
                        <button
                          onClick={() => {
                            onDelete(row);
                            setOpenRowIndex(null);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          {deleteText}
                        </button>
                      )}
                      {showDetails && (
                        <button
                          onClick={() => {
                            onDetails(row);
                            setOpenRowIndex(null);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          {detailsText}
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
