'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, Calendar, MessageCircle, Star, Users, Home, Heart, Shield, Award, DollarSign, TrendingUp, Building, Calculator, MapPin, Leaf, Globe, Zap, Clock } from 'lucide-react'
import { LeadCaptureForm } from '@/components/LeadCaptureForm'
import { PartnershipLogos } from '@/components/sections/PartnershipLogos'
import { WhyDiscoveryHomesSection } from '@/components/sections/WhyDiscoveryHomesSection'
import { CTABanner } from '@/components/CTABanner'
import { OurHomesSection } from '@/components/sections/OurHomesSection'
import { useOurHomes } from '@/components/providers/OurHomesProvider'

export default function ResortOwnersLandingPage() {
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
  const [activeTab, setActiveTab] = useState('pine')
  const [showThankYou, setShowThankYou] = useState(false)
  const { ourHomesRef } = useOurHomes()

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
    
    return () => clearInterval(timer)
  }, [])

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
      const response = await fetch('https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/hmtKgpFaRSDYz2QGDxZz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: downloadFormData.name,
          email: downloadFormData.email,
          phone: downloadFormData.phone,
          formType: 'download-guide',
          source: 'resort-owners-landing-page',
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

  return (
    <div className="min-h-screen bg-discovery-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/new-content/Landing Page - Real Estate Rental/CB-LakesideRetreat-Hero__Lakeside-Retreat–Hero__CustomBuild__v01.webp"
            alt="Resort Revenue Investment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-discovery-charcoal/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-discovery-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-discovery-white">
            Maximize Your Resort's 
            <span className="block text-discovery-gold">Revenue Potential</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Discovery Homes helps resort owners unlock additional revenue streams with 
            premium modular accommodations that enhance guest experience and increase property value.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/quote-builder" className="bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group">
              Get Instant Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => setShowDownloadForm(true)}
              className="border-2 border-discovery-white text-discovery-white hover:bg-discovery-white hover:text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resort Guide
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-discovery-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-discovery-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Resort Revenue Statistics */}
      <section className="py-16 bg-discovery-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">300%</div>
              <div className="text-sm">Capacity Increase</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">90 Days</div>
              <div className="text-sm">From Planning to Revenue</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">150%</div>
              <div className="text-sm">Higher Nightly Rates</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">85%</div>
              <div className="text-sm">Occupancy Rate</div>
            </div>
          </div>
        </div>
      </section>


      {/* Additional CTA Section */}
      <section className="py-16 bg-discovery-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-discovery-gold/10 to-discovery-sage/10 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-discovery-charcoal-light mb-8 max-w-2xl mx-auto">
              Get an instant quote for your land development project. 
              Our team is ready to help you unlock your property's potential.
            </p>
            <a 
              href="/quote-builder"
              className="inline-block bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-300 flex items-center gap-2 group mx-auto"
            >
              Get Instant Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Land Development Benefits */}
      <section className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              Why Resort Owners Choose Discovery Homes
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              Our modular accommodation solutions help resort owners maximize revenue potential 
              while enhancing guest experience with premium, sustainable lodging options.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Maximize Revenue Potential
              </h3>
              <p className="text-discovery-charcoal-light">
                Increase capacity by 300% and boost nightly rates by 150% with premium modular 
                accommodations that attract high-value guests and extend your revenue season.
            </p>
          </div>
          
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-discovery-charcoal" />
                </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Premium Guest Experience
                </h3>
              <p className="text-discovery-charcoal-light">
                Deliver exceptional guest satisfaction with modern, energy-efficient accommodations 
                featuring luxury finishes and sustainable design that enhances your resort's reputation.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Quick Revenue Generation
              </h3>
              <p className="text-discovery-charcoal-light">
                Go from planning to revenue in 90 days with our streamlined installation process, 
                minimal site disruption, and immediate guest accommodation availability.
                </p>
              </div>
          </div>
        </div>
      </section>

      {/* Fall Sale Section */}
      <section className="py-20 bg-gradient-to-br from-discovery-charcoal to-discovery-charcoal-light">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-discovery-white rounded-3xl p-12 shadow-2xl border-2 border-discovery-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            {/* Sale Header */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-discovery-charcoal-light mb-2">FALL SALE</div>
              <div className="text-6xl md:text-7xl font-bold text-discovery-charcoal mb-2">SAVE 5%</div>
              <div className="text-4xl md:text-5xl font-bold text-discovery-charcoal mb-2">UP TO</div>
              <div className="text-6xl md:text-7xl font-bold text-discovery-gold mb-4">$25,000</div>
            </div>

            {/* Sale Terms */}
            <div className="mb-8">
              <p className="text-lg text-discovery-charcoal-light mb-2">
                First 5 orders for the first 30 days - Act FAST!
              </p>
              <p className="text-lg text-discovery-charcoal-light italic">
                "Affordable, Modular Ready when you are."
            </p>
          </div>
          
            {/* CTA Button */}
            <div className="mb-12">
              <a 
                href="/quote-builder"
                className="inline-block bg-discovery-charcoal text-discovery-white px-12 py-4 rounded-lg font-bold text-xl border-2 border-discovery-gold hover:bg-discovery-white hover:text-discovery-charcoal transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
              >
                CLAIM YOUR DISCOUNT
              </a>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
              <div className="bg-discovery-charcoal-light rounded-xl p-3 sm:p-4 md:p-6 min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Days</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-3 sm:p-4 md:p-6 min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Hours</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-3 sm:p-4 md:p-6 min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Minutes</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-3 sm:p-4 md:p-6 min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-discovery-white mb-1 sm:mb-2 leading-tight">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-discovery-white text-center">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Homes Section */}
      <OurHomesSection ref={ourHomesRef} />

<WhyDiscoveryHomesSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              HOW IT WORKS
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              Our streamlined process ensures your resort expansion project is delivered 
              with quality craftsmanship, sustainable practices, and maximum revenue potential.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-discovery-gold via-discovery-sage to-discovery-gold"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1: Build Your Dream Development */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Home className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Build Your Dream Resort
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    Start with our quote builder to design your perfect resort expansion. 
                    Choose from Pine, Spruce, Willow, or create a custom build tailored to your property's revenue potential.
                  </p>
                </div>
              </div>

              {/* Step 2: Discovery Call */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <MessageCircle className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Discovery Call
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    Our land development specialists connect with you to understand 
                    your property characteristics, zoning requirements, and investment goals.
                  </p>
                </div>
              </div>

              {/* Step 3: Procure & Manufacture */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Award className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Procure & Manufacture
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    We source sustainable materials and manufacture your modular homes in our climate-controlled 
                    facility, ensuring quality construction and efficient production timelines.
                  </p>
              </div>
            </div>
            
              {/* Step 4: Deliver & Install */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <ArrowRight className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Deliver & Install
                </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    Your completed development project is finished on your site and professionally completed by 
                    our experienced team, ready for occupancy and revenue generation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* Partnerships */}
      <PartnershipLogos />

      {/* Start Your Resort Expansion Journey */}
      <section className="py-20 bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-6xl mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-12 items-stretch">
             <div className="flex flex-col justify-between">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
                 Start Your Resort Expansion Journey
             </h2>
               <p className="text-xl text-discovery-charcoal-light mb-8">
                 Ready to maximize your resort's revenue potential? Download our comprehensive guide and schedule a consultation with our resort expansion experts.
               </p>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                   </div>
                   <span className="text-discovery-charcoal">Free consultation with our resort expansion specialists</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                   </div>
                   <span className="text-discovery-charcoal">Comprehensive guide to resort revenue solutions</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                   </div>
                   <span className="text-discovery-charcoal">ROI calculations and financing options for your expansion</span>
                 </div>
               </div>
               <div className="pt-6">
                 <a 
                   href="/quote-builder"
                   className="inline-block bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group"
                 >
                   Get Instant Quote
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </a>
               </div>
           </div>
           
             {/* Right Column - Product Image and Features */}
             <div className="h-full">

               {/* Key Benefits */}
               <div className="bg-discovery-white rounded-2xl p-8 shadow-xl flex flex-col h-full">
                 <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-6 text-center">
                   Key Benefits
                 </h3>
                 <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">300% Capacity Increase</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">90 Days to Revenue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">150% Higher Nightly Rates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">85% Occupancy Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Guide Section */}
      <section className="py-20 bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-discovery-white rounded-2xl p-12 shadow-xl border-2 border-discovery-charcoal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
                Download Our Guide For Modular Homes For Resort Revenue:
            </h2>
              
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
                  <span className="text-discovery-charcoal font-medium text-lg">Comprehensive resort revenue solutions overview</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">Property assessment and revenue planning</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">ROI calculations and financing options</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">Resort expansion planning and timeline assistance</span>
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
