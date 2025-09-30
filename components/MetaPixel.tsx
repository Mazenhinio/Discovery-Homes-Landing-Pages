'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Generate unique event ID for deduplication
const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function MetaPixel() {
  const pathname = usePathname()
  const hasInitialized = useRef(false)
  const lastTrackedPath = useRef('')
  const eventIdRef = useRef('')

  useEffect(() => {
    // Only initialize once globally with multiple guard rails
    if (
      typeof window !== 'undefined' && 
      !window.fbq && 
      !window._fbPixelInitialized && 
      !hasInitialized.current
    ) {
      // Set multiple flags to prevent duplicate initialization
      window._fbPixelInitialized = true
      hasInitialized.current = true
      
      // Load Facebook Pixel with enhanced error handling
      try {
        ;(function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
          if (f.fbq) return
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          }
          if (!f._fbq) f._fbq = n
          n.push = n
          n.loaded = !0
          n.version = '2.0'
          n.queue = []
          t = b.createElement(e)
          t.async = !0
          t.src = v
          s = b.getElementsByTagName(e)[0]
          s.parentNode.insertBefore(t, s)
        })(
          window,
          document,
          'script',
          'https://connect.facebook.net/en_US/fbevents.js',
          undefined,
          undefined,
          undefined
        )

        // Initialize Facebook Pixel with error handling
        window.fbq('init', '24293734826978109', {
          autoConfig: true,
          debug: process.env.NODE_ENV === 'development'
        })
        
        console.log('Meta Pixel initialized successfully')
      } catch (error) {
        console.error('Meta Pixel initialization failed:', error)
        // Reset flags on error
        window._fbPixelInitialized = false
        hasInitialized.current = false
      }
    }
  }, []) // Empty dependency array = run once on mount

  // Track PageView with enhanced deduplication
  useEffect(() => {
    if (
      typeof window !== 'undefined' && 
      window.fbq && 
      pathname && 
      pathname !== lastTrackedPath.current
    ) {
      // Generate unique event ID for this page view
      const eventId = generateEventId()
      eventIdRef.current = eventId
      lastTrackedPath.current = pathname
      
      // Use trackSingle to ensure event goes to specific pixel
      // and include event_id for deduplication
      window.fbq('trackSingle', '24293734826978109', 'PageView', {
        page_location: window.location.href,
        page_title: document.title
      }, {
        eventID: eventId
      })
      
      console.log('Meta Pixel PageView tracked for:', pathname, 'Event ID:', eventId)
    }
  }, [pathname])

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=24293734826978109&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  )
}

// Type declaration for window.fbq
declare global {
  interface Window {
    fbq: any
    _fbq: any
    _fbPixelInitialized?: boolean
    [key: string]: any
  }
}
