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
  landStatus: string
  // Property postal code
  postalCode: string
  
  // Step 3: Intended Use
  intendedUse: string
  intendedUseOther: string
  
  // Step 4: Model Selection and Specifications (merged)
  model: string
  bedrooms: string
  bathrooms: string
  sqft: string
  
  // Step 5: Package Selection
  packageType: string
  
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

  
  // Step 7: Timeline
  timeline: string
  
  // Step 8: Number of Homes
  numberOfHomes: string
  customNumberOfHomes: string
  
  // Step 9: Financing
  financing: string
  needsFinancingHelp: string
}

// Helper function to determine if postal code is within 150km of Lloydminster
function isWithin150kmOfLloydminster(postalCode: string): boolean {
  if (!postalCode) return false
  
  // Clean postal code (remove spaces, convert to uppercase)
  const cleanPostalCode = postalCode.replace(/\s/g, '').toUpperCase()
  
  // Lloydminster postal codes start with T9V (Alberta side) and S9V (Saskatchewan side)
  // We'll consider both as within range since Lloydminster spans both provinces
  const lloydminsterPrefixes = ['T9V', 'S9V']
  
  // Check if postal code starts with Lloydminster prefixes
  return lloydminsterPrefixes.some(prefix => cleanPostalCode.startsWith(prefix))
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
    landStatus: '',
    postalCode: '',
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


    timeline: '',
    numberOfHomes: '',
    customNumberOfHomes: '',
    financing: '',
    needsFinancingHelp: ''
  })
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Set countdown end date (30 days from now)
  const countdownEndDate = new Date()
  countdownEndDate.setDate(countdownEndDate.getDate() + 30)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownEndDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // New state management for merged step
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [availableAreas, setAvailableAreas] = useState<Array<{value: number, label: string}>>([])
  const [selectedModel, setSelectedModel] = useState<{name: string, type: string, price: string} | null>(null)


  const totalSteps = 9

  const steps = [
    { number: 1, title: 'Contact Info', icon: Users },
    { number: 2, title: 'Property Details', icon: MapPin },
    { number: 3, title: 'Intended Use', icon: Home },
    { number: 4, title: 'Model Selection and Specifications', icon: Building },
    { number: 5, title: 'Package', icon: Zap },
    { number: 6, title: 'Add-ons', icon: Zap },
    { number: 7, title: 'Timeline', icon: Calendar },
    { number: 8, title: 'Number of Homes', icon: Home },
    { number: 9, title: 'Financing', icon: CreditCard }
  ]

  const formatCurrency = (n: number) => n.toLocaleString()

  const clampRange = (min: number, max: number) => ({ min: Math.round(min), max: Math.round(max) })

  const getModelBasePrice = () => {
    switch (formData.model) {
      case 'pine1': return 183000
      case 'pine2': return 188000
      case 'pine3': return 104000
      case 'custom': return 0 // Custom builds show "Contact for pricing"
      default: return 0
    }
  }

  const getModelRangeFor = (model: string) => {
    let base = 0
    switch (model) {
      case 'pine1': base = 183000; break
      case 'pine2': base = 188000; break
      case 'pine3': base = 104000; break
      case 'custom': return clampRange(0, 0) // Custom builds show "Contact for pricing"
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
    'solar': { min: 10000, max: 15000 },
    'net-zero': { min: 31500, max: 38500 },
    'off-grid': { min: 36000, max: 44000 },
    'deck': { min: 8000, max: 10000 },
    'appliances': { min: 10000, max: 12000 },
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
    // Finishes & options removed - no longer used in frontend
    return clampRange(0, 0)
  }

  const getFinishItemsRange = () => {
    // Finishes & options removed - no longer used in frontend
    return []
  }

  const calculatePriceRange = () => {
    const model = getModelRange()
    const pkg = getPackageRange()
    const addons = getAddOnsRange()
    const finishes = getFinishesRange()
    
    // Model-specific finishes buffer when user has selected model and area
    const finishesBuffer = (() => {
      if (!selectedBedrooms || !selectedArea) return { min: 0, max: 0 }
      
      switch (formData.model) {
        case 'pine1': // Pine
        case 'pine2': // Spruce
          return { min: 15000, max: 25000 }
        case 'pine3': // Willow
          return { min: 10000, max: 15000 }
        case 'custom':
          return { min: 0, max: 0 } // Custom builds don't get buffer
        default:
          return { min: 0, max: 0 }
      }
    })()
    
    const homes = (() => {
      if (formData.numberOfHomes === '4+') {
        const customNumber = parseInt(formData.customNumberOfHomes || '4')
        return isNaN(customNumber) || customNumber < 4 ? 4 : Math.min(customNumber, 100)
      }
      const n = parseInt((formData.numberOfHomes || '1').replace(/\D/g, ''))
      return isNaN(n) || n < 1 ? 1 : Math.min(n, 3)
    })()
    
    const min = (model.min + pkg.min + addons.min + finishes.min + finishesBuffer.min) * homes
    const max = (model.max + pkg.max + addons.max + finishes.max + finishesBuffer.max) * homes
    return clampRange(min, max)
  }

  const calculatePrice = () => {
    let basePrice = 0
    
    // Base model pricing
    switch (formData.model) {
      case 'pine1':
        basePrice = 183000
        break
      case 'pine2':
        basePrice = 188000
        break
      case 'pine3':
        basePrice = 104000
        break
      case 'custom':
        // Custom builds show "Contact for pricing" - no base price
        basePrice = 0
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
          addonCost += 12500 // Midpoint of $10,000-$15,000 range
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
          if (isWithin150kmOfLloydminster(formData.postalCode)) {
            addonCost += 8000
          } else {
            addonCost += 10000 // Higher cost for outside 150km range
          }
          break
        case 'appliances':
          // Appliances pricing based on 150km range (similar to deck)
          if (isWithin150kmOfLloydminster(formData.postalCode)) {
            addonCost += 10000
          } else {
            addonCost += 12000 // Higher cost for outside 150km range
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
    
    // Finishes & options pricing - removed from frontend
    let finishesCost = 0
    
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
        if (!formData.landStatus) return 'Please select your land status.'
        if (!formData.postalCode) return 'Please enter your postal code.'
        return null
      }
      case 3: {
        if (!formData.intendedUse) return 'Please select the intended use.'
        if (formData.intendedUse === 'other' && !formData.intendedUseOther.trim()) return 'Please specify the other intended use.'
        return null
      }
      case 4: {
        // Merged Model Selection and Specifications validation
        if (!selectedBedrooms) return 'Please select the number of bedrooms.'
        if (!selectedArea) return 'Please select the square footage.'
        if (!selectedModel) return 'Please complete your model selection.'
        return null
      }
      case 5: {
        if (!formData.packageType) return 'Please select a package option.'
        return null
      }
      case 6: {
        // No validation needed for add-ons
        return null
      }
       case 7: {
        if (!formData.timeline) return 'Please select a project timeline.'
        return null
      }
       case 8: {
        if (!formData.numberOfHomes) return 'Please select the number of homes.'
        if (formData.numberOfHomes === '4+' && (!formData.customNumberOfHomes || parseInt(formData.customNumberOfHomes) < 4)) {
          return 'Please enter a valid number of homes (4 or more).'
        }
        return null
      }
       case 9: {
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

  const handleSubmit = async () => {
    const finalPrice = calculatePrice()
    setEstimatedPrice(finalPrice)
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Send complete form data to GHL webhook FIRST
      try {
        const webhookResponse = await fetch('/api/forms/quote-builder-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            estimatedPrice: finalPrice
          })
        })

        if (webhookResponse.ok) {
          console.log('✅ Complete form data sent to GHL webhook successfully')
        } else {
          console.error('❌ Failed to send complete form data to GHL webhook')
        }
      } catch (webhookError) {
        console.error('❌ Error sending complete form data to GHL webhook:', webhookError)
        // Continue with PDF generation even if webhook fails
      }

      // THEN generate PDF quote using n8n workflow
      const response = await fetch('/api/quote-builder/generate-pdf-n8n', {
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
      
      // Track Meta Pixel "Submit Application" event
      trackBusinessEvent.submitApplication({
        ...formData,
        estimatedPrice: finalPrice
      })
      
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

  // New bedroom options with Studio
  const bedroomOptions = [
    { value: '0', label: 'Studio', display: 'Studio' },
    { value: '1', label: '1BR', display: '1 Bedroom' },
    { value: '2', label: '2BR', display: '2 Bedrooms' },
    { value: '3', label: '3BR', display: '3 Bedrooms' }
  ]

  // Dynamic area filtering logic
  const getAvailableAreas = (bedrooms: string) => {
    switch(bedrooms) {
      case '0': // Studio
        return [{ value: 250, label: '250 sq ft' }]
      case '1': // 1BR
        return [
          { value: 504, label: '504 sq ft' },
          { value: 800, label: '800 sq ft' }
        ]
      case '2': // 2BR
        return [
          { value: 504, label: '504 sq ft' },
          { value: 800, label: '800 sq ft' },
          { value: 1200, label: '1200 sq ft' }
        ]
      default: // 3BR+
        return [
          { value: 800, label: '800 sq ft' },
          { value: 1200, label: '1200+ sq ft' }
        ]
    }
  }

  // Model assignment logic
  const determineModel = (bedrooms: string, sqft: number) => {
    // Studio → Willow
    if (bedrooms === '0' && sqft === 250) {
      return { name: 'Willow', type: 'standard', price: '$104,000 CAD' }
    }
    
    // 1BR Logic
    if (bedrooms === '1') {
      if (sqft === 504) return { name: 'Pine', type: 'standard', price: '$183,000 CAD' }
      if (sqft === 800) return { name: 'Custom Build', type: 'custom', price: 'Contact for pricing' }
    }
    
    // 2BR Logic
    if (bedrooms === '2') {
      if (sqft === 504) return { name: 'Spruce', type: 'standard', price: '$188,000 CAD' }
      if (sqft > 504) return { name: 'Custom Build', type: 'custom', price: 'Contact for pricing' }
    }
    
    // 3BR+ Logic
    if (parseInt(bedrooms) >= 3) {
      return { name: 'Custom Build', type: 'custom', price: 'Contact for pricing' }
    }
    
    return null
  }

  // Handle bedroom selection with new logic
  const handleNewBedroomsChange = (value: string) => {
    setSelectedBedrooms(value)
    updateFormData('bedrooms', value)
    
    const areas = getAvailableAreas(value)
    setAvailableAreas(areas)
    
    // Reset area selection
    setSelectedArea(null)
    updateFormData('sqft', '')
    
    // Clear model
    setSelectedModel(null)
    updateFormData('model', '')
    
    // Auto-select area if only one option (Studio case)
    if (areas.length === 1) {
      setSelectedArea(areas[0].label)
      updateFormData('sqft', areas[0].label)
      const model = determineModel(value, areas[0].value)
      setSelectedModel(model)
      updateFormData('model', model?.type === 'standard' ? 
        (model.name === 'Pine' ? 'pine1' : 
         model.name === 'Spruce' ? 'pine2' : 
         model.name === 'Willow' ? 'pine3' : 'custom') : 'custom')
    }
  }

  // Handle area selection with new logic
  const handleNewAreaChange = (value: string, sqftValue: number) => {
    setSelectedArea(value)
    updateFormData('sqft', value)
    
    if (selectedBedrooms) {
      const model = determineModel(selectedBedrooms, sqftValue)
      setSelectedModel(model)
      updateFormData('model', model?.type === 'standard' ? 
        (model.name === 'Pine' ? 'pine1' : 
         model.name === 'Spruce' ? 'pine2' : 
         model.name === 'Willow' ? 'pine3' : 'custom') : 'custom')
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
                  {(() => { 
                    if (formData.model === 'custom') return 'Contact for pricing'
                    const r = calculatePriceRange(); 
                    return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` 
                  })()}
                </div>
                <p className="text-gray-600 mb-4">Estimated total range for your {(() => {
                  switch(formData.model) {
                    case 'pine1': return 'Pine'
                    case 'pine2': return 'Spruce'
                    case 'pine3': return 'Willow'
                    case 'custom': return 'Custom Build (Contact for pricing)'
                    default: return formData.model
                  }
                })()} build</p>
                
                {/* Price Variation Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-yellow-800 mb-2">Important Pricing Information</h4>
                      <ul className="text-xs text-yellow-700 space-y-1">
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>Prices may vary based on market conditions and selected finishes or upgrades</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>This estimate includes a buffer for common upgrades and popular selections not priced individually in this quote</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>Most clients choose different finishes — no two builds are exactly alike, and we quote accordingly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>Base model is already well-equipped with upgraded features — this is not a bare-bones starting point</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>Layouts are fixed per model unless you're building fully custom (which follows a separate process)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                          <span>Final pricing is confirmed during your consultation, based on your specific preferences and needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
              
              {/* Fall Sale Section */}
              <div className="mt-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 text-center text-white">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                    <Zap className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    FALL SALE
                  </h2>
                </div>
                
                <div className="text-2xl md:text-3xl font-bold mb-4">
                  Save Up to $25,000
                </div>
                
                <div className="text-lg mb-6 opacity-90">
                  5% Discount on All Models
                    </div>

                {/* Countdown Timer */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-4 text-center">Limited Time Offer</h3>
                  <h4 className="text-lg font-semibold mb-4 text-center">Ends In:</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                      <div className="text-3xl font-bold text-white mb-1">{timeLeft.days}</div>
                      <div className="text-[10px] text-white opacity-90">Days</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                      <div className="text-3xl font-bold text-white mb-1">{timeLeft.hours}</div>
                      <div className="text-[10px] text-white opacity-90">Hours</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                      <div className="text-3xl font-bold text-white mb-1">{timeLeft.minutes}</div>
                      <div className="text-[10px] text-white opacity-90">Minutes</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                      <div className="text-3xl font-bold text-white mb-1">{timeLeft.seconds}</div>
                      <div className="text-[10px] text-white opacity-90">Seconds</div>
                    </div>
                  </div>
                </div>

                <p className="text-lg mb-8 opacity-90">
                  Don't miss out on this exclusive fall discount. Book your consultation today to secure your savings!
                </p>

                {/* Book Your Call Button */}
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/wbJJIOUM9g94NdNGDuD8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#D4AF37] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
                >
                  Book Your Call Now
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Form (hidden when submitted) */}
        {!isSubmitted && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
           <h1 className="text-2xl md:text-3xl font-bold text-gradient-nature mb-4 nature-shimmer">
            Quote Builder
          </h1>
           <p className="text-sm md:text-base text-discovery-sage max-w-2xl mx-auto">
            Get your personalized quote in just a few minutes. We'll guide you through each step 
            to create the perfect modular home solution.
          </p>
        </div>

        {/* Sticky Progress Bar */}
        <div className="sticky top-4 z-40 bg-white rounded-lg p-4 md:p-6 mb-8 shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Progress Info */}
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
                  className="bg-gradient-to-r from-discovery-sage to-discovery-lime h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
              {/* Current Step Display */}
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center">
                    {(() => {
                      const currentStepData = steps.find(step => step.number === currentStep)
                      const Icon = currentStepData?.icon
                      return Icon ? <Icon size={16} /> : <Check size={16} />
                    })()}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-800">
                      {steps.find(step => step.number === currentStep)?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Step {currentStep} of {totalSteps} • {Math.round((currentStep / totalSteps) * 100)}% Complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Real-time Price Display */}
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#68a71d]/10 border border-[#D4AF37] rounded-lg p-2 md:p-3 min-w-0 md:min-w-[180px]">
              <div className="text-center">
                <div className="text-xs font-medium text-gray-600 mb-1">Current Total</div>
                <div className="text-sm md:text-base font-bold text-[#D4AF37]">
                  {(() => { 
                    // Check if it's a custom build
                    if (formData.model === 'custom') {
                      if (formData.addons.length > 0) {
                        return `Contact for pricing + ${formData.addons.length} upgrade${formData.addons.length > 1 ? 's' : ''}`
                      }
                      return 'Contact for pricing'
                    }
                    
                    // For standard models, show price range
                    const r = calculatePriceRange()
                    if (r.min === 0 && r.max === 0) {
                      return '$0 CAD'
                    }
                    return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD`
                  })()}
                  </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formData.model === 'custom' 
                    ? 'Contact for pricing'
                    : (formData.addons.length > 0 ? `${formData.addons.length} upgrade(s)` : 'Base price')
                  }
                </div>
                <div className="text-xs text-gray-400 mt-1 italic">
                  {selectedBedrooms && selectedArea 
                    ? "Prices may vary due to market changes and selected upgrades/finishes"
                    : "Complete model selection to see pricing"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          
          {/* Step 1: Contact Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Full Name *</label>
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
                  <label className="block text-xs font-medium text-gray-700 mb-2">Email Address *</label>
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
                  <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number</label>
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

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Property Details</h2>
              <div className="space-y-6">
                {/* Postal Code (Required) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Postal Code *</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your postal code (e.g., T9V 0A1)"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-4">Land Status *</label>
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
              </div>
            </div>
          )}

          {/* Step 3: Intended Use */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Intended Use</h2>
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
                  <label className="block text-xs font-medium text-gray-700 mb-2">Please specify *</label>
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

          {/* Step 4: Model Selection and Specifications (Merged) */}
          {currentStep === 4 && (
             <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Model Selection and Specifications</h2>
              
              {/* Bedroom Selection */}
              <div className="mb-8">
                <label className="block text-xs font-medium text-gray-700 mb-4">Number of Bedrooms *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {bedroomOptions.map((option) => (
                    <label key={option.value} className={`text-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedBedrooms === option.value 
                       ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' 
                       : 'border-gray-300 hover:border-[#D4AF37]/50'
                   }`}>
                     <input
                       type="radio"
                        name="bedrooms"
                        value={option.value}
                        checked={selectedBedrooms === option.value}
                        onChange={(e) => handleNewBedroomsChange(e.target.value)}
                       className="sr-only"
                     />
                      <span className="text-sm font-semibold">{option.display}</span>
                    </label>
                  ))}
                         </div>
                       </div>

              {/* Area Selection */}
              <div className="mb-8">
                <label className="block text-xs font-medium text-gray-700 mb-4">Square Footage *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {availableAreas.map((area) => (
                    <label key={area.value} className={`text-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedArea === area.label 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' 
                        : 'border-gray-300 hover:border-[#D4AF37]/50'
                    } ${!selectedBedrooms ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="radio"
                        name="sqft"
                        value={area.label}
                        checked={selectedArea === area.label}
                        onChange={(e) => handleNewAreaChange(e.target.value, area.value)}
                        disabled={!selectedBedrooms}
                        className="sr-only"
                      />
                       <span className="text-sm font-semibold">{area.label}</span>
                    </label>
                  ))}
                </div>
                {!selectedBedrooms && (
                  <p className="text-sm text-gray-500 mt-2">Please select number of bedrooms first</p>
                )}
              </div>

              {/* Selected Model Display */}
              {selectedModel && (
                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#68a71d]/10 border border-[#D4AF37] rounded-lg p-4 md:p-6 relative">
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    {/* Header with Image */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#2D2D2D]">{selectedModel.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedBedrooms && bedroomOptions.find(b => b.value === selectedBedrooms)?.display} • {selectedArea}
                          {selectedModel.name !== 'Custom Build' && ' • Loft'}
                        </p>
                      </div>
                      {/* Mobile Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden ml-4">
                        <img 
                          src={
                            selectedModel.name === 'Willow' ? '/assets/images/new-content/Pine 3- Willow/XF pine 3 scandanavian front right .webp' :
                            selectedModel.name === 'Pine' ? '/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp' :
                            selectedModel.name === 'Spruce' ? '/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp' :
                            '/assets/images/new-content/Custom Builds/cb coastal.webp'
                          }
                          alt={`${selectedModel.name} model`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Mobile Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-[#2D2D2D] mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Quartz countertops</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Maple cabinetry (White / Black / Wood Grain)</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Drywall walls with tongue-and-groove ceiling</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Vinyl glue-down flooring</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Pot lights throughout</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Tile shower surround + kitchen/bath backsplash</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Black kitchen sink & faucet (stainless option available)</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Triple-glaze windows; all paint colors included</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Exterior: Hidden-fastener metal roof and metal board-and-batten siding</li>
                          </ul>
                        </div>

                    {/* Mobile Price */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#D4AF37]">
                        {selectedModel.price}
                      </div>
                      {selectedModel.type === 'custom' && (
                        <div className="text-sm text-gray-600 mt-1">
                          Custom pricing based on specifications
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    {/* Desktop Image - Top Right */}
                    <div className="absolute top-4 right-4 w-40 h-40 rounded-lg overflow-hidden">
                      <img 
                        src={
                          selectedModel.name === 'Willow' ? '/assets/images/new-content/Pine 3- Willow/XF pine 3 scandanavian front right .webp' :
                          selectedModel.name === 'Pine' ? '/assets/images/new-content/PIne 1 - Pine/xf pine 1 front right scandanavian.webp' :
                          selectedModel.name === 'Spruce' ? '/assets/images/new-content/Landing Page - Real Estate Rental/LP-TYL-4__Interior–rental-ready__Pine-2__v01.webp' :
                          '/assets/images/new-content/Custom Builds/cb coastal.webp'
                        }
                        alt={`${selectedModel.name} model`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Desktop Price - Bottom Right */}
                    <div className="absolute bottom-4 right-4 text-right">
                      <div className="text-2xl font-bold text-[#D4AF37]">
                        {selectedModel.price}
                      </div>
                      {selectedModel.type === 'custom' && (
                        <div className="text-xs text-gray-600 mt-1">
                          Custom pricing based on specifications
                           </div>
                         )}
                       </div>
                    
                    {/* Desktop Main Content */}
                    <div className="pr-44 pb-16">
                      <h3 className="text-lg font-bold text-[#2D2D2D]">{selectedModel.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedBedrooms && bedroomOptions.find(b => b.value === selectedBedrooms)?.display} • {selectedArea}
                        {selectedModel.name !== 'Custom Build' && ' • Loft'}
                      </p>
                      <div className="mt-2">
                        <h4 className="font-semibold text-sm text-[#2D2D2D] mb-2">Key Features:</h4>
                        <ul className="text-xs text-gray-700 grid md:grid-cols-2 gap-y-1 gap-x-4">
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Quartz countertops</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Maple cabinetry (White / Black / Wood Grain)</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Drywall walls with tongue-and-groove ceiling</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Vinyl glue-down flooring</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Pot lights throughout</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Tile shower surround + kitchen/bath backsplash</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Black kitchen sink & faucet (stainless option available)</li>
                          <li className="flex items-start"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Triple-glaze windows; all paint colors included</li>
                          <li className="flex items-start md:col-span-2"><span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2"></span> Exterior: Hidden-fastener metal roof and metal board-and-batten siding</li>
                        </ul>
                     </div>
                    </div>
               </div>
                </div>
              )}
             </div>
           )}

          {/* Continue with remaining steps... */}
          {/* Step 5: Package Selection */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Choose Your Package</h2>
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
                         <span className="inline-block mb-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">Custom Quote</span>
                       )}
                       <p className="text-sm text-gray-600">{pkg.description}</p>
                     </label>
                   )
                 })}
              </div>
              
              {/* Development Note */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-green-800 font-medium mb-1">Note: Net Zero Ready and Off-Grid packages are currently in development.</p>
                    <p className="text-xs text-green-700">Ask us about early access to pilot homes and future-ready upgrades.</p>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Step 6: Add-ons */}
          {currentStep === 6 && (
            <div>
               <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Add-ons & Upgrades</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { value: 'solar', label: 'Solar Panels', description: 'Solar Panel prices vary based on energy consumption' },
                   { value: 'deck', label: 'Deck (Outdoor Living Space)', description: 'Extend your living area outdoors' },
                   { value: 'appliances', label: 'Upgraded Appliances', description: 'High-end kitchen and laundry appliances' },
                   { value: 'smart-home', label: 'Smart Home Package', description: 'Automated lighting, security, and climate control' },
                   { value: 'off-grid', label: 'Off-Grid Package', description: 'Self-sufficient systems', comingSoon: true },
                   { value: 'fireplace', label: 'Fireplace (Gas / Electric / Wood)', description: 'Select type during consultation' },
                    
                 ].map((addon) => (
                   <label key={addon.value} className={`flex items-center p-3 border-2 rounded-lg transition-all duration-200 ${
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
                       className="mr-3 w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                     />
                      <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="font-semibold text-[#2D2D2D] text-xs">{addon.label}</span>
                            {addon.comingSoon && (
                              <span className="ml-0.5 inline-block px-1.5 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 whitespace-nowrap">Coming Soon</span>
                            )}
                          </div>
                          <span className="font-bold text-[#D4AF37] text-xs">
                            {(() => { const r = addOnRanges[addon.value]; return r ? `+$${formatCurrency(r.min)} - $${formatCurrency(r.max)}` : '' })()}
                          </span>
                       </div>
                       <p className="text-xs text-gray-600 ml-7">{addon.description}</p>
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

           {/* Step 7: Timeline */}
          {currentStep === 7 && (
             <div>
               <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">When do you want to receive your modular?</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   'Ready for delivery in 3 months',
                   'Ready for delivery in 3-6 months',
                   'Ready for delivery in 6-12 months',
                   'Ready for delivery in 12+ months',
                   'Don\'t know yet'
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
                     <span className="text-sm font-semibold">{timeline}</span>
                   </label>
                 ))}
               </div>
             </div>
           )}

          {/* Step 8: Number of Homes */}
          {currentStep === 8 && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Number of Homes</h2>
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
                  <label className="block text-xs font-medium text-gray-700 mb-2">
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

          {/* Step 9: Financing */}
          {currentStep === 9 && (
             <div>
               <h2 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">Financing</h2>
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
                 <label className="block text-xs font-medium text-gray-700 mb-3">
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
                        <span className="font-semibold">{(() => { 
                          if (formData.model === 'custom') return 'Contact for pricing'
                          const r = getModelRange(); 
                          return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` 
                        })()}</span>
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

                      {/* Finishes Buffer */}
                      {(() => {
                        if (formData.model === 'custom') return null
                        
                        let bufferMin = 0, bufferMax = 0
                        switch (formData.model) {
                          case 'pine1': // Pine
                          case 'pine2': // Spruce
                            bufferMin = 15000
                            bufferMax = 25000
                            break
                          case 'pine3': // Willow
                            bufferMin = 10000
                            bufferMax = 15000
                            break
                          default:
                            return null
                        }
                        
                        return (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Finishes Buffer</span>
                            <span className="font-semibold">+${formatCurrency(bufferMin)} - $${formatCurrency(bufferMax)} CAD</span>
                          </div>
                        )
                      })()}
                     
                     <div className="border-t border-gray-300 pt-3">
                       <div className="flex justify-between items-center">
                         <span className="text-lg font-bold text-[#2D2D2D]">Total Estimated Cost</span>
                          <span className="text-2xl font-bold text-[#D4AF37]">{(() => { 
                            if (formData.model === 'custom') return 'Contact for pricing'
                            const r = calculatePriceRange(); 
                            return `$${formatCurrency(r.min)} - $${formatCurrency(r.max)} CAD` 
                          })()}</span>
                       </div>
                     </div>
                   </div>
                   
                   <p className="text-sm text-gray-600">
                     This is a preliminary estimate. Final pricing may vary based on site conditions, permits, customizations, and market changes. 
                     This quote includes a buffer for finishes and upgrades not specified in this estimate. Upgrade availability may vary.
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
              className={`flex items-center px-6 py-4 md:py-3 rounded-lg transition-colors text-sm ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <ChevronLeft size={16} className="mr-2" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-4 md:py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors text-sm"
              >
                Next Step
                <ChevronRight size={16} className="ml-2" />
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-4 md:py-3 rounded-lg transition-colors font-semibold flex items-center text-sm ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-[#68a71d] text-white hover:bg-[#5a8f1a]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating PDF...
                    </>
                  ) : (
                    'Get My Quote'
                  )}
                </button>
              </div>
            )}
          </div>
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