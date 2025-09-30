'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, Calendar, MessageCircle, Star, Users, Home, Heart, Shield, Award, DollarSign, TrendingUp, Building, Calculator, MapPin, Leaf, Globe, Zap, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { LeadCaptureForm } from '@/components/LeadCaptureForm'
import { PartnershipLogos } from '@/components/sections/PartnershipLogos'
import { OurHomesSection } from '@/components/sections/OurHomesSection'
import { CTABanner } from '@/components/CTABanner'

export default function LandOwnersLandingPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [downloadFormData, setDownloadFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [showThankYou, setShowThankYou] = useState(false)
  const [benefitsCarouselImages, setBenefitsCarouselImages] = useState<Array<{src: string, alt: string}>>([])
  const [selectedBenefitsImage, setSelectedBenefitsImage] = useState(0)
  const [benefitsTouchStart, setBenefitsTouchStart] = useState<number | null>(null)
  const [benefitsTouchEnd, setBenefitsTouchEnd] = useState<number | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [carouselImages, setCarouselImages] = useState<Array<{src: string, alt: string}>>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Set countdown to 30 days from now
    const calculateTimeLeft = () => {
      const now = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30) // 30 days from now
      endDate.setHours(23, 59, 59, 999) // End of day
      
      const difference = endDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }
    
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    
    // Load images for benefits carousel
    const loadImages = async () => {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        
        // Filter images from specific paths for landowners, including First Nations images (excluding Indigenous folder)
        const filteredImages = data.images.filter((image: any) => 
          (image.src.includes('Landing Page- Land Owners') || 
           image.src.includes('Home Page Hero Carousel') || 
           image.src.includes('Custom Builds') ||
           image.src.includes('PIne 1 - Pine') ||
           image.src.includes('Pine 2- Spruce') ||
           image.src.includes('Pine 3- Willow') ||
           image.src.includes('Landing Page - Real Estate Rental')) &&
          !image.src.includes('case-study-1') && 
          !image.src.includes('case-study-2') && 
          !image.src.includes('case-study-3') && 
          !image.src.includes('case-study-4') && 
          !image.src.includes('case-study-5') &&
          !image.src.includes('Landing Page - Indigenous')
        )
        
        // Randomly select 12 images for the benefits carousel
        const benefitsShuffled = [...filteredImages].sort(() => 0.5 - Math.random())
        setBenefitsCarouselImages(benefitsShuffled.slice(0, 12))
        
        // Randomly select 12 different images for the main carousel
        const carouselShuffled = [...filteredImages].sort(() => 0.5 - Math.random())
        setCarouselImages(carouselShuffled.slice(0, 12))
      } catch (error) {
        console.error('Error loading images:', error)
        // Fallback images from specified paths - 12 for benefits carousel
        setBenefitsCarouselImages([
          { src: '/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Hero__Prairie Farm – Hero__Custom-Build__v01.webp', alt: 'Prairie Farm Development' },
          { src: '/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Rear__Prairie-Farm–Rear__No-Model__v01.webp', alt: 'Prairie Farm Rear View' },
          { src: '/assets/images/new-content/Landing Page- Land Owners/LP-CAB-3__Cabin Living — Seasonal appeal – winter__Pine 2__v01.webp', alt: 'Cabin Living Winter' },
          { src: '/assets/images/new-content/Landing Page- Land Owners/LP-CAB-5__Interior_Comfort__Cabin_Living__v01.webp', alt: 'Cabin Interior Comfort' },
          { src: '/assets/images/new-content/Landing Page- Land Owners/cb phariri farm.webp', alt: 'Phariri Farm Development' },
          { src: '/assets/images/new-content/Landing Page- Land Owners/LP delivery.webp', alt: 'Land Development Delivery' },
          { src: '/assets/images/new-content/PIne 1 - Pine/IF Pine 1 - nordic white - living room.webp', alt: 'Pine 1 Living Room' },
          { src: '/assets/images/new-content/PIne 1 - Pine/IF Pine1-bathroom-NW.webp', alt: 'Pine 1 Bathroom' },
          { src: '/assets/images/new-content/Pine 2- Spruce/IF pine1-kitchen-E&S.webp', alt: 'Spruce Kitchen' },
          { src: '/assets/images/new-content/Pine 2- Spruce/IF pine1-living-E&S.webp', alt: 'Spruce Living Room' },
          { src: '/assets/images/new-content/Pine 3- Willow/IF Pine3-kitchen-NW.webp', alt: 'Willow Kitchen Nordic' },
          { src: '/assets/images/new-content/Pine 3- Willow/IF Pine3-room-E&S.webp', alt: 'Willow Living Room' }
        ])
        
        // Fallback images for main carousel - 12 different images
        setCarouselImages([
          { src: '/assets/images/new-content/Landing Page- Land Owners/LP offgrid.webp', alt: 'Off-Grid Development' },
          { src: '/assets/images/new-content/Custom Builds/CB-LakesideRetreat-Front__Lakeside-Retreat__CustomBuild__v01.webp', alt: 'Lakeside Retreat Front' },
          { src: '/assets/images/new-content/Custom Builds/CB-LakesideRetreat-Hero__Lakeside-Retreat–Hero__CustomBuild__v01.webp', alt: 'Lakeside Retreat Hero' },
          { src: '/assets/images/new-content/Custom Builds/CB-ResortCluster-Hero__Resort Cluster – Hero__Resort Cluster__v01.webp', alt: 'Resort Cluster Development' },
          { src: '/assets/images/new-content/Custom Builds/cb coastal.webp', alt: 'Coastal Custom Build' },
          { src: '/assets/images/new-content/Custom Builds/cb lakeside.webp', alt: 'Lakeside Custom Build' },
          { src: '/assets/images/new-content/Home Page Hero Carousel/H1__Forest Sunrise__Pine 1__v01.webp', alt: 'Forest Sunrise Pine 1' },
          { src: '/assets/images/new-content/Home Page Hero Carousel/H3.webp', alt: 'Hero Carousel H3' },
          { src: '/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp', alt: 'Rental Ready Interior' },
          { src: '/assets/images/new-content/PIne 1 - Pine/IF pine1-bedroom-NW.webp', alt: 'Pine 1 Bedroom' },
          { src: '/assets/images/new-content/PIne 1 - Pine/IF pine1-kitchen-NW.webp', alt: 'Pine 1 Kitchen' },
          { src: '/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp', alt: 'Pine 1 Exterior' }
        ])
      }
    }
    
    loadImages()
    
    // Auto-scroll benefits carousel every 3 seconds
    const benefitsAutoScroll = setInterval(() => {
      if (benefitsCarouselImages.length > 1) {
        setIsFading(true)
        setTimeout(() => {
          setSelectedBenefitsImage(prev => 
            prev < benefitsCarouselImages.length - 1 ? prev + 1 : 0
          )
          setIsFading(false)
        }, 300) // Half of fade duration
      }
    }, 3000)
    
    return () => {
      clearInterval(timer)
      clearInterval(benefitsAutoScroll)
    }
  }, [benefitsCarouselImages.length])

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/forms/land-owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsFormSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleDownloadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/HbWk0Go6KNcxvahZph0m', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: downloadFormData.name,
          email: downloadFormData.email,
          phone: downloadFormData.phone,
          formType: 'download-guide',
          source: 'land-owners-landing-page',
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        // Close the popup and reset form
        setShowDownloadForm(false)
        setDownloadFormData({ name: '', email: '', phone: '' })
        // Show custom thank you message
        setShowThankYou(true)
        // Hide thank you message after 5 seconds
        setTimeout(() => setShowThankYou(false), 5000)
      } else {
        const errorData = await response.text()
        console.error('Webhook error:', errorData)
        alert('There was an error. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting download form:', error)
      alert('There was an error. Please try again.')
    }
  }

  // Touch handlers for benefits carousel
  const onBenefitsTouchStart = (e: React.TouchEvent) => {
    setBenefitsTouchEnd(null)
    setBenefitsTouchStart(e.targetTouches[0].clientX)
  }

  const onBenefitsTouchMove = (e: React.TouchEvent) => {
    setBenefitsTouchEnd(e.targetTouches[0].clientX)
  }

  const onBenefitsTouchEnd = () => {
    if (!benefitsTouchStart || !benefitsTouchEnd) return
    const distance = benefitsTouchStart - benefitsTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Swipe left - next image
      setSelectedBenefitsImage(selectedBenefitsImage < benefitsCarouselImages.length - 1 ? selectedBenefitsImage + 1 : 0)
    }
    if (isRightSwipe) {
      // Swipe right - previous image
      setSelectedBenefitsImage(selectedBenefitsImage > 0 ? selectedBenefitsImage - 1 : benefitsCarouselImages.length - 1)
    }
  }

  const nextBenefitsImage = () => {
    setSelectedBenefitsImage(selectedBenefitsImage < benefitsCarouselImages.length - 1 ? selectedBenefitsImage + 1 : 0)
  }

  const prevBenefitsImage = () => {
    setSelectedBenefitsImage(selectedBenefitsImage > 0 ? selectedBenefitsImage - 1 : benefitsCarouselImages.length - 1)
  }

  // Touch handlers for main carousel
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
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Swipe left - next image
      setSelectedImage(selectedImage < carouselImages.length - 1 ? selectedImage + 1 : 0)
    }
    if (isRightSwipe) {
      // Swipe right - previous image
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : carouselImages.length - 1)
    }
  }

  const nextImage = () => {
    setSelectedImage(selectedImage < carouselImages.length - 1 ? selectedImage + 1 : 0)
  }

  const prevImage = () => {
    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : carouselImages.length - 1)
  }

  return (
    <div className="min-h-screen bg-discovery-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] h-[80vh] pt-16 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/new-content/Landing Page- Land Owners/CB-PrairieFarm-Hero__Prairie Farm – Hero__Custom-Build__v01.webp"
            alt="Land Development Investment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-discovery-charcoal/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-discovery-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-discovery-white">
            Transform Your Land 
            <span className="block text-discovery-gold">Into Opportunity</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Sustainable modular development solutions that maximize value and minimize environmental impact.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/quote-builder" className="inline-block w-full bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8941F] transition-colors flex items-center justify-center gap-2">
              Get Instant Quote
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <button 
              onClick={() => setShowDownloadForm(true)}
              className="border-2 border-discovery-white text-discovery-white hover:bg-discovery-white hover:text-discovery-charcoal px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Development Guide
            </button>
          </div>
        </div>

      </section>

      {/* Development Statistics */}
      <section className="py-[15px] bg-discovery-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-3 md:gap-6 text-center">
            <div className="text-discovery-white">
              <div className="text-xl md:text-2xl font-bold text-discovery-gold mb-0.5">3-5x</div>
              <div className="text-xs">Land Value Increase</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-xl md:text-2xl font-bold text-discovery-gold mb-0.5">90 Days</div>
              <div className="text-xs">From Planning to Revenue</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-xl md:text-2xl font-bold text-discovery-gold mb-0.5">40%</div>
              <div className="text-xs">Lower Development Costs</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-xl md:text-2xl font-bold text-discovery-gold mb-0.5">100%</div>
              <div className="text-xs">Sustainable Solutions</div>
            </div>
          </div>
        </div>
      </section>


      {/* Land Development Benefits */}
      <section className="py-[15px] bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              Why Land Owners Choose Discovery Homes
            </h2>
            <p className="text-discovery-charcoal-light max-w-3xl mx-auto">
              Our modular development approach transforms underutilized land into profitable, 
              sustainable communities while preserving your property's natural beauty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Maximize Land Value
              </h3>
              <p className="text-discovery-charcoal-light">
                Transform raw land into income-generating properties with 3-5x value increase 
                through strategic modular development and community planning.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Sustainable Development
              </h3>
              <p className="text-discovery-charcoal-light">
                Eco-friendly modular construction minimizes environmental impact while creating 
                beautiful, energy-efficient communities that respect your land's natural features.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Rapid Implementation
              </h3>
              <p className="text-discovery-charcoal-light">
                Go from concept to revenue in 90 days with our streamlined development process, 
                including zoning, permits, and infrastructure planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fall Sale Section */}
      <section className="py-[15px]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-discovery-white rounded-3xl px-[15px] py-[15px] shadow-2xl border-2 border-discovery-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            {/* Sale Header */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-discovery-charcoal-light mb-2">FALL SALE</div>
              <div className="text-4xl md:text-5xl font-bold text-discovery-charcoal mb-2">SAVE 5% UP TO</div>
              <div className="text-6xl md:text-7xl font-bold text-discovery-gold mb-4">$25,000</div>
            </div>

            {/* Sale Terms */}
            <div className="mb-8">
              <p className="text-sm text-discovery-charcoal-light mb-1">
                First 5 orders for the first 30 days
              </p>
              <p className="text-sm text-discovery-charcoal-light mb-2">
                Act FAST!
              </p>
              <p className="text-xs text-discovery-charcoal-light">
                "Affordable, Modular Ready when you are."
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-12">
              <a 
                href="/quote-builder"
                className="inline-block bg-discovery-charcoal text-discovery-white px-12 py-4 rounded-lg font-bold text-sm border-2 border-discovery-gold hover:bg-discovery-white hover:text-discovery-charcoal transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
              >
                CLAIM YOUR DISCOUNT
              </a>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 flex-wrap">
              <div className="bg-discovery-charcoal-light rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 w-16 sm:w-20 md:w-24 lg:w-28 flex flex-col items-center justify-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Days</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 w-16 sm:w-20 md:w-24 lg:w-28 flex flex-col items-center justify-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Hours</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 w-16 sm:w-20 md:w-24 lg:w-28 flex flex-col items-center justify-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Minutes</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 w-16 sm:w-20 md:w-24 lg:w-28 flex flex-col items-center justify-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="pt-6 pb-16 bg-nature-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-[15px] text-discovery-white mb-8">
            Join the land owners already maximizing their property's potential with Discovery Homes.
          </p>
          <a 
            href="/quote-builder"
            className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8941F] transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            Get Instant Quote
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Our Homes Section */}
      <div className="pb-6">
        <OurHomesSection />
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-[15px] bg-gradient-to-b from-discovery-charcoal to-gray-900">
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1: Build Your Dream Development */}
              <div className="text-center relative">
                <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-discovery-charcoal">1</span>
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

              {/* Step 2: Discovery Call */}
              <div className="text-center relative">
                <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-discovery-charcoal">2</span>
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

              {/* Step 3: Procure & Manufacture */}
              <div className="text-center relative">
                <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-discovery-charcoal">3</span>
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

              {/* Step 4: Deliver & Install */}
              <div className="text-center relative">
                <div className="bg-discovery-charcoal-light rounded-xl p-2 shadow-md border border-discovery-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-discovery-charcoal">4</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-serif font-bold text-discovery-white mb-1">
                        Deliver & Install
                      </h3>
                      <p className="text-sm text-discovery-sage leading-relaxed">
                        Your development project is completed and professionally finished, ready for occupancy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* Start Your Land Development Journey */}
      <section className="py-[15px] bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
                Start Your Land Development Journey
              </h2>
              <p className="text-sm sm:text-[15px] text-discovery-charcoal-light mb-8">
                Ready to unlock your property's potential? Download our comprehensive guide and schedule a consultation with our land development experts.
              </p>
              
              {/* CTA Button */}
              <div className="mb-8">
                <a 
                  href="/quote-builder"
                  className="bg-[#D4AF37] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2 justify-center text-sm sm:text-base"
                >
                  Get Instant Quote
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-sm sm:text-base text-discovery-charcoal">Free consultation with our land development specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-sm sm:text-base text-discovery-charcoal">Comprehensive guide to land development solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-sm sm:text-base text-discovery-charcoal">Funding and financing assistance for your project</span>
                </div>
              </div>
            </div>

            {/* Right Column - Key Benefits */}
            <div className="h-full">
              <div className="bg-discovery-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl h-full flex flex-col">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-discovery-charcoal mb-6 text-center">
                  Key Benefits
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium text-xs sm:text-sm">3-5x Land Value Increase</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium text-xs sm:text-sm">90 Days to Revenue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium text-xs sm:text-sm">40% Lower Development Costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium text-xs sm:text-sm">100% Sustainable Solutions</span>
                  </div>
                </div>
                
                {/* Benefits Carousel */}
                {benefitsCarouselImages.length > 0 && (
                  <div className="relative flex-1">
                    <div 
                      className="relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg group"
                      onTouchStart={onBenefitsTouchStart}
                      onTouchMove={onBenefitsTouchMove}
                      onTouchEnd={onBenefitsTouchEnd}
                    >
                      <Image
                        src={benefitsCarouselImages[selectedBenefitsImage]?.src}
                        alt={benefitsCarouselImages[selectedBenefitsImage]?.alt}
                        fill
                        className={`object-cover transition-all duration-600 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block'
                        }}
                      />
                      
                      {/* Navigation Arrows */}
                      {benefitsCarouselImages.length > 1 && (
                        <>
                          <button
                            onClick={prevBenefitsImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          >
                            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={nextBenefitsImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          >
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {benefitsCarouselImages.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                          {selectedBenefitsImage + 1} / {benefitsCarouselImages.length}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-[15px] bg-gradient-to-b from-discovery-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-4 sm:mb-6 leading-tight">
              Ready to Start Your Land Development Project?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-sage mx-auto rounded-full mb-6"></div>
            <p className="text-sm sm:text-[15px] text-discovery-charcoal-light max-w-3xl mx-auto leading-relaxed">
              Let us help you unlock your property's potential! Click the button below to discuss your development project!
            </p>
            
            {/* CTA Button */}
            <div className="text-center mt-6 sm:mt-8">
              <a 
                href="/quote-builder"
                className="bg-[#D4AF37] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2 justify-center text-base sm:text-lg mx-auto"
              >
                Get Instant Quote
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            {carouselImages.length > 0 && (
              <div className="relative">
                {/* Main Image with Carousel Controls */}
                <div 
                  className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <Image
                    src={carouselImages[selectedImage]?.src}
                    alt={carouselImages[selectedImage]?.alt}
                    fill
                    className="object-cover transition-transform duration-300"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                  
                  {/* Navigation Arrows */}
                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {carouselImages.length > 1 && (
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm sm:text-base">
                      {selectedImage + 1} / {carouselImages.length}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="/quote-builder"
              className="bg-[#D4AF37] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B8941F] flex items-center gap-2 justify-center text-base sm:text-lg mx-auto"
            >
              Get Instant Quote
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <PartnershipLogos />

      {/* Download Guide Section */}
      <section className="py-[15px] bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-discovery-white rounded-2xl px-[15px] py-[15px] shadow-xl border-2 border-discovery-charcoal">
            <div className="text-center">
              <h2 className="text-[25px] font-serif font-bold text-discovery-charcoal mb-2">
                Download Our Modular Homes Guide For:
              </h2>
              <h3 className="text-lg font-medium text-discovery-charcoal-light mb-6">
                Land Owners
              </h3>
              
              <h3 className="text-xl font-semibold text-discovery-charcoal mb-8">
                What it includes:
              </h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-[15px]">Land development solutions overview</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-[15px]">Property assessment and planning</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-[15px]">Funding and financing resources</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-[15px]">Project planning assistance</span>
                </div>
              </div>

              <button 
                onClick={() => setShowDownloadForm(true)}
                className="bg-discovery-sage hover:bg-discovery-sage-dark text-discovery-charcoal px-10 py-4 rounded-lg font-semibold text-xl transition-all duration-300 border-2 border-discovery-charcoal hover:border-discovery-gold"
              >
                Download Guide
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Download Guide Popup Form */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-discovery-charcoal">Download Your Guide</h3>
              <button 
                onClick={() => setShowDownloadForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
                  </div>
            
            <form onSubmit={handleDownloadFormSubmit} className="space-y-6">
                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={downloadFormData.name}
                  onChange={(e) => setDownloadFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discovery-gold focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
                </div>
                
                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={downloadFormData.email}
                  onChange={(e) => setDownloadFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discovery-gold focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
                </div>
                
                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={downloadFormData.phone}
                  onChange={(e) => setDownloadFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discovery-gold focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
                  </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDownloadForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-discovery-gold text-discovery-charcoal rounded-lg hover:bg-discovery-gold-dark transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Guide
                </button>
                </div>
            </form>
              </div>
            </div>
      )}

      {/* Custom Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-discovery-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 text-discovery-charcoal text-2xl">✓</div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Thank You!
              </h3>
              <p className="text-discovery-charcoal-light mb-6">
                Your guide will be sent to your email shortly.
              </p>
              <button 
                onClick={() => setShowThankYou(false)}
                className="bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
