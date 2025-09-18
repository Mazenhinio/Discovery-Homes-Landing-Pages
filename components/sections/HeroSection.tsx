'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const hideText = useCallback(() => {
    setShowText(false)
  }, [])

  const showTextOverlay = useCallback(() => {
    setShowText(true)
  }, [])


  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    intervalRef.current = setInterval(nextSlide, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [nextSlide, isPlaying])

  return (
    <section className="relative min-h-screen h-screen pt-16 overflow-hidden">
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
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 glass-nature text-discovery-lime p-4 sm:p-5 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction shadow-lg hover:shadow-xl"
      >
        <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 glass-nature text-discovery-lime p-4 sm:p-5 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction shadow-lg hover:shadow-xl"
      >
        <ChevronRight size={24} className="sm:w-8 sm:h-8" />
      </button>

      {/* Play/Pause Control */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 sm:top-8 right-6 sm:right-8 glass-nature text-discovery-lime p-3 sm:p-4 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction shadow-lg hover:shadow-xl"
      >
        {isPlaying ? <Pause size={20} className="sm:w-6 sm:h-6" /> : <Play size={20} className="sm:w-6 sm:h-6" />}
      </button>

      {/* Show Text Arrow Button - Smooth animation */}
      <button
        onClick={showTextOverlay}
        className={`absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 glass-eco text-discovery-lime p-4 sm:p-5 rounded-full hover:glow-lime transition-all duration-500 ease-out z-20 growth-pulse shadow-lg hover:shadow-xl ${
          !showText 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
      >
        <ChevronUp size={24} className="sm:w-8 sm:h-8" />
      </button>

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
            
             <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3 md:mb-4 leading-tight transition-all duration-600 ease-out drop-shadow-2xl text-discovery-lime nature-shimmer ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               {slides[currentSlide].title}
             </h1>
             <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 font-bold transition-all duration-600 ease-out delay-100 text-discovery-lime ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               {slides[currentSlide].subtitle}
             </p>
             <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mb-4 sm:mb-6 md:mb-8 transition-all duration-600 ease-out delay-200 ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               <a 
                 href="/first-nations"
                 className="bg-gradient-to-r from-discovery-forest to-discovery-sage text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-discovery-sage hover:to-discovery-lime whitespace-nowrap border-2 border-transparent hover:border-discovery-lime/30"
               >
                 For First Nations Communities
               </a>
               <a 
                 href="/resort-owners"
                 className="bg-gradient-to-r from-discovery-sage to-discovery-lime text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-discovery-lime hover:to-discovery-gold whitespace-nowrap border-2 border-transparent hover:border-discovery-gold/30"
               >
                 For Resort Owners
               </a>
               <a 
                 href="/land-owners"
                 className="bg-gradient-to-r from-discovery-lime to-discovery-gold text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-discovery-gold hover:to-discovery-forest whitespace-nowrap border-2 border-transparent hover:border-discovery-forest/30"
               >
                 For Landowners
               </a>
             </div>
            
            {/* Hide Text Button - Smooth animation */}
            <button
              onClick={hideText}
              className={`glass-eco text-discovery-lime p-3 sm:p-4 rounded-full hover:glow-lime transition-all duration-600 ease-out delay-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <ChevronDown size={20} className="sm:w-6 sm:h-6" />
            </button>
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