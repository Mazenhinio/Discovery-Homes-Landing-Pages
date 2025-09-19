'use client'

import Image from 'next/image'

export function PartnershipLogos() {
  const partnerships = [
    {
      id: 1,
      name: "Blue Spruce Builder",
      logo: "/images/partnerships/blue-spruce-builder-color.jpg"
    },
    {
      id: 2,
      name: "D3 General Contracting",
      logo: "/images/partnerships/d3_gen-removebg-preview.png"
    },
    {
      id: 3,
      name: "Kondro Electric",
      logo: "/images/partnerships/kondro.png"
    },
    {
      id: 4,
      name: "Geordies Woodworking",
      logo: "/images/partnerships/geordies.png"
    }
  ]

  // Duplicate the partnerships array to create seamless loop
  const duplicatedPartnerships = [...partnerships, ...partnerships]

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-discovery-white to-gray-50 animate-section">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-discovery-charcoal mb-4 sm:mb-6 leading-tight">
            Trusted Partnership Network
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-discovery-sage to-discovery-lime mx-auto rounded-full mb-6"></div>
          <p className="text-[15px] text-discovery-charcoal-light max-w-3xl mx-auto leading-relaxed">
            We work with industry-leading partners who share our commitment to quality, 
            sustainability, and exceptional craftsmanship in every project.
          </p>
        </div>

        {/* Endless Conveyor Belt */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll">
            {duplicatedPartnerships.map((partnership, index) => (
              <div 
                key={`${partnership.id}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="relative w-32 h-20 flex items-center justify-center">
                  <Image
                    src={partnership.logo}
                    alt={`${partnership.name} logo`}
                    width={120}
                    height={80}
                    className="object-contain grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
