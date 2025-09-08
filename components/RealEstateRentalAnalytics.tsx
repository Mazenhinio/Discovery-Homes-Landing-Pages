'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  customDimensions?: Record<string, string>
}

export function RealEstateRentalAnalytics() {
  const pathname = usePathname()

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Real Estate Rental Landing Page',
          page_location: window.location.href,
          custom_map: {
            'custom_parameter_1': 'real_estate_rental_landing',
            'custom_parameter_2': 'rental_investment'
          }
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView', {
          content_name: 'Real Estate Rental Landing Page',
          content_category: 'Rental Investment'
        })
      }

      // LinkedIn Insight Tag
      if (window.lintrk) {
        window.lintrk('track', {
          conversion_id: 'real_estate_rental_landing_page_view'
        })
      }
    }
  }, [pathname])

  // Track form submissions
  const trackFormSubmission = (formData: any) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Real Estate Rental Landing Page',
          event_label: 'ROI Calculator Form',
          value: 1,
          custom_map: {
            'custom_parameter_1': 'real_estate_rental_landing',
            'custom_parameter_2': formData.portfolioSize || 'unknown',
            'custom_parameter_3': formData.investmentBudget || 'unknown'
          }
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'ROI Calculator',
          content_category: 'Rental Investment',
          value: 1.00,
          currency: 'CAD'
        })
      }

      // LinkedIn Insight Tag
      if (window.lintrk) {
        window.lintrk('track', {
          conversion_id: 'real_estate_rental_form_submission'
        })
      }
    }
  }

  // Track button clicks
  const trackButtonClick = (buttonName: string, section: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'Real Estate Rental Landing Page',
          event_label: `${section} - ${buttonName}`,
          value: 1
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'ClickButton', {
          content_name: buttonName,
          content_category: section
        })
      }
    }
  }

  // Track scroll depth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let maxScroll = 0
      let scrollTracking = false

      const trackScroll = () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
        
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent
          
          // Track scroll milestones
          if (scrollPercent >= 25 && !scrollTracking) {
            trackScrollDepth(25)
            scrollTracking = true
          } else if (scrollPercent >= 50) {
            trackScrollDepth(50)
          } else if (scrollPercent >= 75) {
            trackScrollDepth(75)
          } else if (scrollPercent >= 90) {
            trackScrollDepth(90)
          }
        }
      }

      const trackScrollDepth = (depth: number) => {
        if (window.gtag) {
          window.gtag('event', 'scroll', {
            event_category: 'Real Estate Rental Landing Page',
            event_label: `Scroll Depth - ${depth}%`,
            value: depth
          })
        }
      }

      window.addEventListener('scroll', trackScroll)
      return () => window.removeEventListener('scroll', trackScroll)
    }
  }, [])

  // Track time on page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const startTime = Date.now()
      
      const trackTimeOnPage = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000)
        
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'Real Estate Rental Landing Page',
            value: timeSpent,
            event_category: 'Engagement'
          })
        }
      }

      // Track at 30 seconds, 1 minute, 2 minutes, 5 minutes
      const intervals = [30, 60, 120, 300]
      
      intervals.forEach(seconds => {
        setTimeout(() => {
          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: `Real Estate Rental Landing Page - ${seconds}s`,
              value: seconds,
              event_category: 'Engagement'
            })
          }
        }, seconds * 1000)
      })

      // Track when user leaves page
      window.addEventListener('beforeunload', trackTimeOnPage)
      return () => window.removeEventListener('beforeunload', trackTimeOnPage)
    }
  }, [])

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.realEstateRentalAnalytics = {
        trackFormSubmission,
        trackButtonClick
      }
    }
  }, [])

  return null // This component doesn't render anything
}

// TypeScript declarations for component-specific functionality
declare global {
  interface Window {
    realEstateRentalAnalytics?: {
      trackFormSubmission: (formData: any) => void
      trackButtonClick: (buttonName: string, section: string) => void
    }
  }
} 