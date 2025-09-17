'use client'

import { createContext, useContext, useRef, ReactNode } from 'react'
import { OurHomesSectionRef } from '@/components/sections/OurHomesSection'

interface OurHomesContextType {
  ourHomesRef: React.RefObject<OurHomesSectionRef>
  scrollToOurHomes: (tab?: string) => void
}

const OurHomesContext = createContext<OurHomesContextType | undefined>(undefined)

export function OurHomesProvider({ children }: { children: ReactNode }) {
  const ourHomesRef = useRef<OurHomesSectionRef>(null)

  const scrollToOurHomes = (tab?: string) => {
    console.log('scrollToOurHomes called with tab:', tab)
    
    // Wait for next tick to ensure DOM is ready
    setTimeout(() => {
      // First scroll to the section
      const element = document.getElementById('our-homes')
      console.log('Found our-homes element:', element)
      
      if (element) {
        // Force a reflow to ensure element is positioned correctly
        element.offsetHeight
        
        const rect = element.getBoundingClientRect()
        const offsetTop = window.pageYOffset + rect.top - 80 // Account for fixed header
        console.log('Element rect:', rect)
        console.log('Current scroll position:', window.pageYOffset)
        console.log('Scrolling to offset:', offsetTop)
        
        // Temporarily enable smooth scrolling for this action
        const originalScrollBehavior = document.documentElement.style.scrollBehavior
        console.log('Original scroll behavior:', originalScrollBehavior)
        document.documentElement.style.scrollBehavior = 'smooth'
        
        // Force immediate scroll
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
        console.log('Scroll command executed')
        
        // Restore original scroll behavior after animation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior
          console.log('Restored scroll behavior to:', originalScrollBehavior)
        }, 1000)
        
        // Then change the tab if specified
        if (tab && ourHomesRef.current) {
          console.log('Setting active tab to:', tab)
          // Small delay to ensure scroll has started
          setTimeout(() => {
            ourHomesRef.current?.setActiveTab(tab)
            console.log('Tab changed to:', tab)
          }, 200)
        }
      } else {
        console.warn('Our Homes section not found on this page')
        // Still try to change tab if we have the ref
        if (tab && ourHomesRef.current) {
          console.log('Setting active tab to:', tab)
          ourHomesRef.current?.setActiveTab(tab)
        }
      }
    }, 10)
  }

  return (
    <OurHomesContext.Provider value={{ ourHomesRef, scrollToOurHomes }}>
      {children}
    </OurHomesContext.Provider>
  )
}

export function useOurHomes() {
  const context = useContext(OurHomesContext)
  if (context === undefined) {
    throw new Error('useOurHomes must be used within an OurHomesProvider')
  }
  return context
}
