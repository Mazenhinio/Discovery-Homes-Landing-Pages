// Analytics Configuration
// This file centralizes all analytics configurations for easy management

export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED === 'true',
  },
  
  // Vercel Analytics
  vercelAnalytics: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED !== 'false',
  },
  
  // Facebook Pixel (for future use)
  facebookPixel: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
    enabled: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ENABLED === 'true',
  },
  
  // LinkedIn Insight Tag (for future use)
  linkedinInsight: {
    partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '',
    enabled: process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ENABLED === 'true',
  },
  
  // Hotjar (for future use)
  hotjar: {
    hjid: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
    hjsv: process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION || '6',
    enabled: process.env.NEXT_PUBLIC_HOTJAR_ENABLED === 'true',
  },
  
  // Microsoft Clarity
  microsoftClarity: {
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
    enabled: process.env.NEXT_PUBLIC_CLARITY_ENABLED === 'true',
  },
}

// Analytics event tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
  
  // Vercel Analytics event tracking
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { name: eventName, ...properties })
  }
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties)
  }
}

// Page view tracking
export const trackPageView = (url: string) => {
  trackEvent('page_view', { page_location: url })
}

// Device detection utilities
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') return null
  
  const userAgent = navigator.userAgent
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height
  
  // Device type detection
  let deviceType = 'desktop'
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad|Android.*Tablet|Windows.*Touch/i.test(userAgent) || (screenWidth >= 768 && screenWidth <= 1024)) {
      deviceType = 'tablet'
    } else {
      deviceType = 'mobile'
    }
  }
  
  // Operating system detection
  let os = 'unknown'
  if (/Windows/i.test(userAgent)) os = 'windows'
  else if (/Mac/i.test(userAgent)) os = 'macos'
  else if (/Linux/i.test(userAgent)) os = 'linux'
  else if (/Android/i.test(userAgent)) os = 'android'
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'ios'
  
  // Browser detection
  let browser = 'unknown'
  if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) browser = 'chrome'
  else if (/Firefox/i.test(userAgent)) browser = 'firefox'
  else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'safari'
  else if (/Edge/i.test(userAgent)) browser = 'edge'
  else if (/Opera/i.test(userAgent)) browser = 'opera'
  
  return {
    deviceType,
    os,
    browser,
    screenWidth,
    screenHeight,
    userAgent: userAgent.substring(0, 100) // Truncate for privacy
  }
}

// Device tracking function
export const trackDeviceInfo = () => {
  const deviceInfo = getDeviceInfo()
  if (deviceInfo) {
    trackEvent('device_info', deviceInfo)
  }
}

// Generate unique event ID for deduplication
const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Meta Pixel tracking functions with enhanced deduplication
export const trackMetaPixelEvent = (eventName: string, parameters?: Record<string, any>, eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const uniqueEventId = eventId || generateEventId()
    
    // Use trackSingle to ensure event goes to specific pixel
    // and include event_id for deduplication
    window.fbq('trackSingle', '24293734826978109', eventName, parameters, {
      eventID: uniqueEventId
    })
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Meta Pixel Event:', eventName, parameters, 'Event ID:', uniqueEventId)
    }
    
    return uniqueEventId
  }
  
  return null
}

// Custom event tracking for business metrics
export const trackBusinessEvent = {
  // Quote builder events
  quoteStarted: () => trackEvent('quote_started'),
  quoteCompleted: (value?: number) => trackEvent('quote_completed', { value }),
  quoteDownloaded: (type: string) => trackEvent('quote_downloaded', { type }),
  submitApplication: (formData?: any) => {
    // Track in Google Analytics
    trackEvent('submit_application', { 
      source: 'quote_builder',
      model: formData?.model,
      estimated_price: formData?.estimatedPrice,
      timeline: formData?.timeline
    })
    
    // Track in Meta Pixel
    trackMetaPixelEvent('SubmitApplication', {
      content_name: 'Quote Builder Application',
      content_category: 'Home Building',
      value: formData?.estimatedPrice || 0,
      currency: 'CAD',
      model: formData?.model || 'unknown',
      timeline: formData?.timeline || 'unknown'
    })
  },
  
  // Contact events
  contactFormSubmitted: (source: string) => trackEvent('contact_form_submitted', { source }),
  consultationScheduled: (type: string) => trackEvent('consultation_scheduled', { type }),
  
  // Content engagement
  contentDownloaded: (type: string, name: string) => trackEvent('content_downloaded', { type, name }),
  webinarRegistered: (title: string) => trackEvent('webinar_registered', { title }),
  
  // Property type interest
  propertyTypeViewed: (type: string) => trackEvent('property_type_viewed', { type }),
  customBuildViewed: (style: string) => trackEvent('custom_build_viewed', { style }),
  
  // Device tracking
  deviceInfoTracked: () => trackDeviceInfo(),
}

// Microsoft Clarity tracking functions
export const trackClarityEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName)
    
    // Optionally track additional data with custom events
    if (data) {
      // Clarity supports custom events but with limited data structure
      window.clarity('set', `event_${eventName}`, JSON.stringify(data))
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Microsoft Clarity Event:', eventName, data)
    }
  }
}

// Enhanced tracking function that integrates Clarity with other analytics
export const trackClarityPageView = (url: string) => {
  // Clarity automatically tracks page views, but we can set session info
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', 'anonymous') // Optional: identify session
    window.clarity('set', 'page_url', url)
  }
  
  // Also track in our main analytics
  trackPageView(url)
}

// Enhanced business event tracking with Clarity integration
export const trackBusinessEventWithClarity = {
  // Quote builder events
  quoteStarted: () => {
    trackEvent('quote_started')
    trackClarityEvent('quote_started')
  },
  
  quoteCompleted: (value?: number) => {
    trackEvent('quote_completed', { value })
    trackClarityEvent('quote_completed', { value })
  },
  
  quoteDownloaded: (type: string) => {
    trackEvent('quote_downloaded', { type })
    trackClarityEvent('quote_downloaded', { type })
  },
  
  submitApplication: (formData?: any) => {
    // Track in Google Analytics and Meta Pixel (existing)
    trackBusinessEvent.submitApplication(formData)
    
    // Also track in Clarity
    trackClarityEvent('application_submitted', {
      model: formData?.model,
      estimated_price: formData?.estimatedPrice,
      timeline: formData?.timeline
    })
  },
  
  // Contact events
  contactFormSubmitted: (source: string) => {
    trackEvent('contact_form_submitted', { source })
    trackClarityEvent('contact_form_submitted', { source })
  },
  
  consultationScheduled: (type: string) => {
    trackEvent('consultation_scheduled', { type })
    trackClarityEvent('consultation_scheduled', { type })
  },
  
  // Content engagement
  contentDownloaded: (type: string, name: string) => {
    trackEvent('content_downloaded', { type, name })
    trackClarityEvent('content_downloaded', { type, name })
  },
  
  webinarRegistered: (title: string) => {
    trackEvent('webinar_registered', { title })
    trackClarityEvent('webinar_registered', { title })
  },
  
  // Property type interest
  propertyTypeViewed: (type: string) => {
    trackEvent('property_type_viewed', { type })
    trackClarityEvent('property_type_viewed', { type })
  },
  
  customBuildViewed: (style: string) => {
    trackEvent('custom_build_viewed', { style })
    trackClarityEvent('custom_build_viewed', { style })
  },
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    lintrk: (...args: any[]) => void
    _linkedin_partner_id: string
    _linkedin_data_partner_id: string
    clarity: (action: string, ...args: any[]) => void
  }
}
