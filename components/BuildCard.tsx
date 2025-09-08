import Link from 'next/link'

interface BuildCardProps {
  build: {
    id: string
    name: string
    subtitle: string
    sqft: string
    bedrooms: string
    startingPrice: string
    description: string
    features: string[]
    images: string[]
    floorPlan: string
    gallery: Array<{ src: string; alt: string }>
  }
  reversed?: boolean
}

export function BuildCard({ build, reversed = false }: BuildCardProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-col-dense' : ''}`}>
      {/* Image Gallery */}
      <div className={`space-y-4 ${reversed ? 'lg:col-start-2' : ''}`}>
        <div className="aspect-video overflow-hidden rounded-2xl">
          <img 
            src={build.images[0]}
            alt={`${build.name} - ${build.subtitle}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {build.images.slice(1, 4).map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={image}
                alt={`${build.name} view ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-6 ${reversed ? 'lg:col-start-1' : ''}`}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-discovery-gold font-semibold text-lg">{build.name}</span>
            <span className="text-discovery-charcoal font-light">•</span>
            <span className="text-discovery-charcoal-light">{build.subtitle}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-4">
            {build.name} — {build.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 bg-neutral-50 rounded-xl">
          <div>
            <div className="text-sm text-neutral-600 mb-1">Size</div>
            <div className="font-semibold text-discovery-charcoal">{build.sqft}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-1">Layout</div>
            <div className="font-semibold text-discovery-charcoal">{build.bedrooms}</div>
          </div>
          <div className="col-span-2">
            <div className="text-sm text-neutral-600 mb-1">Starting Price</div>
            <div className="text-2xl font-bold text-discovery-gold">{build.startingPrice}</div>
          </div>
        </div>

        <p className="text-lg text-neutral-600 leading-relaxed">
          {build.description}
        </p>

        <div>
          <h3 className="font-semibold text-discovery-charcoal mb-3">Key Features:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {build.features.map((feature, index) => (
              <li key={index} className="flex items-center text-neutral-600">
                <div className="w-2 h-2 bg-discovery-gold rounded-full mr-3 flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/our-builds/${build.id}`}
            className="btn-primary text-center px-6 py-3"
          >
            View Details & Floor Plans
          </Link>
          <Link
            href="/quote-builder"
            className="btn-outline text-center px-6 py-3"
          >
            Get Quote for {build.name}
          </Link>
          <a
            href={build.floorPlan}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-center px-6 py-3"
          >
            Download Floor Plan
          </a>
        </div>
      </div>
    </div>
  )
} 