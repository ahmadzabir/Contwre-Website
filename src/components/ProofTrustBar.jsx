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
    <section className="relative overflow-hidden w-full py-6 md:py-8">
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10 mb-3">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold gradient-text-white">
            Trusted by founders who scale
          </h2>
        </div>
      </div>

      {/* Truly Infinite Scrolling Logo Carousel */}
      <div className="relative w-full overflow-hidden py-2 carousel-container pointer-events-none select-none">
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
        
        /* Pause animation on hover for better UX */
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default memo(ProofTrustBar)
