import { NextRequest, NextResponse } from 'next/server'
import { crmClient } from '@/lib/crmClient'
import { mailer } from '@/lib/mailer'
import { pdfGenerator } from '@/lib/pdfGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields from 8-step wizard
    const { 
      name, 
      email, 
      phone,
      propertyLocation,
      landStatus,
      intendedUse,
      model,
      sqftPreferences,
      bedPreferences,
      addOns,
      budgetRange,
      timeline,
      segment = 'quote-builder'
    } = body
    
    if (!name || !email || !phone || !model) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate estimated price based on model and add-ons
    const pricing = calculatePricing(model, addOns, sqftPreferences)
    
    // Create comprehensive lead data
    const leadData = {
      name,
      email,
      phone,
      propertyLocation,
      landStatus,
      intendedUse,
      model,
      sqftPreferences,
      bedPreferences,
      addOns: Array.isArray(addOns) ? addOns : [],
      budgetRange,
      timeline,
      estimatedPrice: pricing.total,
      basePrice: pricing.base,
      addOnsCost: pricing.addOns,
      source: 'quote-builder',
      segment,
      tags: ['quote-builder', model, intendedUse, segment].filter(Boolean),
      status: 'quote-requested',
      priority: determinePriority(budgetRange, timeline),
      submittedAt: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    // Send to CRM with quote-specific tagging
    const crmResult = await crmClient.createLead(leadData)
    
    // TODO: Implement template PDF generation
    // For now, skip PDF generation and email sending
    // const pdfBuffer = await pdfGenerator.createQuote({
    //   name,
    //   email,
    //   phone,
    //   model,
    //   estimatedPrice: pricing.total,
    //   basePrice: pricing.base,
    //   addOnsCost: pricing.addOns,
    //   addOns: Array.isArray(addOns) ? addOns : [],
    //   propertyLocation: propertyLocation || '',
    //   timeline: timeline || '',
    //   quoteNumber: `DH-${Date.now()}`,
    //   leadId: crmResult.id,
    //   validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    //   landStatus: landStatus || '',
    //   intendedUse: intendedUse || '',
    //   bedrooms: bedPreferences || '',
    //   bathrooms: body.bathrooms || '',
    //   sqft: sqftPreferences || '',
    //   budget: budgetRange || '',
    //   isIndigenous: body.isIndigenous || '',
    //   numberOfHomes: body.numberOfHomes || '',
    //   customNumberOfHomes: body.customNumberOfHomes || '',
    //   financing: body.financing || '',
    //   needsFinancingHelp: body.needsFinancingHelp || ''
    // })
    
    // TODO: Uncomment when template PDF is ready
    // Send quote via email
    // await mailer.sendQuote({
    //   to: email,
    //   name,
    //   model,
    //   estimatedPrice: pricing.total,
    //   pdfBuffer,
    //   quoteNumber: `DH-${Date.now()}`
    // })
    
    // Send notification to sales team
    await mailer.sendNotification({
      to: process.env.SALES_EMAIL || 'sales@discoveryhomes.ca',
      subject: `New Quote Request - ${name} - ${model}`,
      data: {
        ...leadData,
        urgency: determinePriority(budgetRange, timeline)
      }
    })

    return NextResponse.json({
      success: true,
      leadId: crmResult.id,
      estimatedPrice: pricing.total,
      priceBreakdown: pricing,
      message: 'Your quote request has been submitted! PDF generation will be available soon.',
      nextSteps: [
        'A Discovery Homes specialist will contact you within 24 hours',
        'Schedule a consultation to discuss your project in detail',
        'PDF quotes will be available once our new template system is ready'
      ]
    })

  } catch (error) {
    console.error('Quote builder error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate quote. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

function calculatePricing(model: string, addOns: string[] = [], sqft?: string) {
  // Base pricing from documentation
  const basePrices = {
    'pine-1': 174000,
    'pine-2': 179000,
    'pine-3': 99000,
    'custom': 200000 // Starting price for custom
  }
  
  const addOnPrices = {
    'solar': 17500,
    'net-zero': 25000,
    'off-grid': 35000,
    'upgraded-finishes': 8000,
    'deck': 5000,
    'garage': 12000
  }
  
  const basePrice = basePrices[model as keyof typeof basePrices] || basePrices.custom
  const addOnsCost = addOns.reduce((total, addOn) => {
    return total + (addOnPrices[addOn as keyof typeof addOnPrices] || 0)
  }, 0)
  
  return {
    base: basePrice,
    addOns: addOnsCost,
    total: basePrice + addOnsCost
  }
}

function determinePriority(budgetRange?: string, timeline?: string): 'high' | 'medium' | 'low' {
  const highBudgetRanges = ['$200k+', '$300k+', '$400k+']
  const urgentTimelines = ['ASAP', '0-3 months', 'Immediate']
  
  if (highBudgetRanges.some(range => budgetRange?.includes(range)) || 
      urgentTimelines.some(time => timeline?.includes(time))) {
    return 'high'
  }
  
  if (timeline?.includes('6 months') || budgetRange?.includes('$150k')) {
    return 'medium'
  }
  
  return 'low'
} 