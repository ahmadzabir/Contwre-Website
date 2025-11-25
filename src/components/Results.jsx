import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCounterAnimation, useStaggeredAnimation } from '../hooks/useCursorEffects'

function Results() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const stats = [
    { value: 3.2, suffix: "x", label: "Average ROAS improvement", color: "from-emerald-500 to-emerald-400" },
    { value: 67, suffix: "%", label: "Faster sales cycles", color: "from-teal-500 to-teal-400" },
    { value: 14, suffix: " days", label: "Time to first qualified lead", color: "from-emerald-500 to-teal-400" },
    { value: 50, suffix: "+", label: "Brands served", color: "from-teal-400 to-emerald-400" }
  ]

  const testimonials = [
    {
      quote: "Working with Contwre completely changed how we handled outbound. They helped us build a system that actually worked instead of relying on expensive tools. Within weeks, our pipeline felt alive again and everything became organized.",
      author: "Haider Ali",
      role: "CTO, TheHexaTown",
      result: "70% reduction in outbound costs",
      businessType: "B2B Tech",
      profileImage: "/assets/profile-pictures/Haider_Ali1.jpg",
      whatWeDid: "Built a cold outbound enablement system, trained the team, and reduced outbound costs by over 70%."
    },
    {
      quote: "Contwre helped us finally get profitable with our Meta ads. The strategy, creative direction, and tracking setup made all the difference. They don't just run campaigns, they make sure every ad is moving toward the right goal.",
      author: "Zaryab Tanveer",
      role: "Founder, Celestella",
      result: "Consistent high-ROI performance",
      businessType: "DTC Brand",
      profileImage: "/assets/profile-pictures/Zaryab_Tanveer1.jpg",
      whatWeDid: "Scaled Meta ads for Celestella's e-commerce brand, achieving consistent high-ROI performance and stable repeat purchases."
    },
    {
      quote: "Contwre helped us build a real internal sales and marketing structure. We moved away from freelancers and random contractors to a proper in-house system that actually drives growth. They made sure the team was trained and confident before handing it over.",
      author: "Vladymir Girault",
      role: "Owner, Mandujour",
      result: "Full in-house GTM team",
      businessType: "Luxury Brand",
      profileImage: "/assets/profile-pictures/Vladymir1.avif",
      whatWeDid: "Developed a full in-house GTM team for Mandujour, built sales and marketing systems, and established predictable scaling processes."
    },
    {
      quote: "Contwre worked closely with us to organize our outbound and email marketing systems. They didn't just set things up, they helped our people understand how to run it. We saw results quickly and learned a lot through the process.",
      author: "Hannan Masood",
      role: "CEO, ClassicProgrammers",
      result: "Quick results & team training",
      businessType: "B2B Services",
      profileImage: "/assets/profile-pictures/Hannan_Masood1.jpg",
      whatWeDid: "Set up automated outbound and email marketing systems, trained internal team, and established lead tracking and follow-up processes."
    },
    {
      quote: "The Contwre team completely restructured how we approached SEO and content marketing. Everything became more strategic and easier to manage. The growth in visibility and performance was clear within weeks.",
      author: "Stacy Keibler",
      role: "Marketing Manager, CouponUpto",
      result: "Clear growth in visibility",
      businessType: "E-commerce",
      profileImage: "/assets/profile-pictures/Stacy_K1.webp",
      whatWeDid: "Redesigned CouponUpto's SEO and content systems, improving structure, rankings, and organic growth."
    },
    {
      quote: "Contwre helped us bring our law firm online properly. The ads, lead systems, and strategy were all aligned from day one. We started getting qualified leads consistently and built a real marketing process around them.",
      author: "Faisal Basit",
      role: "Managing Partner, FBS & Co.",
      result: "Qualified leads consistently",
      businessType: "Professional Services",
      profileImage: "/assets/profile-pictures/Faisal_Basit1.jpg",
      whatWeDid: "Built a full B2B lead generation engine for FBS & Co. through ads and automation, improving both lead quality and conversion consistency."
    }
  ]

  const { ref: headerRef, isVisible: headerVisible } = useStaggeredAnimation(0)

  // Preload all testimonial images for smooth carousel experience
  useEffect(() => {
    const preloadImages = () => {
      testimonials.forEach((testimonial) => {
        const img = new Image()
        img.src = testimonial.profileImage
        // Preload without waiting for completion to avoid blocking
      })
    }
    preloadImages()
  }, [testimonials])

  // Auto-slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="results" className="section-spacing relative overflow-hidden">
      {/* Parallax Fog Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
      
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-emerald-400 font-bold text-sm tracking-[0.12em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={headerVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Results
          </motion.p>
          
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold leading-tight tracking-[-0.02em] mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <span className="gradient-text-blue">Real results from </span>
                  <span className="gradient-text-emerald">real brands.</span>
                </motion.h2>
        </motion.div>

        {/* Stats Grid - Recoded from scratch */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const count = useCounterAnimation(stat.value, headerVisible, 2000)
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="card-glass p-8 text-center h-full flex flex-col items-center justify-start">
                  {/* Stat Value */}
                  <motion.div 
                    className="text-5xl md:text-6xl font-bold text-white mb-4 font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.label === 'Time to first qualified lead' ? (
                      <>
                        {Math.round(count)}
                        <span className="text-3xl md:text-4xl ml-1">{stat.suffix.trim()}</span>
                      </>
                    ) : (
                      <>
                        {count.toFixed(stat.suffix === '+' ? 0 : 1)}{stat.suffix}
                      </>
                    )}
                  </motion.div>
                  
                  {/* Stat Label */}
                  <div className="text-white/70 text-sm font-medium leading-tight text-center">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>


        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mt-16"
        >
          {/* Main Testimonial Display */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card-glass p-10 relative overflow-hidden"
              >
                
                <motion.blockquote 
                  className="text-white text-xl leading-relaxed mb-8 relative z-10 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  "{testimonials[currentTestimonial].quote}"
                </motion.blockquote>
                
                <div className="border-t border-white/10 pt-6 content-spacing relative z-10">
                  <div className="flex items-center justify-between content-spacing">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400/30">
                        <img 
                          src={testimonials[currentTestimonial].profileImage} 
                          alt={testimonials[currentTestimonial].author}
                          className="w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                          fetchpriority="high"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {testimonials[currentTestimonial].author}
                        </div>
                        <div className="text-body-secondary text-sm">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                    
                    {/* Business Type */}
                    <motion.div
                      className="text-right"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="text-lg font-semibold gradient-text-emerald mb-1">
                        {testimonials[currentTestimonial].businessType}
                      </div>
                      <div className="text-sm text-body-secondary">
                        Business Type
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 text-emerald-400 text-sm rounded-full border border-emerald-400/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {testimonials[currentTestimonial].result}
                    </motion.div>
                    
                    {/* What We Did Section */}
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-emerald-400 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-medium mb-1">What We Did:</p>
                          <p className="text-body-secondary text-sm leading-relaxed">
                            {testimonials[currentTestimonial].whatWeDid}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-150"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-150 ${
                    index === currentTestimonial 
                      ? 'bg-emerald-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-150"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Results