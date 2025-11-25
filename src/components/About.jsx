import React from 'react'
import { motion } from 'framer-motion'
import { useStaggeredAnimation } from '../hooks/useCursorEffects'

function About() {
  const { ref: leftRef, isVisible: leftVisible } = useStaggeredAnimation(0)
  const { ref: rightRef, isVisible: rightVisible } = useStaggeredAnimation(200)

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Clean section without background animations */}
      
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Problem & Solution */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={leftVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <span className="gradient-text-white">Most growth systems </span>
                <span className="gradient-text-emerald">
                  fall apart in four months.
                </span>
              </motion.h2>
            </div>

            <motion.div 
              className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-slateLight leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={leftVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p>
                Campaigns succeed, then stall. Slides fill with vanity metrics. Sales reps panic.
              </p>
              <p>
                You don't need more clicks, leads, campaigns, or emails sent.
              </p>
              <p>
                You need one system that aligns your offer, channels, and sales motion to compound.
              </p>
              <p className="gradient-text-white font-semibold">
                Contwre connects everything that drives revenue under one engine. Your engine.
              </p>
            </motion.div>

          </motion.div>

          {/* Right Column - Engine Gif */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 50 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Engine Gif */}
            <div className="relative overflow-hidden">
              <img 
                src="/assets/engine-gif.gif"
                alt="Contwre Engine System"
                className="w-full aspect-square object-contain rounded-xl"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About