import React, { memo } from 'react'
import { motion } from 'framer-motion'

function ProofTrustBar() {
  const clients = [
    { name: "6 Pack Macros", logo: "/assets/client-logos/6_Pack_Macros.png" },
    { name: "Classic Programmers", logo: "/assets/client-logos/Classic_Programmers.png" },
    { name: "Coupon Upto", logo: "/assets/client-logos/Coupon_Upto.png" },
    { name: "Daud Abbas", logo: "/assets/client-logos/Daud_Abbas.png" },
    { name: "EvoNews", logo: "/assets/client-logos/EvoNews.png" },
    { name: "Fit Fetish", logo: "/assets/client-logos/Fit_Fetish.png" },
    { name: "Genius", logo: "/assets/client-logos/Genius.png" },
    { name: "Mandujour", logo: "/assets/client-logos/Mandujour.png" },
    { name: "Stuart Andrews", logo: "/assets/client-logos/Stuart_Andrews.png" },
    { name: "TheHexaTown", logo: "/assets/client-logos/TheHexaTown.png" },
    { name: "Vigor Wolf", logo: "/assets/client-logos/Vigor_Wolf.png" }
  ]

  return (
    <section className="relative overflow-hidden w-full py-8 md:py-12" style={{
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(5, 8, 15, 0.98), rgba(8, 12, 20, 0.95))`,
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      outline: 'none',
      boxShadow: 'none'
    }}>
      {/* Dark overlay for additional darkness */}
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
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10 mb-6 md:mb-8" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider uppercase gradient-text-white px-2" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', fontWeight: 300 }}>
            Trusted by founders who scale
          </h2>
        </div>
      </div>

      {/* Truly Infinite Scrolling Logo Carousel */}
      <div className="relative w-full overflow-hidden py-4 md:py-6 carousel-container pointer-events-none select-none" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="carousel-track"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div
              key={`logo-1-${index}`}
              className="carousel-item flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="object-contain brightness-100 contrast-100 filter max-w-full max-h-full opacity-80"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`logo-2-${index}`}
              className="carousel-item flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="object-contain brightness-100 contrast-100 filter max-w-full max-h-full opacity-80"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
          {/* Third set of logos for extra smoothness */}
          {clients.map((client, index) => (
            <div
              key={`logo-3-${index}`}
              className="carousel-item flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="object-contain brightness-100 contrast-100 filter max-w-full max-h-full opacity-80"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Seamless Infinite Scroll CSS */}
      <style jsx>{`
        .carousel-container {
          mask: linear-gradient(to right, 
            transparent 0%, 
            black 20%, 
            black 80%, 
            transparent 100%
          );
          -webkit-mask: linear-gradient(to right, 
            transparent 0%, 
            black 20%, 
            black 80%, 
            transparent 100%
          );
        }
        
        .carousel-track {
          display: flex;
          width: 300%;
          animation: infiniteScroll 20s linear infinite;
          gap: 4rem;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          animation-delay: 0s;
          animation-fill-mode: both;
        }
        
        .carousel-item {
          flex: 0 0 auto;
          width: 12rem;
          height: 3.5rem;
        }
        
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        /* Much slower animation on mobile devices - higher specificity */
        @media (max-width: 768px) {
          .carousel-container .carousel-track {
            animation: infiniteScroll 67s linear infinite !important;
            gap: 2.5rem;
          }
          
          .carousel-container .carousel-item {
            width: 10rem;
            height: 3rem;
          }
        }
        
        /* Even slower on very small screens */
        @media (max-width: 640px) {
          .carousel-container .carousel-track {
            animation: infiniteScroll 84s linear infinite !important;
            gap: 2rem;
          }
          
          .carousel-container .carousel-item {
            width: 9rem;
            height: 2.5rem;
          }
        }
        
        /* Pause animation on hover for better UX */
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default memo(ProofTrustBar)
