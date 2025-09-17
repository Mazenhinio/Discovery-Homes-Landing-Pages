'use client'

import { useState } from 'react'
import Image from 'next/image'

export function PartnershipLogos() {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)

  const partnerships = [
    {
      id: 1,
      name: "Blue Spruce Builder",
      logo: "/images/partnerships/blue-spruce-builder-color.jpg",
      description: "Founded in 2021 by Jeff Lorenz, a Lloydminster area native with Red Seal certification. Committed to going above and beyond on every project with years of experience and dedication to excellence."
    },
    {
      id: 2,
      name: "D3 General Contracting",
      logo: "/images/partnerships/d3_gen-removebg-preview.png",
      description: "Local family-run company founded in 2017, proudly serving the Lakeland and Midwest areas. Specializing in new construction and renovations with a wide range of experience to turn your vision into reality."
    },
    {
      id: 3,
      name: "Kondro Electric",
      logo: "/images/partnerships/kondro.png",
      description: "Operating since 1967 with a focus on customer retention and long-term relationships. Serving commercial (60%), residential, and rural areas with 70+ employees and specialized underground cabling services."
    },
    {
      id: 4,
      name: "Geordies Woodworking",
      logo: "/images/partnerships/geordies.png",
      description: "Custom woodworking specialists serving the Lloydminster area with traditional craftsmanship and modern precision. Creating bespoke cabinetry, millwork, and custom wood solutions for residential projects."
    }
  ]

  return (
    <section className="py-8 bg-discovery-white animate-section">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-discovery-charcoal mb-4">
            Trusted Partnership Network
          </h2>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto">
            We work with industry-leading partners who share our commitment to quality, 
            sustainability, and exceptional craftsmanship in every project.
          </p>
        </div>

        {/* Partnership Logos Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-cards">
          {partnerships.map((partnership, index) => (
            <div 
              key={partnership.id}
              className="group relative"
              onMouseEnter={() => setHoveredLogo(partnership.id)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              {/* Logo Container */}
              <div className="flex items-center justify-center h-24 bg-gray-50 rounded-xl p-4 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partnership.logo}
                    alt={`${partnership.name} logo`}
                    width={100}
                    height={60}
                    className={`object-contain transition-all duration-300 ${
                      hoveredLogo === partnership.id 
                        ? 'filter-none opacity-100 scale-105' 
                        : 'grayscale opacity-70'
                    }`}
                  />
                </div>
              </div>

              {/* Description Tooltip */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-discovery-charcoal text-white p-3 rounded-lg shadow-xl transition-all duration-300 z-10 ${
                hoveredLogo === partnership.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>
                <div className="text-center">
                  <h3 className="font-bold text-discovery-gold mb-1 text-sm">
                    {partnership.name}
                  </h3>
                  <p className="text-xs leading-relaxed">
                    {partnership.description}
                  </p>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-discovery-charcoal"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Statement */}
        <div className="glass rounded-xl p-6 lg:p-8 text-center scale-on-scroll">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-discovery-charcoal mb-3">
              Quality Through Collaboration
            </h3>
            <p className="text-base text-neutral-600 mb-4">
              Our carefully selected partners bring decades of combined experience and specialized expertise 
              to every Discovery Homes project. Together, we ensure the highest standards of craftsmanship, 
              sustainability, and customer satisfaction.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-neutral-500">
              <span className="bg-discovery-gold/10 px-2 py-1 rounded-full">Licensed & Insured</span>
              <span className="bg-discovery-gold/10 px-2 py-1 rounded-full">Quality Guaranteed</span>
              <span className="bg-discovery-gold/10 px-2 py-1 rounded-full">Sustainable Practices</span>
              <span className="bg-discovery-gold/10 px-2 py-1 rounded-full">Local Expertise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
