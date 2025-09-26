export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/assets/images/logo/discovery_homes_logo_white_text-removebg-preview.png"
              alt="Discovery Homes"
              className="h-20 w-auto"
            />
          </div>

          {/* Company Description */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-300 mb-4">
              Discovery Homes believes a home is more than walls and a roof — it&apos;s a foundation 
              for stronger families, thriving communities, and a better future.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Affordable. Modular. Ready When You Are.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex-shrink-0 text-center md:text-right">
            <div className="space-y-2">
              <div>
                <a href="tel:+1-780-870-0524" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-lg">
                  +1 (780) 870 0524
                </a>
              </div>
              <div>
                <a href="mailto:info@discoveryhomes.ca" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-lg">
                  info@discoveryhomes.ca
                </a>
              </div>
              <div className="flex gap-4 justify-center md:justify-end mt-4">
                <a 
                  href="https://app.gohighlevel.com/v2/preview/c0BIvl4xjKStFMrCsqHY?notrack=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  Terms and Conditions
                </a>
                <a 
                  href="https://app.gohighlevel.com/v2/preview/jryFzO5ua2DdePIov9hr?notrack=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 