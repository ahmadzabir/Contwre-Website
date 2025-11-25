import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function QualifyingModal({ isOpen, onClose, email, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const scrollPositionRef = useRef(0)

  // Prevent body scroll when modal is open and lock scroll position
  useEffect(() => {
    if (isOpen) {
      // Capture current scroll position
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop
      
      // Lock body scroll and prevent scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
      
      // Also prevent scrolling on html element
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Restore scroll position and unlock
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current)
    }
    return () => {
      // Cleanup: ensure scroll is restored
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current)
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

  const handleComplete = () => {
    // Submit all data including answers
    onSubmit(answers)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          zIndex: 99999
        }}
        onScroll={(e) => e.preventDefault()}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 99998,
            overscrollBehavior: 'contain'
          }}
          onScroll={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative card-glass rounded-3xl shadow-2xl border border-white/10 flex flex-col ${
            currentStep >= questions.length 
              ? 'max-w-5xl w-[95vw] h-[95vh] max-h-[95vh]' 
              : 'max-w-3xl w-full max-h-[90vh] h-[90vh]'
          }`}
          style={{ 
            overflow: 'visible',
            position: 'relative',
            zIndex: 99999,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 sm:top-2 sm:right-2 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 shadow-lg"
            style={{ 
              position: 'absolute',
              top: '-8px',
              right: '-8px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={`flex-1 flex flex-col overflow-hidden relative ${
            currentStep >= questions.length 
              ? 'p-3 md:p-4' 
              : 'p-6 md:p-8 lg:p-10'
          }`}>
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
                className="flex-1 flex flex-col overflow-hidden min-h-0"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold gradient-text-white mb-6 leading-tight flex-shrink-0">
                  {questions[currentStep].question}
                </h2>

                <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 pr-2">
                  {questions[currentStep].options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      className={`w-full p-3 md:p-4 text-left rounded-xl border transition-all duration-300 relative overflow-hidden flex-shrink-0 ${
                        answers[questions[currentStep].id] === option.value
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-white card-glass'
                          : 'border-white/10 bg-white/5 text-body-secondary hover:border-emerald-400/30 hover:bg-white/10 card-glass'
                      }`}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
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

            {/* Booking Embed */}
            {currentStep >= questions.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col overflow-hidden min-h-0 h-full"
              >
                <div className="text-center mb-2 sm:mb-3 flex-shrink-0">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold gradient-text-emerald mb-1 sm:mb-2 leading-tight">
                    Schedule Your Strategy Call
                  </h2>
                  <p className="text-body-secondary text-xs sm:text-sm md:text-base hidden sm:block">
                    Book a time that works for you. We'll discuss your GTM challenges and how we can help.
                  </p>
                </div>

                <div className="flex-1 min-h-0 w-full rounded-xl overflow-hidden border border-white/10 flex flex-col" style={{ minHeight: 0 }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/nwl0FSucuvIA6uVEz2Ix"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      minHeight: '600px',
                      border: 'none', 
                      overflow: 'auto',
                      display: 'block',
                      flex: 1
                    }}
                    scrolling="yes"
                    id="nwl0FSucuvIA6uVEz2Ix_1764050901890"
                    className="rounded-xl"
                  />
                </div>

                <div className="flex justify-center pt-2 sm:pt-3 flex-shrink-0">
                  <motion.button
                    onClick={handleComplete}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 text-xs sm:text-sm md:text-base"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Email me the link
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  )
}

export default QualifyingModal

