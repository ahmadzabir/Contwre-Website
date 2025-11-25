import React, { Suspense, lazy, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProofTrustBar from './components/ProofTrustBar'
import About from './components/About'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { storeTrackingData } from './utils/utmTracker'

// Lazy load heavy components for better performance
const IntegrationFlow = lazy(() => import('./components/IntegrationFlow'))
const GTMEngine = lazy(() => import('./components/GTMEngine'))
const Services = lazy(() => import('./components/Services'))
const Process = lazy(() => import('./components/Process'))
const Results = lazy(() => import('./components/Results'))
const Comparison = lazy(() => import('./components/Comparison'))
const FAQ = lazy(() => import('./components/FAQ'))
const FounderSection = lazy(() => import('./components/FounderSection'))

// Loading fallback component
const SectionLoader = () => (
  <div className="section-spacing">
    <div className="w-full max-w-7xl mx-auto container-padding">
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
)

function App() {
  // Initialize UTM tracking on app load
  useEffect(() => {
    storeTrackingData()
  }, [])

  return (
    <ErrorBoundary>
        <div className="App min-h-screen bg-bg text-white">
        {/* Clean modern website */}
        
        {/* Website Content */}
        <div className="relative z-20">
        <Header />
        <main>
          <Hero />
          
          <div className="section-bg-1 relative z-10 pt-12 md:pt-16 lg:pt-20">
            <ProofTrustBar />
          </div>
          
          <div className="section-bg-2 relative z-10">
            <About />
          </div>
          
          <div className="section-bg-3 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <IntegrationFlow />
            </Suspense>
          </div>
          
          <div className="section-bg-1 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <GTMEngine />
            </Suspense>
          </div>
          
          <div className="section-bg-2 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <Services />
            </Suspense>
          </div>
          
          <div className="section-bg-3 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <Process />
            </Suspense>
          </div>
          
          <div className="section-bg-1 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <Results />
            </Suspense>
          </div>
          
          <div className="section-bg-2 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <Comparison />
            </Suspense>
          </div>
          
          <div className="section-bg-3 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <FAQ />
            </Suspense>
          </div>
          
          <div className="section-bg-1 relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <FounderSection />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </div>
    </ErrorBoundary>
  )
}

export default App
