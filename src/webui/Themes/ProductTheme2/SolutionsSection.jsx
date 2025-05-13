import { Container, Row, Col } from 'react-bootstrap'

const SolutionsSection = ({stateData}) => {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-up">
            <p className="text-uppercase fw-bold text-secondary mb-2">OUR SOLUTIONS</p>
            <h2 className="section-title">
              {stateData.modal} Certified {stateData.name} for commercial vehicles
            </h2>
            <p className="mb-3">
              {stateData.solutionDescription}
            </p>
          </Col>
          <Col lg={6} data-aos="fade-up" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={stateData.solutionImage}
                alt="Commercial Vehicles"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SolutionsSection