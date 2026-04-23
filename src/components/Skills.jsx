import { motion } from 'framer-motion'

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

export default Skills
