import { motion } from 'framer-motion'

function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">05.</span>
          <h2 className="section-title">What People Say</h2>
          <div className="title-line" />
        </motion.div>

        <div className="testimonials-grid">
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="testimonial-content">
              <p>"Working with Aryan transformed our online presence. His attention to detail and ability to bring our vision to life exceeded all expectations."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SK</div>
              <div className="author-info">
                <span className="author-name">Sarah Kim</span>
                <span className="author-role">CEO, TechStart</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="testimonial-content">
              <p>"Delivered our project ahead of schedule with flawless execution. The best developer we've worked with."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MJ</div>
              <div className="author-info">
                <span className="author-name">Mike Johnson</span>
                <span className="author-role">Founder, DesignCo</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="testimonial-content">
              <p>"Incredible creativity combined with solid technical skills. Our new website has increased conversions by 40%."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AL</div>
              <div className="author-info">
                <span className="author-name">Anna Lee</span>
                <span className="author-role">Marketing Director, GrowthLabs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
