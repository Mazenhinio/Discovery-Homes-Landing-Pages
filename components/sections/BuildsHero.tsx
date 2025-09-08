export function BuildsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-discovery-charcoal via-discovery-charcoal-light to-discovery-charcoal text-discovery-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-discovery-lime nature-shimmer">
            Our Builds
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8 text-discovery-sage">
            Choose from our proven designs or create your custom dream home. 
            Built to respect the land, empower communities, and unlock opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/quote-builder"
              className="btn-eco px-8 py-4 rounded-lg text-lg font-semibold glow-lime growth-pulse micro-interaction"
            >
              Get My Quote
            </a>
            <a 
              href="/contact"
              className="btn-forest px-8 py-4 rounded-lg text-lg font-semibold micro-interaction"
            >
              Speak with Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 