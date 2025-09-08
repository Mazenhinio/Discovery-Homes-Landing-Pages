'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, MapPin, Clock, Star, Shield, Award, Zap } from 'lucide-react'

export function TrustSignals() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { 
      number: "100+", 
      label: "Homes Delivered", 
      icon: <Building2 className="w-8 h-8 text-discovery-gold" />,
      description: "Premium modular homes delivered across Canada"
    },
    { 
      number: "10+", 
      label: "Communities Served", 
      icon: <MapPin className="w-8 h-8 text-discovery-gold" />,
      description: "Indigenous and remote communities nationwide"
    },
    { 
      number: "15+", 
      label: "Years Experience", 
      icon: <Clock className="w-8 h-8 text-discovery-gold" />,
      description: "Decades of expertise in modular construction"
    },
    { 
      number: "99%", 
      label: "Customer Satisfaction", 
      icon: <Star className="w-8 h-8 text-discovery-gold" />,
      description: "Exceeding expectations with every build"
    }
  ]

  const certifications = [
    { 
      name: "Licensed & Insured", 
      icon: <Shield className="w-5 h-5 text-discovery-gold" />,
      description: "Fully licensed and insured for your protection"
    },
    { 
      name: "CSA Certified", 
      icon: <Award className="w-5 h-5 text-discovery-gold" />,
      description: "Canadian Standards Association certified"
    },
    { 
      name: "Energy Star Ready", 
      icon: <Zap className="w-5 h-5 text-discovery-gold" />,
      description: "Energy efficient and environmentally conscious"
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
    <section ref={sectionRef} className="section-sm glass-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-4 left-10 w-16 h-16 bg-discovery-gold/20 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-4 right-10 w-20 h-20 bg-discovery-gold/15 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-discovery-white mb-4">
            Trusted by Communities Across Canada
          </h2>
          <p className="text-discovery-white/80 text-lg max-w-2xl mx-auto">
            Our commitment to excellence and community partnership has made us the trusted choice for modular home solutions.
          </p>
        </div>

        <div className="animate-cards grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="card-item card-luxury micro-interaction group hover:shadow-2xl hover:shadow-discovery-gold/20"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="card-body text-center p-6">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-bold text-gradient mb-3 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  {stat.number}
                </div>
                <div className="text-discovery-charcoal font-semibold text-sm mb-2">
                  {stat.label}
                </div>
                <div className="text-discovery-charcoal/70 text-xs leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Trust badges */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {certifications.map((cert, index) => (
            <div key={cert.name} className="flex flex-col items-center space-y-3 micro-interaction group">
              <div className="p-3 bg-discovery-gold/10 rounded-full group-hover:bg-discovery-gold/20 transition-all duration-300">
                {cert.icon}
              </div>
              <div className="text-center">
                <div className="text-discovery-white font-semibold text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-discovery-white/70 text-xs max-w-32">
                  {cert.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 