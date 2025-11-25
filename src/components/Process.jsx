import React from 'react'
import { motion } from 'framer-motion'

function Process() {

  const processSteps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Embed & Engineer",
      description: "We embed inside your business and engineer a revenue system around your ICP and offer."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Train & Enable",
      description: "We train and enable your team to run the system independently."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Align & Fix",
      description: "We align sales and marketing, fix broken systems, and hire or replace where needed."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Hand Back",
      description: "We hand back a GTM engine that compounds without us."
    }
  ]

  return (
    <section className="section-spacing">
      <div className="w-full max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6 tracking-[-0.02em] px-2">
            <span className="gradient-text-white">The Contwre Process - </span>
            <span className="gradient-text-emerald">From Dependency to Enablement</span>
          </h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-6 sm:mb-8 leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We don't rent you results, we build your GTM independence.
          </motion.p>
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-glass p-4 sm:p-6 md:p-8 text-center relative overflow-hidden h-full flex flex-col">
                {/* Icon */}
                <div className="text-emerald-400 mb-4 sm:mb-6 flex justify-center text-3xl sm:text-4xl md:text-5xl">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 gradient-text-emerald">
                    {step.title}
                  </h3>
                  <p className="text-body-secondary text-xs sm:text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card-glass rounded-3xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center gradient-text-emerald">
                Our Complete Process
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 sm:mt-1">
                      1
                    </div>
                    <p className="text-xs sm:text-sm text-body-secondary leading-relaxed">
                      <span className="font-semibold text-white">Embed & Engineer:</span> We embed inside your business and engineer a revenue system around your ICP and offer.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 sm:mt-1">
                      2
                    </div>
                    <p className="text-xs sm:text-sm text-body-secondary leading-relaxed">
                      <span className="font-semibold text-white">Train & Enable:</span> We train and enable your team to run the system independently.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 sm:mt-1">
                      3
                    </div>
                    <p className="text-xs sm:text-sm text-body-secondary leading-relaxed">
                      <span className="font-semibold text-white">Align & Fix:</span> We align sales and marketing, fix broken systems, and hire or replace where needed.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 sm:mt-1">
                      4
                    </div>
                    <p className="text-xs sm:text-sm text-body-secondary leading-relaxed">
                      <span className="font-semibold text-white">Hand Back:</span> We hand back a GTM engine that compounds without us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => {
              const heroSection = document.getElementById('top')
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="btn-primary-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}

export default Process