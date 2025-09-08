import { HeroSection } from '@/components/sections/HeroSection'
import { WhoWeAreSection } from '@/components/sections/WhoWeAreSection'
import { OurBuildsSection } from '@/components/sections/OurBuildsSection'
import { WhoWeServeSection } from '@/components/sections/WhoWeServeSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { CTABanner } from '@/components/CTABanner'
import { TrustSignals } from '@/components/TrustSignals'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <div className="animate-section">
        <TrustSignals />
      </div>
      
      <div className="animate-section section-luxury">
        <WhoWeAreSection />
      </div>
      
      <div className="animate-section section-luxury">
        <OurBuildsSection />
      </div>
      
      <div className="animate-section section-luxury">
        <WhoWeServeSection />
      </div>
      
      <div className="animate-section section-luxury">
        <NewsletterSection />
      </div>
      
      <div className="animate-section">
        <CTABanner 
          title="Build Your Custom Dream Home — Net Zero & Off‑Grid Options Available"
          description="Ready to turn your land into your legacy? Our team is here to make it happen."
          primaryAction={{
            text: "Start Your Quote",
            href: "/quote-builder"
          }}
          secondaryAction={{
            text: "Schedule Consultation",
            href: "/contact"
          }}
        />
      </div>
    </div>
  )
} 