'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Check, Home, MapPin, Users, Building, Palette, Zap, DollarSign, Calendar, Heart, CreditCard } from 'lucide-react'
import { trackBusinessEvent } from '@/lib/analytics'

interface FormData {
  // Step 1: Contact Info
  name: string
  email: string
  phone: string
  
  // Step 2: Property Details
  location: string
  landStatus: string
  // Property proximity (required Yes/No)
  isWithin150kmOfLloydminster: string
  
  // Step 3: Intended Use
  intendedUse: string
  intendedUseOther: string
  
  // Step 4: Model Selection
  model: string
  
  // Step 5: Package Selection
  packageType: string
  
  // Step 5: Specifications
  bedrooms: string
  bathrooms: string
  sqft: string
  
  // Step 6: Add-ons
  addons: string[]

  // Finishes & Options
  siding: string
  countertops: string
  cabinets: string
  headboard: string
  flooring: string
  blinds: boolean
  faucets: string
  addCeilingFans: boolean
  addBedroomFixtures: boolean
  baseLighting: boolean
  baseTile: boolean
  featureSurfaces: boolean
  wallsFinish: string

  
  // Step 7: Budget
  budget: string
  
  // Step 8: Timeline
  timeline: string
  
  // Step 9: Indigenous Community
  isIndigenous: string
  
  // Step 10: Number of Homes
  numberOfHomes: string
  customNumberOfHomes: string
  
  // Step 11: Financing
  financing: string
  needsFinancingHelp: string
}

export default function QuoteBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepError, setStepError] = useState<string | null>(null)
  
  // Track when quote builder is started
  useEffect(() => {
    trackBusinessEvent.quoteStarted()
  }, [])
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '',
    location: '', landStatus: '',
    isWithin150kmOfLloydminster: '',
    intendedUse: '',
    intendedUseOther: '',
    model: '',
    packageType: '',
    bedrooms: '', bathrooms: '', sqft: '',
    addons: [],
    siding: 'base-metal',
    countertops: 'base-quartz',
    cabinets: 'maple-shaker',
    headboard: 'melamine',
    flooring: 'vinyl-glue-down',
    blinds: false,
    faucets: 'stainless',
    addCeilingFans: false,
    addBedroomFixtures: false,
    baseLighting: true,
    baseTile: true,
    featureSurfaces: false,
    wallsFinish: 'drywall',


    budget: '',
    timeline: '',
    isIndigenous: '',
    numberOfHomes: '',
    customNumberOfHomes: '',
    financing: '',
    needsFinancingHelp: ''
  })
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)


  const totalSteps = 13

  const steps = [
    { number: 1, title: 'Contact Info', icon: Users },
    { number: 2, title: 'Property Details', icon: MapPin },
    { number: 3, title: 'Intended Use', icon: Home },
    { number: 4, title: 'Model Selection', icon: Building },
    { number: 5, title: 'Package', icon: Zap },
    { number: 6, title: 'Specifications', icon: Palette },
    { number: 7, title: 'Finishes & Options', icon: Palette },
    { number: 8, title: 'Add-ons', icon: Zap },
    { number: 9, title: 'Budget Range', icon: DollarSign },
    { number: 10, title: 'Timeline', icon: Calendar },
    { number: 11, title: 'Indigenous Community', icon: Heart },
    { number: 12, title: 'Number of Homes', icon: Home },
    { number: 13, title: 'Financing', icon: CreditCard }
  ]

  const formatCurrency = (n: number) => n.toLocaleString()

  const clampRange = (min: number, max: number) => ({ min: Math.round(min), max: Math.round(max) })

  const getModelBasePrice = () => {
    switch (formData.model) {
      case 'pine1': return 174000
      case 'pine2': return 179000
      case 'pine3': return 99000
      case 'custom': {
        const sqftNumber = parseInt(formData.sqft.replace(/\D/g, '')) || 800
        if (sqftNumber <= 800) return 200000
        if (sqftNumber <= 1200) return 280000
        if (sqftNumber <= 1800) return 380000
        if (sqftNumber <= 2400) return 480000
        return 580000
      }
      default: return 0
    }
  }

  const getModelRangeFor = (model: string) => {
    let base = 0
    switch (model) {
      case 'pine1': base = 174000; break
      case 'pine2': base = 179000; break
      case 'pine3': base = 99000; break
      default: base = 0
    }
    return clampRange(base * 0.95, base * 1.1)
  }

  const getModelRange = () => {
    const base = getModelBasePrice()
    // Return exact base price - no range
    return clampRange(base, base)
  }

  const isWoodGrainEligible = () => {
    // Eligible when model is Willow (studio) or when floor area equals approx 504 sq ft
    if (formData.model === 'pine3') return true
    const sqftNumber = parseInt((formData.sqft || '').replace(/\D/g, ''))
    return sqftNumber >= 500 && sqftNumber <= 510
  }

  const getPackageRange = () => {
    if (formData.packageType === 'net-zero') return clampRange(31500, 38500)
    if (formData.packageType === 'off-grid') return clampRange(36000, 44000)
    return clampRange(0, 0)
  }

  const addOnRanges: Record<string, { min: number; max: number }> = {
    'solar': { min: 15000, max: 20000 },
    'net-zero': { min: 31500, max: 38500 },
    'off-grid': { min: 36000, max: 44000 },
    'deck': { min: 8000, max: 12000 },
    'appliances': { min: 12000, max: 15000 },
    'smart-home': { min: 4500, max: 5500 },
    'fireplace': { min: 5000, max: 8000 },
  }

  const getAddOnsRange = () => {
    let min = 0
    let max = 0
    formData.addons.forEach((addon) => {
      if (formData.packageType === 'net-zero' && addon === 'net-zero') return
      if (formData.packageType === 'off-grid' && addon === 'off-grid') return
      const r = addOnRanges[addon]
      if (!r) return
      min += r.min
      max += r.max
    })
    return clampRange(min, max)
  }

  const getFinishesRange = () => {
    let min = 0
    let max = 0

    // Siding
    if (formData.siding === 'wood-grain' && isWoodGrainEligible()) {
      const sqftNumber = parseInt((formData.sqft || '').replace(/\D/g, ''))
      if (sqftNumber <= 240) { 
        min += 4000; max += 4400 
      } else { 
        min += 6000; max += 6600 
      }
    }

    // Faucets
    if (formData.faucets === 'bronze') { min += 450; max += 600 }

    // Walls upgrade
    if (formData.wallsFinish === 'woodboard-stained') { min += 4050; max += 4950 }
    


    // Bedroom counts for lighting
    const bedroomCount = (() => {
      if (formData.bedrooms === '4+') return 4
      const n = parseInt(formData.bedrooms.replace(/\D/g, ''))
      return isNaN(n) ? 0 : n
    })()

    // Bathroom counts for ceiling fans
    const bathroomCount = (() => {
      if (formData.bathrooms === '4+') return 4
      const n = parseInt(formData.bathrooms.replace(/\D/g, ''))
      return isNaN(n) ? 0 : n
    })()

    if (formData.addCeilingFans) { min += 540 * bathroomCount; max += 660 * bathroomCount }
    if (formData.addBedroomFixtures) { min += 450; max += 550 }
    if (formData.featureSurfaces) { min += 800; max += 1200 }

    // Items with pricing pending remain 0
    return clampRange(min, max)
  }

  const getFinishItemsRange = () => {
    const items: { label: string; min?: number; max?: number; tbd?: boolean }[] = []
    // Siding
    if (formData.siding === 'wood-grain' && isWoodGrainEligible()) {
      const sqftNumber = parseInt((formData.sqft || '').replace(/\D/g, ''))
      if (sqftNumber <= 240) {
        items.push({ label: 'Siding: Wood Grain', min: 4000, max: 4400 })
      } else {
        items.push({ label: 'Siding: Wood Grain', min: 6000, max: 6600 })
      }
    }
    // Faucets
    if (formData.faucets === 'bronze') items.push({ label: 'Faucets: Bronze', min: 450, max: 600 })
    // Walls upgrade
    if (formData.wallsFinish === 'woodboard-stained') items.push({ label: 'Walls: Woodboard or Stained', min: 4050, max: 4950 })
    

    // Bedroom-dependent items
    const brCount = (() => { if (formData.bedrooms === '4+') return 4; const n = parseInt(formData.bedrooms.replace(/\D/g, '')); return isNaN(n) ? 0 : n })()
    // Bathroom-dependent items
    const bathCount = (() => { if (formData.bathrooms === '4+') return 4; const n = parseInt(formData.bathrooms.replace(/\D/g, '')); return isNaN(n) ? 0 : n })()
    if (formData.addCeilingFans && bathCount > 0) items.push({ label: `Ceiling Fans (${bathCount} Bath)`, min: 540 * bathCount, max: 660 * bathCount })
    if (formData.addBedroomFixtures) items.push({ label: 'Enhanced Kitchen Tile', min: 450, max: 550 })
    if (formData.featureSurfaces) items.push({ label: 'Feature Surfaces', min: 800, max: 1200 })
    // Items with pending pricing
    if (formData.countertops === 'upgrade-quartz') items.push({ label: 'Countertops: Premium Quartz', tbd: true })
    if (formData.cabinets === 'painted-thermo') items.push({ label: 'Cabinets: Painted / Thermo', tbd: true })
    if (formData.cabinets === 'melamine') items.push({ label: 'Cabinets: Melamine (Downgrade)', tbd: true })
    if (formData.headboard === 'maple-paint-thermo') items.push({ label: 'Headboard: Maple / Paint / Thermo', tbd: true })
    if (formData.flooring === 'vinyl-upgrade') items.push({ label: 'Flooring: Better Vinyl', tbd: true })
    if (formData.blinds) items.push({ label: 'Blinds', tbd: true })
    return items
  }

  const calculatePriceRange = () => {
    const model = getModelRange()
    const pkg = getPackageRange()
    const addons = getAddOnsRange()
    const finishes = getFinishesRange()
    const homes = (() => {
      if (formData.numberOfHomes === '4+') {
        const customNumber = parseInt(formData.customNumberOfHomes || '4')
        return isNaN(customNumber) || customNumber < 4 ? 4 : Math.min(customNumber, 100)
      }
      const n = parseInt((formData.numberOfHomes || '1').replace(/\D/g, ''))
      return isNaN(n) || n < 1 ? 1 : Math.min(n, 3)
    })()
    const min = (model.min + pkg.min + addons.min + finishes.min) * homes
    const max = (model.max + pkg.max + addons.max + finishes.max) * homes
    return clampRange(min, max)
  }

  const calculatePrice = () => {
    let basePrice = 0
    
    // Base model pricing
    switch (formData.model) {
      case 'pine1':
        basePrice = 174000
        break
      case 'pine2':
        basePrice = 179000
        break
      case 'pine3':
        basePrice = 99000
        break
      case 'custom':
        // Custom build pricing based on square footage
        const sqftNumber = parseInt(formData.sqft.replace(/\D/g, '')) || 800
        if (sqftNumber <= 800) {
          basePrice = 200000
        } else if (sqftNumber <= 1200) {
          basePrice = 280000
        } else if (sqftNumber <= 1800) {
          basePrice = 380000
        } else if (sqftNumber <= 2400) {
          basePrice = 480000
        } else {
          basePrice = 580000 // 3000+ sq ft
        }
        break
    }
    
    // Add-on pricing
    let addonCost = 0
    formData.addons.forEach(addon => {
      // Avoid double counting if package already includes these features
      if (formData.packageType === 'net-zero' && addon === 'net-zero') return
      if (formData.packageType === 'off-grid' && addon === 'off-grid') return
      switch (addon) {
        case 'solar':
          addonCost += 17500 // Midpoint of $15,000-$20,000 range
          break
        case 'net-zero':
          addonCost += 35000
          break
        case 'off-grid':
          addonCost += 40000
          break
        case 'garage':
          addonCost += 30000
          break
        case 'deck':
          // Deck pricing based on 150km range
          if (formData.isWithin150kmOfLloydminster === 'yes') {
            addonCost += 8000
          } else {
            addonCost += 12000 // Higher cost for outside 150km range
          }
          break
        case 'appliances':
          // Appliances pricing based on 150km range (similar to deck)
          if (formData.isWithin150kmOfLloydminster === 'yes') {
            addonCost += 12000
          } else {
            addonCost += 15000 // Higher cost for outside 150km range
          }
          break
        case 'smart-home':
          addonCost += 5000
          break
        case 'upgraded-finishes':
          addonCost += 18000
          break
        case 'foundation':
          addonCost += 20000
          break
        case 'fireplace':
          addonCost += 6500 // Midpoint of $5,000-$8,000 range
          break
      }
    })
    
    // Package pricing
    let packageCost = 0
    if (formData.packageType === 'net-zero') packageCost += 35000
    if (formData.packageType === 'off-grid') packageCost += 40000
    
    // Finishes & options pricing
    let finishesCost = 0
    if (formData.siding === 'wood-grain') {
      finishesCost += (formData.model === 'pine3') ? 4000 : 6000
    }
    if (formData.faucets === 'bronze') finishesCost += 500
    if (formData.wallsFinish === 'woodboard-stained') finishesCost += 4500


    const bedroomCount = (() => {
      if (formData.bedrooms === '4+') return 4
      const n = parseInt(formData.bedrooms.replace(/\D/g, ''))
      return isNaN(n) ? 0 : n
    })()
    const bathroomCount = (() => {
      if (formData.bathrooms === '4+') return 4
      const n = parseInt(formData.bathrooms.replace(/\D/g, ''))
      return isNaN(n) ? 0 : n
    })()
    if (formData.addCeilingFans) finishesCost += 600 * bathroomCount
    if (formData.addBedroomFixtures) finishesCost += 500
    if (formData.featureSurfaces) finishesCost += 1000
    
    // Midpoint for operations that require a single figure (e.g., PDF)
    const range = calculatePriceRange()
    return Math.round((range.min + range.max) / 2)
  }

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 1: {
        if (!formData.name.trim()) return 'Please enter your full name.'
        if (!formData.email.trim()) return 'Please enter your email address.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return 'Please enter a valid email address.'
        if (!formData.phone.trim()) return 'Please enter your phone number.'
        return null
      }
      case 2: {
        if (!formData.location) return 'Please select your province.'
        if (!formData.landStatus) return 'Please select your land status.'
        if (!formData.isWithin150kmOfLloydminster) return 'Please indicate whether your property is within 150 km of Lloydminster.'
        return null
      }
      case 3: {
        if (!formData.intendedUse) return 'Please select the intended use.'
        if (formData.intendedUse === 'other' && !formData.intendedUseOther.trim()) return 'Please specify the other intended use.'
        return null
      }
      case 4: {
        if (!formData.model) return 'Please choose a model.'
        return null
      }
      case 5: {
        if (!formData.packageType) return 'Please select a package option.'
        return null
      }
      case 6: {
        if (formData.model === 'custom') {
          if (!formData.bedrooms) return 'Please select the number of bedrooms.'
          if (!formData.bathrooms) return 'Please select the number of bathrooms.'
          if (!formData.sqft) return 'Please select square footage.'
        } else {
          if (!formData.bedrooms) return 'Please select the number of bedrooms.'
          if (!formData.sqft) return 'Please select preferred square footage.'
        }
        return null
      }
      case 9: {
        if (!formData.budget) return 'Please choose your budget range.'
        return null
      }
      case 10: {
        if (!formData.timeline) return 'Please select a project timeline.'
        return null
      }
      case 11: {
        if (!formData.isIndigenous) return 'Please indicate Indigenous community status.'
        return null
      }
      case 12: {
        if (!formData.numberOfHomes) return 'Please select the number of homes.'
        if (formData.numberOfHomes === '4+' && (!formData.customNumberOfHomes || parseInt(formData.customNumberOfHomes) < 4)) {
          return 'Please enter a valid number of homes (4 or more).'
        }
        return null
      }
      case 13: {
        if (!formData.financing) return 'Please select a financing option.'
        if (!formData.needsFinancingHelp) return 'Please indicate whether you need help with financing.'
        return null
      }
      default:
        return null
    }
  }

  const handleNext = async () => {
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error)
      return
    }
    setStepError(null)
    
    // Send contact information to webhook when moving from step 1 to step 2
    if (currentStep === 1) {
      try {
        const response = await fetch('/api/forms/quote-builder-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          })
        })

        if (response.ok) {
          console.log('✅ Contact information sent to webhook successfully')
        } else {
          console.error('❌ Failed to send contact information to webhook')
        }
      } catch (error) {
        console.error('❌ Error sending contact information to webhook:', error)
        // Continue with the form even if webhook fails
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      const price = calculatePrice()
      setEstimatedPrice(price)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePine1PDF = async () => {
    try {
      setIsGeneratingPDF(true)
      const response = await fetch('/api/quote-builder/generate-pine1-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Pine1-Quotation.pdf'
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleSubmit = async () => {
    const finalPrice = calculatePrice()
    setEstimatedPrice(finalPrice)
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Generate PDF quote
      const response = await fetch('/api/quote-builder/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: finalPrice
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Create blob from PDF response
      const pdfBlob = await response.blob()
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `discovery-homes-quote-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      // Mark as successfully submitted
      setIsSubmitted(true)
      setIsSubmitting(false)
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('Failed to generate PDF quote. Please try again or contact us directly.')
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAddon = (addon: string) => {
    const currentAddons = formData.addons
    if (currentAddons.includes(addon)) {
      updateFormData('addons', currentAddons.filter(a => a !== addon))
    } else {
      updateFormData('addons', [...currentAddons, addon])
    }
  }

  // Helper: sqft options constrained by bedrooms
  const getSqftOptionsForBedrooms = (bedrooms: string): string[] => {
    switch (bedrooms) {
      case '1':
        return ['240 sq ft', '504 sq ft']
      case '2':
        return ['504 sq ft', '800 sq ft']
      case '3':
        return ['800 sq ft', '1200 sq ft']
      case '4+':
        return ['1200+ sq ft']
      default:
        return ['240 sq ft', '504 sq ft', '800 sq ft', '1200+ sq ft']
    }
  }

  // When bedrooms change, auto-pick appropriate sqft
  const handleBedroomsChange = (value: string) => {
    updateFormData('bedrooms', value)
    const options = getSqftOptionsForBedrooms(value)
    // If current sqft isn't allowed, or empty, auto-select the first option
    if (!options.includes(formData.sqft)) {
      updateFormData('sqft', options[0])
    }
  }

  return (
    <div className="min-h-screen bg-eco-radial pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Screen */}
        {isSubmitted && (
          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
              <div className="w-20 h-20 bg-[#68a71d] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-white" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4">
                Thank You, {formData.name}!
              </h1>
              
              <div className="bg-[#68a71d]/10 border border-[#68a71d] rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-[#2D2D2D] mb-2">Your Quote is Ready</h2>
                <div className="text-2xl font-bold text-[#68a71d] mb-2">
                  {(() => { const r = calculatePriceRange(); return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` })()}
                </div>
                <p className="text-gray-600">Estimated total range for your {formData.model} build</p>
              </div>


              
              <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-3">What happens next:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#68a71d] rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">PDF Quote Downloaded</p>
                      <p className="text-gray-600 text-sm">Your detailed quote has been downloaded to your device</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#68a71d] rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">Personal Consultation</p>
                      <p className="text-gray-600 text-sm">A Discovery Homes specialist will contact you within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#68a71d] rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D2D2D]">Project Planning</p>
                      <p className="text-gray-600 text-sm">We'll discuss your project details and timeline</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/contact"
                  className="bg-[#68a71d] text-white px-8 py-3 rounded-lg hover:bg-[#5a8f1a] transition-colors font-semibold"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/our-builds"
                  className="bg-gray-100 text-[#2D2D2D] px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Explore More Models
                </Link>
              </div>

              {/* Limited Time Offer & Call to Action */}
              <div className="mt-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 text-center text-white">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                    <Zap className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    LIMITED TIME OFFER
                  </h2>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-6">
                  Save $2,000 - Book Your Call Now!
                </div>
                <p className="text-lg mb-8 opacity-90">
                  Schedule your consultation today and lock in exclusive pricing. Our experts are ready to help you start your modular home journey.
                </p>
                
                {/* GoHighLevel Calendar Integration */}
                <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-[#D4AF37] rounded-full p-2 mr-3">
                      <Calendar className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2D2D2D]">
                      Book Your Free Consultation
                    </h3>
                  </div>
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/PTZ3zcQLwvLZ7CizfIdf" 
                    style={{ width: '100%', height: '600px', border: 'none', overflow: 'auto' }} 
                    scrolling="yes" 
                    id="PTZ3zcQLwvLZ7CizfIdf_quote_builder"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Form (hidden when submitted) */}
        {!isSubmitted && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-nature mb-4 nature-shimmer">
            Quote Builder
          </h1>
          <p className="text-xl text-discovery-sage max-w-2xl mx-auto">
            Get your personalized quote in just a few minutes. We'll guide you through each step 
            to create the perfect modular home solution.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sage glass-nature">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-discovery-forest">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-discovery-sage">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-discovery-sage to-discovery-lime h-2 rounded-full transition-all duration-300 growth-pulse"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
          {/* Step Icons */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {steps.map((step) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.number
              const isCurrent = currentStep === step.number
              
              return (
                <div key={step.number} className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    isCompleted ? 'bg-[#D4AF37] text-white' :
                    isCurrent ? 'bg-[#D4AF37] text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <p className="text-xs text-gray-600 hidden md:block">{step.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          
          {/* Step 1: Contact Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Details */
          }
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Property Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Location *</label>
                  <select
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    required
                  >
                    <option value="">Select your province</option>
                    <option value="alberta">Alberta</option>
                    <option value="saskatchewan">Saskatchewan</option>
                    <option value="british-columbia">British Columbia</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Land Status *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'own-land', label: 'I own the land' },
                      { value: 'buying-land', label: 'I\'m buying land' },
                      { value: 'need-help', label: 'I need help finding land' },
                      { value: 'reserve-land', label: 'Reserve/First Nations land' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="landStatus"
                          value={option.value}
                          checked={formData.landStatus === option.value}
                          onChange={(e) => updateFormData('landStatus', e.target.value)}
                          className="mr-3"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Within 150 km of Lloydminster (Required) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Is your property within 150 km of Lloydminster? *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="isWithin150kmOfLloydminster"
                          value={option.value}
                          checked={formData.isWithin150kmOfLloydminster === option.value}
                          onChange={(e) => updateFormData('isWithin150kmOfLloydminster', e.target.value)}
                          className="mr-3"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Intended Use */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Intended Use</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'family-home', label: 'Family Home' },
                  { value: 'rental-property', label: 'Rental Property' },
                  { value: 'resort-cabin', label: 'Resort/Airbnb' },
                  { value: 'workforce-housing', label: 'Workforce Housing' },
                  { value: 'office-space', label: 'Office Space' },
                  { value: 'other', label: 'Other' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="intendedUse"
                      value={option.value}
                      checked={formData.intendedUse === option.value}
                      onChange={(e) => updateFormData('intendedUse', e.target.value)}
                      className="mr-3"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {formData.intendedUse === 'other' && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Please specify *</label>
                  <input
                    type="text"
                    value={formData.intendedUseOther}
                    onChange={(e) => updateFormData('intendedUseOther', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Describe the intended use"
                    required
                  />
                </div>
              )}
            </div>
          )}

                     {/* Step 4: Model Selection */}
           {currentStep === 4 && (
             <div>
               <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Choose Your Model *</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                    { 
                     value: 'pine1', 
                     name: 'Pine - The Efficient One',
                     specs: '504 sq ft • 1 Bedroom',
                      price: '',
                     description: 'Perfect for singles, couples, or resort units',
                     features: [
                       'Quartz countertops',
                       'Maple cabinetry (White, Black, or Wood Grain)',
                       'Drywall walls with tongue-and-groove plank ceiling',
                       'Vinyl glue-down flooring',
                       'Pot lights throughout',
                       'Tile shower surround + kitchen/bath backsplash',
                       'Black kitchen sink & faucet (stainless option available)',
                       'Triple-glaze windows; all paint colors included',
                       'Hidden-fastener metal roof and metal board-and-batten siding'
                     ],
                     icon: '🏠'
                   },
                   { 
                     value: 'pine2', 
                     name: 'Spruce - The Versatile One',
                     specs: '504 sq ft • 2 Bedroom with Loft',
                      price: '',
                     description: 'Ideal for families or rental markets',
                     features: [
                       'Quartz countertops',
                       'Maple cabinetry (White, Black, or Wood Grain)',
                       'Drywall walls with tongue-and-groove plank ceiling',
                       'Vinyl glue-down flooring',
                       'Pot lights throughout',
                       'Tile shower surround + kitchen/bath backsplash',
                       'Black kitchen sink & faucet (stainless option available)',
                       'Triple-glaze windows; all paint colors included',
                       'Hidden-fastener metal roof and metal board-and-batten siding'
                     ],
                     icon: '🏘️'
                   },
                   { 
                     value: 'pine3', 
                     name: 'Willow - The Minimalist',
                     specs: '240 sq ft with Loft',
                      price: '',
                     description: 'Modern tiny home solution',
                     features: [
                       'Quartz countertops',
                       'Maple cabinetry (White, Black, or Wood Grain)',
                       'Drywall walls with tongue-and-groove plank ceiling',
                       'Vinyl glue-down flooring',
                       'Pot lights throughout',
                       'Tile shower surround + kitchen/bath backsplash',
                       'Black kitchen sink & faucet (stainless option available)',
                       'Triple-glaze windows; all paint colors included',
                       'Hidden-fastener metal roof and metal board-and-batten siding'
                     ],
                     icon: '🏕️'
                   },
                   { 
                     value: 'custom', 
                     name: 'Custom Build',
                     specs: 'Your specifications',
                     price: 'Quote on request',
                     description: 'Fully tailored to your needs',
                     features: [
                       'Quartz countertops',
                       'Maple cabinetry (White, Black, or Wood Grain)',
                       'Drywall walls with tongue-and-groove plank ceiling',
                       'Vinyl glue-down flooring',
                       'Pot lights throughout',
                       'Tile shower surround + kitchen/bath backsplash',
                       'Black kitchen sink & faucet (stainless option available)',
                       'Triple-glaze windows; all paint colors included',
                       'Hidden-fastener metal roof and metal board-and-batten siding'
                     ],
                     icon: '✨'
                   }
                 ].map((model) => (
                   <label key={model.value} className={`block p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                     formData.model === model.value 
                       ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' 
                       : 'border-gray-300 hover:border-[#D4AF37]/50'
                   }`}>
                     <input
                       type="radio"
                       name="model"
                       value={model.value}
                       checked={formData.model === model.value}
                       onChange={(e) => updateFormData('model', e.target.value)}
                       className="sr-only"
                     />
                     <div>
                        <div className="flex items-center mb-3">
                          <div>
                           <h3 className="text-lg font-bold text-[#2D2D2D]">{model.name}</h3>
                           <p className="text-gray-600 text-sm">{model.specs}</p>
                         </div>
                       </div>
                       <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                       
                        <div className="mb-4">
                          <h4 className="font-semibold text-[#2D2D2D] mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {model.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-[#D4AF37]">
                            {model.value === 'custom' ? 'Quote on request' : (
                              model.value === 'pine1' ? '$174,000 CAD' :
                              model.value === 'pine2' ? '$179,000 CAD' :
                              '$99,000 CAD'
                            )}
                          </p>
                         {formData.model === model.value && (
                           <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                             <Check size={16} className="text-white" />
                           </div>
                         )}
                       </div>
                     </div>
                   </label>
                 ))}
               </div>
             </div>
           )}

          {/* Continue with remaining steps... */}
          {/* Step 5: Package Selection */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Choose Your Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{
                  value: 'base',
                  title: 'Base Model',
                  description: 'Standard high-quality construction'
                },{
                  value: 'net-zero',
                  title: 'Net Zero Ready',
                                     description: 'Energy efficiency package'
                },{
                  value: 'off-grid',
                  title: 'Off Grid',
                                     description: 'Self-sufficient systems'
                                 }].map((pkg) => {
                   const isComingSoon = pkg.value === 'net-zero' || pkg.value === 'off-grid'
                   return (
                     <label key={pkg.value} className={`p-6 border-2 rounded-lg transition-all duration-200 ${
                       isComingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'
                     } ${
                       formData.packageType === pkg.value ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' : 'border-gray-300 ' + (isComingSoon ? '' : 'hover:border-[#D4AF37]/50')
                     }`}>
                       <input
                         type="radio"
                         name="packageType"
                         value={pkg.value}
                         checked={formData.packageType === pkg.value}
                         onChange={(e) => { if (!isComingSoon) updateFormData('packageType', e.target.value) }}
                         disabled={isComingSoon}
                         aria-disabled={isComingSoon}
                         className="sr-only"
                       />
                       <h3 className="text-lg font-bold text-[#2D2D2D] mb-1">{pkg.title}</h3>
                       {isComingSoon && (
                         <span className="inline-block mb-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">Coming Soon</span>
                       )}
                       <p className="text-sm text-gray-600">{pkg.description}</p>
                     </label>
                   )
                 })}
              </div>
            </div>
          )}

          {/* Step 6: Specifications */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Specifications</h2>
              
              {/* Show different options based on selected model */}
              {formData.model === 'custom' ? (
                <div className="space-y-6">
                  {/* Custom Build - Enhanced Bedroom Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Number of Bedrooms</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['2', '3', '4', '5+'].map((bed) => (
                        <label key={bed} className={`text-center p-4 border rounded-lg cursor-pointer ${
                          formData.bedrooms === bed ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="bedrooms"
                            value={bed}
                            checked={formData.bedrooms === bed}
                            onChange={(e) => handleBedroomsChange(e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{bed}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Build - Bathroom Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Number of Bathrooms</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['1', '2'].map((bath) => (
                        <label key={bath} className={`text-center p-4 border rounded-lg cursor-pointer ${
                          formData.bathrooms === bath ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="bathrooms"
                            value={bath}
                            checked={formData.bathrooms === bath}
                            onChange={(e) => updateFormData('bathrooms', e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{bath}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Build - Enhanced Square Footage Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Square Footage</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {getSqftOptionsForBedrooms(formData.bedrooms).map((sqft) => (
                        <label key={sqft} className={`text-center p-4 border rounded-lg cursor-pointer ${
                          formData.sqft === sqft ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="sqft"
                            value={sqft}
                            checked={formData.sqft === sqft}
                            onChange={(e) => updateFormData('sqft', e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{sqft}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Build Price Estimate */}
                  <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#68a71d]/10 border border-[#D4AF37] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D2D2D]">Custom Build Estimate</h3>
                        <p className="text-sm text-gray-600">Based on your specifications</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#D4AF37]">
                          ${calculatePrice().toLocaleString()} CAD
                        </div>
                        <div className="text-sm text-gray-600">
                          Starting price for {formData.sqft || '800 sq ft'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Standard Models - Original Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Number of Bedrooms</label>
                    <div className="grid grid-cols-4 gap-4">
                      {['1', '2', '3', '4+'].map((bed) => (
                        <label key={bed} className={`text-center p-4 border rounded-lg cursor-pointer ${
                          formData.bedrooms === bed ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="bedrooms"
                            value={bed}
                            checked={formData.bedrooms === bed}
                            onChange={(e) => handleBedroomsChange(e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{bed}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Preferred Square Footage</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {getSqftOptionsForBedrooms(formData.bedrooms).map((sqft) => (
                        <label key={sqft} className={`text-center p-4 border rounded-lg cursor-pointer ${
                          formData.sqft === sqft ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="sqft"
                            value={sqft}
                            checked={formData.sqft === sqft}
                            onChange={(e) => updateFormData('sqft', e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{sqft}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Included Base Features (from Base Units & Upgrades) */}
                  <div className="mt-8 border rounded-lg p-5 bg-gray-50">
                    <h3 className="text-md font-semibold text-[#2D2D2D] mb-3">Included Base Features</h3>
                    <ul className="text-sm text-gray-700 grid md:grid-cols-2 gap-y-2 gap-x-6">
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Quartz countertops</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Maple cabinetry (White / Black / Wood Grain)</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Drywall walls with tongue-and-groove ceiling</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Vinyl glue-down flooring</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Pot lights throughout</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Tile shower surround + kitchen/bath backsplash</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Black kitchen sink & faucet (stainless option available)</li>
                      <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Triple-glaze windows; all paint colors included</li>
                      <li className="flex items-start md:col-span-2"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Exterior: Hidden-fastener metal roof and metal board-and-batten siding</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Finishes & Options */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Finishes & Options</h2>
              <div className="space-y-6">
                {/* Siding */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Siding</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.siding==='base-metal'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="siding" value="base-metal" className="sr-only" checked={formData.siding==='base-metal'} onChange={(e)=>updateFormData('siding', e.target.value)} />
                      <div className="font-semibold">Base: Hidden-Fastener Metal</div>
                      <div className="text-sm text-gray-600">Board-and-batten siding with color selections</div>
                    </label>
                    {isWoodGrainEligible() && (
                      <label className={`p-4 border rounded-lg cursor-pointer ${formData.siding==='wood-grain'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                        <input type="radio" name="siding" value="wood-grain" className="sr-only" checked={formData.siding==='wood-grain'} onChange={(e)=>updateFormData('siding', e.target.value)} />
                        <div className="font-semibold">Upgrade: Wood Grain Siding</div>
                        <div className="text-sm text-gray-600">
                          {(() => {
                            const sqftNumber = parseInt((formData.sqft || '').replace(/\D/g, ''))
                            if (sqftNumber <= 240) {
                              return '+$4,000 – $4,400'
                            } else {
                              return '+$6,000 – $6,600'
                            }
                          })()}
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Countertops */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Countertops</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.countertops==='base-quartz'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="countertops" value="base-quartz" className="sr-only" checked={formData.countertops==='base-quartz'} onChange={(e)=>updateFormData('countertops', e.target.value)} />
                      <div className="font-semibold">Base: Quartz Counters</div>
                      <div className="text-sm text-gray-600">Premium quartz countertops included</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.countertops==='upgrade-quartz'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="countertops" value="upgrade-quartz" className="sr-only" checked={formData.countertops==='upgrade-quartz'} onChange={(e)=>updateFormData('countertops', e.target.value)} />
                      <div className="font-semibold">Upgrade: Expanded Quartz Options</div>
                      <div className="text-sm text-gray-600">Multiple color and style selections</div>
                    </label>
                  </div>
                </div>

                {/* Cabinets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cabinets</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.cabinets==='maple-shaker'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="cabinets" value="maple-shaker" className="sr-only" checked={formData.cabinets==='maple-shaker'} onChange={(e)=>updateFormData('cabinets', e.target.value)} />
                      <div className="font-semibold">Base: Maple Cabinets</div>
                      <div className="text-sm text-gray-600">White, Black, or Wood Grain options</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.cabinets==='painted-thermo'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="cabinets" value="painted-thermo" className="sr-only" checked={formData.cabinets==='painted-thermo'} onChange={(e)=>updateFormData('cabinets', e.target.value)} />
                      <div className="font-semibold">Upgrade: Painted/Thermo Options</div>
                      <div className="text-sm text-gray-600">Additional styles and finishes</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.cabinets==='melamine'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="cabinets" value="melamine" className="sr-only" checked={formData.cabinets==='melamine'} onChange={(e)=>updateFormData('cabinets', e.target.value)} />
                      <div className="font-semibold">Downgrade: Melamine</div>
                      <div className="text-sm text-gray-600">Cost-saving alternative</div>
                    </label>
                  </div>
                </div>

                {/* Walls */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Walls</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.wallsFinish==='drywall'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="wallsFinish" value="drywall" className="sr-only" checked={formData.wallsFinish==='drywall'} onChange={(e)=>updateFormData('wallsFinish', e.target.value)} />
                      <div className="font-semibold">Base: Drywall</div>
                      <div className="text-sm text-gray-600">Standard drywall with paint options</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.wallsFinish==='woodboard-stained'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="wallsFinish" value="woodboard-stained" className="sr-only" checked={formData.wallsFinish==='woodboard-stained'} onChange={(e)=>updateFormData('wallsFinish', e.target.value)} />
                      <div className="font-semibold">Upgrade: Woodboard or Stained</div>
                      <div className="text-sm text-gray-600">Premium wood finish options</div>
                    </label>
                  </div>
                </div>

                {/* Ceilings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ceilings</label>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="font-semibold">Base: Tongue & Groove Ceiling</div>
                      <div className="text-sm text-gray-600">Included in base package</div>
                    </label>
                  </div>
                </div>

                {/* Flooring */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Flooring</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.flooring==='vinyl-glue-down'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="flooring" value="vinyl-glue-down" className="sr-only" checked={formData.flooring==='vinyl-glue-down'} onChange={(e)=>updateFormData('flooring', e.target.value)} />
                      <div className="font-semibold">Base: Vinyl Glue-Down</div>
                      <div className="text-sm text-gray-600">Various color and price points</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.flooring==='vinyl-upgrade'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="flooring" value="vinyl-upgrade" className="sr-only" checked={formData.flooring==='vinyl-upgrade'} onChange={(e)=>updateFormData('flooring', e.target.value)} />
                      <div className="font-semibold">Upgrade: Better Vinyl</div>
                      <div className="text-sm text-gray-600">Enhanced vinyl options</div>
                    </label>
                  </div>
                </div>

                {/* Lighting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lighting</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.baseLighting?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.baseLighting} onChange={(e)=>updateFormData('baseLighting', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Base: Pot Lights</div>
                      <div className="text-sm text-gray-600">Throughout the home</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.addCeilingFans?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.addCeilingFans} onChange={(e)=>updateFormData('addCeilingFans', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Upgrade: Ceiling Fans</div>
                      <div className="text-sm text-gray-600">+$540 – $660 per bathroom</div>
                    </label>
                  </div>
                </div>

                {/* Faucets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plumbing Faucets</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.faucets==='stainless'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="faucets" value="stainless" className="sr-only" checked={formData.faucets==='stainless'} onChange={(e)=>updateFormData('faucets', e.target.value)} />
                      <div className="font-semibold">Base: Stainless Steel Fixtures</div>
                      <div className="text-sm text-gray-600">Kitchen faucets & sinks in stainless steel</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.faucets==='bronze'?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="radio" name="faucets" value="bronze" className="sr-only" checked={formData.faucets==='bronze'} onChange={(e)=>updateFormData('faucets', e.target.value)} />
                      <div className="font-semibold">Upgrade: Bronze</div>
                      <div className="text-sm text-gray-600">+$450 – $600</div>
                    </label>
                  </div>
                </div>

                {/* Kitchen & Bath Tile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kitchen & Bath Tile</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.baseTile?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.baseTile} onChange={(e)=>updateFormData('baseTile', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Base: Tile Features</div>
                      <div className="text-sm text-gray-600">Shower surround + kitchen/bath backsplash</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.addBedroomFixtures?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.addBedroomFixtures} onChange={(e)=>updateFormData('addBedroomFixtures', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Upgrade: Enhanced Tile</div>
                      <div className="text-sm text-gray-600">+$450 – $550 per kitchen</div>
                    </label>
                  </div>
                </div>

                {/* Windows */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Windows</label>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="font-semibold">Base: Triple-Glaze Windows</div>
                      <div className="text-sm text-gray-600">Black windows with paint/stain options</div>
                    </label>
                  </div>
                </div>

                {/* Paint */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paint</label>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="font-semibold">Base: All Colors Included</div>
                      <div className="text-sm text-gray-600">Complete paint selection at no extra cost</div>
                    </label>
                  </div>
                </div>

                {/* Appliances */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appliances</label>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="font-semibold">Base: Not Included</div>
                      <div className="text-sm text-gray-600">Appliances can be added as upgrades</div>
                    </label>
                  </div>
                </div>

                {/* Additional Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Options</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.blinds?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.blinds} onChange={(e)=>updateFormData('blinds', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Window Coverings</div>
                      <div className="text-sm text-gray-600">Blinds and shades (multiple options)</div>
                    </label>
                    <label className={`p-4 border rounded-lg cursor-pointer ${formData.featureSurfaces?'border-[#D4AF37] bg-[#D4AF37]/10':'border-gray-300'}`}>
                      <input type="checkbox" checked={formData.featureSurfaces} onChange={(e)=>updateFormData('featureSurfaces', e.target.checked)} className="sr-only" />
                      <div className="font-semibold">Feature Surfaces</div>
                      <div className="text-sm text-gray-600">Accent walls, barnwood, specialty boards</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Add-ons */}
          {currentStep === 8 && (
             <div>
               <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Add-ons & Upgrades</h2>
               
               {/* Real-time Price Display */}
               <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#68a71d]/10 border border-[#D4AF37] rounded-lg p-6 mb-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <h3 className="text-lg font-semibold text-[#2D2D2D]">Current Total</h3>
                     <p className="text-sm text-gray-600">Base price + selected upgrades</p>
                   </div>
                   <div className="text-right">
                     <div className="text-3xl font-bold text-[#D4AF37]">
                       {(() => { const r = calculatePriceRange(); return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` })()}
                     </div>
                     <div className="text-sm text-gray-600">
                       {formData.addons.length > 0 ? `${formData.addons.length} upgrade(s) selected` : 'No upgrades selected'}
                     </div>
                   </div>
                 </div>
               </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { value: 'solar', label: 'Solar Panels', description: 'Reduce energy costs with solar power' },
                   { value: 'deck', label: 'Deck (Outdoor Living Space) (within the range of 150km)', description: 'Extend your living area outdoors' },
                   { value: 'appliances', label: 'Upgraded Appliances (within the range of 150km)', description: 'High-end kitchen and laundry appliances' },
                   { value: 'smart-home', label: 'Smart Home Package', description: 'Automated lighting, security, and climate control' },
                   { value: 'off-grid', label: 'Off-Grid Package', description: 'Self-sufficient systems', comingSoon: true },
                   { value: 'fireplace', label: 'Fireplace (Gas / Electric / Wood)', description: 'Select type during consultation' },
                    
                 ].map((addon) => (
                   <label key={addon.value} className={`flex items-center p-4 border-2 rounded-lg transition-all duration-200 ${
                     addon.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                   } ${
                     formData.addons.includes(addon.value) 
                       ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-md' 
                       : 'border-gray-300 ' + (addon.comingSoon ? '' : 'hover:border-[#D4AF37]/50')
                   }`}>
                     <input
                       type="checkbox"
                       checked={formData.addons.includes(addon.value)}
                       onChange={() => { if (!addon.comingSoon) toggleAddon(addon.value) }}
                       disabled={addon.comingSoon}
                       className="mr-4 w-5 h-5 text-[#D4AF37] focus:ring-[#D4AF37]"
                     />
                      <div className="flex-1">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="font-semibold text-[#2D2D2D]">{addon.label}</span>
                            {addon.comingSoon && (
                              <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">Coming Soon</span>
                            )}
                          </div>
                          <span className="font-bold text-[#D4AF37] text-lg">
                            {(() => { const r = addOnRanges[addon.value]; return r ? `+$${formatCurrency(r.min)} - $${formatCurrency(r.max)}` : '' })()}
                          </span>
                       </div>
                       <p className="text-sm text-gray-600 ml-11">{addon.description}</p>
                     </div>
                   </label>
                 ))}
               </div>

               {/* Selected Upgrades Summary */}
               {formData.addons.length > 0 && (
                 <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                   <h4 className="font-semibold text-[#2D2D2D] mb-3">Selected Upgrades:</h4>
                   <div className="flex flex-wrap gap-2">
                       {formData.addons.map((addon) => {
                        const labels: Record<string, string> = {
                          'solar': 'Solar Panels',
                          'deck': 'Deck',
                          'appliances': 'Upgraded Appliances',
                          'smart-home': 'Smart Home Package',
                          'off-grid': 'Off-Grid Package',
                          'fireplace': 'Fireplace',
                        }
                        // Security: Validate addon parameter before accessing object
                        if (!labels[addon] || !addOnRanges[addon]) return null
                        const r = addOnRanges[addon]
                        return (
                          <span key={addon} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#D4AF37]/20 text-[#D4AF37] font-medium">
                            {labels[addon]} +${formatCurrency(r.min)} - $${formatCurrency(r.max)}
                          </span>
                        )
                      })}
                   </div>
                 </div>
               )}
             </div>
           )}

           {/* Step 9: Budget */}
          {currentStep === 9 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Budget Range</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '$99,000 - $125,000',
                  '$125,000 - $200,000',
                  '$200,000 - $300,000',
                  '$300,000+'
                ].map((budget) => (
                  <label key={budget} className={`text-center p-4 border rounded-lg cursor-pointer ${
                    formData.budget === budget ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={(e) => updateFormData('budget', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-semibold">{budget}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

                     {/* Step 10: Timeline */}
           {currentStep === 10 && (
             <div>
               <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Project Timeline</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   'ASAP (within 3 months)',
                   '3-6 months',
                   '6-12 months',
                   '12+ months'
                 ].map((timeline) => (
                   <label key={timeline} className={`text-center p-4 border rounded-lg cursor-pointer ${
                     formData.timeline === timeline ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-300'
                   }`}>
                     <input
                       type="radio"
                       name="timeline"
                       value={timeline}
                       checked={formData.timeline === timeline}
                       onChange={(e) => updateFormData('timeline', e.target.value)}
                       className="sr-only"
                     />
                     <span className="font-semibold">{timeline}</span>
                   </label>
                 ))}
               </div>
             </div>
           )}

            {/* Step 11: Indigenous Community */}
          {currentStep === 11 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Indigenous Community</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'yes', label: 'Yes, I am a member of a First Nations or Indigenous community' },
                  { value: 'no', label: 'No, I am not a member of a First Nations or Indigenous community' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="isIndigenous"
                      value={option.value}
                      checked={formData.isIndigenous === option.value}
                      onChange={(e) => updateFormData('isIndigenous', e.target.value)}
                      className="mr-3"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

           {/* Step 12: Number of Homes */}
          {currentStep === 12 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Number of Homes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: '1', label: '1 Home' },
                  { value: '2', label: '2 Homes' },
                  { value: '3', label: '3 Homes' },
                  { value: '4+', label: '4+ Homes' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="numberOfHomes"
                      value={option.value}
                      checked={formData.numberOfHomes === option.value}
                      onChange={(e) => {
                        updateFormData('numberOfHomes', e.target.value)
                        // Clear custom number if not selecting 4+
                        if (e.target.value !== '4+') {
                          updateFormData('customNumberOfHomes', '')
                        }
                      }}
                      className="mr-3"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              
              {/* Custom Number Input for 4+ Homes */}
              {formData.numberOfHomes === '4+' && (
                <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many homes do you intend to purchase?
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="100"
                    value={formData.customNumberOfHomes || ''}
                    onChange={(e) => updateFormData('customNumberOfHomes', e.target.value)}
                    placeholder="Enter number of homes (4 or more)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please enter a number between 4 and 100
                  </p>
                </div>
              )}
            </div>
          )}

                     {/* Step 13: Financing */}
           {currentStep === 13 && (
             <div>
               <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Financing</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 {[
                   { value: 'cash', label: 'Cash Payment' },
                   { value: 'bank-financing', label: 'Bank Financing' },
                   { value: 'construction-financing', label: 'Construction Financing' },
                   { value: 'other', label: 'Other Financing' }
                 ].map((option) => (
                   <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                     <input
                       type="radio"
                       name="financing"
                       value={option.value}
                       checked={formData.financing === option.value}
                       onChange={(e) => updateFormData('financing', e.target.value)}
                       className="mr-3"
                     />
                     <span>{option.label}</span>
                   </label>
                 ))}
               </div>

               {/* Financing Help Question */}
               <div className="mt-6">
                 <label className="block text-sm font-medium text-gray-700 mb-3">
                   Do you need help getting financing?
                 </label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { value: 'yes', label: 'Yes, I need help with financing' },
                     { value: 'no', label: 'No, I can handle financing myself' }
                   ].map((option) => (
                     <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                       <input
                         type="radio"
                         name="needsFinancingHelp"
                         value={option.value}
                         checked={formData.needsFinancingHelp === option.value}
                         onChange={(e) => updateFormData('needsFinancingHelp', e.target.value)}
                         className="mr-3"
                       />
                       <span>{option.label}</span>
                     </label>
                   ))}
                 </div>
               </div>

                {/* Final Price Display */}
                {estimatedPrice > 0 && (
                 <div className="mt-8 p-6 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]">
                   <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Your Estimated Quote</h3>
                   
                   {/* Price Breakdown */}
                   <div className="space-y-3 mb-4">
                     <div className="flex justify-between items-center">
                       <span className="text-gray-600">Base Model ({formData.model})</span>
                        <span className="font-semibold">{(() => { const r = getModelRange(); return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` })()}</span>
                     </div>
                      {formData.packageType && formData.packageType !== 'base' && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Package ({formData.packageType === 'net-zero' ? 'Net Zero Ready' : 'Off Grid'})</span>
                           <span className="font-semibold">{(() => { const r = getPackageRange(); return `+$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` })()}</span>
                        </div>
                      )}
                     
                      {formData.addons.length > 0 && (
                       <>
                         <div className="border-t border-gray-300 pt-2">
                           <span className="text-gray-600">Upgrades & Add-ons:</span>
                         </div>
                         {formData.addons.map((addon) => {
                            const labels: Record<string, string> = {
                              'solar': 'Solar Panels',
                              'loft': 'Loft',
                              'deck': 'Deck',
                              'appliances': 'Upgraded Appliances',
                                                          'smart-home': 'Smart Home Package',
                          }
                          // Security: Validate addon parameter before accessing object
                          if (!labels[addon] || !addOnRanges[addon]) return null
                          const r = addOnRanges[addon]
                           return (
                             <div key={addon} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">• {labels[addon]}</span>
                                <span className="font-semibold">+${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD</span>
                             </div>
                           )
                         })}
                       </>
                     )}

                      {/* Finishes & Options */}
                      {(() => {
                        const items = getFinishItemsRange()
                        if (items.length === 0) return null
                        return (
                          <>
                            <div className="border-t border-gray-300 pt-2">
                              <span className="text-gray-600">Finishes & Options:</span>
                            </div>
                            {items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">• {it.label}</span>
                                {it.tbd ? (
                                  <span className="font-semibold text-gray-500">TBD</span>
                                ) : (
                                  <span className="font-semibold">{it.min! < 0 ? '-' : '+'}${formatCurrency(Math.abs(it.min!))} - {it.max! < 0 ? '-' : '+'}${formatCurrency(Math.abs(it.max!))} CAD</span>
                                )}
                              </div>
                            ))}
                          </>
                        )
                      })()}
                     
                     <div className="border-t border-gray-300 pt-3">
                       <div className="flex justify-between items-center">
                         <span className="text-lg font-bold text-[#2D2D2D]">Total Estimated Cost</span>
                          <span className="text-2xl font-bold text-[#D4AF37]">{(() => { const r = calculatePriceRange(); return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` })()}</span>
                       </div>
                     </div>
                   </div>
                   
                   <p className="text-sm text-gray-600">
                     This is a preliminary estimate. Final pricing may vary based on site conditions, permits, and customizations.
                   </p>
                 </div>
               )}
             </div>
           )}

          {/* Navigation Buttons */}
          {stepError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {stepError}
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors"
              >
                Next Step
                <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg transition-colors font-semibold flex items-center ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-[#68a71d] text-white hover:bg-[#5a8f1a]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating PDF...
                    </>
                  ) : (
                    'Get My Quote'
                  )}
                </button>
                
                {formData.model === 'pine1' && (
                  <button
                    onClick={generatePine1PDF}
                    disabled={isGeneratingPDF}
                    className={`px-6 py-3 rounded-lg transition-colors font-semibold flex items-center border-2 border-[#D4AF37] ${
                      isGeneratingPDF 
                        ? 'bg-gray-400 text-white cursor-not-allowed border-gray-400' 
                        : 'bg-white text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white'
                    }`}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mr-2"></div>
                        Generating PDF...
                      </>
                  ) : (
                    'Download Pine 1 PDF'
                  )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>



        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Need help or have questions? Our team is here to assist you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#2D2D2D] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Our Experts
          </Link>
        </div>
        </>
        )} {/* Close main form conditional */}
        
        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <p className="text-red-800 font-medium">Submission Failed</p>
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 