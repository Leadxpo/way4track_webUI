// BodyLayout.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Staff from '../staff';
import { Routes, Route } from 'react-router-dom';
import Products from '../products';
import ProductDetails from '../products/productMoreDetails';
import Branches from '../branches';
import Home from '../home';
import TableWithDateFilter from '../tablesDateFilter';
import TableWithSearchFilter from '../tablesSearchFilter';
import Analysis from '../analysis';
import Reports from '../reports';
import { formattedPaths } from '../../common/constants';
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
import EditWorkAllocation from '../work-allocation/editWorkAllocation';
import Tickets from '../tickets';
import AddProductForm from '../products/addProduct';
import BranchDetails from '../branches/moreDetails';
import Vendors from '../vendors';
import DeleteVendor from '../vendors/deleteVendor';
import VendorProfile from '../vendors/vendorProfile';
import SubDealers from '../sub-dealers';
import DeleteSubDealer from '../sub-dealers/deleteSubDealer';
import SubDealerDetails from '../sub-dealers/subDealerDetails';
// import SubDealerStaff from '../sub-dealers/subDelarStaff';

import DayBook from '../day-book';
import Ledger from '../ledger';
import LedgerDetails from '../ledger/ledgerDetails';
import Clients from '../clients';
import AddEditClient from '../clients/addClient';
import DeleteClient from '../clients/deleteClient';
import ClientProfile from '../clients/clientProfile';
import AddEstimate from '../estimates/AddEstimate';
import EditEstimate from '../estimates/EditEstimate';
import Estimates from '../estimates';
import EstimateDetails from '../estimates/estimateDetails';
import Invoices from '../invoices';
import AddEditInvoice from '../invoices/addEditInvoice';
import InvoiceDetails from '../invoices/invoiceDetails';
import DownloadComponent from '../reports/download';
import Receipts from '../receipts';
import Purchase from '../purchase';
import Payroll from '../payroll';
import Payrolls from '../payroll/payrolls';
import PayrollDetails from '../payroll/payrollDetails';
import StaffDetails from '../staff/staffDetails';
import Tracker from '../tracker';
import RequestRaise from '../request-raise';
import DeleteRequest from '../request-raise/deleteRequest';
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
import WarehouseManagerBranch from '../branches/warehouseManagerBranch';
import WarehouseManagerHome from '../home/warehouseManagerHome';
import TechnicianHome from '../home/technicianHome';
import Payments from '../payments';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import InstallProductsForm from '../products/installProduct';
import SubDealerHome from '../home/subDealerHome';
import SalesmanHome from '../home/salesmanHome';
import BranchManagerHome from '../home/branchManagerHome';
import Performance from '../performance';
import HrHome from '../home/hrHome';
import HrBranch from '../branches/hrBranch';
import ReceiptDetails from '../receipts/receiptDetails';
import Designation from '../designation';
import AddDesignation from '../designation/add-designation';
import DesignationDetails from '../designation/more-details';
import EditDesignation from '../designation/edit-designation';

import Letters from '../letters';
import Attendance from '../attendance';
import AttendanceUpload from '../attendance/bulkUpload';
import AttendanceDetails from '../attendance/attendanceDetails';
import EditAttendance from '../attendance/editAttendance';
import AddStaffForm from '../staff/AddStaffForm';
// import ViewStaffDetails from '../staff/ViewStaffDetails';
import EditBankDetails from '../staff/EditBankDetails';
import EditEmployerDetails from '../staff/EditEmployerDetails';
import EditPersonnelDetails from '../staff/EditPersonnelDetails';
import EditEducationDetails from '../staff/EditEducationDetails';
import AddInhandProduct from '../products/AddInhandProduct';
import SalesVisit from '../salesVisit';
import SalesVisitDetails from '../salesVisit/salesVisitDetails';
import EditAsset from '../asserts/editAssert';
import ProductType from '../product-type';
import AddProductType from '../product-type/AddProductType';
import EditProductType from '../product-type/EditProductType';
import ShowProductType from '../product-type/ShowProductTypes';
import Dispatch from '../dispatch';
import AddDispatch from '../dispatch/add-dispatch';
import DispatchDetails from '../dispatch/more-details.dispatch';
import EditDispatch from '../dispatch/edit-dispatch';
import EditSalesVisitDetails from '../salesVisit/editSalesVisitDetails';
import CreateWorkAllocation from '../work-allocation/createWorkAllocation';
import SelectBranch from '../vouchers/selectBranch';
import BackendSupportHome from '../home/BackendSupportHome';
import BackendSupportWorks from '../backendSupport/backendSupportWorks';
import ViewBackendWorkDetails from '../backendSupport/viewBackendWorkDetails';
import CeoBackendSupportHome from '../ceoBackendSupport';
import FilteredWorkStatusDetails from '../ceoBackendSupport/filteredWorkStatusDetails';
import Service from '../service';
import Vehicle from '../vehicle';
import AddService from '../service/AddService';
import EditService from '../service/EditService';
import EditVehicle from '../vehicle/EditVehicle';
import AddVehicle from '../vehicle/AddVehicle';
import ReportAccount from '../reports/accountent';
import ProductsInventory from '../reports/products.js';
import Groups from '../groups/index';
import AddGroups from '../groups/addGroup';
import AddLedger from '../ledger/addLedger';
import AddRequestRaise from '../request-raise/AddRequestRaise';
import EditRequestRaise from '../request-raise/EditRequestRaise';
import PurchaseForm from '../vouchers/purchaseForm';
import PaymentForm from '../vouchers/paymentForm';
import SaleForm from '../vouchers/saleForm';
import ReceiptForm from '../vouchers/receiptForm';
import ContraForm from '../vouchers/contraForm';
import JournalForm from '../vouchers/journalForm';
import DebitNoteForm from '../vouchers/debitNote';
import CreditNoteForm from '../vouchers/creditNote';
import AddSubDealerStaff from '../sub-dealers/subDelarStaff';
import SubDelarStaff from '../sub-dealers/subDelarStaff';
import SubDealerNotifications from '../notifications/sub-dealer-home-notifications';

import BackendSupportPayments from '../backendSupport/backendSupportPayments';
import CeoBackendSupportPayments from '../ceoBackendSupport/ceoBackSupportPayments';
import AddTicket from '../tickets/AddTicket';
import EditTicket from '../tickets/EditTicket';
import ViewTicket from '../tickets/ViewTicket';
import Ceoui from '../../webui/Ceoui';
// import AddProductTheme from '../../webui/productthems/AddProductTheme';
// import ProductTheme1 from '../../webui/Themes/ProductTheme1/ProductTheme1';
// import ProductTheme2 from '../../webui/Themes/ProductTheme2/Landingpage2.jsx';
import AddDashboardTheme from '../../webui/Dashboard/AddDashboardTheme';
import EditDashboardTheme from '../../webui/Dashboard/EditDashboardTheme';
import ThemeManager from '../../webui/productthems/ThemeManager.jsx';
import DashboardSessionDetails from '../../webui/DashboardSessionDetails.js';
import BlogPage from '../../webui/Blog/BlogPage.js';
import SubStaffDetails from '../sub-dealers/SubStaffDetails';
import AddSubStaff from '../sub-dealers/AddSubStaff';
import PersonnelDetails from '../sub-dealers/AddSubStaff';
import EditSubStaff from '../sub-dealers/EditSubStaff';
import ViewSubStaff from '../sub-dealers/ViewSubStaff';
import AppointmentTable from '../appointment/AppointmentTable';
import AddAppointment from '../appointment/AddAppointment';
import EditAppointment from '../appointment/EditAppointment';
import ViewAppointment from '../appointment/ViewAppointment';
import AddClient from '../clients/addClient';
import EditClient from '../clients/EditClient';
import AddEditSubDealer from '../sub-dealers/addSubDealer';
import EditSubDealer from '../sub-dealers/EditSubDealer';
import CustomHome from '../home/CustomHome';
import ProductPreview from '../../webui/ProductPreview.js';
import EditProductDetails from '../../webui/EditProductDetails.js';
import EditAmenitiesDetails from '../../webui/EditAmenitiesDetails.js';
import EditApplicationDetails from '../../webui/EditApplicationDetails.js';
import EditDeviceDetails from '../../webui/EditDeviceDetails.js';
import EditProductAppDetails from '../../webui/EditProductAppDetails.js';

import WebsiteOrders from '../websiteOrders/websiteOrders';
import OrderDetails from '../websiteOrders/orderDetails';
import ReplaceRequests from '../websiteOrders/replaceRequests.js';
import AdminDeviceReviews from '../websiteOrders/adminDeviceReviews.js';
import AddEditPromocode from '../promocode/AddEditPromocode.js';
import EditInvoice from '../invoices/EditInvoice.js';

import Promocode from '../promocode/index.js';
import EditVoucher from '../vouchers/editVoucher.js';
import ViewWork from '../appointment/ViewWork.js';
import CreateInvoice from '../backendSupport/createInvoice.js';
import MyAttendance from '../attendance/myAttendence.js';
import DemoLeads from '../demo-leads/index.js';
import { useNotificationContext } from '../../common/notoficationsContext.js';

const BodyLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  let locationInterval = null;
  const role = localStorage.getItem('role');
  const { requestCount, ticketCount } = useNotificationContext();
  const total = requestCount + ticketCount;
  const webUI = localStorage.getItem('webUI');
  const getPathname = () => {
    return formattedPaths[location.pathname]?.name || '';
  };

  const getIcon = () => {
    // Access the routes for the given role from formattedPaths
    const routes = formattedPaths;

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

  const toggleLocation = () => {
    setIsLocationEnabled(!isLocationEnabled);
  };

  useEffect(() => {
    if (isLocationEnabled) {
      fetchLocation(); // Fetch immediately when enabled

      locationInterval = setInterval(() => {
        fetchLocation();
      }, 5 * 1000); // Fetch every 5 minutes
    } else {
      clearInterval(locationInterval);
      setUserLocation(null); // Reset location when disabled
    }

    return () => clearInterval(locationInterval); // Cleanup interval on unmount
  }, [isLocationEnabled]);

  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        console.log('User location updated:', latitude, longitude);

        try {
          // First API Call: Fetch staff details
          const staffResponse = await ApiService.post(
            '/staff/getStaffDetailsById',
            {
              staffId: localStorage.getItem('userId'),
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );

          if (!staffResponse.status) {
            throw new Error('Staff not found');
          }

          const staffData = staffResponse.data;
          //setStaffDetails(staffData);

          console.log(staffData);
          // Second API Call: Store latitude and longitude
          const updateResponse = await ApiService.post(
            '/staff/handleStaffDetails',
            {
              id: staffData?.id, // Extracted ID
              latitude, // Storing location data
              longitude,
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );

          if (updateResponse.status) {
            console.log('Location stored successfully');
          } else {
            console.error('Failed to update staff location');
          }
        } catch (err) {
          console.error('Error processing location update:', err);
          //setStaffDetails(null);
        }
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-wrap md:flex-nowrap justify-between items-center">
        {/* Logo and Path */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src="/logo.png"
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
            <>
              <div className="w-full md:w-auto relative mb-4 md:mb-0">
                {role === 'CEO' ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    onClick={() => {
                      navigate('/ceoui');
                      localStorage.setItem('webUI', true);
                    }}
                  >
                    CEO
                  </button>
                ) : null}
              </div>
              <div className="w-full md:w-auto relative mb-4 md:mb-0">
                {role === 'CEO' && webUI ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    onClick={() => {
                      localStorage.removeItem('webUI');
                      navigate('/home');
                    }}
                  >
                    home
                  </button>
                ) : null}
              </div>
            </>
          )}

          <div className="flex items-center">
            {/* <span className="text-sm font-medium mr-2">Enable Location</span> */}
            {/* <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isLocationEnabled}
                onChange={toggleLocation}
              />
              <div
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-5 peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
              ></div>
            </label> */}
          </div>
          {/* Icons */}
          <div className="flex space-x-4">
            <FaUserCircle
              className="text-xl text-gray-600 cursor-pointer"
              onClick={() => navigate('/profile')}
            />
            {(role === 'CEO' || role === 'HR') && (
              <FaCog
                className="text-xl text-gray-600 cursor-pointer"
                onClick={() => navigate('/settings')}
              />
            )}

            <div>
              {role === 'Sub Dealer' ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    style={{ position: 'relative' }}
                    onClick={() => navigate('/sub-dealer-notifications')}
                  >
                    🔔
                    {total > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          fontSize: '10px',
                          padding: '2px 6px',
                        }}
                      >
                        {total}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <div
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    <button
                      style={{ position: 'relative' }}
                      onClick={() => navigate('/notifications')}
                    >
                      🔔
                      {total > 0 && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: '10px',
                            padding: '2px 6px',
                          }}
                        >
                          {total}
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff-details" element={<StaffDetails />} />
          <Route path="/product-type" element={<ProductType />} />
          <Route path="/add-product-type" element={<AddProductType />} />
          <Route path="/edit-product-type" element={<EditProductType />} />
          <Route path="/show-product-type" element={<ShowProductType />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-inhand-product" element={<AddInhandProduct />} />
          <Route path="/my-attendance" element={<MyAttendance />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/asserts" element={<Asserts />} />
          <Route path="/add-asset" element={<AddAsset />} />
          <Route path="/edit-asset" element={<EditAsset />} />
          <Route path="/asset-details" element={<AssetDetails />} />
          <Route path="/estimate" element={<Estimates />} />
          <Route path="/add-estimate" element={<AddEstimate />} />
          <Route path="/edit-estimate" element={<EditEstimate />} />
          <Route path="/estimate-details" element={<EstimateDetails />} />
          <Route path="/invoice" element={<Invoices />} />
          <Route path="/add-invoice" element={<AddEditInvoice />} />
          <Route path="/invoice-details" element={<InvoiceDetails />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/requests" element={<RequestRaise />} />
          <Route path="/delete-request" element={<DeleteRequest />} />
          <Route path="/add-request" element={<AddRequestRaise />} />
          <Route path="/edit-request" element={<EditRequestRaise />} />
          <Route path="/request-details" element={<RequestDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/edit-client" element={<EditClient />} />
          <Route path="/delete-client" element={<DeleteClient />} />
          <Route path="/client-details" element={<ClientProfile />} />
          <Route path="/products_assign" element={<ProductAssign />} />
          <Route
            path="/edit-salesVisit-details"
            element={<EditSalesVisitDetails />}
          />
          <Route
            path="/product-assign-details"
            element={<ProductAssignDetails />}
          />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/add-dispatch" element={<AddDispatch />} />
          <Route path="/edit-dispatch" element={<EditDispatch />} />
          <Route path="/show-dispatch" element={<DispatchDetails />} />
          <Route
            path="/add-product-assign"
            element={<AddEditProductAssign />}
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
          <Route
            path="/edit-work-allocation"
            element={<EditWorkAllocation />}
          />
          <Route path="/sales_visit" element={<SalesVisit />} />
          <Route path="/sales-visit-details" element={<SalesVisitDetails />} />
          <Route
            path="/create-work-allocation"
            element={<CreateWorkAllocation />}
          />
          <Route path="/select-branch" element={<SelectBranch />} />
          <Route path="/receipt-form" element={<ReceiptForm />} />
          <Route path="/report-account" element={<ReportAccount />} />
          <Route path="/products-inventory" element={<ProductsInventory />} />
          <Route path="/forms/Purchase" element={<PurchaseForm />} />
          <Route path="/forms/Payments" element={<PaymentForm />} />
          <Route path="/forms/Sale" element={<SaleForm />} />
          <Route path="/forms/Receipts" element={<ReceiptForm />} />
          <Route path="/forms/Journals" element={<JournalForm />} />
          <Route path="/forms/Contra" element={<ContraForm />} />
          <Route path="/forms/DebitNote" element={<DebitNoteForm />} />
          <Route path="/forms/CreditNote" element={<CreditNoteForm />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/add-ticket" element={<AddTicket />} />
          <Route path="/edit-ticket" element={<EditTicket />} />
          <Route path="/view-ticket" element={<ViewTicket />} />
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
          {/* <Route path="/add-staff" element={<AddEditEmployeeForm />} /> */}
          {/* <Route path="/edit-staff" element={<ViewStaffDetails />} /> */}
          <Route path="/add-staff" element={<AddStaffForm />} />
          <Route
            path="/edit-staff-personnel"
            element={<EditPersonnelDetails />}
          />
          <Route
            path="/edit-staff-education"
            element={<EditEducationDetails />}
          />
          <Route path="/edit-staff-bank" element={<EditBankDetails />} />
          <Route
            path="/edit-staff-employer"
            element={<EditEmployerDetails />}
          />
          {/* <Route path="/edit-staff" element={<AddEditEmployeeForm />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-vendor" element={<AddEditVendor />} />
          <Route path="/delete-vendor" element={<DeleteVendor />} />
          <Route path="/add-sub-dealer" element={<AddSubDealer />} />
          <Route path="/edit-sub-dealer" element={<EditSubDealer />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/sub-dealer-notifications"
            element={<SubDealerNotifications />}
          />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/delete-sub-dealer" element={<DeleteSubDealer />} />
          <Route path="/sub-staff-details" element={<SubStaffDetails />} />
          <Route path="/sub-dealer-profile" element={<SubDealerDetails />} />
          <Route path="/day-book" element={<DayBook />} />
          <Route path="/ledger-details" element={<LedgerDetails />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/service" element={<Service />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/edit-service" element={<EditService />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/edit-vehicle" element={<EditVehicle />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payrolls" element={<Payrolls />} />
          <Route path="/payroll-details" element={<PayrollDetails />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<AddEditAppointmentForm />} />
          <Route path="/appointment-details" element={<AppointmentDetails />} />
          {/* telecaller */}
          <Route path="/appointment-table" element={<AppointmentTable />} />
          <Route path="/create-appointment" element={<AddAppointment />} />
          <Route path="/edit-appointment" element={<EditAppointment />} />
          <Route path="/view-appointment" element={<ViewAppointment />} />
          EditAppointment
          <Route path="/edit-designation" element={<EditDesignation />} />
          <Route
            path="/bank-details-dashboard"
            element={<BankDetailsDashboard />}
          />
          <Route path="/add-bank-account" element={<AddEditBankDetails />} />
          <Route path="/add-amount" element={<AddAmount />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/custom-home" element={<CustomHome />} />
          {/* <Route path="/ticket-assign" element={<TicketAssign />} /> */}
          <Route path="/customer-care-home" element={<CustomerCareHome />} />
          <Route
            path="/warehouse-manager-branch"
            element={<WarehouseManagerBranch />}
          />
          <Route
            path="/warehouse-manager-home"
            element={<WarehouseManagerHome />}
          />
          <Route path="/technician-home" element={<TechnicianHome />} />
          <Route path="/install-product" element={<InstallProductsForm />} />
          <Route path="/sub-dealer-home" element={<SubDealerHome />} />
          <Route path="/salesman-home" element={<SalesmanHome />} />
          <Route path="/branch-manager-home" element={<BranchManagerHome />} />
          <Route path="/hr-home" element={<HrHome />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/hr-branch" element={<HrBranch />} />
          <Route path="/receipt-details" element={<ReceiptDetails />} />
          <Route path="/designations" element={<Designation />} />
          <Route path="/designation-details" element={<DesignationDetails />} />
          <Route
            path="/backend-support-home"
            element={<BackendSupportHome />}
          />
          <Route
            path="/backend-support-works"
            element={<BackendSupportWorks />}
          />
          <Route
            path="/backend-support-payments"
            element={<BackendSupportPayments />}
          />
          <Route
            path="/work-view-details"
            element={<ViewBackendWorkDetails />}
          />
          <Route
            path="/work-view-payments"
            element={<CeoBackendSupportPayments />}
          />
          <Route path="/backend-support" element={<CeoBackendSupportHome />} />
          <Route
            path="/backend-work-details/:id"
            element={<FilteredWorkStatusDetails />}
          />
          <Route path="/groups" element={<Groups />} />
          <Route path="/add-groups" element={<AddGroups />} />
          <Route path="/more-details-groups" element={<moreDetailsGroups />} />
          <Route path="/add-subdeler-staff" element={<SubDelarStaff />} />
          <Route path="/add-sub-staff" element={<PersonnelDetails />} />
          <Route path="/edit-sub-staff" element={<EditSubStaff />} />
          <Route path="/view-sub-staff" element={<ViewSubStaff />} />
          <Route path="/add-designation" element={<AddDesignation />} />
          <Route path="/add-ledger" element={<AddLedger />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance-upload" element={<AttendanceUpload />} />
          <Route path="/attendance-details" element={<AttendanceDetails />} />
          <Route path="/attendance-edit" element={<EditAttendance />} />
          <Route path="/all-orders" element={<WebsiteOrders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          {/* Add more routes as needed */}
          {/* web ui */}
          <Route path="/ceoui" element={<Ceoui />} />
          {/* <Route path="/AddProductTheme" element={<AddProductTheme />} /> */}
          <Route path="/AddDashboardTheme" element={<AddDashboardTheme />} />
          {/* <Route path="/ProductTheme1" element={<ProductTheme1 />} /> */}
          {/* <Route path="/ProductTheme2" element={<ProductTheme2 />} /> */}
          <Route path="/EditDashboardTheme" element={<EditDashboardTheme />} />
          <Route path="/ThemeManager" element={<ThemeManager />} />
          <Route
            path="/DashboardSessionDetails"
            element={<DashboardSessionDetails />}
          />
          <Route path="/BlogPage" element={<BlogPage />} />
          <Route path="/replace-requests" element={<ReplaceRequests />} />
          {/* <Route path="/ProductTheme1" element={<ProductTheme1 />} /> */}
          {/* <Route path="/ProductTheme2" element={<ProductTheme2 />} /> */}
          <Route path="/ProductPreview" element={<ProductPreview />} />
          <Route path="/EditProductDetails" element={<EditProductDetails />} />
          <Route
            path="/EditAmenitiesDetails"
            element={<EditAmenitiesDetails />}
          />
          <Route
            path="/EditApplicationDetails"
            element={<EditApplicationDetails />}
          />
          <Route path="/EditDeviceDetails" element={<EditDeviceDetails />} />
          <Route
            path="/EditProductAppDetails"
            element={<EditProductAppDetails />}
          />
          <Route path="/device-reviews" element={<AdminDeviceReviews />} />
          <Route path="/promocodes" element={<Promocode />} />
          <Route path="/addEdit-promocode" element={<AddEditPromocode />} />
          <Route path="/edit-invoice" element={<EditInvoice />} />
          <Route path="/edit-voucher" element={<EditVoucher />} />
          <Route path="/view-work" element={<ViewWork />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/demo-leads" element={<DemoLeads />} />
        </Routes>
      </div>
    </div>
  );
};

export default BodyLayout;
