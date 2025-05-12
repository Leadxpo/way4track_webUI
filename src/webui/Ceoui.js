import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ApiService,{initialAuthState} from '../services/ApiService';

const Ceoui = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const [products, setProducts] = useState([
  
  ]);


  // products
      const fetchProducts = async () => {
      try {
        const response = await ApiService.post("/website-product/getWebsiteProductDetails",{
          companyCode: initialAuthState.companyCode,
                    unitCode: initialAuthState.unitCode,
        });
        console.log("lllllll",response);
        if (response.data) {
          setProducts(response.data || []);
          // setAllVehicles(response.data || []); // Store original data
        } else {
          console.error("Error: API response is invalid");
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        // setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
      }, []);






  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const fetchDashboardSessions = async () => {
      try {
        const payload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
        };
        const response = await ApiService.post('/promotion/getAllPromotions', payload);
        // const data = response?.data || [];
 console.log("dashboard data.........",response);







        // const seenThemes = new Set();
        // const dashboardList = [];

        // data.forEach((item) => {
        //   const themeKey = item.theme?.trim().toLowerCase();
        //   if (themeKey && !seenThemes.has(themeKey)) {
        //     seenThemes.add(themeKey);
        //     dashboardList.push({
        //       id: dashboardList.length + 1,
        //       name: `Session ${dashboardList.length + 1}`,
        //       header: item.header || `Header for ${item.theme}`,
        //       desc: item.shortDescription || `Promotions for ${item.theme}`,
        //       theme: item.theme,
        //     });
        //   }
        // });

        setDashboards(response?.data);
      } catch (error) {
        console.error('Failed to fetch dashboards:', error);
      }
    };

    fetchDashboardSessions();
  }, []);

  const handleAddProduct = () => navigate('/ThemeManager');
  const handleAddDashboard = () => navigate('/AddDashboardTheme');

  const handleView = (item, type) => {
    if (type === 'product') {
      navigate('/ProductPreview', { state: { product: item } });
    } else {
      navigate("/DashboardSessionDetails", { state: { promotiondata: item } });
    }
  };
  

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-center mb-4">
  <button
    className={`btn me-2 ${activeTab === 'products' ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setActiveTab('products')}
  >
    Products
  </button>
  <button
    className={`btn me-2 ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setActiveTab('dashboard')}
  >
    Dashboard
  </button>
  <button
    className="btn btn-outline-secondary"
    onClick={() => navigate('/BlogPage')}
  >
    Blog
  </button>
</div>


      <div className="d-flex justify-content-end mb-3">
        {activeTab === 'products' ? (
          <button className="btn btn-success" onClick={handleAddProduct}>
            Add Product
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleAddDashboard}>
            Add Dashboard
          </button>
        )}
      </div>

      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Header</th>
            <th>Description</th>
            <th>Theme</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activeTab === 'products' &&
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.header}</td>
                <td>{product.desc}</td>
                <td>{product.theme}</td>
                <td>
                  <FaEye
                    style={{ cursor: 'pointer' }}
                    title="View Product"
                    onClick={() => handleView(product, 'product')}
                  />
                </td>
              </tr>
            ))}

          {activeTab === 'dashboard' &&
            dashboards?.map((dashboard, index) => (
              <tr key={dashboard.id}>
                <td>{index + 1}</td>
                <td>{dashboard.name}</td>
                <td>{dashboard.header}</td>
                <td>{dashboard.desc}</td>
                <td>{dashboard.theme}</td>
                <td>
                  <FaEye
                    style={{ cursor: 'pointer' }}
                    title="View Dashboard"
                    onClick={() => handleView(dashboard, 'dashboard')}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ceoui;
