import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import './App.css'

// Custom hook for Lenis smooth scroll
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1000 * Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}

// Typewriter effect component
function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (index >= words.length) return

    const timeout = setTimeout(() => {
      if (subIndex === words[index].length + 1 && !reverse) {
        setReverse(true)
        return
      }

      if (subIndex === 0 && reverse) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % words.length)
        return
      }

      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className="typewriter-text">
      {words[index].substring(0, subIndex)}
      <span className="cursor">|</span>
    </span>
  )
}

// Navigation component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">aryan</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  )
}

// Hero section component
function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const typewriterWords = ['full-stack apps', 'beautiful UIs', 'clean code', 'digital experiences']

  return (
    <section id="home" className="hero">
      <motion.div className="hero-background" style={{ y: y1 }}>
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
          <span className="wave">👋</span>
          <span className="greeting-text">Hello, I'm</span>
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="name-first">Aryan</span>
          <span className="name-last">Man Singh Pradhan</span>
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
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        >
          <CounterStat value={50} label="Projects Completed" delay={1.1} />
          <CounterStat value={30} label="Happy Clients" delay={1.2} />
          <CounterStat value={5} label="Years Experience" delay={1.3} />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span>Scroll to explore</span>
        <div className="scroll-arrow" />
      </motion.a>
    </section>
  )
}

// Counter animation component
function CounterStat({ value, label, delay }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      let current = 0
      const increment = value / 50
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="stat">
      <motion.span
        className="stat-number"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        {count}
      </motion.span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// About section component
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
                <span className="placeholder-emoji">👨‍💻</span>
              </div>
              <motion.div
                className="image-frame"
                whileHover={{ scale: 1.02 }}
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
                  <span className="highlight-icon">{['🎯', '🚀', '💡', '🤝'][i]}</span>
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

// Project card component
function ProjectCard({ project, index, isFeatured }) {
  return (
    <motion.article
      className={`project-card ${isFeatured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="project-image">
        <div className="image-overlay" />
        <div className={`project-thumbnail gradient-${project.gradient}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {project.icon}
          </svg>
        </div>
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {isFeatured && (
            <div className="project-links">
              <a href="#" className="link-icon" title="View Live">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
              <a href="#" className="link-icon" title="View Code">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77c0-.34-.04-.67-.1-1M9 19v-4a4 4 0 014-4h4" />
                </svg>
              </a>
            </div>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <ul className="project-tech">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

// Projects section component
function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration, real-time inventory management, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      gradient: 1,
      icon: <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates, team workflows, and productivity analytics.',
      tech: ['Vue.js', 'Firebase', 'Tailwind'],
      gradient: 2,
      icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
      featured: false,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with customizable widgets, data visualization, and automated reporting.',
      tech: ['Next.js', 'PostgreSQL', 'GraphQL'],
      gradient: 3,
      icon: <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />,
      featured: false,
    },
    {
      title: 'Weather App',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.',
      tech: ['JavaScript', 'OpenWeather API', 'CSS3'],
      gradient: 4,
      icon: <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
      featured: false,
    },
  ]

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">02.</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="title-line" />
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isFeatured={project.featured}
            />
          ))}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#" className="btn btn-outline">View All Projects</a>
        </motion.div>
      </div>
    </section>
  )
}

// Skills section component
function Skills() {
  const skillGroups = [
    {
      icon: '🎨',
      title: 'Frontend',
      skills: ['HTML5', 'CSS3/SASS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 'Tailwind CSS'],
    },
    {
      icon: '⚙️',
      title: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
    },
    {
      icon: '🛠️',
      title: 'Tools & Others',
      skills: ['Git', 'Docker', 'AWS', 'Figma', 'CI/CD', 'Agile'],
    },
  ]

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">03.</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="title-line" />
        </motion.div>

        <div className="skills-content">
          <motion.div
            className="skills-main"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                className="skill-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <h3 className="skill-group-title">
                  <span className="skill-icon">{group.icon}</span>
                  {group.title}
                </h3>
                <div className="skill-items">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="skills-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="visual-card">
              <div className="code-window">
                <div className="window-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="window-content">
                  <pre>
                    <code>
                      <span className="code-keyword">const</span>{' '}
                      <span className="code-variable">developer</span>{' '}
                      = {'{'}
                      {'\n'}
                      {'  '}
                      <span className="code-key">name</span>:{' '}
                      <span className="code-string">'Aryan'</span>,
                      {'\n'}
                      {'  '}
                      <span className="code-key">role</span>:{' '}
                      <span className="code-string">'Full Stack Dev'</span>,
                      {'\n'}
                      {'  '}
                      <span className="code-key">skills</span>: [
                      {'\n'}
                      {'    '}
                      <span className="code-string">'React'</span>,
                      {'\n'}
                      {'    '}
                      <span className="code-string">'Node.js'</span>,
                      {'\n'}
                      {'    '}
                      <span className="code-string">'Python'</span>
                      {'\n'}
                      {'  '}],
                      {'\n'}
                      {'  '}
                      <span className="code-key">hardWorker</span>:{' '}
                      <span className="code-boolean">true</span>
                      {'\n'}
                      {'};'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Contact section component
function Contact() {
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">04.</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-line" />
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-heading">Let's build something amazing together</h3>
            <p className="contact-description">
              Have a project in mind or just want to say hello?
              I'm always open to discussing new opportunities and ideas.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:hello@aryan.dev">hello@aryan.dev</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Available Worldwide</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required />
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={formStatus === 'sending'}
              whileHover={{ scale: formStatus === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: formStatus === 'idle' ? 0.98 : 1 }}
            >
              {formStatus === 'sending' ? (
                <span className="loading">Sending...</span>
              ) : formStatus === 'success' ? (
                <span>Message Sent! ✓</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://github.com/IammYann" className="social-link" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a href="#" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href="#" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <span>Twitter</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Footer component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Aryan Man Singh Pradhan. All rights reserved.</p>
        <p className="footer-note">Built with ❤️ and lots of ☕</p>
      </div>
    </footer>
  )
}

// Scroll to top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Main App component
function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
