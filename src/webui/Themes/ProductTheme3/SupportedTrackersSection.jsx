import React from 'react';
import { Quote, MapPin } from 'lucide-react';

const TestimonialCard = ({ text }) => {
  return (
    <div className="card shadow-sm h-100 border-0 rounded-3 position-relative">
      <div className="position-absolute top-0 start-0 p-3 text-warning opacity-25">
        <Quote size={32} />
      </div>
      <div className="card-body pt-5 ps-5">
        <p className="card-text fst-italic text-muted small">{text}</p>
      </div>
    </div>
  );
};

const SupportedTrackersSection = () => {
  const testimonials = [
    "SmartBus is our school bus monitoring software solution. It is an application suite consisting of the SmartBus Manager app, the SmartBus Parent app, the SmartBus driver app, and the SmartBus attendant app.",
    "The SmartBus parent app keeps all parents updated with their kid's school bus locations. Using the live tracking system, parents can access their child's school bus arrival and departure times. They can also customize school bus arrival alerts.",
    "SmartBus can be integrated with video telematics tools like dual-lens dash cams. Then, live video footage can be accessed by parents and school admins.",
    "SmartBus offers a variety of tools and reports to better understand driving behaviors. You can install driver-facing dash cams to see what your drivers are doing."
  ];

  return (
    <section className="py-5 container">
      <div className="row g-5 align-items-center">
        
        {/* Testimonials Grid */}
        <div className="col-lg-6">
          <div className="row g-4">
            {testimonials.map((text, index) => (
              <div className="col-12 col-md-6" key={`testimonial-${index}`}>
                <TestimonialCard text={text} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="col-lg-6">
          <span className="text-uppercase text-secondary small">Our Community</span>
          <h2 className="mt-2 h3 text-warning fw-bold">
            Supported GPS Tracker
          </h2>
          <p className="text-muted mb-4">
            Our fleet management system is compatible with over 1200+ GPS
            trackers and a variety of sensors. So, you can change your GPS
            trackers or hardware devices without having to change your fleet
            management platform!
          </p>

          <div className="d-flex align-items-start bg-white shadow-sm border-start border-4 border-warning p-3 rounded mb-4">
            <div className="me-3">
              <MapPin className="text-warning" size={32} />
            </div>
            <div>
              <h5 className="mb-1 fw-semibold">Universal Compatibility</h5>
              <p className="text-muted small mb-0">
                Works with all major GPS tracking devices
              </p>
            </div>
          </div>

          <img
            src="https://images.pexels.com/photos/9799706/pexels-photo-9799706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="School Bus Banner"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default SupportedTrackersSection;
