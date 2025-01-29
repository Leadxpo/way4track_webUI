// BodyLayout.js
import React, { useState } from 'react';
import { FaUserCircle, FaCog, FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Staff from '../staff';
import { Routes, Route } from 'react-router-dom';
import Products from '../products';
import Branches from '../branches';
import Home from '../home';
import TableWithDateFilter from '../tablesDateFilter';
import TableWithSearchFilter from '../tablesSearchFilter';
import Analysis from '../analysis';
import Reports from '../reports';
import { formattedPaths, menuOptions } from '../../common/constants';
import Asserts from '../asserts';
import Settings from '../settings';
import AddBranchForm from '../branches/addBranch';
import AddEditEmployeeForm from '../staff/addEditStaff';
import Profile from '../profile';
import AddEditVendor from '../vendors/addVendor';
import AddSubDealer from '../sub-dealers/addSubDealer';
import Notifications from '../notifications';
import Vouchers from '../vouchers';
import WorkAllocation from '../work-allocation';
import Tickets from '../tickets';
import AddProductForm from '../products/addProduct';
import BranchDetails from '../branches/moreDetails';
import Vendors from '../vendors';
import DeleteVendor from '../vendors/deleteVendor';
import VendorProfile from '../vendors/vendorProfile';
import SubDealers from '../sub-dealers';
import DeleteSubDealer from '../sub-dealers/deleteSubDealer';
import SubDealerDetails from '../sub-dealers/subDealerDetails';
import DayBook from '../day-book';
import Ledger from '../ledger';
import LedgerDetails from '../ledger/ledgerDetails';
import Clients from '../clients';
import AddEditClient from '../clients/addClient';
import DeleteClient from '../clients/deleteClient';
import ClientProfile from '../clients/clientProfile';
import AddEditEstimate from '../estimates/AddEditEstimate';
import Estimates from '../estimates';
import EstimateDetails from '../estimates/estimateDetails';
import Invoices from '../invoices';
import AddEditInvoice from '../invoices/addEditInvoice';
import InvoiceDetails from '../invoices/invoiceDetails';
import DownloadComponent from '../reports/download';
import Receipts from '../receipts';
import Purchase from '../purchase';
import Payroll from '../payroll';
import StaffDetails from '../staff/staffDetails';
import InHandProductsForm from '../products/inHandProductForm';
import Tracker from '../tracker';
import RequestRaise from '../request-raise';
import DeleteRequest from '../request-raise/deleteRequest';
import AddEditRequestForm from '../request-raise/addEdit';
import RequestDetails from '../request-raise/requestDetails';
import Appointments from '../appointment';
import AddEditAppointmentForm from '../appointment/addEditAppointment';
import AppointmentDetails from '../appointment/appointmentDetails';
import AddHiring from '../hiring/addHiring';
import DeleteHiring from '../hiring/deleteHiring';
import Hiring from '../hiring';
import EditHiring from '../hiring/editHiring';
import HiringDetails from '../hiring/hiringDetails';
import ProductAssign from '../product-assign';
import AddEditProductAssign from '../product-assign/addEditProductAssign';
import DeleteProductAsign from '../product-assign/deleteProductAssign';
import AddEditVouchers from '../vouchers/addEditVouchers';
import ProductAssignDetails from '../product-assign/productAssignDetails';
import AddAsset from '../asserts/addAsset';
import AssetDetails from '../asserts/assetDetails';
import BankDetailsDashboard from '../bank-details';
import AddEditBankDetails from '../bank-details/addEditBankDetails';
import AddAmount from '../bank-details/addAmount';
import BankDetails from '../bank-details/bankDetails';
import TicketAssign from '../tickets-assign';
import { CustomSource } from 'mapbox-gl';
import CustomerCareHome from '../home/customerCareHome';
const BodyLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('userRole');
  const getPathname = (role = 'ceo') => {
    return formattedPaths[role][location.pathname]?.name || '';
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Flatten menuOptions and filter based on the search term
    const filteredResults = menuOptions.ceo.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setResults(filteredResults);
  };

  // Handle result selection
  const handleResultClick = (route) => {
    setSearchTerm(''); // Clear the search input
    setResults([]); // Clear results
    navigate(route); // Navigate to the selected route
  };

  const getIcon = (role = 'ceo') => {
    // Access the routes for the given role from formattedPaths
    const routes = formattedPaths[role];

    // Find the current route in the formatted paths based on the location.pathname
    const menuItem = routes[location.pathname];

    // Return the icon if a matching route is found
    return menuItem ? (
      <div className="flex items-center justify-center bg-black p-1">
        {React.cloneElement(menuItem.icon, {
          className: 'w-4 h-4 object-contain',
        })}
      </div>
    ) : null;
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-wrap md:flex-nowrap justify-between items-center">
        {/* Logo and Path */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src="/way4tracklogo.png"
            alt="Client Logo"
            className="h-8 w-auto" // Adjust the size for better responsiveness
          />
          <span className="flex flex-col items-start text-gray-700 font-bold">
            <span className="flex items-center">
              {getIcon()}
              <span className="ml-2">
                <p className="text-xs">Pages / {getPathname()}</p>
                <p className="text-xs font-bold">Dashboard</p>
              </span>
            </span>
          </span>
        </div>

        {/* Search and Icons */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 w-full md:w-auto">
          {role === 'Accountant' ? (
            <button
              className="bg-red-500 text-sm text-white p-1 mb-4 md:mb-0"
              onClick={() => navigate('/bank-details-dashboard')}
            >
              Bank Account Details
            </button>
          ) : (
            <div className="w-full md:w-auto relative mb-4 md:mb-0">
              <input
                className="w-full md:w-64 border rounded pl-2 text-sm focus:outline-none"
                placeholder="Search here"
                value={searchTerm}
                onChange={handleSearch}
              />
              {/* Dropdown for search results */}
              {searchTerm && results.length > 0 && (
                <div className="absolute bg-white border rounded shadow-lg z-10 max-h-48 overflow-y-auto w-full">
                  {results.map((item) => (
                    <div
                      key={item.name}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleResultClick(item.route)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Icons */}
          <div className="flex space-x-4">
            <FaUserCircle
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => navigate('/profile')}
            />
            <FaCog
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => navigate('/settings')}
            />
            <FaBell
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => navigate('/notifications')}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff-details" element={<StaffDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/asserts" element={<Asserts />} />
          <Route path="/add-asset" element={<AddAsset />} />
          <Route path="/asset-details" element={<AssetDetails />} />
          <Route path="/estimate" element={<Estimates />} />
          <Route path="/add-estimate" element={<AddEditEstimate />} />
          <Route path="/estimate-details" element={<EstimateDetails />} />
          <Route path="/invoice" element={<Invoices />} />
          <Route path="/add-invoice" element={<AddEditInvoice />} />
          <Route path="/invoice-details" element={<InvoiceDetails />} />
          <Route
            path="/payments"
            element={<TableWithDateFilter type={'payments'} />}
          />
          <Route path="/requests" element={<RequestRaise />} />
          <Route path="/delete-request" element={<DeleteRequest />} />
          <Route path="/add-request" element={<AddEditRequestForm />} />
          <Route path="/request-details" element={<RequestDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/add-client" element={<AddEditClient />} />
          <Route path="/delete-client" element={<DeleteClient />} />
          <Route path="/client-details" element={<ClientProfile />} />
          <Route path="/products_assign" element={<ProductAssign />} />
          <Route
            path="/product-assign-details"
            element={<ProductAssignDetails />}
          />
          <Route
            path="/add-product-assign"
            element={<AddEditProductAssign />}
          />
          <Route
            path="/delete-product-assign"
            element={<DeleteProductAsign />}
          />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/sub_dealers" element={<SubDealers />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/add-voucher" element={<AddEditVouchers />} />
          <Route path="/work_allocation" element={<WorkAllocation />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/add-hiring" element={<AddHiring />} />
          <Route path="/delete-hiring" element={<DeleteHiring />} />
          <Route path="/edit-hiring" element={<EditHiring />} />
          <Route path="/hiring-details" element={<HiringDetails />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/download" element={<DownloadComponent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-branch" element={<AddBranchForm />} />
          <Route path="/edit-branch" element={<AddBranchForm />} />
          <Route path="/branch-details" element={<BranchDetails />} />
          <Route path="/add-staff" element={<AddEditEmployeeForm />} />
          <Route path="/edit-staff" element={<AddEditEmployeeForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-vendor" element={<AddEditVendor />} />
          <Route path="/delete-vendor" element={<DeleteVendor />} />
          <Route path="/add-sub-dealer" element={<AddSubDealer />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/delete-sub-dealer" element={<DeleteSubDealer />} />
          <Route path="/sub-dealer-profile" element={<SubDealerDetails />} />
          <Route path="/day-book" element={<DayBook />} />
          <Route path="/ledger-details" element={<LedgerDetails />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/in-hand-product" element={<InHandProductsForm />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<AddEditAppointmentForm />} />
          <Route path="/appointment-details" element={<AppointmentDetails />} />
          <Route
            path="/bank-details-dashboard"
            element={<BankDetailsDashboard />}
          />
          <Route path="/add-bank-account" element={<AddEditBankDetails />} />
          <Route path="/add-amount" element={<AddAmount />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/ticket-assign" element={<TicketAssign />} />
          <Route path="/customer-care-home" element={<CustomerCareHome />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default BodyLayout;
