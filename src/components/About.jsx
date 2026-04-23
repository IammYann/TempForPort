import { motion } from 'framer-motion'

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">01.</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-line" />
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="image-wrapper">
              <div className="image-placeholder">
                <img src="/assets/Me/aryan.jpg" alt="Aryan Man Singh Pradhan" loading="lazy" />
              </div>
              <motion.div
                className="image-frame"
                whileHover={{ scale: 1.02 }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="lead">
              I'm a passionate Full Stack Developer with 5+ years of experience
              building web applications that make a difference.
            </p>
            <p>
              My journey in tech started with curiosity about how websites work,
              and has evolved into a career creating scalable, user-friendly applications.
              I thrive on solving complex problems and turning ideas into reality through code.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or finding inspiration in nature.
            </p>

            <motion.div
              className="about-highlights"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {['Clean, maintainable code', 'Performance-focused', 'Creative problem solver', 'Team collaborator'].map((item, i) => (
                <motion.div
                  key={item}
                  className="highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <span className="highlight-icon" aria-hidden="true">{['🎯', '🚀', '💡', '🤝'][i]}</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              className="btn btn-outline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
