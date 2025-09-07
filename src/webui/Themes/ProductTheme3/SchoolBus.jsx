import './SchoolBus.css';


function SchoolBus({ title, description, heroImage, stateData}) {
  console.log(stateData)
  return (
    <div className='schoolbus-body'>
      {/* <Navbar /> */}
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
              <button>
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
              <button>
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
              <button>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/parent_app.png" alt="Parent App" />
            </div>
          </div>
        </div>
      </div>
 
      {/* Manager App Section */}
      <div className="manager-app-section">
        {/* Title */}
        <div className="manager-app-title">
          The Manager App
        </div>
        {/* Top Content Row */}
        <div className="manager-app-top-row">
          {/* Left Side Text */}
          <div className="manager-app-intro">
            Your data, your input, your pace — all in one place.<br />
            Finally, care that fits how life actually works.
          </div>
          {/* Features List */}
          <div className="manager-app-features-list">
            {/* Feature 1 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/dashboard_icon.png" alt="Dashboard" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Dashboard
                </div>
                <div className="manager-app-feature-desc">
                  Gives managers a high-level overview of fleet status, trip <br />
                  analytics, and user engagement for better planning.
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/trip_dashboard_icon.png" alt="Trip Dashboard" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Trip Dashboard
                </div>
                <div className="manager-app-feature-desc">
                  Centralized platform to monitor ongoing trips, track <br />
                  statuses, and optimize performance in real time.
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/live_tracking_icon.png" alt="Live Tracking" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Live Tracking
                </div>
                <div className="manager-app-feature-desc">
                  Provides map-based, real-time vehicle visibility with <br />
                  geofencing, alerts, and detailed reports.
                </div>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/trip_management_icon.png" alt="Trip Management" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Trip Management
                </div>
                <div className="manager-app-feature-desc">
                  Automates scheduling, route adjustments, and student <br />
                  pickups with flexible trip creation methods.
                </div>
              </div>
            </div>
            {/* Feature 5 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/route_optimization_icon.png" alt="Route Optimization" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Route Optimization
                </div>
                <div className="manager-app-feature-desc">
                  Reduces travel time and fuel costs by using intelligent, <br />
                  customizable routing.
                </div>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="manager-app-feature">
              <div className="manager-app-feature-img">
                <img src="/images/guide_overview_icon.png" alt="Manager's Guide Overview" />
              </div>
              <div className="manager-app-feature-content">
                <div className="manager-app-feature-title">
                  Manager's Guide Overview
                </div>
                <div className="manager-app-feature-desc">
                  Simplifies school transportation by streamlining <br />
                  operations, real-time monitoring, and providing actionable insights.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd Div: Key Advantages */}
        <div className="manager-app-advantages">
          <div className="manager-app-advantages-title">
            Key Advantages for Manager App
          </div>
          <div className="manager-app-advantages-desc">
            Benefits like enhanced safety, real-time transparency, cost efficiency, and easy management for <br/> school transportation. It also emphasizes features such as automation, data insights, seamless <br/> communication, scalability, 24/7 safety monitoring, and a user-friendly interface.
          </div>
        </div>
        {/* 4th Div: Manager App Advantages Grid */}
        <div className="manager-app-advantages-grid-bg">
          <div className="manager-app-advantages-grid">
            {/* Advantage 1 */}
            <div className="manager-app-advantage-card">
              <div className="manager-app-advantage-img">
                <img src="/images/adv_safety.png" alt="Enhanced Safety" />
              </div>
              <div className="manager-app-advantage-content">
                <div className="manager-app-advantage-title">
                  Enhanced Safety
                </div>
                <div className="manager-app-advantage-desc">
                  Instant SOS alerts, quick trip adjustments, and driver monitoring improve student safety.
                </div>
              </div>
            </div>
            {/* Advantage 2 */}
            <div className="manager-app-advantage-card">
              <div className="manager-app-advantage-img">
                <img src="/images/adv_dashboard.png" alt="Dashboard & Live Tracking" />
              </div>
              <div className="manager-app-advantage-content">
                <div className="manager-app-advantage-title">
                  Dashboard & Live Tracking
                </div>
                <div className="manager-app-advantage-desc">
                  Managers gain complete visibility of fleet status, trip progress, and driver assignments.
                </div>
              </div>
            </div>
            {/* Advantage 3 */}
            <div className="manager-app-advantage-card">
              <div className="manager-app-advantage-img">
                <img src="/images/adv_route.png" alt="Route Optimization" />
              </div>
              <div className="manager-app-advantage-content">
                <div className="manager-app-advantage-title">
                  Route Optimization
                </div>
                <div className="manager-app-advantage-desc">
                  Optimized routing reduces fuel and operational costs while maximizing fleet use.
                </div>
              </div>
            </div>
            {/* Advantage 4 */}
            <div className="manager-app-advantage-card">
              <div className="manager-app-advantage-img">
                <img src="/images/adv_trip.png" alt="Trip Management" />
              </div>
              <div className="manager-app-advantage-content">
                <div className="manager-app-advantage-title">
                  Trip Management
                </div>
                <div className="manager-app-advantage-desc">
                  Simple scheduling, flexible trip creation, and automated student allocation.
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 5th Div: Manager App Features Grid */}
        <div className="manager-app-features-adv-bg">
          <div className="manager-app-features-adv-grid">
            {/* Feature 1 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">End-to-End Automation</span>
                <span className="manager-app-features-adv-number">01</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Automates trip scheduling, <br/> monitoring, and alerts.
              </div>
            </div>
            {/* Feature 2 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">Data-Driven Insights</span>
                <span className="manager-app-features-adv-number">02</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Provides analytics on fleet <br/> usage, failures, and engagement.
              </div>
            </div>
            {/* Feature 3 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">24/7 Safety Monitoring</span>
                <span className="manager-app-features-adv-number">04</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Continuous tracking with instant <br/> emergency alerts.
              </div>
            </div>
            {/* Feature 4 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">Seamless Communication</span>
                <span className="manager-app-features-adv-number">05</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Notifications via SMS, email, and push <br/> alerts.
              </div>
            </div>
            {/* Feature 5 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">Scalable Solution</span>
                <span className="manager-app-features-adv-number">06</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Adapts to schools of any size <br/> and fleet capacity.
              </div>
            </div>
            {/* Feature 6 */}
            <div className="manager-app-features-adv-card">
              <div className="manager-app-features-adv-img">
                <img src="/images/automation_icon.png" alt="End-to-End Automation" />
              </div>
              <div className="manager-app-features-adv-row">
                <span className="manager-app-features-adv-title">User-Friendly Interface</span>
                <span className="manager-app-features-adv-number">07</span>
              </div>
              <div className="manager-app-features-adv-divider"></div>
              <div className="manager-app-features-adv-desc">
                Simple dashboards for managers <br/> and parents.
              </div>
            </div>
          </div>
        </div>
        {/* 6th Div: Manager App Image Section */}
        <div className="manager-app-image-section">
          <div className="manager-app-image-wrapper">
            <img src="/images/manager_app_image.png" alt="Manager App Overview" />
          </div>
        </div>
        {/* 7th Div: Attendance and Alerts Section */}
        <div className="manager-app-attendance-alerts-section">
          {/* First Div */}
          <div className="manager-app-attendance">
            {/* Attendance Management */}
            <div className="manager-app-attendance-management">
              <div className="manager-app-attendance-title">
                Attendance Management
              </div>
              <div className="manager-app-attendance-desc">
                Digital attendance using RFID with instant student <br/> check-in and reporting.
              </div>
            </div>
            {/* Driver & Attendant Management */}
            <div className="manager-app-driver-management">
              <div className="manager-app-driver-title">
                Driver & Attendant Management
              </div>
              <div className="manager-app-driver-desc">
                Centralized record-keeping, license verification, and <br/> availability tracking.
              </div>
            </div>
          </div>
          {/* Second Div */}
          <div className="manager-app-alerts">
            <div className="manager-app-alerts-content">
              <div className="manager-app-alerts-title">
                Alerts & Reminders
              </div>
              <div className="manager-app-alerts-desc">
                Timely notifications for delays, missed pickups, SOS, and maintenance schedules.
              </div>
            </div>
            <div className="manager-app-alerts-button">
              <button className="manager-app-alerts-btn">
                <span className="manager-app-alerts-btn-icon">
                  <img src="/images/check_icon.png" alt="Check Icon" />
                </span>
                GET TO KNOW MORE
              </button>
            </div>
          </div>
        </div>
        {/* 8th Div: Detailed Reports and Emergency Handling */}
        <div className="manager-app-reports-emergency-section">
          {/* Detailed Reports */}
          <div className="manager-app-reports">
            <div className="manager-app-reports-title">
              Detailed Reports
            </div>
            <div className="manager-app-reports-desc">
              Comprehensive reports on students, vehicles, <br /> trips, and driver performance.
            </div>
          </div>
          {/* Emergency Handling */}  
          <div className="manager-app-emergency">
            <div className="manager-app-emergency-title">
              Emergency Handling
            </div>
            <div className="manager-app-emergency-desc">
              Instant SOS alerts and quick trip adjustments during critical situations.
            </div>
          </div>
        </div>
        {/* 9th Div: APIs, Fees, Resource, Safety */}
        <div className="manager-app-apis-fees-section">
          {/* Customizable APIs */}
          <div className="manager-app-apis-fees-card">
            <div className="manager-app-apis-fees-img">
              <img src="/images/api_icon.png" alt="Customizable APIs" />
            </div>
            <div className="manager-app-apis-fees-content">
              <div className="manager-app-apis-fees-title">
                Customizable APIs
              </div>
              <div className="manager-app-apis-fees-desc">
                Flexible APIs for trips, billing, and student management with seamless integration.
              </div>
            </div>
          </div>
          {/* Transport Fees Management */}
          <div className="manager-app-apis-fees-card">
            <div className="manager-app-apis-fees-img">
              <img src="/images/api_icon.png" alt="Transport Fees Management" />
            </div>
            <div className="manager-app-apis-fees-content">
              <div className="manager-app-apis-fees-title">
                Transport Fees Management
              </div>
              <div className="manager-app-apis-fees-desc">
                Automated fee setup, reminders, and distance-based pricing for accurate billing.
              </div>
            </div>
          </div>
          {/* Better Resource Utilization */}
          <div className="manager-app-apis-fees-card">
            <div className="manager-app-apis-fees-img">
              <img src="/images/api_icon.png" alt="Better Resource Utilization" />
            </div>
            <div className="manager-app-apis-fees-content">
              <div className="manager-app-apis-fees-title">
                Better Resource Utilization
              </div>
              <div className="manager-app-apis-fees-desc">
                Optimizes allocation of buses, staff, and routes for maximum efficiency.
              </div>
            </div>
          </div>
          {/* Improved Safety Standards */}
          <div className="manager-app-apis-fees-card">
            <div className="manager-app-apis-fees-img">
              <img src="/images/api_icon.png" alt="Improved Safety Standards" />
            </div>
            <div className="manager-app-apis-fees-content">
              <div className="manager-app-apis-fees-title">
                Improved Safety Standards
              </div>
              <div className="manager-app-apis-fees-desc">
                Compliance checks, geofencing alerts, and continuous monitoring for safety.
              </div>
            </div>
          </div>
        </div>
        {/* 10th Div: Manager App Product Image Section */}
        <div className="manager-app-product-image-section">
          <div className="manager-app-product-image-wrapper">
            <img src="/images/manager_app_image.png" alt="Manager App Product" />
          </div>
        </div>
        {/* Next content will go here */}
      </div>




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
  );
}

export default SchoolBus;