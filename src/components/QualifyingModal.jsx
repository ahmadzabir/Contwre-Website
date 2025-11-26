import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getStoredTrackingData } from '../utils/utmTracker'

function QualifyingModal({ isOpen, onClose, email, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const scrollPositionRef = useRef(0)
  const modalOpenTimeRef = useRef(null)
  const hasTrackedDropoffRef = useRef(false)

  // Track modal open time
  useEffect(() => {
    if (isOpen) {
      modalOpenTimeRef.current = Date.now()
      hasTrackedDropoffRef.current = false
    }
  }, [isOpen])

  // Function to send drop-off tracking data
  const sendDropoffTracking = async (dropoffStage, booked = false) => {
    if (hasTrackedDropoffRef.current) return // Prevent duplicate tracking
    hasTrackedDropoffRef.current = true

    const currentTrackingData = getStoredTrackingData()
    const timeSpent = modalOpenTimeRef.current ? Math.round((Date.now() - modalOpenTimeRef.current) / 1000) : 0
    const questionsCompleted = Object.keys(answers).length
    const allQuestionsAnswered = questionsCompleted === questions.length

    // Determine completion status and drop-off stage
    let completionStatus = 'dropped_off'
    let dropOffStage = dropoffStage

    if (booked) {
      completionStatus = 'completed'
      dropOffStage = 'completed_booking'
    } else if (allQuestionsAnswered && currentStep >= questions.length) {
      dropOffStage = 'viewed_booking'
    } else if (questionsCompleted > 0) {
      dropOffStage = `question_${questionsCompleted + 1}`
    } else if (email) {
      dropOffStage = 'question_1'
    } else {
      dropOffStage = 'email_only'
    }

    const payload = {
      // Easy notification tags
      email_submitted: !!email,
      questions_completed: questionsCompleted,
      total_questions: questions.length,
      booked: booked,
      completion_status: completionStatus,
      drop_off_stage: dropOffStage,
      
      // Detailed data
      email: email || null,
      answers: answers,
      current_step: currentStep,
      time_spent_seconds: timeSpent,
      
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
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      event_type: booked ? 'booking_completed' : 'drop_off'
    }

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/rJH23wA36ehJ4HrNaTkV/webhook-trigger/acfc248f-f26e-4b8a-a046-619abc300d31', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      console.log('Drop-off tracking sent:', dropOffStage)
    } catch (error) {
      console.error('Error sending drop-off tracking:', error)
    }
  }

  // Prevent body scroll when modal is open and lock scroll position
  useEffect(() => {
    if (isOpen) {
      // Capture current scroll position BEFORE locking
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      
      // Lock body scroll and prevent scrolling - this keeps viewport at current position
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      
      // Also prevent scrolling on html element
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.position = 'fixed'
      document.documentElement.style.top = `-${scrollPositionRef.current}px`
      document.documentElement.style.left = '0'
      document.documentElement.style.right = '0'
      document.documentElement.style.width = '100%'
    } else {
      // Restore scroll position and unlock
      const scrollY = scrollPositionRef.current
      
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      
      document.documentElement.style.overflow = ''
      document.documentElement.style.position = ''
      document.documentElement.style.top = ''
      document.documentElement.style.left = ''
      document.documentElement.style.right = ''
      document.documentElement.style.width = ''
      
      // Restore scroll position after a brief delay to ensure styles are cleared
      setTimeout(() => {
        window.scrollTo(0, scrollY)
      }, 0)
    }
    return () => {
      // Cleanup: ensure scroll is restored
      const scrollY = scrollPositionRef.current
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.position = ''
      document.documentElement.style.top = ''
      document.documentElement.style.left = ''
      document.documentElement.style.right = ''
      document.documentElement.style.width = ''
      if (scrollY) {
        setTimeout(() => {
          window.scrollTo(0, scrollY)
        }, 0)
      }
    }
  }, [isOpen])

  const questions = [
    {
      id: 'revenue_stage',
      question: "What's your current revenue stage?",
      options: [
        { value: 'pre-revenue', label: 'Pre-revenue / Just starting' },
        { value: '0-100k', label: '$0 - $100K ARR' },
        { value: '100k-1m', label: '$100K - $1M ARR' },
        { value: '1m-5m', label: '$1M - $5M ARR' },
        { value: '5m+', label: '$5M+ ARR' }
      ]
    },
    {
      id: 'biggest_challenge',
      question: "What's your biggest GTM challenge right now?",
      options: [
        { value: 'lead_generation', label: 'Lead generation & pipeline' },
        { value: 'sales_process', label: 'Sales process & conversion' },
        { value: 'marketing_attribution', label: 'Marketing attribution & ROI' },
        { value: 'team_scaling', label: 'Team scaling & enablement' },
        { value: 'full_gtm', label: 'Need full GTM system' }
      ]
    },
    {
      id: 'primary_channel',
      question: "Which channel are you most interested in?",
      options: [
        { value: 'outbound', label: 'Cold Outbound Engine' },
        { value: 'performance_marketing', label: 'Performance Marketing (Meta, Google, TikTok)' },
        { value: 'sales_enablement', label: 'Sales Enablement & CRM' },
        { value: 'full_service', label: 'Full-service GTM (All channels)' }
      ]
    },
    {
      id: 'timeline',
      question: "What's your timeline to get started?",
      options: [
        { value: 'immediate', label: 'Immediate (This month)' },
        { value: '1-3_months', label: '1-3 months' },
        { value: '3-6_months', label: '3-6 months' },
        { value: 'exploring', label: 'Just exploring options' }
      ]
    }
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // All questions answered, show booking
        setCurrentStep(questions.length)
      }
    }, 300)
  }

  const handleComplete = async () => {
    // Track booking completion
    await sendDropoffTracking('completed_booking', true)
    
    // Submit all data including answers
    onSubmit(answers)
    onClose()
  }

  // Track drop-off when modal closes
  const handleClose = () => {
    // Only track if we haven't already tracked a completion
    if (!hasTrackedDropoffRef.current) {
      // Determine drop-off stage
      let dropoffStage = 'email_only'
      if (currentStep >= questions.length) {
        dropoffStage = 'viewed_booking'
      } else if (Object.keys(answers).length > 0) {
        dropoffStage = `question_${Object.keys(answers).length + 1}`
      } else if (email) {
        dropoffStage = 'question_1'
      }
      
      // Send drop-off tracking (async, don't wait)
      sendDropoffTracking(dropoffStage, false)
    }
    
    // Close modal
    onClose()
  }


  if (!isOpen) return null

  const modalElement = (
    <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          pointerEvents: 'auto',
          overflow: 'hidden', // Changed from 'auto' to 'hidden' to prevent scrolling
          margin: 0,
          padding: '1rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            width: '100vw',
            height: '100vh',
            zIndex: 99998,
            margin: 0,
            padding: 0
          }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`relative card-glass rounded-3xl shadow-2xl border border-white/10 flex flex-col ${
            currentStep >= questions.length 
              ? 'w-[60vw] h-[100vh]' 
              : 'max-w-3xl w-full max-h-[90vh]'
          }`}
          style={{ 
            position: 'relative',
            zIndex: 99999,
            margin: '0 auto', // Center horizontally
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
            maxHeight: currentStep >= questions.length ? 'calc(100vh - 2rem)' : '90vh',
            height: currentStep >= questions.length ? 'calc(100vh - 2rem)' : 'auto',
            width: currentStep >= questions.length ? '60vw' : 'calc(100% - 2rem)',
            maxWidth: currentStep >= questions.length ? 'none' : '48rem',
            // Ensure modal is always visible in viewport
            transform: 'none', // Override any transforms that might move it
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 sm:top-2 sm:right-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 shadow-lg min-w-[44px] min-h-[44px]"
            style={{ 
              position: 'absolute',
              top: '4px',
              right: '4px'
            }}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={`flex-1 flex flex-col overflow-hidden relative ${
            currentStep >= questions.length 
              ? 'p-1 sm:p-2 pt-8 sm:pt-10' 
              : 'p-6 md:p-8 lg:p-10 pt-12 sm:pt-14'
          }`} style={{ minHeight: 0, flex: '1 1 0%' }}>
            {/* Progress Indicator */}
            {currentStep < questions.length && (
              <div className="mb-6 flex-shrink-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs md:text-sm text-body-secondary font-medium">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-xs md:text-sm gradient-text-emerald font-semibold truncate max-w-[200px]">
                    {email}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 border border-white/10">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Questions */}
            {currentStep < questions.length && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col overflow-hidden min-h-0 items-center"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold gradient-text-white mb-6 leading-tight flex-shrink-0 text-center w-full">
                  {questions[currentStep].question}
                </h2>

                <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 pr-2 w-full max-w-2xl mx-auto">
                         {questions[currentStep].options.map((option) => (
                           <motion.button
                             key={option.value}
                             onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                             className={`w-full p-4 md:p-5 text-left rounded-xl border transition-all duration-300 relative overflow-hidden flex-shrink-0 min-h-[56px] md:min-h-[64px] ${
                               answers[questions[currentStep].id] === option.value
                                 ? 'border-emerald-400/50 bg-emerald-400/10 text-white card-glass'
                                 : 'border-white/10 bg-white/5 text-body-secondary hover:border-emerald-400/30 hover:bg-white/10 card-glass'
                             }`}
                             whileHover={{ scale: 1.01, y: -2 }}
                             whileTap={{ scale: 0.99 }}
                             aria-label={option.label}
                           >
                      {answers[questions[currentStep].id] === option.value && (
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/5 to-teal-400/5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                      <span className="font-semibold text-sm md:text-base relative z-10 block break-words">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Booking Embed - Completely Recoded */}
            {currentStep >= questions.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col w-full h-full"
                style={{ 
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Header */}
                <div className="text-center mb-2 flex-shrink-0">
                  <h2 className="text-sm sm:text-base font-bold gradient-text-emerald leading-tight">
                    Schedule Your Strategy Call
                  </h2>
                </div>

                {/* Iframe Container - Scaled Down 30% */}
                <div 
                  className="flex-1 w-full rounded-xl overflow-hidden border border-white/10 bg-white/5" 
                  style={{ 
                    flex: '1 1 0%',
                    minHeight: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto'
                  }}
                >
                  {/* Wrapper to scale iframe down by 30% */}
                  <div
                    style={{
                      transform: 'scale(0.7)',
                      transformOrigin: 'top center',
                      width: '142.86%', // 100% / 0.7 to maintain full width when scaled
                      height: '142.86%', // 100% / 0.7 to maintain full height when scaled
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      marginLeft: '-71.43%', // Center the scaled content
                      display: 'flex',
                      alignItems: 'stretch'
                    }}
                  >
                    <iframe
                      src="https://api.leadconnectorhq.com/widget/booking/nwl0FSucuvIA6uVEz2Ix"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block',
                        minHeight: 0
                      }}
                      scrolling="yes"
                      allow="fullscreen"
                      id="nwl0FSucuvIA6uVEz2Ix_1764050901890"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-center pt-2 flex-shrink-0">
                  <motion.button
                    onClick={handleComplete}
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 text-sm min-h-[48px] min-w-[200px]"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Email me the booking link"
                  >
                    Email me the link
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
  )

  // Use portal to render at body level
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalElement, document.body)
  }
  
  // Fallback if document.body is not available
  return modalElement
}

export default QualifyingModal

