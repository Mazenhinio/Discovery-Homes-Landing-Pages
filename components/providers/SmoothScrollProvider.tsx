'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Temporarily disable smooth scrolling to fix production delays
    // This ensures normal, responsive scrolling behavior
    document.documentElement.style.scrollBehavior = 'auto'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return <>{children}</>
} 