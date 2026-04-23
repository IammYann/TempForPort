import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

export default CounterStat
