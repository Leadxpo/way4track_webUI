import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import TotalCountCard from '../../components/TotalCountCard';
import { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const Reports = () => {
  const navigate = useNavigate();
  // const branchesData = [
  //   {
  //     branch: 'Branch 1',
  //     background:
  //       'linear-gradient(180deg, #CE0000 0%, #D50000 50%, #C00000 75%, #B50000 87.5%, #A70000 93.75%, #8F0404 100%)',
  //     data: [
  //       { month: 'Jan', profit: 20 },
  //       { month: 'Feb', profit: 30 },
  //       { month: 'Mar', profit: 25 },
  //     ],
  //   },
  //   {
  //     branch: 'Branch 2',
  //     background:
  //       'linear-gradient(180deg, #12A651 0%, #0C7338 50%, #0A5A2C 75%, #084D25 87.5%, #084622 93.75%, #074321 96.87%, #074220 98.44%, #07401F 100%)',
  //     data: [
  //       { month: 'Jan', profit: 40 },
  //       { month: 'Feb', profit: 35 },
  //       { month: 'Mar', profit: 50 },
  //     ],
  //   },
  //   {
  //     branch: 'Branch 3',
  //     background: 'linear-gradient(180deg, #000000 0%, #272727 100%)',
  //     data: [
  //       { month: 'Jan', profit: 30 },
  //       { month: 'Feb', profit: 45 },
  //       { month: 'Mar', profit: 40 },
  //     ],
  //   },
  //   {
  //     branch: 'Branch 4',
  //     background:
  //       'linear-gradient(180deg, #0033CB 0%, #002698 50%, #00207F 75%, #001C72 87.5%, #001B6C 93.75%, #001965 100%)',
  //     data: [
  //       { month: 'Jan', profit: 50 },
  //       { month: 'Feb', profit: 55 },
  //       { month: 'Mar', profit: 60 },
  //     ],
  //   },
  // ];

  const [CardData, setCardData] = useState([
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

  // const data = [
  //   {
  //     city: 'Vizag',
  //     performance: 2400,
  //     fill: '#b22222', // Firebrick red for Vizag
  //   },
  //   {
  //     city: 'Kakinada',
  //     performance: 1400,
  //     fill: '#1e3a8a', // Dark blue for Kakinada
  //   },
  //   {
  //     city: 'Vijayawada',
  //     performance: 900,
  //     fill: '#000000', // Black for Vijayawada
  //   },
  //   {
  //     city: 'Hyderabad',
  //     performance: 1600,
  //     fill: '#2f855a', // Green for Hyderabad
  //   },
  // ];

  // const tableData = [
  //   {
  //     Branch: 'Branch 1',
  //     Client: 'Vizag',
  //     'Starting Date': '2023-07-15',
  //     'Ending Date': '2023-08-15',
  //     'Total Sale': 2500.0,
  //     'P (or) L': 'Profit',
  //   },
  //   {
  //     Branch: 'Branch 2',
  //     Client: 'Kakinada',
  //     'Starting Date': '2023-07-15',
  //     'Ending Date': '2023-08-15',
  //     'Total Sale': 1500.0,
  //     'P (or) L': 'Loss',
  //   },
  //   {
  //     Branch: 'Branch 3',
  //     Client: 'Vijayawada',
  //     'Starting Date': '2023-07-15',
  //     'Ending Date': '2023-08-15',
  //     'Total Sale': 2500.0,
  //     'P (or) L': 'Near to Profit',
  //   },
  //   {
  //     Branch: 'Branch 4',
  //     Client: 'Hyderabad',
  //     'Starting Date': '2023-07-15',
  //     'Ending Date': '2023-08-15',
  //     'Total Sale': 2500.0,
  //     'P (or) L': 'For to Profit',
  //   },
  // ];

  const fetchTotalTickets = async () => {
    try {
      const response = await ApiService.post('/dashboards/totalTickets', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      //setTotalTicketDetails(response.data);
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

  const fetchTotalProductss = async () => {
    try {
      const response = await ApiService.post('/dashboards/totalProducts', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        userId: initialAuthState.userId,
        userName: initialAuthState.userName,
      });
      console.log(response.data);
      //setTotalProductDetails(response.data);
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
      //setTotalProductDetails(response.data);
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
      //setTotalProductDetails(response.data);
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
  useEffect(() => {
    fetchTotalTickets();
    fetchTotalProductss();
    fetchPurchaseCount();
    fetchExpenseCount();
  }, []);
  const handleDownload = (name) => {
    navigate('/download', { state: { name } });
  };
  return (
    <div>
      <div className="flex justify-between space-x-4 mt-12">
        {CardData.map((card) => (
          <TotalCountCard data={card} />
        ))}
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Day Book</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Day Book')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Ledger</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Ledger')}
        />
      </div>
      {/* <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Vouchers</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Vouchers')}
        />
      </div> */}
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Sales</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Amount')}
        />
      </div>

      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Invoices</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Invoices')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Estimate</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Estimate')}
        />
      </div>
      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <p className="text-xl">Receipt</p>
        <FaDownload
          className="text-xl text-red-500"
          onClick={() => handleDownload('Receipt')}
        />
      </div>
    </div>
  );
};

export default Reports;
