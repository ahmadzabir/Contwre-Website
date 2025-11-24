import React from 'react'
import { motion } from 'framer-motion'

function IntegrationFlow() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto container-padding relative z-10">
        
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-white delay-1 mb-8 leading-tight">
            If your stack disappeared tomorrow, would your <span className="gradient-text-emerald delay-2">system still make money?</span>
          </h2>
          
          <p className="text-xl text-body-secondary max-w-3xl mx-auto leading-relaxed mb-8">
            Real revenue systems don't collapse when the tools do. They're built on clarity, not dependency.
          </p>
        </motion.div>

        {/* Core Equation - Recoded */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
              <span className="gradient-text-blue font-semibold text-lg sm:text-xl md:text-2xl">Strong Offer</span>
              <span className="text-emerald-400 text-xl sm:text-2xl md:text-3xl font-light">+</span>
              <span className="gradient-text-purple font-semibold text-lg sm:text-xl md:text-2xl">Right People</span>
              <span className="text-emerald-400 text-xl sm:text-2xl md:text-3xl font-light">×</span>
              <span className="gradient-text-gold font-semibold text-lg sm:text-xl md:text-2xl">Reliable Systems</span>
              <span className="text-emerald-400 text-xl sm:text-2xl md:text-3xl font-light">=</span>
              <span className="gradient-text-emerald font-bold text-lg sm:text-xl md:text-2xl">Predictable Revenue</span>
            </div>
            
            <p className="text-base text-body-secondary leading-relaxed">
              When these three elements align, <span className="gradient-text-emerald font-semibold">growth isn't luck - it's math.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default IntegrationFlow