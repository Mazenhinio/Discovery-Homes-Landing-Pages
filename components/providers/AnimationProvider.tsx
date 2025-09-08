'use client'

import { useEffect, useRef } from 'react'

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    // Ensure page content is always visible
    const pageContent = document.querySelector('.page-content') as HTMLElement
    if (pageContent) {
      pageContent.style.opacity = '1'
      pageContent.style.transform = 'translateY(0)'
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion || initialized.current) {
      return
    }

    initialized.current = true

    // Temporarily disable Lenis to fix scroll performance issues
    // Keep basic GSAP animations without smooth scrolling
    const initializeAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        
        // Basic GSAP setup without ScrollTrigger for now
        gsap.registerPlugin()
        
        // Simple fade-in animations for sections
        const sections = document.querySelectorAll('.animate-section')
        sections.forEach((section) => {
          const element = section as HTMLElement
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        })

      } catch (error) {
        console.log('Animation initialization skipped:', error)
      }
    }

    // Delay initialization slightly to ensure DOM is ready
    const timer = setTimeout(initializeAnimations, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <>{children}</>
} 