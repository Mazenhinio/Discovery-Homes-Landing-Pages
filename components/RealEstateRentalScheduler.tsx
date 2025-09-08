'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Phone, Video, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'

interface SchedulingOption {
  id: string
  title: string
  description: string
  duration: string
  icon: any
  link: string
}

export function RealEstateRentalScheduler() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const schedulingOptions: SchedulingOption[] = [
    {
      id: 'investment-consultation',
      title: 'Portfolio Investment Consultation',
      description: 'Discuss your investment goals and explore how modular homes can scale your rental portfolio.',
      duration: '45 minutes',
      icon: DollarSign,
      link: 'https://calendly.com/discovery-homes/rental-investment-consultation'
    },
    {
      id: 'roi-analysis',
      title: 'ROI & Financial Analysis',
      description: 'Detailed analysis of potential returns, financing options, and cash flow projections.',
      duration: '60 minutes',
      icon: TrendingUp,
      link: 'https://calendly.com/discovery-homes/roi-analysis-consultation'
    },
    {
      id: 'portfolio-strategy',
      title: 'Portfolio Strategy Session',
      description: 'Strategic planning for portfolio expansion, market analysis, and investment timeline.',
      duration: '90 minutes',
      icon: Users,
      link: 'https://calendly.com/discovery-homes/portfolio-strategy-consultation'
    },
    {
      id: 'financing-review',
      title: 'Financing & Funding Review',
      description: 'Explore portfolio loans, construction financing, and bridge loan options.',
      duration: '60 minutes',
      icon: Calendar,
      link: 'https://calendly.com/discovery-homes/financing-review-consultation'
    }
  ]

  const handleSchedule = (option: SchedulingOption) => {
    window.open(option.link, '_blank')
  }

  return (
    <div className="bg-discovery-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif font-bold text-discovery-charcoal mb-4">
          Schedule Your Investment Consultation
        </h3>
        <p className="text-discovery-charcoal-light text-lg">
          Choose the consultation type that best fits your investment strategy. 
          All consultations are free and conducted by our rental property investment specialists.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {schedulingOptions.map((option) => (
          <div
            key={option.id}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedOption === option.id
                ? 'border-discovery-gold bg-discovery-gold/5'
                : 'border-discovery-charcoal/20 hover:border-discovery-gold/50'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-discovery-gold rounded-full flex items-center justify-center flex-shrink-0">
                <option.icon className="w-6 h-6 text-discovery-charcoal" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-serif font-bold text-discovery-charcoal mb-2">
                  {option.title}
                </h4>
                <p className="text-discovery-charcoal-light mb-3">
                  {option.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-discovery-gold font-semibold">
                    {option.duration}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSchedule(option)
                    }}
                    className="bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    Schedule
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-discovery-sage/10 rounded-xl">
        <h4 className="text-xl font-serif font-bold text-discovery-charcoal mb-3">
          Need Immediate Investment Advice?
        </h4>
        <p className="text-discovery-charcoal-light mb-4">
          Can't find a suitable time? Our investment specialists are available for urgent consultations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:1-800-DISCOVERY"
            className="bg-discovery-charcoal hover:bg-discovery-charcoal-dark text-discovery-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now: 1-800-DISCOVERY
          </a>
          <a
            href="mailto:investments@discoveryhomes.ca"
            className="border-2 border-discovery-charcoal text-discovery-charcoal hover:bg-discovery-charcoal hover:text-discovery-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
} 