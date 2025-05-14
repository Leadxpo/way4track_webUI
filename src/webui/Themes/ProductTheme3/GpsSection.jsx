import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Navigation, Clock, Shield } from 'lucide-react';

const GpsSection = ({stateData}) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-5 container">
      <div className="row align-items-center g-5">
        {/* Text Content */}
        <motion.div
          ref={ref}
          className="col-lg-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="text-secondary text-uppercase small" variants={itemVariants}>
            Analyze Now
          </motion.span>
          <motion.h2 className="mt-2 h3 fw-bold text-warning mb-4" variants={itemVariants}>
           {stateData.solutionTitle}
          </motion.h2>
          <motion.p className="text-muted mb-4 lead" variants={itemVariants}>
            {stateData.solutionDescription}.
          </motion.p>

          <div className="d-flex flex-column gap-4">
            {/* Feature 1 */}
            {stateData.steps?.map((item)=>{
            return(<motion.div className="d-flex align-items-start gap-3" variants={itemVariants}>
              <div className="bg-warning bg-opacity-25 p-2 rounded">
                <Clock className="text-warning" size={24} />
              </div>
              <div>
                <h5 className="fw-semibold text-dark mb-1">{item.title}</h5>
                <p className="text-muted mb-0">{item.description}</p>
              </div>
            </motion.div>)
            })}

            {/* Feature 2 */}
            {/* <motion.div className="d-flex align-items-start gap-3" variants={itemVariants}>
              <div className="bg-warning bg-opacity-25 p-2 rounded">
                <Navigation className="text-warning" size={24} />
              </div>
              <div>
                <h5 className="fw-semibold text-dark mb-1">Real-time Tracking</h5>
                <p className="text-muted mb-0">Monitor the bus location in real-time</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
           {/* <motion.div className="d-flex align-items-start gap-3" variants={itemVariants}>
              <div className="bg-warning bg-opacity-25 p-2 rounded">
                <Shield className="text-warning" size={24} />
              </div>
              <div>
                <h5 className="fw-semibold text-dark mb-1">Enhanced Safety</h5>
                <p className="text-muted mb-0">Alerts and notifications for any deviations</p>
              </div>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Image with overlay */}
        <motion.div
          className="col-lg-6 position-relative"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Floating Label */}
          <motion.div
            className="position-absolute top-0 start-0 translate-middle bg-warning bg-gradient text-white px-3 py-2 rounded shadow"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              type: 'spring',
              stiffness: 200
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <MapPin size={16} />
              <span className="fw-medium small">Live Tracking</span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.img
            src={stateData.solutionImage}
            alt="GPS For School Bus"
            className="img-fluid rounded-4 shadow"
            style={{ height: '400px', objectFit: 'cover', width: '100%' }}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GpsSection;
