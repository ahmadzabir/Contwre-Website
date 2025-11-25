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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text-white delay-1 mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
            If your stack disappeared tomorrow, would your <span className="gradient-text-emerald delay-2">system still make money?</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-body-secondary max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
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
          <div className="card-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-4 sm:mb-6">
              <span className="gradient-text-blue font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Strong Offer</span>
              <span className="text-emerald-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">+</span>
              <span className="gradient-text-purple font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Right People</span>
              <span className="text-emerald-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">×</span>
              <span className="gradient-text-gold font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Reliable Systems</span>
              <span className="text-emerald-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">=</span>
              <span className="gradient-text-emerald font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Predictable Revenue</span>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base text-body-secondary leading-relaxed px-1">
              When these three elements align, <span className="gradient-text-emerald font-semibold">growth isn't luck - it's math.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default IntegrationFlow