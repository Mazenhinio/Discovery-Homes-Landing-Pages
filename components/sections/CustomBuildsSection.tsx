import Link from 'next/link'

export function CustomBuildsSection() {
  const customOptions = [
    {
      title: "Larger Footprints",
      description: "Expandable designs for growing families or multi-generational living",
      icon: "🏠"
    },
    {
      title: "Net-Zero Ready Kits", 
      description: "Energy-efficient packages with solar and sustainable systems",
      icon: "🌱"
    },
    {
      title: "Off-Grid Solutions",
      description: "Complete independence with water, power, and waste systems",
      icon: "⚡"
    },
    {
      title: "Indigenous-Specific Designs",
      description: "Culturally-respectful layouts honoring traditional values",
      icon: "🪶"
    }
  ]

  return (
    <section className="section bg-gradient-to-br from-discovery-charcoal via-discovery-charcoal-light to-discovery-charcoal text-discovery-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Custom Build Options
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            Fully tailored modular homes: larger footprints, net-zero ready kits, off-grid solutions, 
            or culturally-specific Indigenous designs — crafted to fit each customer's unique needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {customOptions.map((option, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-discovery-gold">
                {option.title}
              </h3>
              <p className="text-discovery-white-soft leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-discovery-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-discovery-charcoal mb-6">
              Design Your Dream Home
            </h3>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Our team works with you to create the perfect modular home for your land, 
              lifestyle, and budget. From initial concept to move-in day, we're with you every step.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote-builder"
                className="bg-discovery-charcoal text-discovery-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-discovery-charcoal-light transition-colors"
              >
                Start Custom Quote
              </Link>
              <Link
                href="/contact"
                className="border-2 border-discovery-charcoal text-discovery-charcoal px-8 py-4 rounded-lg text-lg font-semibold hover:bg-discovery-charcoal hover:text-discovery-white transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 