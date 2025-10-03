'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsConfig, trackClarityPageView } from '@/lib/analytics'

interface ClarityProviderProps {
  children: React.ReactNode
}

export function ClarityProvider({ children }: ClarityProviderProps) {
  const pathname = usePathname()
  const hasInitialized = useRef(false)
  const lastTrackedPath = useRef('')

  useEffect(() => {
    // Initialize Microsoft Clarity once
    if (
      typeof window !== 'undefined' &&
      analyticsConfig.microsoftClarity.enabled &&
      analyticsConfig.microsoftClarity.projectId &&
      !hasInitialized.current
    ) {
      try {
        // Prevent multiple initializations
        hasInitialized.current = true

        // Load Microsoft Clarity script
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${analyticsConfig.microsoftClarity.projectId}");
        `

        // Append to head
        document.head.appendChild(script)

        console.log('Microsoft Clarity initialized successfully')
      } catch (error) {
        console.error('Microsoft Clarity initialization failed:', error)
        hasInitialized.current = false
      }
    }
  }, [])

  // Track page views with Clarity when pathname changes
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      pathname &&
      lastTrackedPath.current !== pathname &&
      window.clarity
    ) {
      // Prevent duplicate tracking
      lastTrackedPath.current = pathname

      // Track page view with Clarity integration
      trackClarityPageView(pathname)

      console.log('Microsoft Clarity Page View:', pathname)
    }
  }, [pathname])

  return <>{children}</>
}
