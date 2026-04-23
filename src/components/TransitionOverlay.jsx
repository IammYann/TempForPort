import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

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
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}

export default TransitionOverlay
