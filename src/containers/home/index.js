import ProfitsGraph from '../../components/ProfitsGraph';
import TotalCountCard from '../../components/TotalCountCard';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import CashCard from '../../components/CashCard';
import Table from '../../components/Table';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { PDFViewer } from '@react-pdf/renderer';
import { EstimatePDF } from '../../components/EstimatePdf';
import { TbWashDryP } from 'react-icons/tb';
import Analysis from '../analysis';
import { FaFileDownload } from "react-icons/fa";
import GoogleMapComponent from "../../components/googleMap";

const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedCard, setSelectedCard] = useState('Total Products');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const location = useLocation();
  const [branches, setBranches] = useState([]);
  const [solidLiquidData, setSolidLiquidData] = useState({});
  const [creditDebitPercent, setCreditDebitPercent] = useState([]);
  const [totalProductDetails, setTotalProductDetails] = useState({});
  const [bracnhWiseSolidLiquidData, setBranchWiseSolidLiquidData] = useState(
    []
  );
  const [totalReceivables, setTotalReceivables] = useState({});
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]);
  const [branchdetails, setBranchDetails] = useState([]);
  const [cardData, setCardData] = useState([
    {
      id: 1,
      icon: <img src="./products_box.png" />,
      title: 'Total Sales',
      count: 1200,
      growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="./ticket.png" />,
      title: 'Payables',
      count: 7500,
      growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="./expenses.png" />,
      title: 'Receivables',
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


  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/getSalesBreakdown'
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
    case 'Total Sales':
      dataSource = totalProducts;
      break;
    case 'Payables':
      dataSource = totalExpenses;
      break;
    case 'Receivables':
      dataSource = totalReceivables;
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
  setTableColumns(
    Object.keys(dataSource[0] || {}));
  

  // setColumns(Object.keys(dataSource[0] || {}));
  // setColumnNames(Object.keys(dataSource[0] || {}));
  console.log("data source.......>",dataSource)
};

if(tableData){
  console.log("data source data ram.......>",tableData)
}
console.log("data source data ram.......>",tableData)

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


 
  const fetchSalesData = async () => {
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
        '/dashboards/getSalesForTable',
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

  const fetchPayableData = async () => {
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
        '/dashboards/getPayableAmountForTable',
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

  const fetchReceivableDate = async () => {
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
        '/dashboards/getReceivableAmountForTable', // Assuming this is the correct endpoint
        payload
      );
  
      if (response.status) {
        setTotalReceivables(response.data); // Replace this with your state handler
      } else {
        alert(response.data.message || 'Failed to fetch receivable data.');
      }
    } catch (error) {
      console.error('Error fetching receivable data:', error);
      alert('Failed to fetch receivable data.');
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
      const formattedYear = date.getFullYear(); // Extract the year

      const response = await ApiService.post(
        '/dashboards/getMonthWiseBalance',
        {
          date: formattedYear, // Send only the year
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      console.log('//////////////////////', response);
      if (response.status) {
        const allMonths = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

        const formattedData = response.data.map((branch, index) => {
          // Create a lookup for existing months in the branch data
          const existingMonths = new Set(
            branch.data.map((entry) => entry.month)
          );

          // Ensure all 12 months are present
          const completeData = allMonths.map((monthName, i) => {
            const existingEntry = branch.data.find(
              (entry) => entry.month === i + 1
            );

            if (existingEntry) {
              const { creditAmount, debitAmount } = existingEntry;
              const total = Math.abs(creditAmount) + Math.abs(debitAmount);
              const percentage =
                total !== 0 ? ((creditAmount - debitAmount) / total) * 100 : 0;

              return {
                month: existingEntry.monthName,
                profitorLoss: percentage.toFixed(2), // Shows positive for profit, negative for loss
              };
            }

            return {
              month: monthName,
              profitorLoss: '0.00', // Set to 0% for missing months
            };
          });

          return {
            branch: branch.branchName,
            background: getBackgroundColor(index),
            data: completeData,
          };
        });

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
      const date = new Date();
      const formattedYear = date.getFullYear();
      const response = await ApiService.post(
        '/dashboards/getProductTypeCreditAndDebitPercentages',
        {
          date: formattedYear,
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
    fetchTotalProducts();
    fetchPurchaseCount();
    fetchExpenseCount();
    getSolidLiquidCash();
    getBranchWiseSolidLiquidCash();
    getAnalysis();
    getTotalProductAndServiceSales();
    getProductTypeCreditAndDebitPercentages();
    // fetchTicketsData();
    fetchSalesData();
    fetchPayableData();
    fetchReceivableDate();
    fetchPurchaseData();
  }, []);

  return (
    <div className="flex flex-col space-y-16">
      {/* first section */}
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mx-auto w-full mt-10">
        <div className="relative">
          <img
            src="logo-square.png"
            alt="Logo"
            className="w-16 h-16 left-4 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex mt-4">
          <div className="w-full">
            {branches.map((branch, index) => (
              <div key={index} className="grid grid-cols-6  py-1">
                <div className="flex items-center ">
                  <img
                    src="logo-name-square.png"
                    alt="Branch Logo"
                    className="w-16 h-16 object-cover"
                  />
                  <div className="text-xs">
                    <p className="text-gray-800 font-semibold">Branch</p>
                    <p className="text-green-700 font-semibold">
                      {branch.branchName}
                    </p>
                  </div>
                </div>
                <div className="text-left text-xs">
                  <p className="text-gray-600 font-bold">Rectifications</p>
                  <p className="text-gray-800 font-bold">
                    {branch.serviceSales}
                  </p>
                </div>
                <div className="text-left text-xs ">
                  <p className="text-gray-600 font-bold">Renewals</p>
                  <p className="text-gray-800 font-bold">
                    {branch.productSales}
                  </p>
                </div>
                <div className="text-left text-xs">
                  <p className="text-gray-600 font-bold">Replacement</p>
                  <p className="text-gray-800 font-bold">
                    {branch.productSales}
                  </p>
                </div>
                <div className="text-left text-xs">
                  <p className="text-gray-600 font-bold">Products Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.productSales}
                  </p>
                </div>
                <div className="text-left text-xs">
                  <p className="text-gray-600 font-bold">Total Sales</p>
                  <p className="text-gray-800 font-bold">{branch.totalSales}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <GoogleMapComponent />
          </div>
        </div>
      </div>

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
      <div className="flex space-x-4 mt-10 overflow-x-auto">
        {branchesData.map((branchData, index) => (
          <ProfitsGraph key={index} branchData={branchData} index={index} />
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
        {selectedCard === 'Payables' || selectedCard === 'Total Purchases'  || selectedCard === 'Receivables'  || selectedCard === 'Total Sales'? (
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
              className="h-12 px-6 bg-green-700 text-white  hover:bg-green-500 rounded-md flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>

            <button className="flex items-center bg-green-700 text-white px-2 py-2  rounded-md mx-2 shadow hover:bg-green-500">
              <FaFileDownload className="mr-2" /> Download Excel
            </button>
          </div>
        ) : null}
        <div className="mt-8">
          {/* <Table columns={tableColumns} data={tableData} /> */}
          {/* <Table
                  data={tableData}
                  columns={Object.keys(tableData[0])}
                  showDelete={false}
                  showDetails={false}
                  editText="Assign"
                   onEdit={handleEditClick}
                /> */}
                
                <Table columns={Object.keys(tableData[0] || {})} data={tableData} />
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
