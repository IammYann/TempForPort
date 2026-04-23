import { motion } from 'framer-motion'

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
                <div className="image-overlay" aria-hidden="true" />
                <div className={`project-thumbnail gradient-${(index % 4) + 1}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="play-button" aria-hidden="true">▶</div>
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

export default VideoProjects
