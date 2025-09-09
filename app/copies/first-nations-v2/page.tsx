'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, Calendar, MessageCircle, Star, Users, Home, Heart, Shield, Award, DollarSign, TrendingUp, Building, Calculator, MapPin, Leaf, Globe, Zap, Clock } from 'lucide-react'
import { LeadCaptureForm } from '@/components/LeadCaptureForm'


import { CTABanner } from '@/components/CTABanner'
import { FirstNationsScheduler } from '@/components/FirstNationsScheduler'
import { FirstNationsAnalytics } from '@/components/FirstNationsAnalytics'
import { FirstNationsChatbot } from '@/components/FirstNationsChatbot'

export default function FirstNationsLandingPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [downloadFormData, setDownloadFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [activeTab, setActiveTab] = useState('pine')
  const [showThankYou, setShowThankYou] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    setIsClient(true)
    
    // Set countdown to end of September
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfSeptember = new Date(now.getFullYear(), 8, 30, 23, 59, 59) // September 30th, 11:59:59 PM
      
      if (now > endOfSeptember) {
        // If past September 30th, set to next year
        endOfSeptember.setFullYear(now.getFullYear() + 1)
      }
      
      const difference = endOfSeptember.getTime() - now.getTime()
      
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
      const response = await fetch('/api/forms/first-nations', {
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
      const response = await fetch('https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/bbf2c818-151c-4366-b401-cc3b2d2bb222', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: downloadFormData.name,
          email: downloadFormData.email,
          phone: downloadFormData.phone,
          formType: 'download-guide',
          source: 'first-nations-landing-page',
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        // Close the popup and reset form
        setShowDownloadForm(false)
        setDownloadFormData({ name: '', email: '', phone: '' })
        // Show custom thank you message
        setShowThankYou(true)
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
            src="/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
            alt="First Nations Community Housing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-discovery-charcoal/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-discovery-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-discovery-white">
            Building Homes, 
            <span className="block text-discovery-gold">Building Communities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Discovery Homes proudly partners with First Nations communities to create sustainable, 
            culturally-appropriate housing solutions that honor tradition while embracing modern innovation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/copies/quote-builder-v2" className="bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group">
              Get Instant Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => setShowDownloadForm(true)}
              className="border-2 border-discovery-white text-discovery-white hover:bg-discovery-white hover:text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Guide
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

      {/* Trust Signals */}
      <section className="py-16 bg-discovery-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">50+</div>
              <div className="text-sm">First Nations Projects</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">100%</div>
              <div className="text-sm">Community Satisfaction</div>
            </div>
            <div className="text-discovery-white">
              <div className="text-4xl font-bold text-discovery-gold mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              Our Commitment to First Nations Communities
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              We understand the unique cultural, environmental, and economic considerations that shape 
              housing needs in First Nations communities. Our approach is built on respect, collaboration, 
              and sustainable development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Cultural Respect
              </h3>
              <p className="text-discovery-charcoal-light">
                We honor traditional values and incorporate cultural elements into our designs, 
                ensuring each home reflects the community&apos;s heritage and identity.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Sustainable Development
              </h3>
              <p className="text-discovery-charcoal-light">
                Our modular homes are built with environmental responsibility in mind, 
                using sustainable materials and energy-efficient systems.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-discovery-sage/10 to-discovery-gold/10">
              <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-discovery-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
                Community Partnership
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Fall Sale Section */}
      <section className="py-20 bg-gradient-to-br from-discovery-charcoal to-discovery-charcoal-light">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-discovery-white rounded-3xl p-12 shadow-2xl">
            {/* Sale Header */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-discovery-charcoal-light mb-2">FALL SALE</div>
              <div className="text-6xl md:text-7xl font-bold text-discovery-charcoal mb-2">SAVE 5%</div>
              <div className="text-4xl md:text-5xl font-bold text-discovery-charcoal mb-2">UP TO</div>
              <div className="text-8xl md:text-9xl font-bold text-discovery-gold mb-4">$10,000</div>
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
                href="/copies/quote-builder-v2"
                className="inline-block bg-discovery-charcoal text-discovery-white px-12 py-4 rounded-lg font-bold text-xl border-2 border-discovery-charcoal hover:bg-discovery-white hover:text-discovery-charcoal transition-all duration-300"
              >
                CLAIM YOUR DISCOUNT
              </a>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-6">
              <div className="bg-discovery-charcoal-light rounded-xl p-6 min-w-[120px]">
                <div className="text-4xl font-bold text-discovery-white mb-2">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-discovery-white">Days</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-6 min-w-[120px]">
                <div className="text-4xl font-bold text-discovery-white mb-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-discovery-white">Hours</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-6 min-w-[120px]">
                <div className="text-4xl font-bold text-discovery-white mb-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-discovery-white">Minutes</div>
              </div>
              <div className="bg-discovery-charcoal-light rounded-xl p-6 min-w-[120px]">
                <div className="text-4xl font-bold text-discovery-white mb-2">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-discovery-white">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 bg-discovery-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-discovery-charcoal-light mb-8">
            Join the First Nations communities already building their future with Discovery Homes.
          </p>
          <a 
            href="/copies/quote-builder-v2"
            className="inline-block bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group mx-auto"
          >
            Get Instant Quote
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Our Homes Section */}
      <section id="our-homes" className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              OUR HOMES
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              Choose from our range of modular home models designed for First Nations communities. 
              Each model offers unique features and benefits for different community needs.
            </p>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { id: 'pine', label: 'Pine' },
                { id: 'spruce', label: 'Spruce' },
                { id: 'willow', label: 'Willow' },
                { id: 'custom', label: 'Custom Build' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-discovery-gold text-discovery-charcoal'
                      : 'text-discovery-charcoal-light hover:text-discovery-charcoal hover:bg-discovery-gold/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Images */}
            <div className="space-y-6">
              {activeTab === 'pine' && (
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp"
                    alt="Pine Model - The Classic"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {activeTab === 'spruce' && (
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/new-content/Pine 2- Spruce/XF pien 1 and 2 charcoal.webp"
                    alt="Spruce Model - The Versatile"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {activeTab === 'willow' && (
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/new-content/Pine 3- Willow/XF pine 3 scandanavian front right .webp"
                    alt="Willow Model - The Spacious"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {activeTab === 'custom' && (
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                    alt="Custom Build - The Unique"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {activeTab === 'pine' && (
                <>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-discovery-charcoal mb-4">
                      Pine Model - The Classic
                    </h3>
                    <p className="text-lg text-discovery-charcoal-light mb-6">
                      Perfect for couples and small families seeking a cozy home experience. 
                      This model offers timeless appeal and efficient use of space.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">504 sq/ft</div>
                      <div className="text-sm text-discovery-charcoal-light">Total Area</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">1 Bedroom</div>
                      <div className="text-sm text-discovery-charcoal-light">Layout</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">$174,000</div>
                      <div className="text-sm text-discovery-charcoal-light">Starting Price</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">6-8 weeks</div>
                      <div className="text-sm text-discovery-charcoal-light">Delivery</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-discovery-charcoal mb-4">Key Features</h4>
                    <ul className="space-y-2 text-discovery-charcoal-light">
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
                    <h3 className="text-3xl font-serif font-bold text-discovery-charcoal mb-4">
                      Spruce Model - The Versatile
                    </h3>
                    <p className="text-lg text-discovery-charcoal-light mb-6">
                      Ideal for families and groups, offering flexible sleeping arrangements 
                      and spacious common areas for community gatherings.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">504 sq/ft</div>
                      <div className="text-sm text-discovery-charcoal-light">Main Floor</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">2 Bed + Loft</div>
                      <div className="text-sm text-discovery-charcoal-light">Layout</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">$179,000</div>
                      <div className="text-sm text-discovery-charcoal-light">Starting Price</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">6-8 weeks</div>
                      <div className="text-sm text-discovery-charcoal-light">Delivery</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-discovery-charcoal mb-4">Key Features</h4>
                    <ul className="space-y-2 text-discovery-charcoal-light">
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
                    <h3 className="text-3xl font-serif font-bold text-discovery-charcoal mb-4">
                      Willow Model - The Spacious
                    </h3>
                    <p className="text-lg text-discovery-charcoal-light mb-6">
                      Our largest model, perfect for extended families and community leaders. 
                      Features premium finishes and spacious layouts.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">240 sq/ft</div>
                      <div className="text-sm text-discovery-charcoal-light">With Loft</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">Loft Bed</div>
                      <div className="text-sm text-discovery-charcoal-light">Layout</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">$99,000</div>
                      <div className="text-sm text-discovery-charcoal-light">Starting Price</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">4-6 weeks</div>
                      <div className="text-sm text-discovery-charcoal-light">Delivery</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-discovery-charcoal mb-4">Key Features</h4>
                    <ul className="space-y-2 text-discovery-charcoal-light">
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
                    <h3 className="text-3xl font-serif font-bold text-discovery-charcoal mb-4">
                      Custom Build - The Unique
                    </h3>
                    <p className="text-lg text-discovery-charcoal-light mb-6">
                      Fully tailored modular homes crafted to fit each community's unique needs and cultural preferences.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">Any Size</div>
                      <div className="text-sm text-discovery-charcoal-light">Flexible</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">Custom</div>
                      <div className="text-sm text-discovery-charcoal-light">Layout</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">Quote</div>
                      <div className="text-sm text-discovery-charcoal-light">Required</div>
                    </div>
                    <div className="bg-discovery-gold/10 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-discovery-charcoal">8-12 weeks</div>
                      <div className="text-sm text-discovery-charcoal-light">Delivery</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-discovery-charcoal mb-4">Custom Options</h4>
                    <ul className="space-y-2 text-discovery-charcoal-light">
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

      {/* Success Stories */}
      <section id="success-stories" className="py-20 bg-discovery-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-discovery-sage max-w-3xl mx-auto">
              See how we&apos;ve helped First Nations communities across Canada create sustainable, 
              beautiful homes that strengthen their communities.
            </p>
          </div>

          {/* Conveyor Belt Animation Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-conveyor">
              {/* First set of stories */}
              {[
                {
                  title: "Nak'azdli Whut'en First Nation",
                  description: "20 sustainable modular homes built with cultural consultation and community input",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
                },
                {
                  title: "Tla'amin Nation",
                  description: "Community center and residential complex with traditional design elements",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
                },
                {
                  title: "Ktunaxa Nation",
                  description: "Energy-efficient homes incorporating local materials and cultural motifs",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Squamish Nation",
                  description: "Multi-generational housing complex preserving cultural heritage",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
                },
                {
                  title: "Musqueam Nation",
                  description: "Eco-friendly community development with traditional architecture",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
                },
                {
                  title: "Tsleil-Waututh Nation",
                  description: "Sustainable housing project with renewable energy integration",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
                },
                {
                  title: "Stó:lō Nation",
                  description: "Cultural preservation through modern modular housing solutions",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Nisga'a Nation",
                  description: "Community-driven development with traditional building techniques",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
                }
              ].map((story, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-80 mx-4 bg-discovery-charcoal-light rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-48">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-discovery-white mb-3">
                      {story.title}
                    </h3>
                    <p className="text-discovery-sage text-sm leading-relaxed mb-4">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-discovery-gold text-discovery-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
            {[
              {
                title: "Nak'azdli Whut'en First Nation",
                  description: "20 sustainable modular homes built with cultural consultation and community input",
                image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
              },
              {
                title: "Tla'amin Nation",
                description: "Community center and residential complex with traditional design elements",
                image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
              },
              {
                title: "Ktunaxa Nation",
                description: "Energy-efficient homes incorporating local materials and cultural motifs",
                image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Squamish Nation",
                  description: "Multi-generational housing complex preserving cultural heritage",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
                },
                {
                  title: "Musqueam Nation",
                  description: "Eco-friendly community development with traditional architecture",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-4__Cultural touch – mural__Indigenous Communities__v01.webp"
                },
                {
                  title: "Tsleil-Waututh Nation",
                  description: "Sustainable housing project with renewable energy integration",
                  image: "/assets/images/new-content/Landing Page - Indigenous/LP-IND-6__Interior lifestyle—Grandmother baking bannock__Indigenous Communities__v01.webp"
                },
                {
                  title: "Stó:lō Nation",
                  description: "Cultural preservation through modern modular housing solutions",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen.webp"
                },
                {
                  title: "Nisga'a Nation",
                  description: "Community-driven development with traditional building techniques",
                  image: "/assets/images/new-content/Landing Page - Indigenous/CB indegen1_bloom_low_6x.webp"
              }
            ].map((story, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-80 mx-4 bg-discovery-charcoal-light rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-discovery-white mb-3">
                    {story.title}
                  </h3>
                    <p className="text-discovery-sage text-sm leading-relaxed mb-4">
                    {story.description}
                  </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-discovery-gold text-discovery-gold" />
                    ))}
                      </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Success Stories CTA */}
          <div className="text-center mt-16">
            <a 
              href="/copies/quote-builder-v2"
              className="inline-block bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group mx-auto"
            >
              Get Instant Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              HOW IT WORKS
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              Our streamlined process ensures your community housing project is delivered 
              with quality craftsmanship, sustainable practices, and cultural sensitivity.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-discovery-gold via-discovery-sage to-discovery-gold"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1: Build Your Dream House */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Home className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Build Your Dream House
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    Start with our quote builder to design your perfect modular home. 
                    Choose from Pine, Spruce, Willow, or create a custom build tailored to your community's needs.
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
                    Connect with our First Nations housing specialists for a personalized consultation 
                    about your community's specific needs and cultural requirements.
                  </p>
                </div>
              </div>

              {/* Step 3: Procure & Manufacture */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Building className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Procure & Manufacture
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    We source sustainable materials and manufacture your modular homes in our 
                    controlled facility, ensuring quality and cultural design integration.
                  </p>
                </div>
              </div>

              {/* Step 4: Deliver & Install */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Zap className="w-8 h-8 text-discovery-charcoal" />
                </div>
                <div className="bg-discovery-white rounded-2xl p-6 shadow-lg border border-discovery-gold/20">
                  <h3 className="text-xl font-serif font-bold text-discovery-charcoal mb-4">
                    Deliver & Install
                  </h3>
                  <p className="text-discovery-charcoal-light leading-relaxed">
                    Our expert team delivers and installs your modular homes with minimal 
                    site disruption, respecting your land and community protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-20 bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
                Start Your Community&apos;s Housing Journey
              </h2>
              <p className="text-xl text-discovery-charcoal-light mb-8">
                Ready to explore how Discovery Homes can help your First Nations community? 
                Download our comprehensive guide and schedule a consultation with our experts.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-discovery-charcoal">Free consultation with our First Nations housing specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-discovery-charcoal">Comprehensive guide to First Nations housing solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-discovery-gold rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-discovery-charcoal rounded-full"></div>
                  </div>
                  <span className="text-discovery-charcoal">Funding and financing assistance for your project</span>
                </div>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="space-y-8">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/new-content/Pine 2- Spruce/XF pien 1 and 2 charcoal.webp"
                  alt="Spruce Model - The Versatile One"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="text-center">
                 <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-2">
                  Spruce Model - The Versatile One
                 </h3>
                <p className="text-discovery-charcoal-light mb-6">
                  504 sq/ft main floor with 2 bedrooms plus loft space
                 </p>
               </div>
               
              {/* Key Benefits */}
              <div className="bg-discovery-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-6 text-center">
                  Key Benefits
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">Sustainable & Durable Construction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">Move-In Ready in Weeks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-gold rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">Cost-Effective Solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-discovery-sage rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-discovery-charcoal" />
                    </div>
                    <span className="text-discovery-charcoal font-medium">Eco-Friendly Materials</span>
                  </div>
                </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-20 bg-discovery-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-discovery-charcoal mb-6">
              Certifications & Partnerships
            </h2>
            <p className="text-xl text-discovery-charcoal-light max-w-3xl mx-auto">
              We maintain the highest standards and work with trusted partners to ensure 
              the best outcomes for First Nations communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Indigenous Business Certification", icon: Award },
              { title: "Sustainable Building Certified", icon: Shield },
              { title: "First Nations Housing Authority Partner", icon: Home },
              { title: "Cultural Consultation Certified", icon: Heart }
            ].map((cert, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-discovery-gold/10 to-discovery-sage/10">
                <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-6 h-6 text-discovery-charcoal" />
                </div>
                <h3 className="font-semibold text-discovery-charcoal">
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <a 
              href="/copies/quote-builder-v2"
              className="inline-block bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group mx-auto"
            >
              Get Instant Quote
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Download Our Guide Section */}
      <section className="py-20 bg-gradient-to-br from-discovery-sage/20 to-discovery-gold/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-discovery-white rounded-2xl p-12 shadow-xl border-2 border-discovery-charcoal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
                Download Our Guide For Modular Homes For First Nation Communities:
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
                  <span className="text-discovery-charcoal font-medium text-lg">Comprehensive First Nations housing solutions overview</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">Cultural consultation and community engagement strategies</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">Funding and financing resources guide</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="text-discovery-charcoal font-medium text-lg">Project planning and timeline assistance</span>
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

      {/* Custom Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-discovery-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-4">
              Thank You!
            </h3>
            <p className="text-discovery-charcoal-light mb-6">
              Your guide will be sent to your email shortly. We'll also connect you with our First Nations housing specialists for a personalized consultation.
            </p>
            <button 
              onClick={() => setShowThankYou(false)}
              className="bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
            
            <p className="text-gray-600 mb-6">
              Get instant access to our comprehensive First Nations housing guide with funding resources, 
              cultural considerations, and project planning tips.
            </p>
            
            <form onSubmit={handleDownloadFormSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
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
    </div>
  )
} 