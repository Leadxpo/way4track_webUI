import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Route, Users, MapPin, Activity } from 'lucide-react';

const FeatureCard = ({ icon, title, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-4 shadow p-4 d-flex flex-column align-items-center transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-warning bg-opacity-25 p-3 rounded-circle mb-3 d-flex align-items-center justify-content-center">
        {icon}
      </div>
      <h3 className="h6 fw-semibold text-dark text-center">{title}</h3>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-5 px-3 container">
      <motion.div
        ref={ref}
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-secondary text-uppercase small">What We Do?</span>
        <h2 className="mt-2 h3 fw-bold text-warning">
          GETTING KIDS TO SCHOOL ON TIME <br className="d-none d-md-block" /> & BACK HOME SAFELY
        </h2>
      </motion.div>

      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <FeatureCard icon={<Route className="text-warning" size={24} />} title="Route Planning" delay={0} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <FeatureCard icon={<Users className="text-warning" size={24} />} title="Driver Allocation" delay={0.1} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <FeatureCard icon={<MapPin className="text-warning" size={24} />} title="Geofencing" delay={0.2} />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <FeatureCard icon={<Activity className="text-warning" size={24} />} title="RPM" delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
