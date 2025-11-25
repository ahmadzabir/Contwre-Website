import React from 'react'
import { motion } from 'framer-motion'

function Services() {

  const services = [
    {
      title: "Cold Outbound Engine",
      subtitle: "ICP research, copywriting, multichannel sequences",
      icon: "📧",
      color: "from-blue to-blueLight"
    },
    {
      title: "Performance Marketing", 
      subtitle: "Meta, Google, TikTok, CRO, attribution",
      icon: "📊",
      color: "from-mint to-mintLight"
    },
    {
      title: "Sales Enablement",
      subtitle: "CRM setup, team training, objection handling", 
      icon: "🎯",
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: "Retention & LTV",
      subtitle: "Email, SMS, loyalty, pricing strategy",
      icon: "🔄",
      color: "from-teal-400 to-emerald-500"
    },
    {
      title: "Growth Marketing",
      subtitle: "Full-funnel optimization, scaling strategies",
      icon: "📈",
      color: "from-blueLight to-mint"
    },
    {
      title: "Inbound Marketing",
      subtitle: "SEO, content systems, lead generation",
      icon: "🎣",
      color: "from-teal-400 to-emerald-500"
    },
    {
      title: "Influencer Marketing",
      subtitle: "Partnership development, campaign management",
      icon: "🌟",
      color: "from-blue to-blueLight"
    },
    {
      title: "Personal Branding",
      subtitle: "Thought leadership, content positioning",
      icon: "👤",
      color: "from-mintLight to-mint"
    }
  ]

  return (
    <section id="services" className="section-spacing relative overflow-hidden">
      {/* Clean section without background animations */}
      
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-emerald-400 font-bold text-sm tracking-[0.12em] uppercase mb-4">
            What We Do
          </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-[-0.02em]">
                  <span className="gradient-text-purple delay-1">One-stop GTM… </span>
                  <span className="gradient-text-emerald delay-2">anything that brings revenue through the door.</span>
                </h2>
          <p className="text-xl text-body-secondary max-w-3xl mx-auto mb-8">
            Every Growth Channel, <span className="gradient-text-gold delay-3">One Agency</span>
          </p>
        </motion.div>

        {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-glass p-10 relative overflow-hidden h-full flex flex-col">
                
                {/* Icon (SVG, no emojis) */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Professional service icons */}
                  {service.icon === '📧' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M22 7L12 13L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="18" cy="8" r="2" fill="currentColor"/>
                      <path d="M17 7l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  {service.icon === '📊' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="7" y="8" width="2" height="8" rx="1" fill="currentColor"/>
                      <rect x="11" y="6" width="2" height="10" rx="1" fill="currentColor"/>
                      <rect x="15" y="4" width="2" height="12" rx="1" fill="currentColor"/>
                      <path d="M7 12h2M11 10h2M15 8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  )}
                  {service.icon === '🎯' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  {service.icon === '🔄' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 21v-5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {service.icon === '📈' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M9 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 15l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="9" r="1" fill="currentColor"/>
                      <circle cx="15" cy="15" r="1" fill="currentColor"/>
                    </svg>
                  )}
                  {service.icon === '🎣' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <path d="M3 12c0-1.657 4.03-3 9-3s9 1.343 9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="6" r="2" fill="currentColor"/>
                      <path d="M8 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  {service.icon === '🌟' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  )}
                  {service.icon === '👤' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mx-auto">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M8 6h8M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  )}
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  className="text-body-secondary text-lg leading-relaxed flex-grow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
