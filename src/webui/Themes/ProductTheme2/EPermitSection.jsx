import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

const EPermitSection = ({ stateData }) => {

  const [workProcess, setWorkProcess] = useState([]);
  useEffect(() => {
    const workprocessDes = stateData.workDescription?.split("*");
    setWorkProcess(workprocessDes);
  }, [])

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-up">
            <h2 className="section-title">
              {stateData.workingTitle}
            </h2>
            {workProcess.map((item) => {

              return(<p className="mb-3">
                {item}.
              </p>)
            })}
            {/* <p className="mb-3">
              The 3 steps mentioned show the Process of GPS integration with the portal
              of Online Mineral ePermit System, Department of AP Mining and Geology,
              Andhra Pradesh.
            </p>
            <p className="mb-4">
              This design has been proven worldwide to enhance the use of the present
              transport foundation up to its optimum ability which helps to improve the
              transport system in its efficacy, value, safety and security. The
              implementation of AIS 140 is being done all over the country.
            </p> */}
            <Button variant="success" className="btn-custom rounded-pill">
              Learn More
            </Button>
          </Col>
          <Col lg={6}>
            <div className="ps-lg-4">
              {stateData.steps.map((step, index) => (
                <Card
                  key={index}
                  className="mb-4 border-0 shadow-custom hover-lift"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <Card.Body className="d-flex align-items-center p-4">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-4"
                      style={{ minWidth: '50px', height: '50px', fontSize: '1.25rem', fontWeight: 'bold' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="fw-bold text-primary mb-2">{step.title}</h4>
                      <p className="mb-0">{step.description}</p>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default EPermitSection