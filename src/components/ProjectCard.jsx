import { motion } from 'framer-motion'

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
        <div className="image-overlay" aria-hidden="true" />
        <div className={`project-thumbnail gradient-${project.gradient}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {project.icon}
          </svg>
        </div>
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {isFeatured && (
            <div className="project-links">
              <a href="#" className="link-icon" title="View Live" aria-label="View live project">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
              <a href="#" className="link-icon" title="View Code" aria-label="View project source code">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77c0-.34-.04-.67-.1-1M9 19v-4a4 4 0 014-4h4" />
                </svg>
              </a>
            </div>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <ul className="project-tech" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default ProjectCard
