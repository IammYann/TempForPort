import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

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

export default Projects
