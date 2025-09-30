'use client'

import { useEffect, useState } from 'react'
import { Check, Calendar, Clock, Users, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ThankYouPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
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
    
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Quote Builder Button */}
        <div className="mb-8">
          <Link 
            href="/quote-builder"
            className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Quote Builder
          </Link>
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-[#68a71d] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            Thank You!
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your quote has been generated successfully. Schedule your consultation to discuss your project details and secure your fall discount.
          </p>
        </div>

        {/* Fall Sale Section */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl px-1.5 py-8 text-center text-white mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Calendar className="text-white w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              FALL SALE
            </h2>
          </div>
          
          <div className="text-3xl md:text-4xl font-bold mb-4">
            Save Up to $25,000
          </div>
          
          <div className="text-xl mb-8 opacity-90">
            5% Discount on All Models
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Limited Time Offer</h3>
            <h4 className="text-lg font-semibold mb-6 text-center">Ends In:</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
                <div className="text-4xl font-bold text-white mb-2">{timeLeft.days}</div>
                <div className="text-sm text-white opacity-90">Days</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
                <div className="text-4xl font-bold text-white mb-2">{timeLeft.hours}</div>
                <div className="text-sm text-white opacity-90">Hours</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
                <div className="text-4xl font-bold text-white mb-2">{timeLeft.minutes}</div>
                <div className="text-sm text-white opacity-90">Minutes</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
                <div className="text-4xl font-bold text-white mb-2">{timeLeft.seconds}</div>
                <div className="text-sm text-white opacity-90">Seconds</div>
              </div>
            </div>
          </div>

          <p className="text-xl mb-8 opacity-90">
            Don't miss out on this exclusive fall discount. Book your consultation today to secure your savings!
          </p>
        </div>

        {/* Calendar Embed Section */}
        <div className="bg-white rounded-2xl px-1.5 py-8 shadow-lg mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#2D2D2D] mb-4">
              Schedule Your Consultation
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a time that works for you to discuss your project details, timeline, and secure your fall discount.
            </p>
          </div>

          {/* Calendar Embed */}
          <div className="max-w-4xl mx-auto">
            <iframe 
              src="https://api.leadconnectorhq.com/widget/booking/wbJJIOUM9g94NdNGDuD8" 
              style={{width: '100%', border: 'none', overflow: 'auto'}} 
              scrolling="yes" 
              id="wbJJIOUM9g94NdNGDuD8_1759251412946"
              className="min-h-[600px] rounded-lg"
            />
            <br />
            <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript" />
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl px-1.5 py-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6 text-center">
            What Happens Next
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#68a71d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">Quote Generated</h4>
              <p className="text-gray-600">Your detailed quote has been downloaded to your device</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#68a71d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">Schedule Consultation</h4>
              <p className="text-gray-600">Book your consultation using the calendar above</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#68a71d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">Project Planning</h4>
              <p className="text-gray-600">We'll discuss your project details and timeline</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-[#68a71d]/10 to-[#D4AF37]/10 rounded-2xl px-1.5 py-8">
          <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6 text-center">
            Why Choose Discovery Homes
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-[#2D2D2D] mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Ready in weeks, not months</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Home size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-[#2D2D2D] mb-2">Quality Built</h4>
              <p className="text-sm text-gray-600">Climate-controlled manufacturing</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Check size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-[#2D2D2D] mb-2">25+ Years</h4>
              <p className="text-sm text-gray-600">Proven track record</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-[#2D2D2D] mb-2">Expert Support</h4>
              <p className="text-sm text-gray-600">Dedicated project specialists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
