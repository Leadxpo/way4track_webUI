import { Container, Row, Col, Button } from 'react-bootstrap'

const GpsTrackingSection = ({stateData}) => {
  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0 order-lg-2" data-aos="fade-left">
            <div className="ps-lg-4">
              <h2 className="section-title">
                {stateData.productModal} CERTIFIED {stateData.name} DEVICE
              </h2>
              <p className="mb-4">
               {stateData.description}.
              </p>
              <Button variant="success" className="btn-custom rounded-pill">
                Know more
              </Button>
            </div>
          </Col>
          <Col lg={6} data-aos="fade-right" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={stateData.banner1}
                alt="AIS 140 GPS Tracker"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default GpsTrackingSection