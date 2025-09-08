import { NextRequest, NextResponse } from 'next/server'
import { pdfGenerator } from '@/lib/pdfGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      model,
      addons,
      estimatedPrice,
      location,
      landStatus,
      intendedUse,
      bedrooms,
      bathrooms,
      sqft,
      budget,
      timeline,
      isIndigenous,
      numberOfHomes,
      customNumberOfHomes,
      financing,
      needsFinancingHelp
    } = body

    // Calculate base price and add-ons cost
    let basePrice = 0
    switch (model) {
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
        basePrice = 200000
        break
    }

    let addOnsCost = 0
    const addOnPrices = {
      'solar': 17500,
      'net-zero': 35000,
      'off-grid': 40000,
      'deck': 8000,
      'appliances': 12000,
      'smart-home': 5000,
      'fireplace': 6500,
    }

    addons.forEach((addon: string) => {
      addOnsCost += addOnPrices[addon as keyof typeof addOnPrices] || 0
    })

    // Generate quote number
    const quoteNumber = `Q-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    // Set valid until date (30 days from now)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    // Prepare quote data
    const quoteData = {
      name,
      email,
      phone,
      model,
      estimatedPrice,
      basePrice,
      addOnsCost,
      addOns: addons,
      propertyLocation: location,
      timeline,
      quoteNumber,
      leadId: `L-${Date.now()}`,
      validUntil,
      // Additional form data
      landStatus,
      intendedUse,
      bedrooms,
      bathrooms,
      sqft,
      budget,
      isIndigenous,
      numberOfHomes,
      customNumberOfHomes,
      financing,
      needsFinancingHelp
    }

    // TODO: Implement template PDF generation
    // For now, return a placeholder response
    return NextResponse.json({
      success: true,
      message: 'PDF generation temporarily disabled - waiting for template implementation',
      quoteData: {
        ...quoteData,
        estimatedPrice,
        basePrice,
        addOnsCost,
        totalCost: estimatedPrice
      }
    })

    // TODO: Uncomment when template PDF is ready
    // const pdfBuffer = await pdfGenerator.createQuote(quoteData)
    // return new NextResponse(pdfBuffer, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="discovery-homes-quote-${quoteNumber}.pdf"`,
    //     'Content-Length': pdfBuffer.length.toString()
    //   }
    // })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF quote' },
      { status: 500 }
    )
  }
} 