import ProfitsGraph from '../../components/ProfitsGraph';
import TotalCountCard from '../../components/TotalCountCard';
import AnalysisCard from '../../components/AnalysisCard';
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
import { FaFileDownload } from 'react-icons/fa';
import GoogleMapComponent from '../../components/googleMap';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';


const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedCard, setSelectedCard] = useState('Total Products');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [branchFilter, setBranchFilter] = useState('');
  const location = useLocation();
  const [branches, setBranches] = useState([]);
  const [branchesDataDammy, setBranchesDataDammy] = useState([]);

  const [solidLiquidData, setSolidLiquidData] = useState({});
  const [creditDebitPercent, setCreditDebitPercent] = useState([]);
  const [totalProductDetails, setTotalProductDetails] = useState({});
  const [bracnhWiseSolidLiquidData, setBranchWiseSolidLiquidData] = useState([]);
  const [totalReceivables, setTotalReceivables] = useState({});
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalPayable, setTotalPayable] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]);
  const [branchdetails, setBranchDetails] = useState([]);
  const [branchesData, setBranchesData] = useState([]);


  const [cardData, setCardData] = useState([
    {
      id: 1,
      icon: <img src="./products_box.png" />,
      title: 'Total Sales',
      count: 1200,
      // growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="./ticket.png" />,
      title: 'Payables',
      count: 7500,
      // growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="./expenses.png" />,
      title: 'Receivables',
      count: 5000,
      // growth: '+20%',
      bgColor: '#CF0101',
    },
    {
      id: 4,
      icon: <img src="./sale.png" />,
      title: 'Total Purchases',
      count: 80,
      // growth: '+30%',
      bgColor: 'linear-gradient(180deg, #12A350 0%, #0B803D 50%, #055E2B 100%)',
    },
  ]);


  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          date: currentYear, // Format: YYYY-MM-DD
        };

        const response = await ApiService.post('/dashboards/getSalesBreakdown', payload);

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
        dataSource = totalPayable;
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
    setTableColumns(Object.keys(dataSource[0] || {}));
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const selectedBranch = e.target.value;
    setBranchFilter(selectedBranch);

    // const filtered = tableData.filter(
    //   (item) => selectedBranch === '' || item.Branch === selectedBranch
    // );
    // setFilteredData(filtered);
  };



  const fetchTotalSalesCount = async () => {
    try {
      const response = await ApiService.post('/dashboards/getAmountDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      setTotalProductDetails(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 1
            ? {
              ...item,
              count: response.data.SalesAmount ?? 0, // assuming it's a number
            }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total Sales:', error);
      alert('Failed to fetch total Sales count.');
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
      // console.log(response.data);
      const count =
        typeof response.data === 'object'
          ? response.data.last30DaysPurchases
          : response.data;

      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 4
            ? {
              ...item,
              count: count ?? 0,
            }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total Purchases:', error);
      alert('Failed to fetch total Purchase.');
    }
  };

  const fetchPayableCount = async () => {
    try {
      const response = await ApiService.post('/dashboards/getAmountDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 2
            ? {
              ...item,
              count: response.data.PayableAmount ?? 0,
            }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total Payable:', error);
      alert('Failed to fetch total Payable.');
    }
  };

  const fetchRecievableCount = async () => {
    try {
      const response = await ApiService.post('/dashboards/getAmountDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      // console.log(response.data);
      setCardData((prevData) =>
        prevData.map((item) =>
          item.id === 3
            ? {
              ...item,
              count: response.data.ReceivableAmount ?? 0,
            }
            : item
        )
      );
    } catch (error) {
      console.error('Error fetching total Receivable:', error);
      alert('Failed to fetch total Receivable count.');
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
          date: item.date?.split('T')[0],
          branchName: item.branchName || 'N/A',
          voucherId: item.voucherId || 'N/A',
          purpose: item.purpose || (item.vendorId?.name ?? 'N/A'),
          amount: item.amount || 'N/A',
          paymentType: item.paymentType || 0, // Assuming stock is quantity
        }));
        setTotalProducts(filteredData);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch Sales data.');
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
        setTotalPayable(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch Payable data.');
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
        // console.log(response.data, 'purchase');
        setTotalPurchases(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch Purchese  data.');
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
        // console.log(response.data, 'OOOOOOOOOOOOOOOOOOOO');
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
        // console.log(response.data, '{{{{{{{{{{{{{{{{{{{{{{{{');
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
      const formattedYear = date.getFullYear();

      const response = await ApiService.post('/dashboards/getBranchWiseMonthlySales', {
        date: formattedYear,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const allMonths = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Group data by branchName
        const groupedByBranch = {};
        response.data.forEach(entry => {
          const branch = entry.branchName.trim();
          if (!groupedByBranch[branch]) {
            groupedByBranch[branch] = [];
          }
          groupedByBranch[branch].push(entry);
        });

        // Format each branch's data
        const formattedData = Object.entries(groupedByBranch).map(([branchName, entries], index) => {
          const completeData = allMonths.map((monthName, i) => {
            const match = entries.find(e => e.month === i + 1);
            return {
              month: monthName,
              salesAmount: match ? match.TotalSalesAmount.toFixed(2) : '0.00'
            };
          });

          return {
            branch: branchName,
            background: getBackgroundColor(index),
            data: completeData
          };
        });

        setBranchesData(formattedData);
      } else {
        alert(response.data.internalMessage || 'Failed to fetch analysis details.');
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
        '/dashboards/getBranchWiseYearlySales',
        {
          date: currentYear,
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
    fetchTotalSalesCount();
    fetchPurchaseCount();
    fetchPayableCount();
    fetchRecievableCount();
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

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          const branchData = response.data;
          setBranchesDataDammy(branchData); // set to state
          // console.log('Fetched Branches:', branchData); // correct way to log
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleDownloadExcel = () => {
    if (!tableData || tableData.length === 0) {
      alert("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "report.xlsx");
  };

  const handleSearch = () => {
    let filtered = [...filteredData]; // filteredData is set during handleCardClick

    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date); // Replace 'date' with the actual key in your data
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const isWithinDateRange =
        (!fromDate || itemDate >= fromDate) &&
        (!toDate || itemDate <= toDate);

      const matchesBranch =
        !branchFilter || item.branchName === branchFilter; // Replace 'branch' with actual key

      return isWithinDateRange && matchesBranch;
    });
    setTableData(filtered);
  };

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

        <div className="flex flex-wrap mt-4 w-full">
          {/* Left: Branch Sales Data */}
          <div className="w-full md:w-2/3">
            {branches.map((branch, index) => {
              console.log("branch", branch)
              return (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-x-1 items-center py-1 px-1 border-b"
                >
                  {/* Branch Info */}
                  <div className="flex items-center space-x-1">
                    <img
                      src="logo-name-square.png"
                      alt="Branch Logo"
                      className="w-10 h-10 object-cover"
                    />
                    <div className="text-[10px] leading-none">
                      <p className="text-gray-800 font-bold">Branch</p>
                      <p className="text-green-700 font-bold">
                        {branch.branchName}
                      </p>
                    </div>
                  </div>
                  <div  className=" grid grid-cols-11 gap-x-1 items-center py-1 px-1 " style={{width:"800%"}}>

                    {/* Rectifications */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Rectifications</p>
                      <p className="text-gray-800 font-bold">
                        {branch.rectificationsAmount || 0}
                      </p>
                    </div>

                    {/* Renewals */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Renewals</p>
                      <p className="text-gray-800 font-bold">
                        {branch.renewablesAmount || 0}
                      </p>
                    </div>

                    {/* Replacement */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Replacement</p>
                      <p className="text-gray-800 font-bold">
                        {branch.replacementsAmount || 0}
                      </p>
                    </div>

                    {/* Products Sales */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Products Sales</p>
                      <p className="text-gray-800 font-bold">
                        {branch.productSalesAmount || 0}
                      </p>
                    </div>
                    {/* Products Sales */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Service Sales</p>
                      <p className="text-gray-800 font-bold">
                        {branch.serviceSalesAmount || 0}
                      </p>
                    </div>

                    {/* Total Sales */}
                    <div className="text-[10px] text-center leading-tight">
                      <p className="text-gray-500 font-bold">Total Sales</p>
                      <p className="text-gray-800 font-bold">
                        {branch.totalSalesAmount || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Google Map */}
          <div className="w-full md:w-1/3 flex justify-center items-start ">
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
      <div className="flex space-x-2 mt-10 overflow-x-auto scroll-smooth px-4 py-2">
        {branchesData.map((branchData, index) => (
          <div key={index} className="min-w-[500px]"> {/* Adjust width as needed */}
            <ProfitsGraph branchData={branchData} />
          </div>
        ))}
      </div>


      {/* fourth section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {cardData.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card.title)}>
            <TotalCountCard data={card} />
          </div>
        ))}
      </div>


      {/* fifth section - analysis card*/}
      <div className="mt-6">
        {selectedCard === 'Payables' ||
          selectedCard === 'Total Purchases' ||
          selectedCard === 'Receivables' ||
          selectedCard === 'Total Sales' ? (
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
                {branchesDataDammy.map((branch) => (
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


            <button
              onClick={handleDownloadExcel}
              className="flex items-center bg-green-700 text-white px-2 py-2 rounded-md mx-2 shadow hover:bg-green-500"
            >
              <FaFileDownload className="mr-2" /> Download Excel
            </button>
          </div>
        ) : null}
        <div className="mt-8">
          {
          }
          <Table columnNames={tableColumns} columns={tableColumns} data={tableData} />
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
