import { motion } from 'framer-motion'

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
                  <span className="skill-icon" aria-hidden="true">{group.icon}</span>
                  {group.title}
                </h3>
                <div className="skill-items" role="list">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      role="listitem"
                      tabIndex={0}
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

export default VideoSkills
