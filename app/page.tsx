'use client'

import { HeroSection } from '@/components/sections/HeroSection'
import { OurHomesSection } from '@/components/sections/OurHomesSection'
import { WhoWeServeSection } from '@/components/sections/WhoWeServeSection'
import { PartnershipLogos } from '@/components/sections/PartnershipLogos'
import { CTABanner } from '@/components/CTABanner'
import { TrustSignals } from '@/components/TrustSignals'
import { useOurHomes } from '@/components/providers/OurHomesProvider'
import { ArrowRight, Home as HomeIcon, MessageCircle, Award, Users, Leaf, Shield, Heart, Zap, DollarSign, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const { ourHomesRef } = useOurHomes()
  const [currentPillar, setCurrentPillar] = useState(0)
  
  const pillars = [
    {
      icon: Shield,
      bgColor: 'bg-discovery-gold',
      text: '100% recycled metal siding and roofing',
      gradient: 'from-discovery-lime to-discovery-gold',
      hoverGradient: 'hover:from-discovery-gold hover:to-discovery-forest'
    },
    {
      icon: Leaf,
      bgColor: 'bg-discovery-sage',
      text: 'Sustainable Building Practices and Materials',
      gradient: 'from-discovery-sage to-discovery-lime',
      hoverGradient: 'hover:from-discovery-lime hover:to-discovery-gold'
    },
    {
      icon: Zap,
      bgColor: 'bg-discovery-lime',
      text: 'Energy efficiency',
      gradient: 'from-discovery-lime to-discovery-gold',
      hoverGradient: 'hover:from-discovery-gold hover:to-discovery-forest'
    },
    {
      icon: Heart,
      bgColor: 'bg-discovery-gold',
      text: 'Supporting Families, Local Communities and Indigenous Groups',
      gradient: 'from-discovery-gold to-discovery-forest',
      hoverGradient: 'hover:from-discovery-forest hover:to-discovery-sage'
    },
    {
      icon: DollarSign,
      bgColor: 'bg-discovery-sage',
      text: 'Affordable building solutions',
      gradient: 'from-discovery-sage to-discovery-lime',
      hoverGradient: 'hover:from-discovery-lime hover:to-discovery-gold'
    }
  ]

  const nextPillar = () => {
    setCurrentPillar((prev) => (prev + 1) % pillars.length)
  }

  const prevPillar = () => {
    setCurrentPillar((prev) => (prev - 1 + pillars.length) % pillars.length)
  }
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <div className="animate-section">
        <TrustSignals />
      </div>
      
      <div className="animate-section">
        <WhoWeServeSection />
      </div>

      <div className="animate-section">
        <PartnershipLogos />
      </div>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-16 sm:py-20 bg-gradient-to-b from-discovery-charcoal to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-white mb-4 sm:mb-6 leading-tight">
              Success Stories
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-lime mx-auto rounded-full mb-6"></div>
            <p className="text-[15px] text-discovery-sage max-w-3xl mx-auto leading-relaxed">
              See how we&apos;ve helped communities, resort owners, and land developers across Canada 
              create sustainable, profitable solutions that transform lives and landscapes.
            </p>
          </div>

          {/* Conveyor Belt Animation Container */}
          <div className="relative w-screen -mx-4 overflow-hidden">
            <div 
              className="flex animate-conveyor cursor-grab active:cursor-grabbing px-4"
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const container = e.currentTarget;
                const scrollAmount = e.deltaY * 0.5;
                container.scrollLeft += scrollAmount;
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                const container = e.currentTarget;
                const startX = e.touches[0].clientX;
                const startScrollLeft = container.scrollLeft;
                
                const handleTouchMove = (moveEvent: TouchEvent) => {
                  moveEvent.preventDefault();
                  moveEvent.stopPropagation();
                  const currentX = moveEvent.touches[0].clientX;
                  const diff = startX - currentX;
                  container.scrollLeft = startScrollLeft + diff;
                };
                
                const handleTouchEnd = () => {
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
                document.addEventListener('touchend', handleTouchEnd);
              }}
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* First set of stories */}
              {[
                {
                  title: "Nak'azdli Whut'en First Nation",
                  description: "20 sustainable modular homes built with cultural consultation and community input",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
                },
                {
                  title: "Mountain Resort Expansion",
                  description: "Added 8 modular units increasing capacity by 300% and revenue by $180K annually",
                  image: "/assets/images/new-content/Landing Page - Real Estate Rental/CB-LakesideRetreat-Front__Lakeside-Retreat__CustomBuild__v01.webp"
                },
                {
                  title: "Prairie Farm Development",
                  description: "Transformed 50 acres into sustainable community with 3x land value increase",
                  image: "/assets/images/new-content/Landing Page- Land Owners/cb phariri farm.webp"
                },
                {
                  title: "Tla'amin Nation",
                  description: "Community center and residential complex with traditional design elements",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
                },
                {
                  title: "Lakeside Retreat Project",
                  description: "Converted underutilized land into premium guest accommodations with 90-day deployment",
                  image: "/assets/images/new-content/Landing Page - Real Estate Rental/CB-LakesideRetreat-Hero__Lakeside-Retreat–Hero__CustomBuild__v01.webp"
                },
                {
                  title: "Mountain Retreat Project",
                  description: "Converted family land into premium rental community with 90-day deployment",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP-CAB-3__Cabin Living — Seasonal appeal – winter__Pine 2__v01.webp"
                },
                {
                  title: "Ktunaxa Nation",
                  description: "Energy-efficient homes incorporating local materials and cultural motifs",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Resort Cluster Development",
                  description: "Created luxury guest village with 40% faster ROI than traditional construction",
                  image: "/assets/images/new-content/Landing Page - Real Estate Rental/CB-ResortCluster-Hero__Resort Cluster – Hero__Resort Cluster__v01.webp"
                },
                {
                  title: "Lakeside Community",
                  description: "Developed waterfront property into mixed-use community with 40% cost savings",
                  image: "/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Rear__Prairie-Farm–Rear__No-Model__v01.webp"
                },
                {
                  title: "Squamish Nation",
                  description: "Multi-generational housing complex preserving cultural heritage",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
                },
                {
                  title: "Seasonal Rental Success",
                  description: "Built rental-ready units achieving 85% occupancy rate and 5x return on investment",
                  image: "/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp"
                },
                {
                  title: "Forest Development",
                  description: "Created eco-friendly community preserving natural features with 100% sustainable design",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP-CAB-5__Interior_Comfort__Cabin_Living__v01.webp"
                }
              ].map((story, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-64 mx-3 bg-discovery-charcoal-light rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-32">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-serif font-bold text-discovery-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-discovery-sage text-xs leading-relaxed mb-3">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-discovery-gold text-discovery-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                {
                  title: "Musqueam Nation",
                  description: "Eco-friendly community development with traditional architecture",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
                },
                {
                  title: "Boutique Resort Launch",
                  description: "Launched new resort concept with modular units reducing setup time by 60%",
                  image: "/assets/images/new-content/Landing Page- Land Owners/cb phariri farm.webp"
                },
                {
                  title: "Rural Expansion",
                  description: "Expanded agricultural land into residential community achieving 5x ROI",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP delivery.webp"
                },
                {
                  title: "Tsleil-Waututh Nation",
                  description: "Sustainable housing project with renewable energy integration",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
                },
                {
                  title: "Glamping Experience",
                  description: "Created unique glamping experience with luxury modular units increasing guest satisfaction",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP-CAB-3__Cabin Living — Seasonal appeal – winter__Pine 2__v01.webp"
                },
                {
                  title: "Off-Grid Project",
                  description: "Built self-sufficient community in remote location with renewable energy",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP offgrid.webp"
                },
                {
                  title: "Stó:lō Nation",
                  description: "Cultural preservation through modern modular housing solutions",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Resort Revenue Boost",
                  description: "Added premium accommodations increasing average nightly rate by 150%",
                  image: "/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Rear__Prairie-Farm–Rear__No-Model__v01.webp"
                },
                {
                  title: "Coastal Development",
                  description: "Developed premium waterfront community with luxury amenities and premium pricing",
                  image: "/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Hero__Prairie Farm – Hero__Custom-Build__v01.webp"
                },
                {
                  title: "Nisga'a Nation",
                  description: "Community-driven development with traditional building techniques",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
                },
                {
                  title: "Guest Experience Upgrade",
                  description: "Enhanced guest amenities with modern modular units achieving 95% guest satisfaction",
                  image: "/assets/images/new-content/Landing Page- Land Owners/LP-CAB-5__Interior_Comfort__Cabin_Living__v01.webp"
                },
                {
                  title: "Agricultural Hub",
                  description: "Created multi-use development combining residential and agricultural uses",
                  image: "/assets/images/new-content/Landing Page- Land Owners/cb phariri farm.webp"
                }
              ].map((story, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-64 mx-3 bg-discovery-charcoal-light rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-32">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-serif font-bold text-discovery-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-discovery-sage text-xs leading-relaxed mb-3">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-discovery-gold text-discovery-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories CTA */}
          <div className="text-center mt-8">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-discovery-white mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-sm text-discovery-sage mb-6 max-w-xl mx-auto">
              Join these communities, resort owners, and land developers in transforming your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
              <a 
                href="/first-nations"
                className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
              >
                For First Nations Communities
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
                </div>
              </a>
              <a 
                href="/resort-owners"
                className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
              >
                For Resort & Airbnb Owners
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
                </div>
              </a>
              <a 
                href="/land-owners"
                className="bg-[#D4AF37] text-white px-1 sm:px-2 md:px-3 py-3 sm:py-4 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] whitespace-nowrap flex items-center justify-center gap-2"
              >
                For Land Owners & Developers
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Five Pillars Section */}
      <div className="animate-section">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-discovery-lime/20 to-discovery-sage/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-charcoal mb-4 sm:mb-6 leading-tight">
                Our Five Pillars
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-sage mx-auto rounded-full mb-6"></div>
              <p className="text-[15px] text-discovery-charcoal-light max-w-3xl mx-auto leading-relaxed">
                The core values that drive everything we do, ensuring sustainable, quality, and community-focused solutions.
              </p>
            </div>
            
            {/* Desktop Grid View */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-3">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon
                return (
                  <div key={index} className="text-center flex flex-col h-full">
                    <div className={`w-10 h-10 ${pillar.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <IconComponent className="w-5 h-5 text-discovery-charcoal" />
                    </div>
                    <div className={`bg-gradient-to-r ${pillar.gradient} text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${pillar.hoverGradient} flex-1 flex items-center justify-center min-h-[3rem]`}>
                      {pillar.text}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile Carousel View */}
            <div className="sm:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentPillar * 100}%)` }}
                >
                  {pillars.map((pillar, index) => {
                    const IconComponent = pillar.icon
                    return (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="text-center">
                          <div className={`w-16 h-16 ${pillar.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <IconComponent className="w-8 h-8 text-discovery-charcoal" />
                          </div>
                          <div className={`bg-gradient-to-r ${pillar.gradient} text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${pillar.hoverGradient}`}>
                            {pillar.text}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevPillar}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-discovery-white border-2 border-discovery-gold rounded-full p-2 shadow-lg hover:bg-discovery-gold hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 text-discovery-gold" />
              </button>
              
              <button
                onClick={nextPillar}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-discovery-white border-2 border-discovery-gold rounded-full p-2 shadow-lg hover:bg-discovery-gold hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 text-discovery-gold" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {pillars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPillar(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPillar 
                        ? 'bg-discovery-gold scale-125' 
                        : 'bg-discovery-charcoal-light hover:bg-discovery-gold'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <div className="animate-section">
        <OurHomesSection ref={ourHomesRef} />
      </div>
      
      {/* How It Works Section */}
      <div className="animate-section">
        <section id="how-it-works" className="py-16 sm:py-20 bg-gradient-to-b from-discovery-charcoal to-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-white mb-4 sm:mb-6 leading-tight">
                How It Works
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-lime mx-auto rounded-full mb-6"></div>
              <p className="text-[15px] text-discovery-sage max-w-3xl mx-auto leading-relaxed">
                Our streamlined process delivers quality craftsmanship, sustainable practices, and maximum value for your land development project.
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-discovery-gold via-discovery-sage to-discovery-gold"></div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Step 1: Choose Your Path */}
                <div className="text-center relative">
                  <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-discovery-charcoal">1</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                          Choose Your Path
                        </h3>
                        <p className="text-[12px] text-discovery-sage leading-relaxed">
                          Select First Nations Communities, Resort Owners, or Landowners for tailored solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Build Your Dream Development */}
                <div className="text-center relative">
                  <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-discovery-charcoal">2</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                          Build Your Dream Development
                        </h3>
                        <p className="text-sm text-discovery-sage leading-relaxed">
                          Design your perfect modular development with Pine, Spruce, Willow, or custom builds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Discovery Call */}
                <div className="text-center relative">
                  <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-discovery-charcoal">3</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                          Discovery Call
                        </h3>
                        <p className="text-sm text-discovery-sage leading-relaxed">
                          Our specialists understand your property, zoning, and investment goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Procure & Manufacture */}
                <div className="text-center relative">
                  <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-discovery-charcoal">4</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                          Procure & Manufacture
                        </h3>
                        <p className="text-sm text-discovery-sage leading-relaxed">
                          We source sustainable materials and manufacture in our climate-controlled facility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Deliver & Install */}
                <div className="text-center relative">
                  <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-discovery-charcoal">5</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                          Deliver & Install
                        </h3>
                        <p className="text-sm text-discovery-sage leading-relaxed">
                          Your modular development is delivered and professionally installed, ready for occupancy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Secondary CTA Section */}
      <div className="animate-section">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-discovery-sage/20 to-discovery-lime/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-charcoal mb-6 sm:mb-8 leading-tight">
              Ready to Start?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-sage mx-auto rounded-full mb-8"></div>
            <p className="text-lg md:text-xl text-discovery-charcoal-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Select your path below and begin your journey toward sustainable, profitable land development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/first-nations"
                className="bg-[#D4AF37] text-white px-6 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2"
              >
                For First Nations Communities
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a 
                href="/resort-owners"
                className="bg-[#D4AF37] text-white px-6 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2"
              >
                For Resort & Airbnb Owners
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a 
                href="/land-owners"
                className="bg-[#D4AF37] text-white px-6 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2"
              >
                For Land Owners & Developers
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <div className="animate-section">
        <CTABanner 
          title="Build Your Custom Dream Home — Net Zero & Off‑Grid Options Available"
          description="Ready to turn your land into your legacy? Our team is here to make it happen."
          primaryAction={{
            text: "Start Your Quote",
            href: "/quote-builder"
          }}
        />
      </div>
    </div>
  )
}