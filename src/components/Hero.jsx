import { useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import Typewriter from './Typewriter'
import CounterStat from './CounterStat'

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const typewriterWords = ['full-stack apps', 'beautiful UIs', 'clean code', 'digital experiences', 'many many more...']

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-background" style={{ y: y1 }} aria-hidden="true">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </motion.div>

      <motion.div
        className="hero-content"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="wave" aria-hidden="true">👋</span>
          <span className="greeting-text">Hello, I'm</span>
        </motion.div>

        <motion.h1
          id="hero-title"
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="name-first">Aryan Man Singh Pradhan</span>
          <span className="name-last"></span>
        </motion.h1>

        <motion.div
          className="hero-title-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="title-prefix">I build </span>
          <Typewriter words={typewriterWords} />
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Crafting exceptional digital experiences through clean code and creative design.
          Specializing in full-stack development with a focus on user-centric solutions.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#projects" className="btn btn-primary">
            <span>View My Work</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          aria-label="Statistics"
        >
          <CounterStat value={11} label="Projects Completed" delay={1.1} />
          <CounterStat value={1} label="Happy Clients" delay={1.2} />
          <CounterStat value={5} label="Years Experience" delay={1.3} />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.5 }}
        aria-label="Scroll to about section"
      >
        <span>Scroll to explore</span>
        <div className="scroll-arrow" aria-hidden="true" />
      </motion.a>
    </section>
  )
}

export default Hero
