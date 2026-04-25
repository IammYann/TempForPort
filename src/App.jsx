import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import './App.css'

// Custom hook for Lenis smooth scroll
function useLenis() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Check if touch device (simple detection)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Disable Lenis on mobile/touch devices or if user prefers reduced motion
    if (prefersReducedMotion || isTouchDevice) {
      return
    }

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
function Navbar({ mode, setMode, transitionOrigin, setTransitionOrigin }) {
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

  const isVideo = mode === 'video'

  const handleModeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTransitionOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setMode(isVideo ? 'coding' : 'video')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-bracket">{isVideo ? '[' : '&lt;'}</span>
          <span className="logo-text">{isVideo ? 'ARYAN' : 'aryan'}</span>
          <span className="logo-bracket">{isVideo ? ']' : '/&gt;'}</span>
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

        <div className="nav-actions">
          <button
            className="mode-toggle"
            onClick={handleModeToggle}
            title={isVideo ? 'Switch to Coding Mode' : 'Switch to Video Editing Mode'}
          >
            <span className="mode-icon">{isVideo ? '💻' : '🎬'}</span>
            <span className="mode-label">{isVideo ? 'Code' : 'Video'}</span>
          </button>

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

  const typewriterWords = ['full-stack apps', 'beautiful UIs', 'clean code', 'digital experiences','many many more...']

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
                <img src="/assets/Me/aryan.jpg" alt="Aryan" />
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
              My journey in tech started with curiosity about how website work,
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
                <a href="mailto:aryan4433650@gmail.com">aryan4433650@gmail.com</a>
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

// Particle Background
function ParticleBackground() {
  const canvasRef = useState(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'particle-canvas'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    
    let particles = []
    let animationId
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    const createParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2
        })
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
        ctx.fill()
        
        particles.forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`
            ctx.stroke()
          }
        })
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    resize()
    createParticles()
    animate()
    
    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })
    
    return () => {
      cancelAnimationFrame(animationId)
      canvas.remove()
    }
  }, [])

  return null
}

// Sidebar Scroll Indicators
function SidebarIndicators() {
  const [activeSection, setActiveSection] = useState('home')
  
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  const dots = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <motion.div 
      className="sidebar-indicators"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {dots.map((dot) => (
        <a
          key={dot.id}
          href={`#${dot.id}`}
          className={`sidebar-dot ${activeSection === dot.id ? 'active' : ''}`}
          title={dot.label}
        >
          <span className="sidebar-tooltip">{dot.label}</span>
        </a>
      ))}
    </motion.div>
  )
}

// Testimonials Section
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

// Blog/Articles Section
function Blog() {
  const articles = [
    {
      title: 'Building Performant React Applications in 2024',
      excerpt: 'Exploring the latest patterns and best practices for creating lightning-fast React apps.',
      date: 'Mar 15, 2024',
      readTime: '8 min read',
      category: 'React'
    },
    {
      title: 'The Art of Smooth Animations',
      excerpt: 'How to create buttery-smooth animations that delight users without sacrificing performance.',
      date: 'Feb 28, 2024',
      readTime: '6 min read',
      category: 'Animation'
    },
    {
      title: 'Modern CSS Techniques You Should Know',
      excerpt: 'Level up your CSS game with these powerful modern techniques and properties.',
      date: 'Jan 20, 2024',
      readTime: '5 min read',
      category: 'CSS'
    },
  ]

  return (
    <section id="blog" className="section blog">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">06.</span>
          <h2 className="section-title">Latest Articles</h2>
          <div className="title-line" />
        </motion.div>

        <div className="blog-grid">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="blog-category">{article.category}</div>
              <h3 className="blog-title">{article.title}</h3>
              <p className="blog-excerpt">{article.excerpt}</p>
              <div className="blog-meta">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="blog-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="btn btn-outline">View All Articles</a>
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

// Video Editing Portfolio Components
function VideoEditorHero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="hero">
      <motion.div className="hero-background" style={{ y: y1 }}>
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
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      >
        <span>Scroll to explore</span>
        <div className="scroll-arrow" />
      </motion.a>
    </section>
  )
}

function VideoProjects() {
  const videos = [
    {
      title: 'Music Video Production',
      description: 'Dynamic music video with dynamic cuts, transitions, and visual effects.',
      duration: '3:45',
      category: 'Music Video',
    },
    {
      title: 'Commercial Spot',
      description: 'High-energy commercial for a tech startup with motion graphics.',
      duration: '0:30',
      category: 'Commercial',
    },
    {
      title: 'Documentary Edit',
      description: 'Emotional documentary with seamless scene transitions and color grading.',
      duration: '12:30',
      category: 'Documentary',
    },
    {
      title: 'Brand Story',
      description: 'Brand narrative video with motion graphics and kinetic typography.',
      duration: '2:15',
      category: 'Brand',
    },
  ]

  return (
    <section id="videos" className="section projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">01.</span>
          <h2 className="section-title">Video Projects</h2>
          <div className="title-line" />
        </motion.div>

        <div className="projects-grid">
          {videos.map((video, index) => (
            <motion.article
              key={video.title}
              className="project-card featured"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="project-image">
                <div className="image-overlay" />
                <div className={`project-thumbnail gradient-${(index % 4) + 1}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="play-button">▶</div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{video.title}</h3>
                  <span className="video-duration">{video.duration}</span>
                </div>
                <p className="project-description">{video.description}</p>
                <ul className="project-tech">
                  <li>{video.category}</li>
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoSkills() {
  const skillGroups = [
    {
      icon: '🎬',
      title: 'Editing Software',
      skills: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'After Effects'],
    },
    {
      icon: '🎨',
      title: 'Motion Graphics',
      skills: ['After Effects', 'Mocha', 'Element 3D', 'Trapcode'],
    },
    {
      icon: '🛠️',
      title: 'Other Skills',
      skills: ['Color Grading', 'Sound Design', 'VFX', 'Kinetic Typography'],
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
          <span className="section-tag">02.</span>
          <h2 className="section-title">Tools & Skills</h2>
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
        </div>
      </div>
    </section>
  )
}

// Secret toggle button component
function SecretToggle({ mode, setMode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoverCount, setHoverCount] = useState(0)

  const handleClick = () => {
    setMode(mode === 'coding' ? 'video' : 'coding')
  }

  return (
    <motion.button
      className="secret-toggle"
      onClick={handleClick}
      onMouseEnter={() => setHoverCount(h => h + 1)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      onHover={() => setIsVisible(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${mode === 'coding' ? 'Video Editing' : 'Coding'} Mode`}
    >
      <span className="secret-icon">{mode === 'coding' ? '🎬' : '💻'}</span>
    </motion.button>
  )
}

// Transition Overlay Component
function TransitionOverlay({ isVisible, origin, direction }) {
  return (
    <AnimatePresence>
      {isVisible && origin && (
        <motion.div
          className={`transition-overlay ${direction === 'toVideo' ? 'to-video' : 'to-code'}`}
          initial={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
          animate={{ clipPath: `circle(200vh at ${origin.x}px ${origin.y}px)` }}
          exit={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </AnimatePresence>
  )
}

// Main App component
function App() {
  useLenis()
  const [mode, setMode] = useState('coding')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionOrigin, setTransitionOrigin] = useState(null)
  const [transitionDirection, setTransitionDirection] = useState(null)

  useEffect(() => {
    if (mode === 'video') {
      document.body.classList.add('video-mode')
    } else {
      document.body.classList.remove('video-mode')
    }
  }, [mode])

  const handleModeSwitch = (newMode) => {
    if (newMode === mode || !transitionOrigin) return
    setTransitionDirection(newMode === 'video' ? 'toVideo' : 'toCode')
    setIsTransitioning(true)
    setTimeout(() => {
      setMode(newMode)
      setIsTransitioning(false)
      setTransitionDirection(null)
    }, 250)
  }

  return (
    <>
      <TransitionOverlay isVisible={isTransitioning} origin={transitionOrigin} direction={transitionDirection} />
      <ParticleBackground />
      <Navbar mode={mode} setMode={handleModeSwitch} transitionOrigin={transitionOrigin} setTransitionOrigin={setTransitionOrigin} />
      <SidebarIndicators />
      <main>
        <AnimatePresence mode="wait">
          {mode === 'coding' ? (
            <motion.div 
              key="coding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Testimonials />
              <Blog />
              <Contact />
            </motion.div>
          ) : (
            <motion.div 
              key="video"
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <VideoEditorHero />
              <VideoProjects />
              <VideoSkills />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
