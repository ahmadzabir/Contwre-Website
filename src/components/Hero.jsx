import React, { useCallback, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroStars from './HeroStars'
import { storeTrackingData, getStoredTrackingData } from '../utils/utmTracker'
import QualifyingModal from './QualifyingModal'

function Hero() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const [trackingData, setTrackingData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Initialize tracking on component mount
  useEffect(() => {
    const data = storeTrackingData()
    setTrackingData(data)
  }, [])

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleQualifyingSubmit = async (answers) => {
    // Get the most up-to-date tracking data
    const currentTrackingData = getStoredTrackingData()

    const payload = {
      email: email,
      timestamp: new Date().toISOString(),
      source: 'hero-section',
      // Qualifying answers
      revenue_stage: answers.revenue_stage || null,
      biggest_challenge: answers.biggest_challenge || null,
      primary_channel: answers.primary_channel || null,
      timeline: answers.timeline || null,
      // UTM Parameters
      utm_source: currentTrackingData.utm_source || null,
      utm_medium: currentTrackingData.utm_medium || null,
      utm_campaign: currentTrackingData.utm_campaign || null,
      utm_term: currentTrackingData.utm_term || null,
      utm_content: currentTrackingData.utm_content || null,
      // Additional source tracking
      source_param: currentTrackingData.source || null,
      // Referrer information
      referrer: currentTrackingData.referrer || 'direct',
      landing_page: currentTrackingData.landingPage || window.location.href,
      // Device and session info
      user_agent: currentTrackingData.userAgent || navigator.userAgent,
      screen_width: currentTrackingData.screenWidth || window.screen.width,
      screen_height: currentTrackingData.screenHeight || window.screen.height,
      language: currentTrackingData.language || navigator.language,
      timezone: currentTrackingData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      first_visit: currentTrackingData.firstVisit || false,
      // Page context
      page_url: window.location.href,
      page_path: window.location.pathname
    }

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/rJH23wA36ehJ4HrNaTkV/webhook-trigger/acfc248f-f26e-4b8a-a046-619abc300d31', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      // Clear email after successful submission
      setEmail('')
    } catch (error) {
      console.error('Error submitting qualifying data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Get the most up-to-date tracking data
    const currentTrackingData = getStoredTrackingData()

    try {
      const payload = {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'hero-section',
        // UTM Parameters
        utm_source: currentTrackingData.utm_source || null,
        utm_medium: currentTrackingData.utm_medium || null,
        utm_campaign: currentTrackingData.utm_campaign || null,
        utm_term: currentTrackingData.utm_term || null,
        utm_content: currentTrackingData.utm_content || null,
        // Additional source tracking
        source_param: currentTrackingData.source || null,
        // Referrer information
        referrer: currentTrackingData.referrer || 'direct',
        landing_page: currentTrackingData.landingPage || window.location.href,
        // Device and session info
        user_agent: currentTrackingData.userAgent || navigator.userAgent,
        screen_width: currentTrackingData.screenWidth || window.screen.width,
        screen_height: currentTrackingData.screenHeight || window.screen.height,
        language: currentTrackingData.language || navigator.language,
        timezone: currentTrackingData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        first_visit: currentTrackingData.firstVisit || false,
        // Page context
        page_url: window.location.href,
        page_path: window.location.pathname
      }

      const response = await fetch('https://services.leadconnectorhq.com/hooks/rJH23wA36ehJ4HrNaTkV/webhook-trigger/acfc248f-f26e-4b8a-a046-619abc300d31', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Open qualifying modal instead of just showing success
        setShowModal(true)
        // Don't clear email yet, keep it for the modal
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(null), 3000)
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="top" className="hero-bg relative overflow-hidden h-screen flex items-center justify-center">
      {/* Hero Stars with scroll animation */}
      <HeroStars />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto container-padding py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
                {/* Main Headline - 10% smaller */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] tracking-[-0.02em] mb-6 md:mb-8"
                >
                  <span className="gradient-text-blue delay-1">The only GTM agency that cares about one thing…</span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                      <span className="gradient-text-emerald delay-2">
                      getting you to money.
                    </span>
                  </motion.span>
                </motion.h1>

          {/* Subheadline - 10% smaller */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-body-secondary max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed"
          >
            We design and run end-to-end acquisition systems: outbound, performance marketing, and sales enablement.
          </motion.p>

          {/* Main CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email here and..."
                  className="flex-1 px-6 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none text-lg rounded-xl border-0"
                  required
                  disabled={isSubmitting}
                />
                <motion.button
                  type="submit"
                  className="btn-primary-lg"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Press Send'}
                </motion.button>
              </form>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm mt-2 text-center"
                >
                  ✓ Email submitted successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 text-center"
                >
                  ✗ Something went wrong. Please try again.
                </motion.p>
              )}
            </div>
            
            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="gradient-text-white delay-3 text-lg leading-relaxed text-center mt-4 mb-0"
            >
              A fully custom strategy for revenue boost, built for your business, no meeting required.
            </motion.p>
          </motion.div>

        </motion.div>
      </div>

      {/* Qualifying Modal */}
      <QualifyingModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEmail('') // Clear email when modal closes
        }}
        email={email}
        onSubmit={handleQualifyingSubmit}
      />
    </section>
  )
}

export default Hero