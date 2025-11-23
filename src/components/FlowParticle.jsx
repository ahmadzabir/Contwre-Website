import React from 'react'
import { motion } from 'framer-motion'

function FlowParticle({ delay = 0, duration = 3, pathId, color = "from-white to-emerald-400" }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${color} shadow-lg`}
      initial={{ offsetDistance: '0%', scale: 0 }}
      animate={{ 
        offsetDistance: '100%',
        scale: [0, 1, 1, 0]
      }}
      transition={{
        offsetDistance: {
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: 'linear'
        },
        scale: {
          duration: duration,
          repeat: Infinity,
          delay: delay,
          times: [0, 0.1, 0.9, 1]
        }
      }}
      style={{
        offsetPath: `path('${pathId}')`,
        offsetRotate: '0deg'
      }}
    />
  )
}

export default FlowParticle













