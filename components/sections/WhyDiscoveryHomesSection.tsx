'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function WhyDiscoveryHomesSection() {
  const [currentImage, setCurrentImage] = useState(0)

  const caseStudyImages = [
    '/assets/images/new-content/case-study-1.webp',
    '/assets/images/new-content/case-study-2.webp',
    '/assets/images/new-content/case-study-3.webp',
    '/assets/images/new-content/case-study-4.webp',
    '/assets/images/new-content/case-study-5.webp'
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % caseStudyImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + caseStudyImages.length) % caseStudyImages.length)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-nature mb-4 nature-shimmer">
            Solving Your Housing Challenges
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we're transforming communities across Western Canada with innovative
            modular housing solutions that deliver exceptional value and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Case Study Carousel */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Simple carousel container */}
              <div className="relative w-full h-[500px] md:h-[600px]">
                <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                  <img
                    src={caseStudyImages[currentImage]}
                    alt={`Case Study ${currentImage + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {caseStudyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImage
                        ? 'bg-[#D4AF37] scale-125'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-discovery-forest">
                Proven Results Across Western Canada
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-discovery-forest to-discovery-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-discovery-forest mb-1">Faster Delivery</h4>
                    <p className="text-gray-600">Complete homes delivered and installed in 60-90 days vs 12+ months for traditional construction.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-discovery-sage to-discovery-lime rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-discovery-charcoal font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-discovery-sage mb-1">Cost Efficiency</h4>
                    <p className="text-gray-600">Up to 30% savings compared to traditional builds with predictable pricing and no surprise costs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-discovery-lime to-discovery-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-discovery-charcoal font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-discovery-lime-dark mb-1">Quality Assurance</h4>
                    <p className="text-gray-600">Factory-controlled construction ensures consistent quality and energy efficiency in every home.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-discovery-forest to-discovery-sage rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-discovery-forest mb-1">Community Impact</h4>
                    <p className="text-gray-600">Supporting local employment, respecting cultural values, and building sustainable communities.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
