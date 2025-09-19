import Link from 'next/link'
import Image from 'next/image'
import { Users, Home, Mountain, Award, DollarSign, Clock, Shield, Users2, Building } from 'lucide-react'

export function WhoWeServeSection() {
  const segments = [
    {
      title: "Indigenous Communities",
      description: "Culturally-aligned, grant-ready housing solutions with dedicated support and funding guidance.",
      href: "/first-nations",
      features: [
        { text: "Community partnerships", icon: Users2 },
        { text: "Cultural respect", icon: Users },
        { text: "Grant assistance", icon: Award }
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      title: "Resort & Airbnb Owners", 
      description: "High-ROI cabins and rental units designed to enhance guest experiences and maximize revenue potential.",
      href: "/resort-owners",
      features: [
        { text: "Revenue optimization", icon: DollarSign },
        { text: "Guest experience", icon: Mountain },
        { text: "Quick deployment", icon: Clock }
      ],
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      title: "Developers & Landowners",
      description: "Scalable housing solutions for landowners, developers, and large-scale residential projects.",
      href: "/land-owners",
      features: [
        { text: "Project management", icon: Shield },
        { text: "Scalable solutions", icon: Building },
        { text: "Timeline certainty", icon: Clock }
      ],
      color: "bg-indigo-100 text-indigo-800 border-indigo-200"
    }
  ]

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-discovery-sage/20 to-discovery-lime/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-charcoal mb-4 sm:mb-6 leading-tight">
            Who We Serve
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-discovery-sage to-discovery-lime mx-auto rounded-full mb-6"></div>
          <p className="text-[15px] md:text-xl text-discovery-charcoal-light max-w-3xl mx-auto leading-relaxed">
            We partner with diverse communities and organizations across Western Canada, providing tailored modular housing solutions for every unique need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {segments.map((segment) => (
            <div key={segment.title} className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-200">
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <Image src="/assets/images/logo/logo-header.webp" alt="Discovery Homes" width={48} height={48} className="h-12 w-12 object-contain" />
                </div>
                <h3 className={`inline-block px-3 py-1 rounded-full text-xl md:text-2xl font-medium mb-3 border ${segment.color}`}>
                  {segment.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed text-center text-[14px]">{segment.description}</p>
              
              <div className="mb-4">
                <ul className="space-y-3">
                  {segment.features.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <li key={index} className="flex items-center justify-center text-[14px] text-gray-700">
                        <IconComponent className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href={segment.href}
                  className="inline-block w-full bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8941F] transition-colors flex items-center justify-center gap-2"
                >
                  Learn More
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 