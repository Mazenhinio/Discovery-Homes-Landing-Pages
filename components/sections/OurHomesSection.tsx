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

  return (
    <section id="our-homes" className="py-16 sm:py-20 bg-gradient-to-b from-discovery-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
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
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Model Image */}
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={
                  activeTab === 'pine' ? '/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp' :
                  activeTab === 'spruce' ? '/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp' :
                  activeTab === 'willow' ? '/assets/images/new-content/Pine 3- Willow/XF pine 3 scandanavian front right .webp' :
                  '/assets/images/new-content/Custom Builds/CB-LakesideRetreat-Front__Lakeside-Retreat__CustomBuild__v01.webp'
                }
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

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {activeTab === 'pine' && [
                '/assets/images/new-content/PIne 1 - Pine/IF Pine 1 - nordic white - living room.webp',
                '/assets/images/new-content/PIne 1 - Pine/IF pine1-kitchen-NW.webp',
                '/assets/images/new-content/PIne 1 - Pine/IF pine1-bedroom-NW.webp',
                '/assets/images/new-content/PIne 1 - Pine/IF Pine1-bathroom-NW.webp'
              ].map((src, index) => (
                <div key={index} className="relative h-24 sm:h-28 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Pine interior ${index + 1}`}
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

              {activeTab === 'spruce' && [
                '/assets/images/new-content/Pine 2- Spruce/IF pine1-kitchen-E&S.webp',
                '/assets/images/new-content/Pine 2- Spruce/IFpine1-living-E&S.webp',
                '/assets/images/new-content/Pine 2- Spruce/IF pine1-bedroom-E&S.webp',
                '/assets/images/new-content/Pine 2- Spruce/IF pine1-bedroom-IC.webp'
              ].map((src, index) => (
                <div key={index} className="relative h-24 sm:h-28 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Spruce interior ${index + 1}`}
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

              {activeTab === 'willow' && [
                '/assets/images/new-content/Pine 3- Willow/IF pine 3 Nordic Whitw.webp',
                '/assets/images/new-content/Pine 3- Willow/IF Pine3-kitchen-NW.webp',
                '/assets/images/new-content/Pine 3- Willow/IF Pine3-kitchen-E&S.webp',
                '/assets/images/new-content/Pine 3- Willow/IF Pine3-room-E&S.webp'
              ].map((src, index) => (
                <div key={index} className="relative h-24 sm:h-28 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Willow interior ${index + 1}`}
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

              {activeTab === 'custom' && [
                '/assets/images/new-content/Custom Builds/cb coastal.webp',
                '/assets/images/new-content/Custom Builds/cb lakeside.webp',
                '/assets/images/new-content/Custom Builds/CB-LakesideRetreat-Front__Lakeside-Retreat__CustomBuild__v01.webp',
                '/assets/images/new-content/Custom Builds/CB-ResortCluster-Hero__Resort Cluster – Hero__Resort Cluster__v01.webp'
              ].map((src, index) => (
                <div key={index} className="relative h-24 sm:h-28 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Custom build ${index + 1}`}
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

          {/* Right Column - Details */}
          <div className="space-y-4 sm:space-y-6">
            {activeTab === 'pine' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">Pine</h3>
                  <p className="text-sm sm:text-base text-discovery-gold font-semibold mb-2">The Efficient One</p>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Ideal for singles, couples, or resort units — blending simplicity with style in a compact footprint.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">504 sq/ft</div>
                    <div className="text-xs text-discovery-charcoal-light">Total Area</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">1 Bedroom</div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">$183,000</div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">6-8 weeks</div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-discovery-charcoal mb-3">Key Features</h4>
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
              </>
            )}

            {activeTab === 'spruce' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">Spruce</h3>
                  <p className="text-sm sm:text-base text-discovery-gold font-semibold mb-2">The Versatile One</p>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Perfect for families or rental markets, with extra space and a flexible layout.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">504 sq/ft</div>
                    <div className="text-xs text-discovery-charcoal-light">Main Floor</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">2 Bed + Loft</div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">$188,000</div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">6-8 weeks</div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-discovery-charcoal mb-3">Key Features</h4>
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
              </>
            )}

            {activeTab === 'willow' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">Willow</h3>
                  <p className="text-sm sm:text-base text-discovery-gold font-semibold mb-2">The Minimalist</p>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    A modern, tiny‑home solution — perfect as an office, rental, or weekend retreat.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">240 sq/ft</div>
                    <div className="text-xs text-discovery-charcoal-light">With Loft</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">Loft Bed</div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">$104,000</div>
                    <div className="text-xs text-discovery-charcoal-light">Starting Price</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">4-6 weeks</div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-discovery-charcoal mb-3">Key Features</h4>
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
              </>
            )}

            {activeTab === 'custom' && (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-1">Custom Build</h3>
                  <p className="text-sm sm:text-base text-discovery-gold font-semibold mb-2">Tailored to Your Vision</p>
                  <p className="text-sm text-discovery-charcoal-light mb-4">
                    Fully tailored modular homes crafted to fit each customer's unique needs and preferences.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">Any Size</div>
                    <div className="text-xs text-discovery-charcoal-light">Flexible</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">Custom</div>
                    <div className="text-xs text-discovery-charcoal-light">Layout</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">Quote</div>
                    <div className="text-xs text-discovery-charcoal-light">Required</div>
                  </div>
                  <div className="bg-discovery-gold/10 p-3 rounded-lg">
                    <div className="text-lg font-bold text-discovery-charcoal">8-12 weeks</div>
                    <div className="text-xs text-discovery-charcoal-light">Delivery</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-discovery-charcoal mb-3">Custom Options</h4>
                  <ul className="space-y-1 text-sm text-discovery-charcoal-light">
                    <li>• Larger footprints for growing families</li>
                    <li>• Net-zero ready kits with solar</li>
                    <li>• Off-grid solutions for independence</li>
                    <li>• Indigenous-specific designs</li>
                    <li>• Multi-generational living layouts</li>
                    <li>• Sustainable building materials</li>
                  </ul>
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
