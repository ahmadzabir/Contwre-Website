import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function QualifyingModal({ isOpen, onClose, email, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})

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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative card-glass rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="p-8 md:p-12">
            {/* Progress Indicator */}
            {currentStep < questions.length && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-body-secondary font-medium">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-sm gradient-text-emerald font-semibold">
                    {email}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 border border-white/10">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 h-2.5 rounded-full"
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
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text-white mb-10 leading-tight">
                  {questions[currentStep].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentStep].options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      className={`w-full p-5 text-left rounded-2xl border transition-all duration-300 relative overflow-hidden ${
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
                      <span className="font-semibold text-base relative z-10">{option.label}</span>
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
                className="space-y-6"
              >
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text-emerald mb-4 leading-tight">
                    Schedule Your Strategy Call
                  </h2>
                  <p className="text-body-secondary text-lg">
                    Book a time that works for you. We'll discuss your GTM challenges and how we can help.
                  </p>
                </div>

                <div className="card-glass rounded-2xl p-6 overflow-hidden border border-white/10">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/nwl0FSucuvIA6uVEz2Ix"
                    style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    id="nwl0FSucuvIA6uVEz2Ix_1764050901890"
                    className="min-h-[600px] rounded-xl"
                  />
                </div>

                <div className="flex justify-center pt-6">
                  <motion.button
                    onClick={handleComplete}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    I'll book later
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default QualifyingModal

