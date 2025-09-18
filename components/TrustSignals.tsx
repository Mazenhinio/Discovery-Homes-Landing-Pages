'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, Sprout, DollarSign, Wrench } from 'lucide-react'

export function TrustSignals() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { 
      number: "Faster Move-In", 
      label: "30-50% quicker than traditional builds", 
      icon: <Home className="w-8 h-8 text-discovery-gold" />
    },
    { 
      number: "Sustainable", 
      label: "Net-Zero & Off-Grid options", 
      icon: <Sprout className="w-8 h-8 text-discovery-gold" />
    },
    { 
      number: "Affordable Quality", 
      label: "Predictable costs, premium finishes included", 
      icon: <DollarSign className="w-8 h-8 text-discovery-gold" />
    },
    { 
      number: "Built for Canada", 
      label: "CSA-certified, engineered for harsh climates", 
      icon: <Wrench className="w-8 h-8 text-discovery-gold" />
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-4 left-10 w-16 h-16 bg-discovery-gold/20 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-4 right-10 w-20 h-20 bg-discovery-gold/15 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-discovery-white mb-4 sm:mb-6 leading-tight">
            Why Discovery Homes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-discovery-gold to-discovery-lime mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-discovery-sage max-w-3xl mx-auto leading-relaxed">
            Trusted by communities across Western Canada for sustainable, quality modular housing solutions.
          </p>
        </div>

        <div className="animate-cards grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="card-item card-luxury micro-interaction group hover:shadow-2xl hover:shadow-discovery-gold/20"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="card-body text-center p-2 sm:p-3">
                <div className="mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className={`text-xs sm:text-sm md:text-base font-bold text-gradient mb-1 sm:mb-2 transition-all duration-1000 whitespace-nowrap ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  {stat.number}
                </div>
                <div className="text-discovery-charcoal font-semibold text-xs sm:text-sm mb-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 