'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Home, Mountain } from 'lucide-react'

export function PathSelectionCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const paths = [
    {
      title: "First Nations Communities",
      description: "Culturally-respectful modular housing solutions",
      href: "/first-nations",
      icon: <Users className="w-6 h-6 text-discovery-gold" />,
      color: "bg-discovery-forest"
    },
    {
      title: "Land Owners",
      description: "Turn your acreage into your dream home",
      href: "/land-owners", 
      icon: <Home className="w-6 h-6 text-discovery-gold" />,
      color: "bg-discovery-sage"
    },
    {
      title: "Resort Owners",
      description: "Premium rental and hospitality solutions",
      href: "/resort-owners",
      icon: <Mountain className="w-6 h-6 text-discovery-gold" />,
      color: "bg-discovery-lime"
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
    <section ref={sectionRef} className="relative overflow-hidden py-2 sm:py-3 bg-discovery-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-2 sm:mb-3">
          <h2 className="text-xl md:text-2xl font-bold text-discovery-charcoal mb-1">
            Choose The Right Path For You
          </h2>
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {paths.map((path, index) => (
            <Link
              key={path.href}
              href={path.href}
              className={`group card-item card-luxury micro-interaction hover:shadow-2xl hover:shadow-discovery-gold/20 transition-all duration-500 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-body p-1 sm:p-2 text-center">
                {/* Icon */}
                <div className={`w-8 h-8 mx-auto mb-1 rounded-full ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {path.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xs sm:text-sm font-bold text-discovery-charcoal mb-1 group-hover:text-discovery-gold transition-colors duration-300">
                  {path.title}
                </h3>
                
                <p className="text-discovery-charcoal/70 text-xs mb-1">
                  {path.description}
                </p>
                
                {/* CTA Arrow */}
                <div className="flex items-center justify-center text-discovery-gold group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-xs font-semibold mr-1">Learn More</span>
                  <div className="w-6 h-6 rounded-full bg-discovery-gold/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
