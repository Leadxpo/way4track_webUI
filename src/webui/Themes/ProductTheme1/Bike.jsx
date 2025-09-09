
import "./Bike.css";
import  { useState } from "react";

const Bike = ({ title, description, heroImage, stateData}) => {
  const [selectedTruckInfo, setSelectedTruckInfo] = useState(null);
  const testimonials = [
    { 
      name: "S E", 
      time: "10 days ago", 
      text: "Love this place! Awesome coaches, great vibe, and tough sessions that actually get results.", 
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
      rating: 5 
    },
    { 
      name: "Jak", 
      time: "30 days ago", 
      text: "Love training here – great energy, killer workouts and awesome instructors!!", 
      avatar: "https://randomuser.me/api/portraits/men/33.jpg", 
      rating: 5 
    },
    { 
      name: "Nar", 
      time: "1 month ago", 
      text: "Today's hybrid class was awesome as always.", 
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", 
      rating: 5 
    },
    { 
      name: "Mic", 
      time: "1 month ago", 
      text: "For the first time I consistently went to the gym for 2 years straight! Thanks to the beautiful community.", 
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
      rating: 5 
    },
  ];

  return (
    <div className="body">
      {/* <img src="/images/bike-banner.jpg" alt="" className="hero-bike" /> */}
      <img src={heroImage} alt="" className="hero-bike" />
      <center>
        {/* <h1 className="heading">Curious to know about our Bike GPS ?</h1> */}
        <h1 className="heading">{`Curious to know about our ${title} ?`}</h1>
        {/* <p className="curios-line">
          The Basic GPS Tracking Device provides 2G and 4G tracking, geo-fencing, alerts, and trip history with motion-triggered reporting and remote configuration.
        </p> */}
        <p className="curios-line">
          {`${description}`}
        </p>
      </center>
     <div className="main-cards">
      <div className="main-cards-1">
        {/* <h1 className="main-cards-heading">Smart Geo-Fencing with Instant Alerts</h1> */}
        {console.log(stateData)}
        <h1 className="main-cards-heading">{`${stateData?.points[0]?.title || ''}`}</h1>
        {/* <p className="main-cards-text">
          The Smart Geo-Fencing feature lets you set safe zones for your bike and instantly alerts you if it crosses the boundary. Stay protected with real-time notifications that ensure security and peace of mind.
        </p> */}
        <p className="main-cards-text">{`${stateData?.points[0]?.description || ''}`}</p>
      </div>
      <div className="main-cards-2">
         {/* <h1 className="main-cards-heading">Motion Detection & Anti-Theft Alerts</h1> */}
        <h1 className="main-cards-heading">{`${stateData?.points[1]?.title || ''}`}</h1>
        {/* <p className="main-cards-text">
          Stay secure with an advanced motion sensor that detects movement, impact, or towing attempts. Instant alerts notify you about suspicious activity, ensuring anti-theft protection and complete control over your vehicle’s safety.
        </p> */}
        <p className="main-cards-text">{`${stateData?.points[1]?.description || ''}`}</p>
      </div>
      <div className="main-cards-3">
         {/* <h1 className="main-cards-heading">Mileage & Trip Insights</h1> */}
        <h1 className="main-cards-heading">{`${stateData?.points[2]?.title || ''}`}</h1>
        {/* <p className="main-cards-text">
          Monitor your vehicle’s usage with detailed trip summaries and mileage reports. Access historical trip logs to track performance, and ensure proper vehicle usage for personal or business purposes.
        </p> */}
        <p className="main-cards-text">{`${stateData?.points[2]?.description || ''}`}</p>
      </div>
    </div>

    {/* RAHULS HAD THIS SECTION */}
    <div className="mining-truck-info-section">
        <div className="mining-truck-info-left">
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(1)}
          >
            {/* <p className="mining-truck-info-p">
              Supports a wide range of 9–36V DC, making it compatible with
              multiple mining vehicles
            </p> */}
            <p className="mining-truck-info-p">{stateData?.aminities[0]?.desc || ''}</p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(2)}
          >
            {/* <p className="mining-truck-info-p">
              Equipped with 4 hours battery, ensuring uninterrupted operation
              with a minimum of 4 hours backup as mandated by AIS-140 standards.
            </p> */}
            <p className="mining-truck-info-p">{stateData?.aminities[1]?.desc || ''}</p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(3)}
          >
            {/* <p className="mining-truck-info-p">
              Water-resistant AIS-140 devices with an IP67 rating are ideal for
              mining vehicles, as they withstand dust, mud, and water, ensuring
              reliable real-time tracking even in tough environments.
            </p> */}
            <p className="mining-truck-info-p">{stateData?.aminities[2]?.desc || ''}</p>
          </div>
        </div>
        <div className="mining-truck-info-right">
          <img
            className={
              selectedTruckInfo === 3 ? "iphone-truck" : "default-truck"
            }
            src={
              selectedTruckInfo === 1
                ? stateData?.aminityImage1
                : selectedTruckInfo === 2
                ? stateData?.aminityImage2
                : selectedTruckInfo === 3
                ? stateData?.aminityImage3
                : "/images/mining-page-truck.png" // fallback image if none selected
            }  
            alt="Mining Trucks"
          />
        </div>
      </div>

    {/* 6 cards section */}
    <div className="six-cards-main">
      <div className="six-cards-1">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/icon4-bike.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage4 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1 className="six-cards-heading">Real-time Tracking </h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[3]?.name || ''} </h1>
        {/* <p className="six-cards-text">"Track your assets in real time with interval-based or continuous updates for complete visibility. Stay informed, stay in control — anytime, anywhere</p> */}
        <p className="six-cards-text">{stateData?.aminities[3]?.desc || ''}</p>
      </div>
      <div className="six-cards-2">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/icon5-bike.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage5 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1  className="six-cards-heading">Cellular connectivity with 2G and 4G</h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[4]?.name || ''} </h1>
        {/* <p className="six-cards-text">"Reliable 4G connectivity with automatic 2G fallback ensures uninterrupted tracking. Stay connected everywhere, even in low-network areas.".</p> */}
        <p className="six-cards-text">{stateData?.aminities[4]?.desc || ''}</p>
      </div>
      <div className="six-cards-3">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/icon2-bike.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage6 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1 className="six-cards-heading">Overspeed alert</h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[5]?.name || ''} </h1>
        {/* <p className="six-cards-text">"Overspeed alerts notify you instantly when set speed limits are crossed. Drive safer and protect your vehicle with real-time monitoring."</p> */}
        <p className="six-cards-text">{stateData?.aminities[5]?.desc || ''}</p>
      </div>
    </div>
    <div className="six-cards-main-2">
      <div className="six-cards-1">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/icon3-bike.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage7 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1 className="six-cards-heading">Mileage & trip history report</h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[6]?.name || ''} </h1>
        {/* <p className="six-cards-text">Access detailed mileage and trip history reports anytime. Review past journeys, analyze travel patterns, and keep track of distances covered with ease.</p> */}
        <p className="six-cards-text">{stateData?.aminities[6]?.desc || ''}</p>
      </div>
      <div className="six-cards-2">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/icon6-bike.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage8 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1 className="six-cards-heading">Movement-Triggered Alerts with Smart Motion Sensor</h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[7]?.name || ''} </h1>
        {/* <p className="six-cards-text">"Motion sensor sends instant alerts on movement. Stay aware and protect your assets anytime."</p> */}
        <p className="six-cards-text">{stateData?.aminities[7]?.desc || ''}</p>
      </div>
      <div className="six-cards-3">
        <div className="six-cards-icon-bg">
          {/* <img src="/images/token.png" alt="" className="six-cards-icon" /> */}
          <img src={stateData?.aminityImage9 || ''} alt="" className="six-cards-icon" />
        </div>
        {/* <h1 className="six-cards-heading">Smart Geo-Fencing with Instant Alerts</h1> */}
        <h1 className="six-cards-heading">{stateData?.aminities[8]?.name || ''}</h1>
        {/* <p className="six-cards-text">"Set virtual boundaries with smart geo-fencing. Get instant alerts whenever your asset moves in or out."</p> */}
        <p className="six-cards-text">{stateData?.aminities[8]?.desc || ''}</p>
      </div>
    </div>

    <div className="gps-dashboard-div">
      <h1 className="gps-tracking-dashboard-heading">GPS Tracking Dashboard</h1>
      <div className="gps-dashboard-content">
        {/* <img src="/images/bike2.png" alt="" className="gps-dashboard-img" /> */}
        <img src={stateData?.banner1 || ''} alt="" className="gps-dashboard-img" />
        <div className="gps-dashboard-cards-main" style={{ marginTop: 0 }}>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1-start">
              {/* <h1 className="gps-tracking-card-1-heading">Top Navigation & Alerts</h1> */}
              {/* <p className="gps-tracking-card-1-text">Tabs (Monitor, Statistics, Configuration) with status summary boxes and alert indicator.</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[0]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[0]?.description || ''}</p>
            </div>
            <div className="gps-tracking-card-2-start">
              {/* <h1 className="gps-tracking-card-2-heading">Vehicle Status Overview</h1>
              <p className="gps-tracking-card-2-text">Real-time list with status icons, vehicle name, driver, duration, speed, and location.</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[1]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[1]?.description || ''}</p>
            </div>
          </div>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1">
              {/* <h1 className="gps-tracking-card-1-heading">Ignition & Idle Monitoring</h1>
              <p className="gps-tracking-card-1-text">Monitor engine on/off status and track idle time to improve efficiency</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[2]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[2]?.description || ''}</p>
            </div>
            <div className="gps-tracking-card-2">
              {/* <h1 className="gps-tracking-card-2-heading">Travel Summary Reports</h1>
              <p className="gps-tracking-card-2-text">Get a clear overview of every trip with detailed insights on routes, stops, duration, and mileage covered.</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[3]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[3]?.description || ''}</p>
            </div>
          </div>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1">
              {/* <h1 className="gps-tracking-card-1-heading">Performance Metrics</h1>
              <p className="gps-tracking-card-1-text">Running/Idle/Stopped/Inactive time, stoppage duration, idle count, overspeed count.</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[4]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[4]?.description || ''}</p>
            </div>
            <div className="gps-tracking-card-2">
              {/* <h1 className="gps-tracking-card-2-heading">Playback & Analysis</h1>
              <p className="gps-tracking-card-2-text">Playback option allows you to revisit complete trip history, view exact routes taken on the map, analyze driving patterns.</p> */}
              <h1 className="gps-tracking-card-1-heading">{stateData?.steps[5]?.title || ''}</h1>
              <p className="gps-tracking-card-1-text">{stateData?.steps[5]?.description || ''}</p>
            </div>
          </div>
          <button className="gps-know-more-btn">Know more →</button>
        </div>
      </div>
    </div>

    {/* TAKE FROM RAHUL */}
    <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of AIS-140 GPS Tracker
        </h2>
        <div className="mining-benefits-grid">
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img src="/images/legal.png" alt="Legal Compliance" /> */}
              <img src={stateData?.applicationImage1 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Legal Compliance</h3> */}
              <h3 >{stateData?.application[0]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              AIS-140 certified GPS devices are mandatory in India for
              commercial and public transport vehicles to meet government
              standards.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[0]?.desc || ''}</div>
          </div>

          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img
                src="/images/government-integration.png"
                alt="Government Integration"
              /> */}
              <img src={stateData?.applicationImage2 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Government Integration</h3> */}
              <h3 >{stateData?.application[1]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              Live location and travel data are automatically shared with state
              and national control centers.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[1]?.desc || ''}</div>
          </div>

          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img
                className="mining-benefit-icon-passenger"
                src="/images/delivery-truck.png"
                alt="Passenger Safety"
              /> */}
              <img src={stateData?.applicationImage3 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Passenger Safety</h3> */}
              <h3 >{stateData?.application[2]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              SOS button enables instant emergency alerts to ensure quick help
              during accidents or threats.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[2]?.desc || ''}</div>
          </div>

          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img src="/images/fleet.png" alt="Fleet Efficiency" /> */}
              <img src={stateData?.applicationImage4 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Fleet Efficiency</h3> */}
              <h3 >{stateData?.application[3]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              Real-time tracking improves routes, reduces downtime, and boosts
              productivity for fleets and trucks.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[3]?.desc || ''}</div>
          </div>

          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img
                src="/images/shop-specialist-icon.png"
                alt="Shop Specialist"
              /> */}
              <img src={stateData?.applicationImage5 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Shop live with a Specialist</h3> */}
              <h3 >{stateData?.application[4]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              Let us guide you live over video and answer all of your questions.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[4]?.desc || ''}</div>
          </div>

          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              {/* <img src="/images/personal-setup-icon.png" alt="Personal Setup" /> */}
              <img src={stateData?.applicationImage6 || ''} alt=""  />
            </div>
            <div className="mining-benefit-title">
              {/* <h3>Join an online Personal Setup session</h3> */}
              <h3 >{stateData?.application[5]?.name || ''} </h3>
            </div>
            {/* <div className="mining-benefit-desc">
              Talk one on one with a Specialist to set up your device and
              discover new features.
            </div> */}
            <div className="mining-benefit-desc">{stateData?.application[5]?.desc || ''}</div>
          </div>
        </div>
      </div>


    <div className="points-card-main">
      {/* <img src="/images/bike3.png" alt="" className="gps-tracking-img" /> */}
      <img src={stateData?.banner2 || ''} alt="" className="gps-tracking-img" />
      <div className="points-card-points-div">
        <div className="points-card-points-div-1-start">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" />  */}
            <img src={stateData?.aminityImage10} alt="" className="logo-icon" />  
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Group Ride Tracking</p> */}
            {/* <p className="point-card-text">Track multiple bikes in group rides, ensuring no rider gets lost and improving coordination.</p> */}
            <p className="point-card-heading">{stateData?.aminities[9]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[9]?.desc || ''}</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" /> */}
            <img src={stateData?.aminityImage11} alt="" className="logo-icon" />              
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Personal Security</p> */}
            {/* <p className="point-card-text">Monitor the location of individuals, ensuring safety during travel or emergencies.</p> */}
            <p className="point-card-heading">{stateData?.aminities[10]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[10]?.desc || ''}</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" /> */}
            <img src={stateData?.aminityImage12} alt="" className="logo-icon" />              
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Parking Location Finder</p> */}
            {/* <p className="point-card-text">Easily locate your parked bike in crowded areas with GPS pin-drop location sharing.</p> */}
            <p className="point-card-heading">{stateData?.aminities[11]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[11]?.desc || ''}</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" /> */}
            <img src={stateData?.aminityImage13} alt="" className="logo-icon" />              
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Maintenance Reminders</p> */}
            {/* <p className="point-card-text">Get smart alerts for regular bike servicing, oil changes, and battery health based on mileage and usage.</p> */}
            <p className="point-card-heading">{stateData?.aminities[12]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[12]?.desc || ''}</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" /> */}
            <img src={stateData?.aminityImage14} alt="" className="logo-icon" />
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Insurance & Theft Claim Support</p> */}
            {/* <p className="point-card-text">Provide accurate trip and theft data logs to insurance companies for faster claim settlements.</p> */}
            <p className="point-card-heading">{stateData?.aminities[13]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[13]?.desc || ''}</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            {/* <img src="/images/token.png" alt="" className="logo-icon" />  */}
            <img src={stateData?.aminityImage15} alt="" className="logo-icon" />
          </div>
          <div className="point-card-matter">
            {/* <p className="point-card-heading">Eco-Friendly Riding Insights</p> */}
            {/* <p className="point-card-text">Monitor fuel consumption, idle time, and riding patterns to encourage efficient and eco-friendly riding.</p> */}
            <p className="point-card-heading">{stateData?.aminities[14]?.name || ''}</p>
            <p className="point-card-text">{stateData?.aminities[14]?.desc || ''}</p>
          </div>
        </div>
      </div>
    </div>

    {/* three images section */}
    <div className="three-cards-section">
      <h1 className="gps-communications-heading">GPS Communications</h1>
      <div className="three-cards">
        <div className="three-card-1 start">
          <center>
          {/* <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1> */}
          <h1 className="three-cards-section-heading">{stateData?.application[6]?.name}</h1>
          </center>
          {/* <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP with SMS backup for alerts.</p> */}
          <p className="three-cards-section-text">{stateData?.application[6]?.desc}</p>
        <center>
        {/* <img src="/images/bike4.png" alt="" className="three-cards-section-img" /> */}
        <img src={stateData?.applicationImage7 || '' } alt="" className="three-cards-section-img" />
        </center>
        </div>
        <div className="three-card-1">
          <center>
          {/* <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1> */}
          <h1 className="three-cards-section-heading">{stateData?.application[7]?.name}</h1>
          </center>
          {/* <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP with SMS backup for alerts.</p> */}
          <p className="three-cards-section-text">{stateData?.application[7]?.desc}</p>
       <center>
        {/* <img src="/images/bike5.png" alt="" className="three-cards-section-img bike5" /> */}
        <img src={stateData?.applicationImage8 || '' } alt="" className="three-cards-section-img" />
        </center>
        </div>
        <div className="three-card-1">
          <center>
          {/* <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1> */}
          <h1 className="three-cards-section-heading">{stateData?.application[8]?.name}</h1>
          </center>
          {/* <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP with SMS backup for alerts.</p> */}
          <p className="three-cards-section-text">{stateData?.application[8]?.desc}</p>
           <center>
        {/* <img src="/images/bike6.png" alt="" className="three-cards-section-img bike6" /> */}
        <img src={stateData?.applicationImage9 || '' } alt="" className="three-cards-section-img" />
        </center>
        </div>
      </div>
    </div>

    {/* poster section */}
    <div className="poster-section">
      {/* <img src="/images/schoolbus.jpg" alt="" className="poster-bike-last" /> */}
      <img src={stateData?.footerBanner|| ''} alt="" className="poster-bike-last" />
    </div>

    <div className="testimonials-container">
      <div className="testimonials-scroll">
        {testimonials.concat(testimonials).map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="stars">{"⭐".repeat(t.rating)}</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-footer">
              <img src={t.avatar} alt={t.name} className="avatar" />
              <div className="user-info">
                <strong>{t.name}</strong>
                <span>{t.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Bike
