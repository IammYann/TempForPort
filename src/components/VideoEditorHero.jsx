import { useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

function VideoEditorHero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="hero">
      <motion.div className="hero-background" style={{ y: y1 }} aria-hidden="true">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
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
          <span className="greeting-text">Welcome to my</span>
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="name-first">Video Editing</span>
          <span className="name-last">Showcase</span>
        </motion.h1>

        <motion.div
          className="hero-title-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="title-prefix">I create </span>
          <Typewriter words={['cinematic videos', 'visual stories', 'motion graphics', 'brand films']} />
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Crafting compelling visual narratives through expert editing, color grading, and motion graphics.
          Specializing in music videos, commercials, and brand content.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#videos" className="btn btn-primary">
            <span>Watch My Work</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
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

export default VideoEditorHero
