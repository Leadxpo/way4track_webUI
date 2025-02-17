import ProfitsGraph from '../../components/ProfitsGraph';
import TotalCountCard from '../../components/TotalCountCard';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import CashCard from '../../components/CashCard';
import Table from '../../components/Table';
// import totalProducts from '../../mockData/mockTotalProducts.json';
// import totalExpenses from '../../mockData/mockExpenses.json';
// import totalPurchases from '../../mockData/mockTotalPurchases.json';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { PDFViewer } from '@react-pdf/renderer';
import { EstimatePDF } from '../../components/EstimatePdf';
import { TbWashDryP } from 'react-icons/tb';
import Analysis from '../analysis';
const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedCard, setSelectedCard] = useState('Total Products');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [ticketDetails, setTicketDetails] = useState([]);
  const location = useLocation();
  const ticketData = location.state?.ticketsData || {};
  const [branches, setBranches] = useState([]);
  const [totalTicketDetails, setTotalTicketDetails] = useState({});
  const [totalProductDetails, setTotalProductDetails] = useState({});
  const [solidLiquidData, setSolidLiquidData] = useState({});
  const [creditDebitPercent, setCreditDebitPercent] = useState([]);
  const [bracnhWiseSolidLiquidData, setBranchWiseSolidLiquidData] = useState(
    []
  );
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]);
  const [branch_details, setBranchDetails] = useState([]);
  const [cardData, setCardData] = useState([
    {
      id: 1,
      icon: <img src="./products_box.png" />,
      title: 'Total Products',
      count: 120,
      growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="./ticket.png" />,
      title: 'Total Tickets',
      count: 75,
      growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="./expenses.png" />,
      title: 'Expenses',
      count: 5000,
      growth: '+20%',
      bgColor: '#CF0101',
    },
    {
      id: 4,
      icon: <img src="./sale.png" />,
      title: 'Total Purchases',
      count: 80,
      growth: '+30%',
      bgColor: 'linear-gradient(180deg, #12A350 0%, #0B803D 50%, #055E2B 100%)',
    },
  ]);
  const [branchesData, setBranchesData] = useState([
    {
      branch: 'Branch 1',
      background:
        'linear-gradient(180deg, #CE0000 0%, #D50000 50%, #C00000 75%, #B50000 87.5%, #A70000 93.75%, #8F0404 100%)',
      data: [
        { month: 'Jan', profit: 20 },
        { month: 'Feb', profit: 30 },
        { month: 'Mar', profit: 25 },
      ],
    },
    {
      branch: 'Branch 2',
      background:
        'linear-gradient(180deg, #12A651 0%, #0C7338 50%, #0A5A2C 75%, #084D25 87.5%, #084622 93.75%, #074321 96.87%, #074220 98.44%, #07401F 100%)',
      data: [
        { month: 'Jan', profit: 40 },
        { month: 'Feb', profit: 35 },
        { month: 'Mar', profit: 50 },
      ],
    },
    {
      branch: 'Branch 3',
      background: 'linear-gradient(180deg, #000000 0%, #272727 100%)',
      data: [
        { month: 'Jan', profit: 30 },
        { month: 'Feb', profit: 45 },
        { month: 'Mar', profit: 40 },
      ],
    },
    {
      branch: 'Branch 4',
      background:
        'linear-gradient(180deg, #0033CB 0%, #002698 50%, #00207F 75%, #001C72 87.5%, #001B6C 93.75%, #001965 100%)',
      data: [
        { month: 'Jan', profit: 50 },
        { month: 'Feb', profit: 55 },
        { month: 'Mar', profit: 60 },
      ],
    },
  ]);
  // const branches = ['Vishakapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada',]
  // const branch_details = [
  //   {
  //     branch_name: 'Vishakapatnam',
  //     service_sales: 500,
  //     product_sales: 1200,
  //     total_sales: 1700,
  //   },
  //   {
  //     branch_name: 'Hyderabad',
  //     service_sales: 600,
  //     product_sales: 1400,
  //     total_sales: 2000,
  //   },
  //   {
  //     branch_name: 'Vijayawada',
  //     service_sales: 500,
  //     product_sales: 500,
  //     total_sales: 1000,
  //   },
  //   {
  //     branch_name: 'Kakinada',
  //     service_sales: 500,
  //     product_sales: 1100,
  //     total_sales: 1600,
  //   },
  // ];

  const CardData = [
    {
      id: 1,
      icon: <img src="./products_box.png" />,
      title: 'Total Products',
      count: 120,
      growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="./ticket.png" />,
      title: 'Total Tickets',
      count: 75,
      growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="./expenses.png" />,
      title: 'Expenses',
      count: 5000,
      growth: '+20%',
      bgColor: '#CF0101',
    },
    {
      id: 4,
      icon: <img src="./sale.png" />,
      title: 'Total Purchases',
      count: 80,
      growth: '+30%',
      bgColor: 'linear-gradient(180deg, #12A350 0%, #0B803D 50%, #055E2B 100%)',
    },
  ];

  const columns = [
    'Ticket Number',
    'Purpose',
    'Branch',
    'Date',
    'Amount',
    'Payment Status',
  ];

  const data = [
    {
      'Ticket Number': 'TK12345',
      Purpose: 'Books',
      Branch: 'HYD',
      Date: '09-01-2024',
      Amount: '2500',
      'Payment Status': 'Done',
    },
    {
      'Ticket Number': 'TK12346',
      Purpose: 'Stationary',
      Branch: 'KKD',
      Date: '03-05-2024',
      Amount: '1800',
      'Payment Status': 'Pending',
    },
    {
      'Ticket Number': 'TK12347',
      Purpose: 'Petrol',
      Branch: 'Vishakapatnma',
      Date: '09-05-2024',
      Amount: '9999',
      'Payment Status': 'Declined',
    },
    {
      'Ticket Number': 'TK12350',
      Purpose: 'Advances',
      Branch: 'Vijayawada',
      Date: '12-07-2024',
      Amount: '45000',
      'Payment Status': 'Sent',
    },
  ];

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await ApiService.post(
          '/tickets/getTicketDetailsById',
          {
            id: ticketData.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          const staff = response.data?.[0];
          setTicketDetails({
            staffName: staff.staffName,
            addressingDepartment: staff.addressingDepartment,
            ticketNumber: staff.ticketNumber,
            branchId: staff.branchId,
            date: staff.date,
            problem: staff.problem,
            branchName: staff.branchName,
            staffNumber: staff.staffNumber,
            staffId: staff.staffId,
          });
        }
      } catch (error) {
        console.error('Error fetching staff details:', error);
        //alert('Failed to fetch staff details.');
      }
    };

    fetchTicketDetails();
  }, [ticketData.id]);

  const tableMockData = [
    {
      Name: 'John Doe',
      Age: 28,
      Position: 'Engineer',
      Department: 'Development',
    },
    {
      Name: 'Jane Smith',
      Age: 34,
      Position: 'Manager',
      Department: 'Operations',
    },
    {
      Name: 'Michael Lee',
      Age: 25,
      Position: 'Analyst',
      Department: 'Finance',
    },
    {
      Name: 'Sophia Johnson',
      Age: 30,
      Position: 'Designer',
      Department: 'Marketing',
    },
    {
      Name: 'David Brown',
      Age: 29,
      Position: 'Developer',
      Department: 'Development',
    },
  ];
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);
  const handleCardClick = (cardType) => {
    let dataSource;
    switch (cardType) {
      case 'Total Products':
        dataSource = totalProducts;
        break;
      case 'Total Tickets':
        dataSource = ticketDetails;
        break;
      case 'Expenses':
        dataSource = totalExpenses;
        break;
      case 'Total Purchases':
        dataSource = totalPurchases;
        break;
      default:
        dataSource = [];
    }
    setSelectedCard(cardType);
    setTableData(dataSource);
    setFilteredData(dataSource);
    setTableColumns(Object.keys(dataSource[0] || []));
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const selectedBranch = e.target.value;
    setBranchFilter(selectedBranch);

    const filtered = tableData.filter(
      (item) => selectedBranch === '' || item.Branch === selectedBranch
    );
    setFilteredData(filtered);
  };

  const handleSearch = () => {
    // Implement your date-based filtering here
    console.log('Filtering with:', { dateFrom, dateTo });
  };

  const fetchTotalTickets = async () => {
    try {
      const response = await ApiService.post('/dashboards/totalTickets', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      setTotalTicketDetails(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 2
            ? {
                ...item,
                count: response.data.last30DaysTickets,
                growth: response.data.percentageChange,
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total tickets:', error);
      alert('Failed to fetch total tickets.');
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await ApiService.post('/dashboards/totalProducts', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      setTotalProductDetails(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 1
            ? {
                ...item,
                count: response.data.last30DaysProducts,
                growth: response.data.percentageChange,
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total tickets:', error);
      alert('Failed to fetch total tickets.');
    }
  };

  const fetchPurchaseCount = async () => {
    try {
      const response = await ApiService.post('/dashboards/getPurchaseCount', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      setTotalProductDetails(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 4
            ? {
                ...item,
                count: response.data.last30DaysPurchases,
                growth: response.data.percentageChange,
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total tickets:', error);
      alert('Failed to fetch total tickets.');
    }
  };
  const fetchExpenseCount = async () => {
    try {
      const response = await ApiService.post('/dashboards/getExpenseData', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      setTotalProductDetails(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 3
            ? {
                ...item,
                count: response.data.last30DaysExpenses,
                growth: response.data.percentageChange,
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total tickets:', error);
      alert('Failed to fetch total tickets.');
    }
  };
  const fetchTicketsData = async () => {
    const payload = {
      ticketId: '',
      clientName: '',
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      role: localStorage.getItem('role'),
    };

    // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
    if (payload.role === 'Technician' || payload.role === 'Sales Man') {
      payload.staffId = localStorage.getItem('userId');
    }

    try {
      const response = await ApiService.post(
        '/dashboards/getTicketDetailsAgainstSearch',
        payload
      );

      if (response.status) {
        setTicketDetails(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const fetchProductsData = async () => {
    try {
      const payload = {
        ticketId: '',
        clientName: '',
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }

      const response = await ApiService.post(
        '/products/getAllProductDetails',
        payload
      );

      if (response.status) {
        const filteredData = response.data.map((item) => ({
          productId: item.id,
          productName: item.productName || 'N/A',
          productDescription: item.productDescription || 'N/A',
          vendorName: item.vendorName || (item.vendorId?.name ?? 'N/A'),
          imeiNumber: item.imeiNumber || 'N/A',
          presentStock: item.quantity || 0, // Assuming stock is quantity
        }));
        setTotalProducts(filteredData);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch tickets data.');
    }
  };

  const fetchExpensesData = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }
      const response = await ApiService.post(
        '/dashboards/getExpenseData',
        payload
      );

      if (response.status) {
        setTotalExpenses(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch tickets data.');
    }
  };

  const fetchPurchaseData = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }
      const response = await ApiService.post(
        '/dashboards/getPurchaseData',
        payload
      );

      if (response.status) {
        console.log(response.data, 'purchase');
        setTotalPurchases(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch tickets data.');
    }
  };

  const getSolidLiquidCash = async () => {
    try {
      const response = await ApiService.post('/dashboards/getSolidLiquidCash', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      if (response.status) {
        setSolidLiquidData(response.data);
      } else {
        alert(
          response.data.message || 'Failed to fetch solid liquid cash details.'
        );
      }
    } catch (e) {
      console.error('error in fetching solid liquid cash details');
    }
  };

  const getBranchWiseSolidLiquidCash = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getBranchWiseSolidLiquidCash',
        {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response.status) {
        console.log(response.data, 'OOOOOOOOOOOOOOOOOOOO');
        setBranchWiseSolidLiquidData(response.data);
      } else {
        alert(
          response.data.message || 'Failed to fetch solid liquid cash details.'
        );
      }
    } catch (e) {
      console.error('error in fetching solid liquid cash details');
    }
  };

  const getTotalProductAndServiceSales = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalProductAndServiceSales',
        {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response.status) {
        console.log(response.data, '{{{{{{{{{{{{{{{{{{{{{{{{');
        setBranchDetails(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch total sales details.');
      }
    } catch (e) {
      console.error('error in fetching total sales details');
    }
  };

  const getAnalysis = async () => {
    try {
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
        date.getMonth() + 1
      ).padStart(2, '0')}/${date.getFullYear()}`;

      const response = await ApiService.post(
        '/dashboards/getMonthWiseBalance',
        {
          date: formattedDate,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      // const response = {
      //   status: true,
      //   errorCode: 200,
      //   internalMessage: 'Data retrieved successfully',
      //   data: {
      //     status: true,
      //     errorCode: 200,
      //     internalMessage: 'Data retrieved successfully',
      //     data: [
      //       {
      //         branchName: 'Downtown Branch',
      //         data: [
      //           {
      //             year: 2024,
      //             month: 12,
      //             monthName: 'December',
      //             creditAmount: 15000,
      //             debitAmount: 0,
      //             balanceAmount: 15000,
      //           },
      //         ],
      //       },
      //       {
      //         branchName: 'Central Office',
      //         data: [
      //           {
      //             year: 2024,
      //             month: 12,
      //             monthName: 'December',
      //             creditAmount: 120000,
      //             debitAmount: 0,
      //             balanceAmount: 120000,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // };

      if (
        response.status &&
        response.data?.data &&
        response.data?.data.length
      ) {
        const formattedData = response.data.data.map((branch, index) => ({
          branch: branch.branchName,
          background: getBackgroundColor(index),
          data: branch.data.map((entry) => ({
            month: entry.monthName,
            profit: (entry.creditAmount / entry.balanceAmount) * 100,
          })),
        }));
        console.log('branches charts---', formattedData);
        setBranchesData(formattedData);
      } else {
        alert(
          response.data.internalMessage || 'Failed to fetch analysis details.'
        );
      }
    } catch (e) {
      console.error('Error fetching analysis details:', e);
    }
  };

  // Function to get a background color based on index
  const getBackgroundColor = (index) => {
    const colors = [
      'linear-gradient(180deg, #CE0000 0%, #D50000 50%, #C00000 75%, #B50000 87.5%, #A70000 93.75%, #8F0404 100%)',
      'linear-gradient(180deg, #12A651 0%, #0C7338 50%, #0A5A2C 75%, #084D25 87.5%, #084622 93.75%, #074321 100%)',
      'linear-gradient(180deg, #000000 0%, #272727 100%)',
      'linear-gradient(180deg, #0033CB 0%, #002698 50%, #00207F 75%, #001C72 87.5%, #001B6C 100%)',
    ];
    return colors[index % colors.length]; // Cycle through colors
  };

  const getProductTypeCreditAndDebitPercentages = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getProductTypeCreditAndDebitPercentages',
        {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response.status) {
        setCreditDebitPercent(response.data);
      } else {
        alert(response.data.message || 'Failed to analysis details.');
      }
    } catch (e) {
      console.error('error in fetching analysis details');
    }
  };

  useEffect(() => {
    fetchTotalTickets();
    fetchTotalProducts();
    fetchPurchaseCount();
    fetchExpenseCount();
    getSolidLiquidCash();
    getBranchWiseSolidLiquidCash();
    getAnalysis();
    getTotalProductAndServiceSales();
    getProductTypeCreditAndDebitPercentages();
    fetchTicketsData();
    fetchProductsData();
    //fetchExpensesData();
    fetchPurchaseData();
  }, []);

  return (
    <div className="flex flex-col space-y-16">
      {/* first section */}
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mx-auto mt-10">
        <div className="relative">
          <img
            src="logo-square.png"
            alt="Logo"
            className="w-16 h-16 left-4 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex mt-8">
          <div className="w-3/5">
            {branch_details.map((branch) => (
              <div className="grid grid-cols-4 gap-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="logo-name-square.png"
                    alt="Branch Logo"
                    className="w-10 h-10 object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Branch</p>
                    <p className="text-green-700 font-semibold">
                      {branch.branchName}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Service Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.serviceSales}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Product Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.productSales}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Total Sales</p>
                  <p className="text-gray-800 font-bold">{branch.totalSales}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-2/5 relative flex justify-center items-center">
            <img src="./map.png" />
          </div>
        </div>
      </div>

      {/* second section */}
      {/* <div className="flex items-center justify-center space-x-10">
        <div>
          {bracnhWiseSolidLiquidData.map((cash) => (
            <div className="grid grid-cols-4 gap-4 space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="logo-name-square.png"
                  alt="Branch Logo"
                  className="w-10 h-10 object-cover"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Branch</p>
                  <p className="text-green-700 font-semibold">
                    {cash.branchName}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-gray-500">Solid Cash</p>
                <p className="text-gray-800 font-bold">{cash.solidCash}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {bracnhWiseSolidLiquidData.map((cash) => (
            <div className="grid grid-cols-4 gap-4 space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="logo-name-square.png"
                  alt="Branch Logo"
                  className="w-10 h-10 object-cover"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Branch</p>
                  <p className="text-green-700 font-semibold">
                    {cash.branchName}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-gray-500">Liquid Cash</p>
                <p className="text-gray-800 font-bold">{cash.liquidCash}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex items-center justify-center space-x-10">
        <CashCard
          title="Solid Cash"
          amount={solidLiquidData.solidCash}
          details={solidLiquidData.details}
          branchWiseDetails={bracnhWiseSolidLiquidData}
        />
        <CashCard
          title="Liquid Cash"
          amount={solidLiquidData.liquidCash}
          details={solidLiquidData.details}
          branchWiseDetails={bracnhWiseSolidLiquidData}
        />
      </div>

      {/* third section - profits graphs */}
      <div className="flex space-x-4 mt-10">
        {branchesData.map((branchData, index) => (
          <ProfitsGraph branchData={branchData} index={index} />
        ))}
      </div>

      {/* fourth section */}
      <div className="flex justify-between space-x-4 mt-12">
        {cardData.map((card) => (
          <div onClick={() => handleCardClick(card.title)}>
            <TotalCountCard data={card} />
          </div>
        ))}
      </div>

      {/* fifth section - analysis card*/}
      <div className="mt-6">
        {selectedCard === 'Expenses' || selectedCard === 'Total Purchases' ? (
          <div className="flex mb-4">
            <div className="flex-grow mr-2">
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                placeholder="From"
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>
            <div className="flex-grow mx-2">
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                placeholder="To"
                onChange={(e) => setDateTo(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>
            <div className="flex-grow mx-2">
              <select
                value={branchFilter}
                onChange={handleStatusChange}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.branchName}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        ) : null}
        <div className="mt-8">
          <Table columns={tableColumns} data={tableData} />
        </div>
      </div>
      {/* sixth section - table */}
      {/* <AnalysisCard
            bartitle1={'No. of Credits'}
            bartitle2={'No. of Debits'}
            barpercentage1={75}
            barpercentage2={25}
        /> */}
      {/* <AnalysisCardBarChart creditDebitPercent={creditDebitPercent} /> */}
      <Analysis />
    </div>
  );
};

export default Home;
