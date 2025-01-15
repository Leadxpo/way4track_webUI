import ProfitsGraph from '../../components/ProfitsGraph';
import TotalCountCard from '../../components/TotalCountCard';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import CashCard from '../../components/CashCard';
import Table from '../../components/Table';
import totalProducts from '../../mockData/mockTotalProducts.json';
import totalExpenses from '../../mockData/mockExpenses.json';
import totalPurchases from '../../mockData/mockTotalPurchases.json';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { PDFViewer } from '@react-pdf/renderer';
import { EstimatePDF } from '../../components/EstimatePdf';
const Home = () => {
  const [tableData, setTableData] = useState(totalProducts);
  const [filteredData, setFilteredData] = useState(totalProducts);
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
  const [cardData, setCardData] = useState([
    {
      id: 1,
      icon: <img src="products_box.png" />,
      title: 'Total Products',
      count: 120,
      growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="ticket.png" />,
      title: 'Total Tickets',
      count: 75,
      growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="expenses.png" />,
      title: 'Expenses',
      count: 5000,
      growth: '+20%',
      bgColor: '#CF0101',
    },
    {
      id: 4,
      icon: <img src="sale.png" />,
      title: 'Total Purchases',
      count: 80,
      growth: '+30%',
      bgColor: 'linear-gradient(180deg, #12A350 0%, #0B803D 50%, #055E2B 100%)',
    },
  ]);
  // const branches = ['Vishakapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada',]
  const branch_details = [
    {
      branch_name: 'Vishakapatnam',
      service_sales: 500,
      product_sales: 1200,
      total_sales: 1700,
    },
    {
      branch_name: 'Hyderabad',
      service_sales: 600,
      product_sales: 1400,
      total_sales: 2000,
    },
    {
      branch_name: 'Vijayawada',
      service_sales: 500,
      product_sales: 500,
      total_sales: 1000,
    },
    {
      branch_name: 'Kakinada',
      service_sales: 500,
      product_sales: 1100,
      total_sales: 1600,
    },
  ];

  const branchesData = [
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
  ];

  const CardData = [
    {
      id: 1,
      icon: <img src="products_box.png" />,
      title: 'Total Products',
      count: 120,
      growth: '+55%',
      bgColor: '#151515',
    },
    {
      id: 2,
      icon: <img src="ticket.png" />,
      title: 'Total Tickets',
      count: 75,
      growth: '+40%',
      bgColor: 'linear-gradient(180deg, #012FBB 0%, #012288 50%, #001555 100%)',
    },
    {
      id: 3,
      icon: <img src="expenses.png" />,
      title: 'Expenses',
      count: 5000,
      growth: '+20%',
      bgColor: '#CF0101',
    },
    {
      id: 4,
      icon: <img src="sale.png" />,
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
        alert('Failed to fetch staff details.');
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
    setTableColumns(Object.keys(dataSource[0]));
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

  const fetchTicketsData = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTicketDetailsAgainstSearch',
        {
          ticketId: '',
          clientName: '',
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        return response.data;
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      alert('Failed to fetch tickets data.');
    }
  };

  useEffect(() => {
    fetchTotalTickets();
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
                      {branch.branch_name}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Service Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.service_sales}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Product Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.product_sales}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Total Sales</p>
                  <p className="text-gray-800 font-bold">
                    {branch.total_sales}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-2/5 relative flex justify-center items-center">
            <img src="map.png" />
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex items-center justify-center space-x-10">
        <CashCard title="Solid Cash" amount="200000" />
        <CashCard title="Liquid Cash" amount="300000" />
      </div>

      {/* third section - profits graphs */}
      <div className="flex space-x-4 mt-10">
        {branchesData.map((branchData, index) => (
          <ProfitsGraph branchData={branchData} index={index} />
        ))}
      </div>

      {/* fourth section */}
      <div className="flex justify-between space-x-4 mt-12">
        {CardData.map((card) => (
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
          {/* <Table columns={tableColumns} data={ticketDetails} /> */}
        </div>
      </div>
      {/* sixth section - table */}
      {/* <AnalysisCard
            bartitle1={'No. of Credits'}
            bartitle2={'No. of Debits'}
            barpercentage1={75}
            barpercentage2={25}
        /> */}
      <AnalysisCardBarChart />
    </div>
  );
};

export default Home;
