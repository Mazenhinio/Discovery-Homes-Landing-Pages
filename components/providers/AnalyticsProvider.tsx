'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsConfig, trackPageView } from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  useEffect(() => {
    // Initialize Google Analytics 4
    if (analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.measurementId !== 'G-XXXXXXXXXX') {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalytics.measurementId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      })

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize Facebook Pixel (for future use)
    if (analyticsConfig.facebookPixel.enabled && analyticsConfig.facebookPixel.pixelId) {
      // Facebook Pixel code would go here
      // This is a placeholder for future implementation
    }
  }, [])

  useEffect(() => {
    // Initialize LinkedIn Insight Tag (for future use)
    if (analyticsConfig.linkedinInsight.enabled && analyticsConfig.linkedinInsight.partnerId) {
      // LinkedIn Insight Tag code would go here
      // This is a placeholder for future implementation
    }
  }, [])

  useEffect(() => {
    // Initialize Hotjar (for future use)
    if (analyticsConfig.hotjar.enabled && analyticsConfig.hotjar.hjid) {
      // Hotjar code would go here
      // This is a placeholder for future implementation
    }
  }, [])

  return <>{children}</>
}

// Note: Global type declarations are handled in lib/analytics.ts
