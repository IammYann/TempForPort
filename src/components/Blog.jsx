import { motion } from 'framer-motion'

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
              tabIndex={0}
              role="button"
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

export default Blog
