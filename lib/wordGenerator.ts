// Discovery Homes Word Quote Generator
import fs from 'fs'
import path from 'path'
import { createReport } from 'docx-templates'

interface QuoteData {
  // Contact Information
  name: string
  email: string
  phone: string
  
  // Property Details
  landStatus: string
  postalCode: string
  
  // Intended Use
  intendedUse: string
  intendedUseOther: string
  
  // Model Selection
  model: string
  bedrooms: string
  bathrooms: string
  sqft: string
  
  // Package and Add-ons
  packageType: string
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
  
  // Timeline and Homes
  timeline: string
  numberOfHomes: string
  customNumberOfHomes: string
  
  // Financing
  financing: string
  needsFinancingHelp: string
  
  // Calculated Values
  estimatedPrice: number
  basePrice: number
  addOnsCost: number
  quoteNumber: string
  validUntil: Date
}

export class WordGeneratorService {
  private templatesDir: string

  constructor() {
    this.templatesDir = path.join(process.cwd(), 'public', 'templates')
  }

  private getTemplatePath(model: string): string {
    switch (model) {
      case 'pine1':
        return path.join(this.templatesDir, 'PINE Quotation Template.docx')
      case 'pine2':
        return path.join(this.templatesDir, 'Spruce Quotation Template.docx')
      case 'pine3':
        return path.join(this.templatesDir, 'Willow Quotation Template.docx')
      case 'custom':
        return path.join(this.templatesDir, 'Custom Build Quotation Template.docx')
      default:
        // Fallback to Pine template
        return path.join(this.templatesDir, 'PINE Quotation Template.docx')
    }
  }

  async createQuote(quoteData: QuoteData): Promise<Buffer> {
    try {
      // Get the correct template path based on model
      const templatePath = this.getTemplatePath(quoteData.model)
      
      // Check if template file exists
      if (!fs.existsSync(templatePath)) {
        console.error(`Template file not found: ${templatePath}`)
        throw new Error(`Template file not found for model: ${quoteData.model}`)
      }
      
      // Read the template file
      const template = fs.readFileSync(templatePath)

      // Prepare data for template replacement
      const templateData = this.prepareTemplateData(quoteData)

      // Generate the document
      const buffer = await createReport({
        template,
        data: templateData,
        cmdDelimiter: ['{{', '}}'], // Using double curly braces as delimiters
        failFast: false, // Don't fail on first error, collect all errors
        noSandbox: false, // Use sandbox for security
      })

      return Buffer.from(buffer)
    } catch (error) {
      console.error('Error generating Word document:', error)
      console.error('Model:', quoteData.model)
      console.error('Template path:', this.getTemplatePath(quoteData.model))
      throw new Error(`Failed to generate Word document for model: ${quoteData.model}`)
    }
  }

  private prepareTemplateData(quoteData: QuoteData) {
    // Format currency
    const formatCurrency = (amount: number) => `$${amount.toLocaleString()} CAD`

    // Format model name for display
    const getModelDisplayName = (model: string) => {
      switch (model) {
        case 'pine1': return 'Pine'
        case 'pine2': return 'Spruce'
        case 'pine3': return 'Willow'
        case 'custom': return 'Custom Build'
        default: return model
      }
    }

    // Get model description
    const getModelDescription = (model: string) => {
      switch (model) {
        case 'pine1': return 'The Pine model offers a comfortable and efficient living space with modern amenities and quality finishes.'
        case 'pine2': return 'The Spruce model provides spacious living with premium features and flexible design options.'
        case 'pine3': return 'The Willow model is perfect for those seeking a compact yet well-designed studio living space.'
        case 'custom': return 'Custom build designed to meet your specific requirements and preferences.'
        default: return 'Premium modular home with quality construction and modern features.'
      }
    }

    // Format land status
    const getLandStatusDisplay = (landStatus: string) => {
      switch (landStatus) {
        case 'own-land': return 'I own the land'
        case 'buying-land': return 'I\'m buying land'
        case 'need-help': return 'I need help finding land'
        case 'reserve-land': return 'Reserve/First Nations land'
        default: return landStatus
      }
    }

    // Format intended use
    const getIntendedUseDisplay = (intendedUse: string, intendedUseOther: string) => {
      switch (intendedUse) {
        case 'family-home': return 'Family Home'
        case 'rental-property': return 'Rental Property'
        case 'resort-cabin': return 'Resort/Airbnb'
        case 'workforce-housing': return 'Workforce Housing'
        case 'office-space': return 'Office Space'
        case 'other': return intendedUseOther || 'Other'
        default: return intendedUse
      }
    }

    // Format package type
    const getPackageDisplayName = (packageType: string) => {
      switch (packageType) {
        case 'base': return 'Base Model'
        case 'net-zero': return 'Net Zero Ready'
        case 'off-grid': return 'Off Grid'
        default: return 'Base Model'
      }
    }

    // Calculate base model price range
    const getBaseModelPriceRange = (model: string) => {
      let basePrice = 0
      switch (model) {
        case 'pine1': basePrice = 183000; break
        case 'pine2': basePrice = 188000; break
        case 'pine3': basePrice = 104000; break
        case 'custom': 
          return 'Contact for pricing'
        default: basePrice = 0
      }
      
      // Return exact price instead of range to match website
      return `$${basePrice.toLocaleString()} CAD`
    }

    // Calculate add-ons cost range
    const getAddonsCostRange = (addons: string[]) => {
      let minCost = 0
      let maxCost = 0
      
      const addOnRanges: Record<string, { min: number; max: number }> = {
        'solar': { min: 10000, max: 15000 },
        'deck': { min: 8000, max: 10000 },
        'appliances': { min: 10000, max: 12000 },
        'smart-home': { min: 4500, max: 5500 },
        'fireplace': { min: 5000, max: 8000 },
      }
      
      addons.forEach(addon => {
        const range = addOnRanges[addon]
        if (range) {
          minCost += range.min
          maxCost += range.max
        }
      })
      
      if (minCost === 0 && maxCost === 0) {
        return '$0 CAD'
      }
      
      return `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()} CAD`
    }

    // Calculate finishes buffer display
    const getFinishesBufferDisplay = () => {
      if (quoteData.model === 'custom') return ''
      
      let bufferMin = 0, bufferMax = 0
      switch (quoteData.model) {
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
          return ''
      }
      
      return `+$${bufferMin.toLocaleString()} - $${bufferMax.toLocaleString()} CAD`
    }

    // Calculate total estimated price range
    const getEstimatedPriceRangeDisplay = () => {
      // This should match the calculatePriceRange logic from the frontend
      let baseMin = 0, baseMax = 0
      
      switch (quoteData.model) {
        case 'pine1': baseMin = baseMax = 183000; break
        case 'pine2': baseMin = baseMax = 188000; break
        case 'pine3': baseMin = baseMax = 104000; break
        case 'custom':
          return 'Contact for pricing'
      }
      
      // Add package costs
      let pkgMin = 0, pkgMax = 0
      if (quoteData.packageType === 'net-zero') { pkgMin = pkgMax = 35000 }
      if (quoteData.packageType === 'off-grid') { pkgMin = pkgMax = 40000 }
      
      // Add add-ons costs
      let addonsMin = 0, addonsMax = 0
      const addOnRanges: Record<string, { min: number; max: number }> = {
        'solar': { min: 10000, max: 15000 },
        'deck': { min: 8000, max: 10000 },
        'appliances': { min: 10000, max: 12000 },
        'smart-home': { min: 4500, max: 5500 },
        'fireplace': { min: 5000, max: 8000 },
      }
      
      quoteData.addons.forEach(addon => {
        if (quoteData.packageType === 'net-zero' && addon === 'net-zero') return
        if (quoteData.packageType === 'off-grid' && addon === 'off-grid') return
        const range = addOnRanges[addon]
        if (range) {
          addonsMin += range.min
          addonsMax += range.max
        }
      })
      
      // Add finishes buffer based on model
      let finishesBufferMin = 0, finishesBufferMax = 0
      switch (quoteData.model) {
        case 'pine1': // Pine
        case 'pine2': // Spruce
          finishesBufferMin = 15000
          finishesBufferMax = 25000
          break
        case 'pine3': // Willow
          finishesBufferMin = 10000
          finishesBufferMax = 15000
          break
        // Custom builds don't get buffer
      }
      
      // Apply number of homes multiplier
      let homeMultiplier = 1
      if (quoteData.numberOfHomes === '4+') {
        homeMultiplier = parseInt(quoteData.customNumberOfHomes || '4')
        if (isNaN(homeMultiplier) || homeMultiplier < 4) homeMultiplier = 4
        if (homeMultiplier > 100) homeMultiplier = 100
      } else {
        homeMultiplier = parseInt(quoteData.numberOfHomes || '1')
        if (isNaN(homeMultiplier) || homeMultiplier < 1) homeMultiplier = 1
        if (homeMultiplier > 3) homeMultiplier = 3
      }
      
      const totalMin = (baseMin + pkgMin + addonsMin + finishesBufferMin) * homeMultiplier
      const totalMax = (baseMax + pkgMax + addonsMax + finishesBufferMax) * homeMultiplier
      
      return `$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()} CAD`
    }

    // Format current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Check if specific add-ons are selected
    const hasAddon = (addonName: string) => quoteData.addons.includes(addonName) ? 'Yes' : 'No'

    return {
      // Your specified placeholders
      quote_number: quoteData.quoteNumber,
      customer_name: quoteData.name,
      quote_date: currentDate,
      customer_email: quoteData.email,
      customer_phone: quoteData.phone,
      postal_code: quoteData.postalCode,
      land_status: getLandStatusDisplay(quoteData.landStatus),
      intended_use: getIntendedUseDisplay(quoteData.intendedUse, quoteData.intendedUseOther),
      number_of_homes: quoteData.numberOfHomes === '4+' ? 
        (quoteData.customNumberOfHomes || '4+') : 
        quoteData.numberOfHomes,
      needs_financing_help: quoteData.needsFinancingHelp === 'yes' ? 'Yes' : 'No',
      model_name: getModelDisplayName(quoteData.model),
      model_description: getModelDescription(quoteData.model),
      sqft: quoteData.sqft,
      bedrooms: quoteData.bedrooms === '0' ? 'Studio' : quoteData.bedrooms,
      package_name: getPackageDisplayName(quoteData.packageType),
      timeline: quoteData.timeline,
      solar_panels: hasAddon('solar'),
      deck: hasAddon('deck'),
      upgraded_appliances: hasAddon('appliances'),
      smart_home_package: hasAddon('smart-home'),
      fireplace: hasAddon('fireplace'),
      base_model_price_range: getBaseModelPriceRange(quoteData.model),
      addons_cost: getAddonsCostRange(quoteData.addons),
      finishes_buffer: getFinishesBufferDisplay(),
      estimated_price_range_display: getEstimatedPriceRangeDisplay(),
      
      // Common placeholders that might exist in template (defensive programming)
      total_cost: formatCurrency(quoteData.estimatedPrice),
      base_price: formatCurrency(quoteData.basePrice),
      financing_type: quoteData.financing || '',
      company_name: 'Discovery Homes',
      company_phone: '(780) 875-8769',
      company_email: 'info@discoveryhomes.ca',
      company_website: 'www.discoveryhomes.ca',
      quote_valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      }),
      bathrooms: quoteData.bathrooms || '',
      
      // Fallback for any undefined values
      undefined_placeholder: 'N/A'
    }
  }
}

export const wordGenerator = new WordGeneratorService()
