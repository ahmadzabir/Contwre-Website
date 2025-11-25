import React from 'react'
import { motion } from 'framer-motion'

function Comparison() {
  const features = [
    {
      feature: "Full GTM System Design (Offer → Retention)",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: false
    },
    {
      feature: "Founder-Led Strategy & Execution",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: false
    },
    {
      feature: "Outbound + Ads + Inbound, All in One System",
      contwre: true,
      salesAgencies: "partial",
      marketingAgencies: "partial"
    },
    {
      feature: "Sales Enablement + Marketing Alignment",
      contwre: true,
      salesAgencies: "partial",
      marketingAgencies: false
    },
    {
      feature: "Clay + Smartlead-Powered Personalization",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: false
    },
    {
      feature: "Paid Growth (Meta, Google, TikTok, LinkedIn)",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: true
    },
    {
      feature: "Creative, Copy, and Funnel Ownership",
      contwre: true,
      salesAgencies: "partial",
      marketingAgencies: true
    },
    {
      feature: "Real-Time Experimentation Loops",
      contwre: true,
      salesAgencies: "partial",
      marketingAgencies: "partial"
    },
    {
      feature: "Performance Analytics + Attribution Setup",
      contwre: true,
      salesAgencies: "partial",
      marketingAgencies: true
    },
    {
      feature: "In-House Team Enablement & Training",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: false
    },
    {
      feature: "Long-Term Compounding Systems (Not Campaigns)",
      contwre: true,
      salesAgencies: false,
      marketingAgencies: false
    }
  ]

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Clean section without background animations */}
      
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text-white mb-4 sm:mb-6 px-2">
            How Contwre Works Differently
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-body-secondary max-w-4xl mx-auto leading-relaxed px-2">
            Most agencies pick a side.<br className="hidden sm:block" />
            Sales agencies chase meetings. Marketing agencies chase clicks.<br className="hidden sm:block" />
            Contwre builds the entire revenue engine that connects both.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-transparent p-2 sm:p-4 col-span-2 sm:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white/80 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">Features</h3>
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"></div>
              </motion.div>
            </div>
            <motion.div 
              className="card-glass p-3 sm:p-4 md:p-6 text-center relative overflow-hidden flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <img 
                  loading="lazy"
                  src="/assets/contwre-logo-white.png" 
                  alt="Contwre Logo" 
                  className="h-8 sm:h-10 md:h-12 w-auto mx-auto"
                />
              </div>
            </motion.div>
            <motion.div 
              className="card-glass p-3 sm:p-4 md:p-5 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
                  <svg width="10" height="10" className="sm:w-3.5 sm:h-3.5 text-white/70" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 font-semibold">Sales Agencies</p>
              </div>
            </motion.div>
            <motion.div 
              className="card-glass p-3 sm:p-4 md:p-5 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
                  <svg width="10" height="10" className="sm:w-3.5 sm:h-3.5 text-white/70" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 16l4-4 3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 font-semibold">Marketing Agencies</p>
              </div>
            </motion.div>
          </div>

          {/* Feature Rows */}
          <div className="space-y-2">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 group"
              >
                {/* Feature Name */}
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <p className="text-white font-medium text-[10px] sm:text-xs leading-relaxed">
                      {item.feature}
                    </p>
                  </div>
                </motion.div>

                {/* Contwre */}
                <motion.div 
                  className={`card-glass p-2 sm:p-3 flex items-center justify-center relative overflow-hidden ${
                    item.contwre 
                      ? 'bg-gradient-to-br from-blue/10 to-mint/10' 
                      : 'bg-white/5'
                  }`}
                >
                  {item.contwre ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-[10px] sm:text-xs">✓</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-red-400 font-bold text-xs">✗</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Sales Agencies */}
                <motion.div 
                  className={`card-glass p-3 flex items-center justify-center relative overflow-hidden ${
                    item.salesAgencies === true 
                      ? 'bg-blue/10' 
                      : 'bg-white/5'
                  }`}
                >
                  {item.salesAgencies === true ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue/40 rounded-full flex items-center justify-center">
                        <span className="text-blue-200 font-bold text-xs">✓</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-red-400 font-bold text-xs">✗</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Marketing Agencies */}
                <motion.div 
                  className={`card-glass p-3 flex items-center justify-center relative overflow-hidden ${
                    item.marketingAgencies === true 
                      ? 'bg-green/10' 
                      : 'bg-white/5'
                  }`}
                >
                  {item.marketingAgencies === true ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-500/40 rounded-full flex items-center justify-center">
                        <span className="text-green-200 font-bold text-xs">✓</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-red-400 font-bold text-xs">✗</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          {/* Enhanced CTA Container */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/15 to-emerald-300/10 backdrop-blur-sm rounded-3xl p-8 border border-emerald-400/30 shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-300/5 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
            
            {/* CTA Content */}
            <div className="relative z-10">
              <h3 className="text-white font-bold text-xl mb-2 gradient-text-emerald">
                Ready to Scale Your Revenue?
              </h3>
              <p className="text-body-secondary text-sm mb-6 max-w-md mx-auto">
                Get your custom GTM audit and revenue optimization plan
              </p>
              
              <motion.button
                onClick={() => {
                  const heroSection = document.getElementById('top')
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 1.05 }}
                className="btn-cta-prominent mx-auto mb-4"
              >
                <span className="text-xl font-bold">Claim Your Free GTM Audit</span>
                <motion.span 
                  className="text-2xl ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              
              <div className="space-y-1">
                <p className="text-emerald-300 text-sm font-medium">
                  ✓ Fully custom with no meeting required
                </p>
                <p className="text-white/70 text-xs">
                  Includes: ICP analysis, funnel audit, revenue optimization plan and more
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Comparison
