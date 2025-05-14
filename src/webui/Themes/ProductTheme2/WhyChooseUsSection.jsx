import { Container, Row, Col } from 'react-bootstrap'

const WhyChooseUsSection = ({stateData}) => {
  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-right">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={stateData.chooseImage}
                alt="Support Team"
                className="img-fluid"
              />
            </div>
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="ps-lg-4">
              <p className="text-uppercase fw-bold text-secondary mb-2">WHY CHOOSE US?</p>
              <h2 className="section-title">
                We bring solutions to make life easier for our clients.
              </h2>
              <ul className="list-unstyled">
                {stateData.points.map((item)=>{
                return(<li className="mb-4">
                  <div className="d-flex">
                    <div className="me-3 text-success fs-4">✓</div>
                    <div>
                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <p>{item.description}.</p>
                    </div>
                  </div>
                </li>)
                })}
                {/* <li className="mb-4">
                  <div className="d-flex">
                    <div className="me-3 text-success fs-4">✓</div>
                    <div>
                      <h5 className="fw-bold mb-2">Top-Notch Support</h5>
                      <p>Our dedicated support team ensures you get assistance whenever needed.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <div className="me-3 text-success fs-4">✓</div>
                    <div>
                      <h5 className="fw-bold mb-2">User friendly Dashboard</h5>
                      <p>Intuitive interface designed for ease of use and efficient monitoring.</p>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default WhyChooseUsSection