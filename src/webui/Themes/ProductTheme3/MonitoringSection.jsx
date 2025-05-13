import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, TrendingUp, Bell, MapPin } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-white rounded-4 shadow-sm p-4 text-center d-flex flex-column align-items-center h-100 hover-shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-warning bg-opacity-25 p-3 rounded-circle mb-3">
        {icon}
      </div>
      <h5 className="fw-semibold text-dark mb-2">{title}</h5>
      <p className="text-muted small mb-0">{description}</p>
    </motion.div>
  );
};

const MonitoringSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-5 container">
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-secondary text-uppercase small">APP</span>
        <h2 className="fw-bold text-warning mt-2 fs-2">School Bus Monitoring</h2>
      </motion.div>

      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <FeatureCard
            icon={<Target size={24} className="text-warning" />}
            title="School Bus Monitoring"
            description="Control from the very first to the last stop!"
            delay={0.1}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <FeatureCard
            icon={<TrendingUp size={24} className="text-warning" />}
            title="Improve Safety Metrics"
            description="Avoid route deviation or reckless driving"
            delay={0.2}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <FeatureCard
            icon={<Bell size={24} className="text-warning" />}
            title="Instant Notifications"
            description="Get notified instantly in case of emergencies"
            delay={0.3}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <FeatureCard
            icon={<MapPin size={24} className="text-warning" />}
            title="Route Optimization"
            description="Outline shorter and efficient bus routes"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
