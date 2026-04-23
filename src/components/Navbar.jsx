import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-bracket">{isVideo ? '[' : '&lt;'}</span>
          <span className="logo-text">{isVideo ? 'ARYAN' : 'aryan'}</span>
          <span className="logo-bracket">{isVideo ? ']' : '/&gt;'}</span>
        </a>

        <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                role="menuitem"
                tabIndex={mobileOpen ? 0 : -1}
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
            aria-label={isVideo ? 'Switch to Coding Mode' : 'Switch to Video Editing Mode'}
          >
            <span className="mode-icon" aria-hidden="true">{isVideo ? '💻' : '🎬'}</span>
            <span className="mode-label">{isVideo ? 'Code' : 'Video'}</span>
          </button>

          <button
            className={`nav-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="primary-menu"
            tabIndex={0}
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

export default Navbar
