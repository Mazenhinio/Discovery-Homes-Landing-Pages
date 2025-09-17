'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showText, setShowText] = useState(true)
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
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

  // Device detection and image dimension calculation
  useEffect(() => {
    const detectDeviceAndCalculateDimensions = () => {
      const userAgent = navigator.userAgent
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      
      let device = 'desktop'
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        if (/iPad|Android.*Tablet|Windows.*Touch/i.test(userAgent) || (screenWidth >= 768 && screenWidth <= 1024)) {
          device = 'tablet'
        } else {
          device = 'mobile'
        }
      }
      
      setDeviceType(device as 'mobile' | 'tablet' | 'desktop')
      
      // Calculate image container dimensions for mobile
      if (device === 'mobile') {
        // For mobile with object-contain, calculate the actual visible image area
        const aspectRatio = 16 / 9 // Assuming landscape images
        const containerWidth = screenWidth
        const containerHeight = screenHeight
        
        let imageWidth, imageHeight
        
        if (containerWidth / containerHeight > aspectRatio) {
          // Image fits by height
          imageHeight = containerHeight
          imageWidth = imageHeight * aspectRatio
        } else {
          // Image fits by width
          imageWidth = containerWidth
          imageHeight = imageWidth / aspectRatio
        }
        
        // Make text container 70% of the actual image dimensions
        const textWidth = imageWidth * 0.7
        const textHeight = imageHeight * 0.7
        
        setImageDimensions({ width: textWidth, height: textHeight })
      } else {
        setImageDimensions({ width: 0, height: 0 })
      }
    }

    detectDeviceAndCalculateDimensions()
    
    // Re-detect on resize
    window.addEventListener('resize', detectDeviceAndCalculateDimensions)
    return () => window.removeEventListener('resize', detectDeviceAndCalculateDimensions)
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
    <section 
      className="relative h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-screen overflow-hidden" 
      style={{ 
        width: '100vw',
        ...(deviceType === 'mobile' && {
          backgroundColor: 'rgba(45, 45, 45, 0.9)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        })
      }}
    >
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Responsive Image Container - Adapts based on device type */}
            <div className="absolute inset-0 w-full h-full">
              {deviceType === 'desktop' ? (
                // Desktop: Full image without container constraints
                <img
                  src={slide.image}
                  alt={`Discovery Homes Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                  }}
                />
              ) : (
                // Mobile/Tablet: Responsive container for proper sizing
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={`Discovery Homes Slide ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain sm:object-cover"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 glass-nature text-discovery-lime p-2 sm:p-3 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 glass-nature text-discovery-lime p-2 sm:p-3 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Play/Pause Control */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 glass-nature text-discovery-lime p-2 sm:p-3 rounded-full hover:glow-green transition-all duration-300 z-10 micro-interaction"
      >
        {isPlaying ? <Pause size={18} className="sm:w-5 sm:h-5" /> : <Play size={18} className="sm:w-5 sm:h-5" />}
      </button>

      {/* Show Text Arrow Button - Smooth animation */}
      <button
        onClick={showTextOverlay}
        className={`absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 glass-eco text-discovery-lime p-3 sm:p-4 rounded-full hover:glow-lime transition-all duration-500 ease-out z-20 growth-pulse ${
          !showText 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
      >
        <ChevronUp size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Text Content - Bound to image dimensions */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ease-out overflow-hidden ${
        showText 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        {/* Responsive text container that adapts to image boundaries */}
        <div className={`relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 transition-all duration-500 ease-out delay-100 ${
          showText ? 'scale-100' : 'scale-95'
        }`}>
           {/* Text content container with responsive sizing */}
           <div 
             className="text-center text-yellow-400 w-auto h-auto px-2 sm:px-3 py-2 sm:py-3 md:py-4 relative"
             style={deviceType === 'mobile' && imageDimensions.width > 0 ? {
               maxWidth: `${imageDimensions.width}px`,
               maxHeight: `${imageDimensions.height}px`,
               width: 'auto',
               height: 'auto'
             } : {
               maxWidth: deviceType === 'tablet' ? '70vw' : '60vw',
               maxHeight: deviceType === 'tablet' ? '60vh' : '50vh',
               width: 'auto',
               height: 'auto'
             }}
           >
            
             <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black mb-1 sm:mb-2 md:mb-3 leading-tight transition-all duration-600 ease-out drop-shadow-2xl text-discovery-lime nature-shimmer ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               {slides[currentSlide].title}
             </h1>
             <p className={`text-xs sm:text-xs md:text-sm lg:text-sm mb-2 sm:mb-3 font-bold transition-all duration-600 ease-out delay-100 text-discovery-lime ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               {slides[currentSlide].subtitle}
             </p>
             <div className={`flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 justify-center mb-2 sm:mb-3 md:mb-4 transition-all duration-600 ease-out delay-200 ${
               showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
             }`}>
               <a 
                 href="/first-nations"
                 className="bg-gradient-to-r from-discovery-forest to-discovery-sage text-white px-0 sm:px-1 md:px-2 py-0.5 sm:py-1.5 md:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:from-discovery-sage hover:to-discovery-lime whitespace-nowrap"
               >
                 For First Nations Communities
               </a>
               <a 
                 href="/resort-owners"
                 className="bg-gradient-to-r from-discovery-sage to-discovery-lime text-white px-0 sm:px-1 md:px-2 py-0.5 sm:py-1.5 md:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:from-discovery-lime hover:to-discovery-gold whitespace-nowrap"
               >
                 For Resort Owners
               </a>
               <a 
                 href="/land-owners"
                 className="bg-gradient-to-r from-discovery-lime to-discovery-gold text-white px-0 sm:px-1 md:px-2 py-0.5 sm:py-1.5 md:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:from-discovery-gold hover:to-discovery-forest whitespace-nowrap"
               >
                 For Landowners
               </a>
             </div>
            
            {/* Hide Text Button - Smooth animation */}
            <button
              onClick={hideText}
              className={`glass-eco text-discovery-lime p-2 sm:p-3 rounded-full hover:glow-lime transition-all duration-600 ease-out delay-300 hover:scale-105 ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <ChevronDown size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 micro-interaction ${
              index === currentSlide 
                ? `scale-110 leaf-sway ${
                    (index % 3) === 0 ? 'bg-discovery-lime glow-lime' : 
                    (index % 3) === 1 ? 'bg-discovery-sage glow-green' : 
                    'bg-discovery-forest glow-forest'
                  }` 
                : 'bg-white/50 hover:bg-discovery-lime/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
} 