import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const teamPhotos = [
    { name: "Model 1", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 2", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 3", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 4", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 5", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 6", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 7", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    { name: "Model 8", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/20" style={{
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(5, 8, 15, 0.98), rgba(8, 12, 20, 0.95))`,
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      outline: 'none',
      boxShadow: 'none'
    }}>
      {/* Dark overlay for additional depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      {/* Sandpaper texture overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.05) 3px),
          repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.05) 3px)
        `,
        pointerEvents: 'none',
        opacity: 0.7,
        mixBlendMode: 'overlay',
        zIndex: 1
      }} />
      {/* Enhanced Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue to-mint to-transparent opacity-60 z-10" />
      
      <div className="section-spacing px-5 relative z-10">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Left Column - Brand, CTA, Certifications, Clients */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Brand Identity - 10% smaller */}
              <div className="flex items-center">
                <motion.img 
                  loading="lazy"
                  src="/assets/contwre-logo-white.png"
                  alt="Contwre Logo"
                  className="h-12 w-auto"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>


              {/* Team Photos */}
              <div>
                <p className="text-body-secondary text-sm mb-4 font-medium">Meet our team</p>
                <div className="relative">
                  {/* Stacked Team Photos with Live Indicator */}
                  <div className="flex items-center">
                    {teamPhotos.slice(0, 6).map((member, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        style={{ marginLeft: index > 0 ? '-12px' : '0' }}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 group cursor-pointer relative z-10 ring-2 ring-yellow-400/30 ring-offset-1 ring-offset-bg">
                          <img 
                            src={member.photo} 
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Live Indicator - positioned right after the photos */}
                    <motion.div
                      className="ml-2 w-4 h-4 bg-green-500 rounded-full border-2 border-bg flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </div>
                  
                  {/* Live Text */}
                  <motion.div
                    className="absolute -bottom-6 left-0 text-xs text-green-400 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Live now
                  </motion.div>
                </div>
              </div>

              {/* Founder Section */}
              <div className="card-glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-emerald-400/30 flex-shrink-0">
                    <img 
                      src="/assets/founder-together.jpg" 
                      alt="Ahmad & Zahra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">Founder-led by Ahmad & Zahra</h3>
                    <p className="text-body-secondary text-xs sm:text-sm">8+ years building and scaling sales systems across industries.</p>
                    <p className="text-body-secondary text-xs sm:text-sm">Fractional GTM consultant and co-founder of Contwre.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Description, Lead Gen, Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Company Description */}
              <div>
                <p className="text-sm sm:text-base md:text-lg text-body-secondary leading-relaxed mb-6 sm:mb-8">
                  Pakistan's first founder-led, full-service GTM enablement agency. 
                  We design and run end-to-end acquisition systems: outbound, performance marketing, 
                  and sales enablement - anything that gets you to money.
                </p>
              </div>

              {/* Enhanced CTA Section */}
              <div className="card-glass rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-xl mb-3 gradient-text-emerald">Ready to Scale Your Revenue?</h3>
                  <p className="text-body-secondary text-sm mb-6">Get your custom GTM audit and revenue optimization plan.</p>
                  
                  <motion.button
                    onClick={() => {
                      const heroSection = document.getElementById('top')
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 1.05 }}
                    className="btn-cta-prominent w-full mb-4"
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
                    <p className="text-emerald-300 text-sm font-medium text-center">
                      ✓ Fully custom with no meeting required
                    </p>
                    <p className="text-white/60 text-xs text-center">
                      Includes: ICP analysis, funnel audit, revenue optimization plan and more
                    </p>
                  </div>
                </div>
              </div>


            </motion.div>
          </div>
          
          {/* Bottom Copyright */}
          <motion.div 
            className="border-t border-white/10 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-body-secondary">
              © {new Date().getFullYear()} Contwre. Pakistan's first founder-led GTM enablement agency.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
