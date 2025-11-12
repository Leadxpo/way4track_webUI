import hasPermission from '../common/permission'
var permission = localStorage.getItem("userPermissions");
var role = localStorage.getItem("role");

var RoleHome = (role) => {
  switch (role?.toLowerCase()) {
    case "ceo":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/home',
      }
      break;
      
    case "accountant":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/home',
      }
      break;
    case "warehouse manager":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/warehouse-manager-home',
      }
      break;
    case "inventory operational analyst":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/warehouse-manager-home',
      }
      break;
    case "branch manager":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/branch-manager-home',
      }
      break;

    case "backend support executive":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/backend-support-home',
      }
    case "hr":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/hr-home',
      }
    case "sub dealer":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/sub-dealer-home',
      }
    case "tele calling associate":
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/customer-care-home',
      }
      break;

    default:
      return {
        name: 'Home',
        icon: <img src="./home.png" />,
        route: '/custom-home',
      }
      break;
  }
}

export const menuOptions = [
  RoleHome(role),
  (hasPermission(permission, "branch", "view") && role?.toLowerCase() === "hr") && {
    name: 'Branches',
    icon: <img src="./branch.png" />,
    route: '/hr-branch',
  },

  (hasPermission(permission, "branch", "view") && role?.toLowerCase() !== "hr" && role?.toLowerCase() !== "warehouse manager") && {
    name: 'Branches',
    icon: <img src="./branch.png" alt="Branch" />,
    route: '/branches',
  },
  (hasPermission(permission, "branch", "view") && role?.toLowerCase() === "warehouse manager") && {
    name: 'Branches',
    icon: <img src="./branch.png" />,
    route: '/warehouse-manager-branch',
  },
  hasPermission(permission, "staff", "add") && {
    name: 'Designation',
    icon: <img src="./designation.png" />,
    route: '/designations',
  },
  hasPermission(permission, "staff", "view") && { name: 'Staff', icon: <img src="./users.png" />, route: '/staff' },
  hasPermission(permission, "client", "view") && { name: 'Customer', icon: <img src="./clients.png" />, route: '/clients' },
  hasPermission(permission, "vendor", "view") && { name: 'Vendors', icon: <img src="./vendors.png" />, route: '/vendors' },
  hasPermission(permission, "assets", "view") && { name: 'Assets', icon: <img src="./asserts.png" />, route: '/asserts' },
  hasPermission(permission, "subdealer", "view") && {
    name: 'Sub Dealers',
    icon: <img src="./subdealers.png" />,
    route: '/sub_dealers',
  },
  role?.toLowerCase() === "sub dealer" && {
    name: 'Sub Dealer Staff',
    icon: <img src="./users.png" />,
    route: '/sub-staff-details',
  },
  hasPermission(permission, "product-type", "view") &&  {
    name: 'Product Type',
    icon: <img src="./products_box.png" />,
    route: '/product-type',
  },
  hasPermission(permission, "product", "view") && {
    name: 'Products',
    icon: <img src="./products.png" />,
    route: '/products',
  },
  // hasPermission(permission, "productassign", "view") && {
  //   name: 'Product Assign',
  //   icon: <img src="./product_assign.png" />,
  //   route: '/products_assign',
  // },
  hasPermission(permission, "requests", "view") && {
    name: 'Request Raise',
    icon: <img src="./request_raise.png" />,
    route: '/requests',
  },

  (hasPermission(permission, "staff", "view") || role?.toLowerCase() === "ceo" || role?.toLowerCase() === "accountant" || role?.toLowerCase() === "hr") && {
    name: 'Tracker',
    icon: <img src="./tracker.png" alt="Tracker" />,
    route: '/tracker',
  },
    hasPermission(permission, "voucher", "view") && {
    name: 'Vouchers',
    icon: <img src="./vouchers.png" />,
    route: '/vouchers',
  },
  // role?.toLowerCase() === "branch manager" && { name: 'Reports', icon: <img src="./reports.png" />, route: '/reports' },
  // role?.toLowerCase() === "warehouse manager" || role?.toLowerCase() === "inventory operational analyst" &&
   {
     name: 'Work Reports', icon: <img src="./reports.png" />, route: '/products-inventory' 
    },
  role?.toLowerCase() === "accountant" && {
    name: 'Reports',
    icon: <img src="./reports.png" />,
    route: '/report-account',
  },
  hasPermission(permission, "work-allocation", "view") && {
    name: 'Work Allocation',
    icon: <img src="./work_allocation.png" />,
    route: '/work_allocation',
  },
  // hasPermission(permission, "invoice", "view") && { name: 'Invoices', icon: <img src="./invoices.png" />, route: '/invoice' },
  hasPermission(permission, "estimate", "view") && {
    name: 'Estimate',
    icon: <img src="./estimate.png" />,
    route: '/estimate',
  },
  hasPermission(permission, "estimate", "view") && {
    name: 'Invoice',
    icon: <img src="./estimate.png" />,
    route: '/invoice',
  },
  hasPermission(permission, "voucher", "view") && {
    name: 'Day Book',
    icon: <img src="./day_book.png" />,
    route: '/day-book',
  },
  hasPermission(permission, "voucher", "view") && {
    name: 'Groups',
    icon: <img src="./analysis.png" />,
    route: '/groups',
  },

  hasPermission(permission, "voucher", "view") && { name: 'Ledger', icon: <img src="./ledger.png" />, route: '/ledger' },
  hasPermission(permission, "staff", "add") && { name: 'Letters', icon: <img src="./letters.png" />, route: '/letters' },
  hasPermission(permission, "attendance", "view") && {
    name: 'Payroll',
    icon: <img src="./payroll.png" />,
    route: '/payroll',
  },
  (hasPermission(permission, "voucher", "view") || role?.toLowerCase() === "backend support executive") && {
    name: 'Payments',
    icon: <img src="./payments.png" />,
    route: '/payments',
  },
  hasPermission(permission, "voucher", "view") && { name: 'Receipt', icon: <img src="./receipt.png" />, route: '/receipts' },
  hasPermission(permission, "hiring", "view") && { name: 'Hiring', icon: <img src="./hiring.png" />, route: '/hiring' },
  hasPermission(permission, "tickets", "view") && { name: 'Tickets', icon: <img src="./tickets.png" />, route: '/tickets' },
  hasPermission(permission, "appointments", "view") && {
    name: 'Appointments',
    icon: <img src="./appointments.png" />,
    route: '/appointments',

  },
  hasPermission(permission, "voucher", "view") && {
    name: 'Purchase',
    icon: <img src="./purchase.png" />,
    route: '/purchase',
  },
  hasPermission(permission, "backend", "view") && {
    name: 'Works',
    icon: <img src="./backend-work.png" />,
    route: '/backend-support-works',
  },
  // hasPermission(permission, "backend", "view") && {
  //   name: 'Payments',
  //   icon: <img src="./payments.png" />,
  //   route: '/backend-support-payments',
  // },

  hasPermission(permission, "backend", "view") && {
    name: 'Backend Support',
    icon: <img src="./backend-support.png" />,
    route: '/backend-support',
  },
  hasPermission(permission, "services", "view") && { name: 'Service', icon: <img src="./service.png" />, route: '/service' },
  hasPermission(permission, "vehicle", "view") && {
    name: 'Vehicle',
    icon: <img src="./transport.png" />,
    route: '/vehicle',
  },
  // newly added options
  hasPermission(permission, "sale", "view") && {
    name: 'Sales Visits',
    icon: <img src="./work_allocation.png" />,
    route: '/sales_visit',
  },
  hasPermission(permission, "sales-visit", "view") && {
    name: 'Sales Visits',
    icon: <img src="./work_allocation.png" />,
    route: '/sales_visit',
  },
  // hasPermission(permission, "work-allocation", "view") && {
  //   name: 'Sales Visits',
  //   icon: <img src="./work_allocation.png" />,
  //   route: '/sales_visit',
  // },
  (role?.toLowerCase() === "ceo" ||role?.toLowerCase() === "warehouse manager" || role?.toLowerCase() === "inventory operational analyst" ||role?.toLowerCase() === "branch manager")  && {
    name: 'Dispatch',
    icon: <img src="./dispath.png" />,
    route: '/dispatch',
  },
  hasPermission(permission, "attendance", "view") && {
    name: 'Attendance',
    icon: <img src="./attendance.jpg" />,
    route: '/attendance',
  },
  {
    name: 'MyAttendance',
    icon: <img src="./attendance.jpg" />,
    route: '/my-attendance',
  },
  role?.toLowerCase() === "ceo" && {
    name: 'Orders',
    icon: <img src="./sale.png" />,
    route: '/all-orders',
  },
  role?.toLowerCase() === "ceo" && {
    name: 'Promocodes',
    icon: <img src="./ticket.png" />,
    route: '/promocodes',
  },
  role?.toLowerCase() === "ceo" && {
    name: 'Reviews',
    icon: <img src="./payroll.png" />,
    route: '/device-reviews',
  },
]

export const formattedPaths = {
  '/home': { name: 'Home', icon: <img src="./home.png" /> },
  '/branch-manager-home': { name: 'Home', icon: <img src="./home.png" /> },
  '/hr-home': { name: 'Home', icon: <img src="./home.png" /> },
  '/branches': { name: 'Branches', icon: <img src="./branch.png" /> },
  '/add-branch': { name: 'Add Branch', icon: <img src="./branch.png" /> },
  '/edit-branch': { name: 'Edit Branch', icon: <img src="./branch.png" /> },
  '/branch-details': { name: 'Branch Details', icon: <img src="./branch.png" />, },
  '/hr-branch': { name: 'Branches', icon: <img src="./branch.png" /> },
  '/product-type': { name: 'Product Type', icon: <img src=".//product_type.png" /> },
  '/staff': { name: 'Staff', icon: <img src="./users.png" /> },
  '/staff-details': { name: 'Staff Details', icon: <img src="./users.png" /> },
  '/add-staff': { name: 'Add Staff', icon: <img src="./users.png" /> },
  '/edit-staff': { name: 'Edit Staff', icon: <img src="./users.png" /> },
  '/products': { name: 'Products', icon: <img src="./products.png" /> },
  '/add-product': { name: 'Add Product', icon: <img src="./products.png" /> },
  '/asserts': { name: 'Assets', icon: <img src="./asserts.png" /> },
  '/add-assets': { name: 'Add Asset', icon: <img src="./asserts.png" /> },
  '/estimate': { name: 'Estimates', icon: <img src="./estimate.png" /> },
  '/add-estimate': { name: 'Add Estimate', icon: <img src="./estimate.png" /> },
  '/estimate-details': { name: 'Estimate Details', icon: <img src="./estimate.png" /> },
  '/invoice': { name: 'Invoices', icon: <img src="./invoice.png" /> },
  '/add-invoice': { name: 'Add Invoice', icon: <img src="./invoice.png" /> },
  '/invoice-details': { name: 'Invoice Details', icon: <img src="./invoice.png" /> },
  '/requests': { name: 'Requests', icon: <img src="./request.png" /> },
  '/add-request': { name: 'Add Request', icon: <img src="./request.png" /> },
  '/delete-request': { name: 'Delete Request', icon: <img src="./delete_request.png" /> },
  '/request-details': { name: 'Request Details', icon: <img src="./request_details.png" /> },
  '/clients': { name: 'Customer', icon: <img src="./clients.png" /> },
  '/add-client': { name: 'Add Customer', icon: <img src="./clients.png" /> },
  '/delete-client': { name: 'Delete Customer', icon: <img src="./delete_client.png" /> },
  '/client-details': { name: 'Customer Details', icon: <img src="./client_details.png" /> },
  // '/products_assign': { name: 'Product Assign', icon: <img src="./product_assign.png" /> },
  // '/add-product-assign': { name: 'Add Product Assign', icon: <img src="./product_assign.png" /> },
  // '/delete-product-assign': { name: 'Delete Product Assign', icon: <img src="./delete_product_assign.png" /> },
  '/vendors': { name: 'Vendors', icon: <img src="./vendors.png" /> },
  '/add-vendor': { name: 'Add Vendor', icon: <img src="./vendors.png" /> },
  '/sales_visit': { name: 'Sales Visit', icon: <img src=".work_allocation.png" /> },
  '/delete-vendor': { name: 'Delete Vendor', icon: <img src="./delete_vendor.png" /> },
  '/sub_dealers': { name: 'Sub Dealers', icon: <img src="./subdealers.png" /> },
  '/add-sub-dealer': { name: 'Add Sub Dealer', icon: <img src="./subdealers.png" /> },
  '/delete-sub-dealer': { name: 'Delete Sub Dealer', icon: <img src="./delete_subdealer.png" /> },
  '/vouchers': { name: 'Vouchers', icon: <img src="./vouchers.png" /> },
  '/work_allocation': { name: 'Work Allocation', icon: <img src="./work_allocation.png" /> },
  '/ledger': { name: 'Ledger', icon: <img src="./ledger.png" /> },
  '/reports': { name: 'Reports', icon: <img src="./reports.png" /> },
  '/tickets': { name: 'Tickets', icon: <img src="./tickets.png" /> },
  '/hiring': { name: 'Hiring', icon: <img src="./hiring.png" /> },
  '/add-hiring': { name: 'Add Hiring', icon: <img src="./hiring.png" /> },
  '/delete-hiring': { name: 'Delete Hiring', icon: <img src="./delete_hiring.png" /> },
  '/edit-hiring': { name: 'Edit Hiring', icon: <img src="./edit_hiring.png" /> },
  '/hiring-details': { name: 'Hiring Details', icon: <img src="./hiring_details.png" /> },
  '/receipts': { name: 'Receipts', icon: <img src="./receipts.png" /> },
  '/analysis': { name: 'Analysis', icon: <img src="./analysis.png" /> },
  '/report-account': { name: 'Accounts Reports', icon: <img src="./reports.png" /> },
  '/download': { name: 'Download', icon: <img src="./download.png" /> },
  '/settings': { name: 'Settings', icon: <img src="./settings.png" /> },
  '/profile': { name: 'Profile', icon: <img src="./profile.png" /> },
  '/day-book': { name: 'Day Book', icon: <img src="./day_book.png" /> },
  '/ledger-details': { name: 'Ledger Details', icon: <img src="./ledger_details.png" /> },
  '/purchase': { name: 'Purchase', icon: <img src="./purchase.png" /> },
  '/payroll': { name: 'Payroll', icon: <img src="./payroll.png" /> },
  '/tracker': { name: 'Tracker', icon: <img src="./tracker.png" /> },
  '/appointments': { name: 'Appointments', icon: <img src="./appointments.png" /> },
  '/add-appointment': { name: 'Add Appointment', icon: <img src="./appointments.png" /> },
  '/appointment-details': { name: 'Appointment Details', icon: <img src="./appointments.png" /> },
}


export const pageTitles = {
  clients: 'Clients Details',
  // product_assign: 'Product Assign',
  vendors: 'Vendor Details',
  sub_dealers: 'Sub Dealers',
  receipts: 'Receipts',
  hiring: 'Hiring',
  invoice: 'Invoices',
  estimate: 'Estimates',
  payments: 'Payments',
};
