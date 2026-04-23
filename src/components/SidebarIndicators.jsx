import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
      role="navigation"
      aria-label="Section navigation"
    >
      {dots.map((dot) => (
        <a
          key={dot.id}
          href={`#${dot.id}`}
          className={`sidebar-dot ${activeSection === dot.id ? 'active' : ''}`}
          title={dot.label}
          aria-label={`Go to ${dot.label} section`}
          aria-current={activeSection === dot.id ? 'true' : 'false'}
        >
          <span className="sidebar-tooltip">{dot.label}</span>
        </a>
      ))}
    </motion.div>
  )
}

export default SidebarIndicators
