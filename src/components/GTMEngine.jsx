import React from 'react'
import { motion } from 'framer-motion'

function GTMEngine() {

  return (
    <section id="engine" className="section-spacing relative overflow-hidden isolate">
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-8 tracking-[-0.02em] px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text-white">Every business has a different route to revenue.</span>
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-body-secondary max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            We specialise in enabling your team in finding it.
          </motion.p>

          <motion.div 
            className="text-sm sm:text-base md:text-lg text-body-secondary max-w-4xl mx-auto leading-relaxed space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p>
              <span className="gradient-text-emerald font-semibold">For SaaS:</span> full-funnel outbound, inbound, and PLG loops.
            </p>
            <p>
              <span className="gradient-text-emerald font-semibold">For eCommerce:</span> paid growth + retention flywheel.
            </p>
            <p>
              <span className="gradient-text-emerald font-semibold">For services:</span> inbound demand and outbound precision.
            </p>
          </motion.div>

        </motion.div>

              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="relative w-full max-w-4xl mx-auto">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    onLoadedData={() => console.log('Video loaded successfully')}
                    onError={(e) => console.error('Video error:', e)}
                  >
                    <source src="/assets/Money.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-xl font-semibold text-white max-w-4xl mx-auto">
                  <span className="gradient-text-emerald">Tools don't make systems. Systems make revenue.</span>
                </p>
              </motion.div>

      </div>
    </section>
  )
}

export default GTMEngine