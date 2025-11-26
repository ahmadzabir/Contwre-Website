import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0) // Default open first FAQ
  const [time, setTime] = useState(0)
  const animationRef = useRef()

  useEffect(() => {
    const animate = (currentTime) => {
      setTime(currentTime / 1000)
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const faqs = [
    {
      question: "How is Contwre different from other agencies?",
      answer: "We're founder-led operators who build systems, not just campaigns. While others sell you campaigns or audits, we connect your entire revenue system - offer, channels, and sales process - into one compounding machine. We don't just execute; we engineer your GTM system for sustainable growth."
    },
    {
      question: "What's your typical engagement model?",
      answer: "We work in 90-day cycles with clear phases: Diagnose (weeks 1-2), Design (weeks 3-4), Deploy (weeks 5-8), and Drive (weeks 9-12). You can engage us for specific pillars (outbound, paid, sales enablement) or let us run the entire engine. We integrate directly into your team or act as your GTM function."
    },
    {
      question: "Do you work with early-stage startups?",
      answer: "Yes, but selectively. We work with companies that have product-market fit and are ready to scale systematically. If you're still figuring out your core offer or ICP, we'll refer you to our network of early-stage specialists. We're built for companies ready to compound their growth."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We specialize in E-commerce and SaaS companies with recurring revenue models. Our systems work best for businesses with clear ICPs, measurable LTV, and scalable acquisition channels. We've worked across B2B SaaS, DTC e-commerce, and marketplace businesses."
    },
    {
      question: "How do you measure success?",
      answer: "We optimize for revenue metrics that matter: pipeline created (not impressions), acquisition cost vs LTV ratios, payback periods, and sales velocity. Every system we build has clear KPIs and weekly reviews. Success means your revenue system compounds without constant intervention."
    }
  ]

  return (
    <section id="faq" className="section-spacing relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Question Mark Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`question-${i}`}
            className="absolute text-emerald-400/20 text-6xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8 + i * 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          >
            ?
          </motion.div>
        ))}
        
        {/* Subtle Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="w-full max-w-5xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-emerald-400 font-bold text-sm tracking-[0.12em] uppercase mb-4">
            Common Questions, Honest Answers
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-[-0.02em]">
            <span className="gradient-text-emerald">FAQ</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                className={`card-glass p-6 sm:p-8 cursor-pointer transition-all duration-500 group-hover:shadow-glass-lg relative overflow-hidden w-full text-left min-h-[64px] sm:min-h-[72px] ${
                  openIndex === index ? 'bg-gradient-to-r from-mint/10 to-blue/10 border-mint/30' : ''
                }`}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {/* Mint Glow Highlight */}
                {openIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mint/20 to-blue/20 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <motion.h3 
                      id={`faq-question-${index}`}
                      className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                        openIndex === index ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'
                      }`}
                    >
                      {faq.question}
                    </motion.h3>
                    
                    <motion.div
                      className={`text-2xl transition-all duration-300 ${
                        openIndex === index ? 'text-emerald-400 rotate-45' : 'text-slateLight group-hover:text-emerald-400'
                      }`}
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                    >
                      +
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                      >
                        <motion.p 
                          className="text-body-secondary text-base sm:text-lg leading-relaxed mt-4 sm:mt-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ