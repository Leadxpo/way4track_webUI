import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FeatureItem = ({ text, delay }) => {
  return (
    <motion.li
      className="d-flex align-items-center bg-warning bg-opacity-25 px-3 py-2 rounded shadow-sm mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Check className="me-2 text-warning flex-shrink-0" size={20} />
      <span className="text-dark">{text}</span>
    </motion.li>
  );
};

const DriverAppSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section ref={ref} className="py-5 px-3 container">
      <div className="row align-items-center g-5">
        <motion.div
          className="col-lg-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="text-secondary text-uppercase small">App</span>
          <h2 className="mt-2 h2 fw-bold text-warning mb-4">Driver App</h2>

          <ul className="list-unstyled mb-4">
            <FeatureItem text="Pickup/Drop Management" delay={0.1} />
            <FeatureItem text="Driver's can confirm student attendance" delay={0.2} />
            <FeatureItem text="Route Planning" delay={0.3} />
            <FeatureItem text="Edit or get acquainted with trips" delay={0.4} />
          </ul>

          <motion.p
            className="text-muted mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Our driver app makes it easy for bus drivers to follow optimized routes,
            manage student attendance, receive instant alerts about route changes,
            and communicate with parents and school administrators.
          </motion.p>

          <motion.button
            className="btn btn-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="position-relative">
            <motion.div
              className="position-absolute top-50 start-0 translate-middle-y bg-success text-white px-3 py-2 rounded shadow"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7,
                type: 'spring',
                stiffness: 200
              }}
            >
              <span className="fw-medium">Live Routing</span>
            </motion.div>

            <motion.img
              src="https://images.pexels.com/photos/3958201/pexels-photo-3958201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Driver app showing route on map"
              className="img-fluid rounded-4 shadow"
              style={{ height: "500px", objectFit: "cover", width: "100%" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DriverAppSection;
