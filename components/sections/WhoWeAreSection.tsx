export function WhoWeAreSection() {
  return (
    <section className="py-16 bg-white bg-eco-radial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-nature mb-4 nature-shimmer">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discovery Homes believes a home is more than walls and a roof — it's a foundation 
            for stronger families, thriving communities, and a better future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-discovery-forest to-discovery-sage rounded-full flex items-center justify-center mx-auto mb-4 glow-forest leaf-sway group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-discovery-forest">Quality Construction</h3>
            <p className="text-gray-600">Built to last with premium materials and expert craftsmanship.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-discovery-sage to-discovery-lime rounded-full flex items-center justify-center mx-auto mb-4 glow-green leaf-sway group-hover:scale-110 transition-all duration-300" style={{animationDelay: '0.5s'}}>
              <span className="text-discovery-charcoal font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-discovery-sage">Cultural Respect</h3>
            <p className="text-gray-600">Honoring local values and traditions in every community we serve.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-discovery-lime to-discovery-sage rounded-full flex items-center justify-center mx-auto mb-4 glow-lime leaf-sway group-hover:scale-110 transition-all duration-300" style={{animationDelay: '1s'}}>
              <span className="text-discovery-charcoal font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-discovery-lime-dark">Sustainable Future</h3>
            <p className="text-gray-600">Net-zero options and environmentally conscious building practices.</p>
          </div>
        </div>
      </div>
    </section>
  )
} 