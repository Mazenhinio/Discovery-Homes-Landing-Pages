'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import Image from 'next/image'

interface OurHomesSectionProps {
  initialTab?: string
}

export interface OurHomesSectionRef {
  setActiveTab: (tab: string) => void
}

export const OurHomesSection = forwardRef<OurHomesSectionRef, OurHomesSectionProps>(({ initialTab = 'pine' }, ref) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false)

  useImperativeHandle(ref, () => ({
    setActiveTab: (tab: string) => {
      setActiveTab(tab)
    }
  }))

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  // Reset selected image when tab changes
  useEffect(() => {
    setSelectedImage(0)
    setIsFeaturesExpanded(false) // Reset features expansion when tab changes
  }, [activeTab])

  // Get current tab images
  const getCurrentTabImages = () => {
    switch (activeTab) {
      case 'pine':
        return [
          '/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp',
          '/assets/images/new-content/PIne 1 - Pine/IF Pine 1 - nordic white - living room.webp',
          '/assets/images/new-content/PIne 1 - Pine/IF pine1-kitchen-NW.webp',
          '/assets/images/new-content/PIne 1 - Pine/IF pine1-bedroom-NW.webp',
          '/assets/images/new-content/PIne 1 - Pine/IF Pine1-bathroom-NW.webp'
        ]
      case 'spruce':
        return [
          '/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp',
          '/assets/images/new-content/Pine 2- Spruce/IF pine1-kitchen-E&S.webp',
          '/assets/images/new-content/Pine 2- Spruce/IFpine1-living-E&S.webp',
          '/assets/images/new-content/Pine 2- Spruce/IF pine1-bedroom-E&S.webp',
          '/assets/images/new-content/Pine 2- Spruce/IF pine1-bedroom-IC.webp'
        ]
      case 'willow':
        return [
          '/assets/images/new-content/Pine 3- Willow/XF pine 3 scandanavian front right .webp',
          '/assets/images/new-content/Pine 3- Willow/IF pine 3 Nordic Whitw.webp',
          '/assets/images/new-content/Pine 3- Willow/IF Pine3-kitchen-NW.webp',
          '/assets/images/new-content/Pine 3- Willow/IF Pine3-kitchen-E&S.webp',
          '/assets/images/new-content/Pine 3- Willow/IF Pine3-room-E&S.webp'
        ]
      case 'custom':
        return [
          '/assets/images/new-content/Custom Builds/CB-LakesideRetreat-Front__Lakeside-Retreat__CustomBuild__v01.webp',
          '/assets/images/new-content/Custom Builds/cb coastal.webp',
          '/assets/images/new-content/Custom Builds/cb lakeside.webp',
          '/assets/images/new-content/Custom Builds/CB-ResortCluster-Hero__Resort Cluster – Hero__Resort Cluster__v01.webp'
        ]
      default:
        return []
    }
  }

  const currentImages = getCurrentTabImages()

  // Touch handlers for mobile scrolling
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - next image
      setSelectedImage(selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0)
    }
    if (isRightSwipe) {
      // Swipe right - previous image
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1)
    }
  }

  return (
    <section id="our-homes" className="py-16 sm:py-20 bg-gradient-to-b from-discovery-white to-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-charcoal mb-4 sm:mb-6 leading-tight">
            Our Homes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-sage mx-auto rounded-full mb-6"></div>
          <p className="text-[15px] text-discovery-charcoal-light max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted modular home designs, each built with sustainability, quality, and your unique needs in mind.
          </p>
        </div>
          
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {[
            { id: 'pine', label: 'Pine' },
            { id: 'spruce', label: 'Spruce' },
            { id: 'willow', label: 'Willow' },
            { id: 'custom', label: 'Custom Build' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-discovery-gold text-discovery-charcoal'
                  : 'text-discovery-charcoal-light hover:text-discovery-charcoal hover:bg-discovery-gold/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column - Images */}
          <div className="w-full space-y-4">
            {/* Main Model Image */}
            <div 
              className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-xl"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={currentImages[selectedImage]}
                alt={`${activeTab} model`}
                fill
                className="object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </div>

            {/* Image Gallery - Horizontal Scrollable */}
            <div 
              className="w-full overflow-x-auto scrollbar-hide"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                touchAction: 'pan-x',
                height: '120px'
              }}
            >
              <div 
                className="flex space-x-3 pb-2"
                style={{ 
                  width: `${currentImages.length * 140}px`,
                  minWidth: '100%',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  height: '100%',
                  alignItems: 'center'
                }}
              >
                {currentImages.map((src, index) => (
                  <div 
                    key={index} 
                    className={`relative h-20 sm:h-24 w-32 sm:w-36 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      selectedImage === index 
                        ? 'ring-2 ring-discovery-gold scale-105' 
                        : 'hover:scale-105 active:scale-95'
                    }`}
                    onClick={() => setSelectedImage(index)}
                    style={{ 
                      touchAction: 'manipulation',
                      minWidth: '8rem',
                      maxWidth: '8rem'
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${activeTab} image ${index + 1}`}
                      fill
                      className="object-cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full space-y-4 sm:space-y-6">
            {activeTab === 'pine' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">
                    Pine <span className="text-sm sm:text-base text-discovery-gold font-semibold">- The Efficient One</span>
                  </h3>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Ideal for singles, couples, or resort units — blending simplicity with style in a compact footprint.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">504 sq/ft</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Total Area</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">1 Bedroom</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">$183,000</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">6-8 weeks</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                    className="flex items-center justify-between w-full text-left mb-3"
                  >
                    <h4 className="text-base font-semibold text-discovery-charcoal">Key Features</h4>
                    <svg
                      className={`w-5 h-5 text-discovery-charcoal transition-transform duration-200 ${
                        isFeaturesExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isFeaturesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1 text-sm text-discovery-charcoal-light">
                      <li>• Quartz countertops</li>
                      <li>• Maple cabinetry (White, Black, or Wood Grain)</li>
                      <li>• Drywall walls with tongue-and-groove plank ceiling</li>
                      <li>• Vinyl glue-down flooring</li>
                      <li>• Pot lights throughout</li>
                      <li>• Tile shower surround + kitchen/bath backsplash</li>
                      <li>• Black kitchen sink & faucet (stainless option available)</li>
                      <li>• Triple-glaze windows; all paint colors included</li>
                      <li>• Hidden-fastener metal roof and metal board-and-batten siding</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'spruce' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">
                    Spruce <span className="text-sm sm:text-base text-discovery-gold font-semibold">- The Versatile One</span>
                  </h3>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Perfect for families or rental markets, with extra space and a flexible layout.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">504 sq/ft</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Main Floor</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">2 Bed + Loft</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">$188,000</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">6-8 weeks</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                    className="flex items-center justify-between w-full text-left mb-3"
                  >
                    <h4 className="text-base font-semibold text-discovery-charcoal">Key Features</h4>
                    <svg
                      className={`w-5 h-5 text-discovery-charcoal transition-transform duration-200 ${
                        isFeaturesExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isFeaturesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1 text-sm text-discovery-charcoal-light">
                      <li>• Quartz countertops</li>
                      <li>• Maple cabinetry (White, Black, or Wood Grain)</li>
                      <li>• Drywall walls with tongue-and-groove plank ceiling</li>
                      <li>• Vinyl glue-down flooring</li>
                      <li>• Pot lights throughout</li>
                      <li>• Tile shower surround + kitchen/bath backsplash</li>
                      <li>• Black kitchen sink & faucet (stainless option available)</li>
                      <li>• Triple-glaze windows; all paint colors included</li>
                      <li>• Hidden-fastener metal roof and metal board-and-batten siding</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'willow' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">
                    Willow <span className="text-sm sm:text-base text-discovery-gold font-semibold">- The Minimalist</span>
                  </h3>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    A modern, tiny‑home solution — perfect as an office, rental, or weekend retreat.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">240 sq/ft</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">With Loft</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">Loft Bed</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">$104,000</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">4-6 weeks</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                    className="flex items-center justify-between w-full text-left mb-3"
                  >
                    <h4 className="text-base font-semibold text-discovery-charcoal">Key Features</h4>
                    <svg
                      className={`w-5 h-5 text-discovery-charcoal transition-transform duration-200 ${
                        isFeaturesExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isFeaturesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1 text-sm text-discovery-charcoal-light">
                      <li>• Quartz countertops</li>
                      <li>• Maple cabinetry (White, Black, or Wood Grain)</li>
                      <li>• Drywall walls with tongue-and-groove plank ceiling</li>
                      <li>• Vinyl glue-down flooring</li>
                      <li>• Pot lights throughout</li>
                      <li>• Tile shower surround + kitchen/bath backsplash</li>
                      <li>• Black kitchen sink & faucet (stainless option available)</li>
                      <li>• Triple-glaze windows; all paint colors included</li>
                      <li>• Hidden-fastener metal roof and metal board-and-batten siding</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'custom' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">
                    Custom Build <span className="text-sm sm:text-base text-discovery-gold font-semibold">- Tailored to Your Vision</span>
                  </h3>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Fully tailored modular homes crafted to fit each customer's unique needs and preferences.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">Any Size</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Flexible</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">Custom</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">Quote</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Required</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-discovery-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm sm:text-lg font-bold text-discovery-charcoal">8-12 weeks</div>
                    </div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                    className="flex items-center justify-between w-full text-left mb-3"
                  >
                    <h4 className="text-base font-semibold text-discovery-charcoal">Custom Options</h4>
                    <svg
                      className={`w-5 h-5 text-discovery-charcoal transition-transform duration-200 ${
                        isFeaturesExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isFeaturesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1 text-sm text-discovery-charcoal-light">
                      <li>• Larger footprints for growing families</li>
                      <li>• Net-zero ready kits with solar</li>
                      <li>• Off-grid solutions for independence</li>
                      <li>• Indigenous-specific designs</li>
                      <li>• Multi-generational living layouts</li>
                      <li>• Sustainable building materials</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  )
})

OurHomesSection.displayName = 'OurHomesSection'
