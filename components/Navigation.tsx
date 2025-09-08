'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBuildsDropdownOpen, setIsBuildsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>()

  // No nav-widget coupling; nav is purely responsive by CSS

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setIsBuildsDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsBuildsDropdownOpen(false)
    }, 150) // Small delay before closing
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass backdrop-blur-20 shadow-luxury' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center micro-interaction">
              <img
                src="/assets/images/logo/logo-header.webp"
                alt="Discovery Homes"
                className="h-14 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Our Builds Luxury Dropdown */}
            <div 
              className="relative nav-item"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button className="nav-link nav-link-nature flex items-center group py-4">
                <span className="text-gradient-nature font-semibold">Our Builds</span>
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-300 text-discovery-sage ${
                    isBuildsDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {isBuildsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 dropdown-luxury z-50">
                  <div className="py-2">
                    <Link 
                      href="/our-builds" 
                      className="dropdown-item block text-discovery-charcoal hover:text-discovery-gold font-medium"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold">All Builds</div>
                          <div className="text-xs text-gray-500">Complete Overview</div>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <Link 
                      href="/our-builds/pine-1" 
                      className="dropdown-item block text-discovery-charcoal hover:text-discovery-gold"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                                                <div className="font-semibold">Pine</div>
                      <div className="text-xs text-gray-500">504 sq/ft • 1 Bedroom • $174,000</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/our-builds/pine-2" 
                      className="dropdown-item block text-discovery-charcoal hover:text-discovery-gold"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                                                <div className="font-semibold">Spruce</div>
                      <div className="text-xs text-gray-500">504 sq/ft • 2 Bedroom + Loft • $179,000</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/our-builds/pine-3" 
                      className="dropdown-item block text-discovery-charcoal hover:text-discovery-gold"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                                                <div className="font-semibold">Willow</div>
                      <div className="text-xs text-gray-500">240 sq/ft + Loft • $99,000</div>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <Link 
                      href="/our-builds/custom" 
                      className="dropdown-item block text-discovery-charcoal hover:text-discovery-gold"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold text-gradient-eco">Custom Builds</div>
                          <div className="text-xs text-gray-500">Tailored to Your Vision</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/quote-builder" className="nav-link nav-link-eco nav-item">
              <span className="font-semibold text-discovery-sage hover:text-discovery-lime transition-colors">Get Quote</span>
            </Link>
            <Link href="/success-stories" className="nav-link nav-item">
              <span className="font-medium">Success Stories</span>
            </Link>
            <Link href="/meet-the-owners" className="nav-link nav-item">
              <span className="font-medium">Meet the Owners</span>
            </Link>
            <Link href="/partnerships" className="nav-link nav-item">
              <span className="font-medium">Partnerships</span>
            </Link>
            <Link href="/webinars" className="nav-link nav-item">
              <span className="font-medium">Webinars</span>
            </Link>
            <Link href="/blog" className="nav-link nav-item">
              <span className="font-medium">Blog</span>
            </Link>
            <Link href="/contact" className="nav-link nav-item">
              <span className="font-medium">Contact</span>
            </Link>
            <Link 
              href="/quote-builder" 
              className="btn-nature nav-item shadow-sage micro-interaction glow-green"
            >
              Start Your Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-discovery-charcoal hover:text-discovery-gold focus:outline-none transition-all duration-300 micro-interaction"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}></div>
                <div className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-out ${
          isOpen 
            ? 'max-h-screen opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="glass-dark rounded-2xl mt-4 overflow-hidden">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Our Builds Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsBuildsDropdownOpen(!isBuildsDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-discovery-white hover:text-discovery-gold transition-all duration-300 rounded-lg hover:bg-white/10"
                >
                  <span className="font-semibold text-gradient-nature">Our Builds</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-300 ${
                      isBuildsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  isBuildsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 space-y-1 border-l-2 border-discovery-gold/30 ml-4">
                    <Link 
                      href="/our-builds" 
                      className="block px-4 py-2 text-sm text-discovery-white/80 hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      All Builds
                    </Link>
                    <Link 
                      href="/our-builds/pine-1" 
                      className="block px-4 py-2 text-sm text-discovery-white/80 hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      Pine - The Efficient One
                    </Link>
                    <Link 
                      href="/our-builds/pine-2" 
                      className="block px-4 py-2 text-sm text-discovery-white/80 hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      Spruce - The Versatile One
                    </Link>
                    <Link 
                      href="/our-builds/pine-3" 
                      className="block px-4 py-2 text-sm text-discovery-white/80 hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      Willow - The Minimalist
                    </Link>
                    <Link 
                      href="/our-builds/custom" 
                      className="block px-4 py-2 text-sm text-discovery-white/80 hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      Custom Build Options
                    </Link>
                  </div>
                </div>
              </div>

              <Link 
                href="/quote-builder" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Quote
              </Link>
              <Link 
                href="/success-stories" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Success Stories
              </Link>
              <Link 
                href="/webinars" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Webinars
              </Link>
              <Link 
                href="/meet-the-owners" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Meet the Owners
              </Link>
              <Link 
                href="/partnerships" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Partnerships
              </Link>
              <Link 
                href="/blog" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-3 text-discovery-white hover:text-discovery-gold transition-colors duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-white/20">
                <Link 
                  href="/quote-builder" 
                  className="block mx-2 px-6 py-3 bg-gradient-to-r from-discovery-sage to-discovery-forest text-discovery-white rounded-lg font-semibold text-center shadow-sage micro-interaction glow-green"
                  onClick={() => setIsOpen(false)}
                >
                  Start Your Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 