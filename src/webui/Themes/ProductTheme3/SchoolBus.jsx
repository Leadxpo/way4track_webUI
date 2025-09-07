import { useState } from "react";
import './SchoolBus.css';

// Import your JSON data (you might need to adjust the path)
import appsData from './schoolbus.json';

function SchoolBus() {
  const [selectedApp, setSelectedApp] = useState("managerApp");

  const appContent = selectedApp ? appsData[selectedApp] : null;

  return (
    <div>
      <div className='navbar-schoolbus'>
      </div>
    <div className='schoolbus-body'>
      {/* Landing Section */}
      <div className="school-bus-landing">
        <img
          className="school-bus-landing-pic"
          src="/images/schoolbus.jpg"
          alt="School Bus"
        />
      </div>

      {/* Header Content */}
      <div className="school-bus-content">
        <div className="school-bus-content-1">
          <h1>Looking for safer school bus journeys?</h1>
        </div>
        <div className="school-bus-content-2">
          <p>
           Planning school bus routes is complex—managers, drivers, and parents all face challenges.
From deciding routes and bus capacities to tracking delays and safety, the process is overwhelming.
SmartBus simplifies it all with optimized routes, real-time tracking, and apps for everyone.
          </p>
        </div>
      </div>

      {/* Tracker Properties Section */}
      <div className="school-bus-tracker-properties">
        <div className="school-bus-features-grid">
          {/* Feature 1 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/escalator_warning.png" alt="Enhance Student Safety" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Enhance Student Safety
              </div>
              <div className="school-bus-feature-desc">
                Ensure safer school commutes for students with GPS-enabled tracking. Provide parents and schools peace of mind through constant monitoring.
              </div>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/add_road.png" alt="Optimize Bus Routes" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Optimize Bus Routes
              </div>
              <div className="school-bus-feature-desc">
                Reduce travel time and fuel costs with AI-powered route optimization. Smart planning ensures buses take the most efficient paths daily.
              </div>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/airplay.png" alt="Real-Time Monitoring" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Real-Time Monitoring
              </div>
              <div className="school-bus-feature-desc">
                Track bus locations, student check-ins, and trip status in real time. Stay updated instantly to improve coordination and response.
              </div>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/add_location.png" alt="Improve Resource Allocation" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Improve Resource Allocation
              </div>
              <div className="school-bus-feature-desc">
                Assign buses and drivers efficiently to maximize fleet performance. Smart allocation reduces idle time and enhances productivity.
              </div>
            </div>
          </div>
          {/* Feature 5 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/mindfulness.png" alt="Streamline Operations" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Streamline Operations
              </div>
              <div className="school-bus-feature-desc">
                Automate trip planning, attendance, and reporting processes. Ensure smoother coordination and hassle-free transport management.
              </div>
            </div>
          </div>
          {/* Feature 6 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/zone_person_alert.png" alt="Safety First" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Safety First
              </div>
              <div className="school-bus-feature-desc">
                Geofencing alerts for restricted zones. - SOS notifications during emergencies. - Live incident reporting. - Real-time updates for parents & schools. - Always-on safety monitoring.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apps Section */}
      <div className="school-bus-apps-section">
        <div className="school-bus-apps-grid">
          {/* Manager App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Manager App
            </div>
            <div className="school-bus-app-desc">
              The Manager App is a web portal designed for school administrators and transportation managers to oversee the entire system. It provides real-time bus tracking on a map, tools to create and assign trips, and features to plan and optimize routes. Managers can monitor student attendance, receive instant alerts and notifications, and generate reports with detailed analytics. The portal also enables user management, including parents and drivers, ensuring full control and smooth operation of school transport.
            </div>
            <div className="school-bus-app-btn">
              <button onClick={() => setSelectedApp('managerApp')}>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/manager_app.png" alt="Manager App" />
            </div>
          </div>
          {/* Driver App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Driver App
            </div>
            <div className="school-bus-app-desc">
              The Driver App helps drivers efficiently manage routes and students. It provides guided navigation to handle complex routes, tools to manage student behavior, and communication features to stay connected with managers and parents—solving the challenge of delayed or missing updates. The app also helps drivers manage schedules effectively, reducing time management pressure and ensuring every trip runs smoothly, safely, and on time.
            </div>
            <div className="school-bus-app-btn">
              <button onClick={() => setSelectedApp('driverApp')}>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/driver_app.png" alt="Driver App" />
            </div>
          </div>
          {/* Parent App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Parent App
            </div>
            <div className="school-bus-app-desc">
              The Parent App gives parents peace of mind with immediate alerts for delays or emergencies. Parents can check their child's status in real time, ensuring safety throughout the journey. The app provides accurate and predictable schedules, reducing disruption and confusion. By offering real-time location and attendance updates, it helps ease parental anxiety and ensures parents stay informed, reassured, and stress-free about their child's commute.
            </div>
            <div className="school-bus-app-btn">
              <button onClick={() => setSelectedApp('parentApp')}>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/parent_app.png" alt="Parent App" />
            </div>
          </div>
        </div>
      </div>
 
      {/* Dynamic App Detail Section */}
      {appContent && (
        <div className="manager-app-section">
          {/* Title */}
          <div className="manager-app-title">
            {appContent.title}
          </div>
          {/* Top Content Row */}
          <div className="manager-app-top-row">
            {/* Left Side Text */}
            <div className="manager-app-intro">
              {appContent.intro}
            </div>
            {/* Features List */}
            <div className="manager-app-features-list">
              {appContent.features.map((feature, index) => (
                <div className="manager-app-feature" key={index}>
                  <div className="manager-app-feature-img">
                    <img src={feature.img} alt={feature.alt} />
                  </div>
                  <div className="manager-app-feature-content">
                    <div className="manager-app-feature-title">
                      {feature.title}
                    </div>
                    <div className="manager-app-feature-desc">
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3rd Div: Key Advantages */}
          <div className="manager-app-advantages">
            <div className="manager-app-advantages-title">
              {appContent.key_advantages.title}
            </div>
            <div className="manager-app-advantages-desc">
              {appContent.key_advantages.desc}
            </div>
          </div>
          
          {/* 4th Div: Manager App Advantages Grid */}
          <div className="manager-app-advantages-grid-bg">
            <div className="manager-app-advantages-grid">
              {appContent.advantages_grid.map((advantage, index) => (
                <div className="manager-app-advantage-card" key={index}>
                  <div className="manager-app-advantage-img">
                    <img src={advantage.img} alt={advantage.alt} />
                  </div>
                  <div className="manager-app-advantage-content">
                    <div className="manager-app-advantage-title">
                      {advantage.title}
                    </div>
                    <div className="manager-app-advantage-desc">
                      {advantage.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5th Div: Manager App Features Grid */}
          <div className="manager-app-features-adv-bg">
            <div className="manager-app-features-adv-grid">
              {appContent.features_adv.map((feature, index) => (
                <div className="manager-app-features-adv-card" key={index}>
                  <div className="manager-app-features-adv-img">
                    <img src={feature.img} alt={feature.alt} />
                  </div>
                  <div className="manager-app-features-adv-row">
                    <span className="manager-app-features-adv-title">{feature.title}</span>
                    <span className="manager-app-features-adv-number">{feature.number}</span>
                  </div>
                  <div className="manager-app-features-adv-divider"></div>
                  <div className="manager-app-features-adv-desc">
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6th Div: Manager App Image Section */}
          <div className="manager-app-image-section">
            <div className="manager-app-image-wrapper">
              <img src={appContent.manager_app_image_section.img} alt={appContent.manager_app_image_section.alt} />
            </div>
          </div>

          {/* 7th Div: Attendance and Alerts Section */}
          <div className="manager-app-attendance-alerts-section">
            {/* First Div */}
            <div className="manager-app-attendance">
              {/* Attendance Management */}
              <div className="manager-app-attendance-management">
                <div className="manager-app-attendance-title">
                  {appContent.attendance_alerts.attendance.title}
                </div>
                <div className="manager-app-attendance-desc">
                  {appContent.attendance_alerts.attendance.desc}
                </div>
              </div>

              {/* Driver & Attendant Management */}
              <div className="manager-app-driver-management">
                <div className="manager-app-driver-title">
                  {appContent.attendance_alerts.driver_management.title}
                </div>
                <div className="manager-app-driver-desc">
                  {appContent.attendance_alerts.driver_management.desc}
                </div>
              </div>
            </div>

            {/* Second Div */}
            <div className="manager-app-alerts">
              <div className="manager-app-alerts-content">
                <div className="manager-app-alerts-title">
                  {appContent.attendance_alerts.alerts.title}
                </div>
                <div className="manager-app-alerts-desc">
                  {appContent.attendance_alerts.alerts.desc}
                </div>
              </div>
              <div className="manager-app-alerts-button">
                <button className="manager-app-alerts-btn">
                  <span className="manager-app-alerts-btn-icon">
                    <img src={appContent.attendance_alerts.alerts.button_icon} alt="Check Icon" />
                  </span>
                  {appContent.attendance_alerts.alerts.button}
                </button>
              </div>
            </div>
          </div>

          {/* 8th Div: Detailed Reports and Emergency Handling */}
          <div className="manager-app-reports-emergency-section">
            {/* Detailed Reports */}
            <div className="manager-app-reports">
              <div className="manager-app-reports-title">
                {appContent.reports_emergency.reports.title}
              </div>
              <div className="manager-app-reports-desc">
                {appContent.reports_emergency.reports.desc}
              </div>
            </div>

            {/* Emergency Handling */}  
            <div className="manager-app-emergency">
              <div className="manager-app-emergency-title">
                {appContent.reports_emergency.emergency.title}
              </div>
              <div className="manager-app-emergency-desc">
                {appContent.reports_emergency.emergency.desc}
              </div>
            </div>
          </div>

          {/* 9th Div: APIs, Fees, Resource, Safety */}
          <div className="manager-app-apis-fees-section">
            {appContent.apis_fees.map((item, index) => (
              <div className="manager-app-apis-fees-card" key={index}>
                <div className="manager-app-apis-fees-img">
                  <img src={item.img} alt={item.alt} />
                </div>
                <div className="manager-app-apis-fees-content">
                  <div className="manager-app-apis-fees-title">
                    {item.title}
                  </div>
                  <div className="manager-app-apis-fees-desc">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 10th Div: Manager App Product Image Section */}
          <div className="manager-app-product-image-section">
            <div className="manager-app-product-image-wrapper">
              <img src={appContent.product_image_section.img} alt={appContent.product_image_section.alt} />
            </div>
          </div>
        </div>
      )}

      {/* Demo Section */}
      <div className="school-bus-demo-section">
        <div className="school-bus-demo-grid">
          {/* Left Side */}
          <div className="school-bus-demo-left">
            <div className="school-bus-demo-title">
              Schedule a Live <br /> Demo with Our Team
            </div>
            <div className="school-bus-demo-desc">
              Still unsure if GPS tracking fits your business or personal <br /> needs? Join a 15-min live demo call and discover how <br /> Way4Track can save you time, money, and stress.
            </div>
            <div className="school-bus-demo-rating">
              <div className="school-bus-demo-rating-img">
                <img src="/images/demo_avatars.png" alt="Customer Avatars" />
              </div>
              <div className="school-bus-demo-rating-info">
                <div className="school-bus-demo-rating-score">
                  4.9 / 5 Rated
                </div>
                <div className="school-bus-demo-rating-customers">
                  Over 9.2k Customers
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - Form */}
          <div className="school-bus-demo-form">
            <form>
              <label htmlFor="demo-name">Name</label>
              <input
                type="text"
                id="demo-name"
                name="demo-name"
                placeholder="Jane Smith"
                autoComplete="off"
              />
              <label htmlFor="demo-email">Email</label>
              <input
                type="email"
                id="demo-email"
                name="demo-email"
                placeholder="jane@framer.com"
                autoComplete="off"
              />
              <button type="submit" className="school-bus-demo-submit">
                Submit <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h4>Company</h4>
            <p>
              <a href="#">About</a>
            </p>
            <p>
              <a href="#">Our Products</a>
            </p>
            <p>
              <a href="#">Careers</a>
            </p>
            <p>
              <a href="#">Blogs</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <p>
              <a href="#">Contact Us</a>
            </p>
            <p>
              <a href="#">Whatsapp</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <p>
              <a href="#">Contact Us</a>
            </p>
            <p>
              <a href="#">Whatsapp</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <p>
              <a href="#">Instagram</a>
            </p>
            <p>
              <a href="#">Facebook</a>
            </p>
            <p>
              <a href="#">Twitter</a>
            </p>
            <p>
              <a href="#">Youtube</a>
            </p>
          </div>
        </div>

        <div className="footer-logo">
          <h1>
            Way4Track
          </h1>
        </div>

        <div className="footer-bottom">
          <p>
            ©2025 All Rights Reserved • Terms Of Use • Privacy Policy • Legal
            Policies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SchoolBus;