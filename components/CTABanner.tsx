import Link from 'next/link'

interface CTABannerProps {
  title: string
  subtitle?: string
  description: string
  primaryAction: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
}

export function CTABanner({ title, subtitle, description, primaryAction, secondaryAction }: CTABannerProps) {
  return (
    <section className="section bg-nature-gradient relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-10 left-10 w-32 h-32 bg-discovery-lime/20 rounded-full blur-xl leaf-sway"></div>
        <div className="floating-element absolute bottom-20 right-20 w-40 h-40 bg-discovery-sage/10 rounded-full blur-2xl leaf-sway" style={{animationDelay: '0.5s'}}></div>
        <div className="floating-element absolute top-1/2 left-1/4 w-20 h-20 bg-discovery-forest/25 rounded-full blur-lg leaf-sway" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-discovery-white mb-2 text-shadow-luxury scale-on-scroll">
          {title}
        </h2>
        {subtitle && (
          <h3 className="text-xl md:text-2xl font-bold text-discovery-white mb-4 text-shadow-luxury scale-on-scroll">
            {subtitle}
          </h3>
        )}
        <p className="text-[15px] text-discovery-white mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed scale-on-scroll">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-cards">
          <Link
            href={primaryAction.href}
            className="card-item bg-discovery-gold border-2 border-discovery-gold text-discovery-charcoal text-base px-8 py-4 shadow-lime glow-lime micro-interaction group hover:scale-105 overflow-hidden growth-pulse"
          >
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 inline-block font-semibold">
              {primaryAction.text} →
            </span>
          </Link>
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="card-item glass-nature border-2 border-discovery-lime text-discovery-lime px-8 py-4 rounded-lg text-base font-semibold hover:glow-green transition-all duration-500 micro-interaction group hover:scale-105"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                {secondaryAction.text}
              </span>
            </Link>
          )}
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-6 opacity-60">
          <div className="w-1.5 h-1.5 bg-discovery-lime rounded-full growth-pulse"></div>
          <div className="w-1.5 h-1.5 bg-discovery-sage rounded-full growth-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-1.5 h-1.5 bg-discovery-forest rounded-full growth-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  )
} 