import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CalendarClock, Clock, Bell, Users } from 'lucide-react';
import './styles/TrackingFeatures.css';

const TrackingFeatures = ({ stateData }) => {
  const workDescription=stateData.workDescription.split("*")

  return (
    <section className="tracking-features section-padding">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div 
              className="dashboard-container" 
              data-aos="fade-up"
            >
              <img 
                src={stateData.banner2} 
                alt="Tracking Dashboard" 
                className="dashboard-img img-fluid" 
              />
              <div className="floating-icon icon-1">
                <div className="pulse-ring"></div>
                <div className="icon-inner">
                  <MapPin />
                </div>
              </div>
              <div className="floating-icon icon-2">
                <div className="pulse-ring"></div>
                <div className="icon-inner">
                  <Bell />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <div className="what-we-do-box" data-aos="fade-up">
              <h3>— WHAT WE DO? —</h3>
              {workDescription.map((item)=>{
              return(<p>
                {item}
              </p>)
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const MapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default TrackingFeatures;