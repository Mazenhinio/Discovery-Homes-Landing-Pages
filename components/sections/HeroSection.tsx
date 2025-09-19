'use client'

import { useState, useEffect, useRef } from 'react'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showText, setShowText] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout>()
  
  const slides = [
    {
      image: '/assets/images/new-content/Home Page Hero Carousel/H1__Forest Sunrise__Pine 1__v01.webp',
      title: 'Smart, Sustainable Modular Homes',
      subtitle: 'Built for Western Canada'
    },
    {
      image: '/assets/images/new-content/Home Page Hero Carousel/H3.webp',
      title: 'Culturally-Respectful Design',
      subtitle: 'Honoring Indigenous Communities'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-3.webp',
      title: 'Off-Grid Ready Solutions',
      subtitle: 'Independence & Sustainability'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-4.webp',
      title: 'Resort & Rental Opportunities',
      subtitle: 'Unlock Your Land\'s Potential'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-5.webp',
      title: 'Premium Modular Construction',
      subtitle: 'Quality Without Compromise'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-6.webp',
      title: 'Energy-Efficient Living',
      subtitle: 'Net-Zero Ready Homes'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-1.webp',
      title: 'Rural Living Made Easy',
      subtitle: 'Perfect for Acreage Owners'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-2.webp',
      title: 'Modern Tiny Home Solutions',
      subtitle: 'Minimalist Luxury'
    },
    {
      image: '/assets/images/hero-carousel/hero-slide-3.webp',
      title: 'Dream Homes, Delivered',
      subtitle: 'Your Vision, Our Expertise'
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [slides.length])

  return (
    <section className="relative min-h-[80vh] h-[80vh] pt-16 overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={`Discovery Homes Slide ${index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              {/* Transparent black overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
        ))}
      </div>


      {/* Text Content */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ease-out overflow-hidden ${
        showText 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        <div className={`relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 transition-all duration-500 ease-out delay-100 ${
          showText ? 'scale-100' : 'scale-95'
        }`}>
           <div 
             className="text-center text-yellow-400 w-auto h-auto px-2 sm:px-3 py-2 sm:py-3 md:py-4 relative"
             style={{ maxWidth: '1024px' }}
           >
            
             <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3 md:mb-4 leading-tight transition-all duration-600 ease-out drop-shadow-2xl ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`} style={{ color: '#77A42A' }}>
               Modern Modular Homes
             </h1>
             <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-10 md:mb-12 font-bold transition-all duration-600 ease-out delay-100 text-discovery-lime ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               Faster. Affordable. Sustainable
             </p>
             <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center mb-2 sm:mb-4 md:mb-6 transition-all duration-600 ease-out delay-200 ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               <a 
                 href="/first-nations"
                 className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
               >
                 For First Nations Communities
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               </a>
               <a 
                 href="/resort-owners"
                 className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
               >
                 For Resort & Airbnb Owners
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               </a>
               <a 
                 href="/land-owners"
                 className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
               >
                 For Land Owners & Developers
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               </a>
             </div>
            
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 micro-interaction shadow-lg hover:shadow-xl ${
              index === currentSlide 
                ? `scale-110 leaf-sway ${
                    (index % 3) === 0 ? 'bg-discovery-lime glow-lime' : 
                    (index % 3) === 1 ? 'bg-discovery-sage glow-green' : 
                    'bg-discovery-forest glow-forest'
                  }` 
                : 'bg-white/60 hover:bg-discovery-lime/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
} 