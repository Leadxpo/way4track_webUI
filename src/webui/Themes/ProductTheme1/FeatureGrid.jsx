import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Wifi, Battery, Navigation, AlarmPlus as Alarm, Clock, History, Map, AlertTriangle } from 'lucide-react';
import './styles/FeatureGrid.css';

const FeatureGrid = ({ stateData }) => {
  const applicationData = stateData?.application || [];
  // const features = [
  //   {
  //     icon: <Wifi size={32} />,
  //     title: "Connectivity",
  //     description: "Tracking all the employees or positioning the 2-wheelers was never so easy. Track all your employees having two wheelers or your son who drives a two wheeler with GPS trackers."
  //   },
  //   {
  //     icon: <Battery size={32} />,
  //     title: "Battery",
  //     description: "Without any extra installation charges, this device is installed to the battery of the bike. This GPS tracking device has power back up for extra hours after being unplugged from the battery."
  //   },
  //   {
  //     icon: <Navigation size={32} />,
  //     title: "Tracking",
  //     description: "Tracking of two wheelers becomes so easy with the use of way4track bike series. Whether it's a company vehicle or your own, track it with features like zone & speeding specification."
  //   },
  //   {
  //     icon: <Alarm size={32} />,
  //     title: "Parking Notification",
  //     description: "Parking Notification logs the stationary location of your vehicle and alerts you when it moves or enters/exits predefined zones."
  //   },
  //   {
  //     icon: <Clock size={32} />,
  //     title: "Real Time Tracking",
  //     description: "Track your friends, family, or employees in real-time. This feature enables you to track their exact location instantly."
  //   },
  //   {
  //     icon: <History size={32} />,
  //     title: "24 Hour History",
  //     description: "Missed out on real-time tracking? View all missed activities from the past 24 hours on a single screen."
  //   },
  //   {
  //     icon: <Map size={32} />,
  //     title: "Zone Alerts",
  //     description: "Create custom zones and get notified whenever someone enters or exits these designated areas."
  //   },
  //   {
  //     icon: <AlertTriangle size={32} />,
  //     title: "Speed Alerts",
  //     description: "Set speed limits and get notified if they are exceeded. Monitor your vehicles and ensure safety on the go."
  //   }
  // ];

  return (
    <section className="feature-grid-section section-padding">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="section-title" data-aos="fade-up">Key Features</h2>
            <div className="title-underline" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="section-description" data-aos="fade-up" data-aos-delay="200">
              Explore our comprehensive set of tracking features designed to keep your bike safe and secure at all times.
            </p>
          </Col>
        </Row>
        <Row>
          {applicationData?.map((item, index) => {
            const applicationImages = [
              stateData.applicationImage1,
              stateData.applicationImage2,
              stateData.applicationImage3,
              stateData.applicationImage4,
              stateData.applicationImage5,
              stateData.applicationImage6,
            ];
            <Col md={6} lg={3} sm={12} key={index} className="mb-4">
              <div
                className="info-box"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <img
                  src={
                    applicationImages[index]
                      ? applicationImages[index]
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                  }
                  alt="Feature"
                  className="future-icon"
                />
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
            </Col>
          })}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureGrid;