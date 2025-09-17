import { NextRequest, NextResponse } from 'next/server'
import { wordGenerator } from '@/lib/wordGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      landStatus,
      postalCode,
      intendedUse,
      intendedUseOther,
      model,
      bedrooms,
      bathrooms,
      sqft,
      packageType,
      addons,
      siding,
      countertops,
      cabinets,
      headboard,
      flooring,
      blinds,
      faucets,
      addCeilingFans,
      addBedroomFixtures,
      baseLighting,
      baseTile,
      featureSurfaces,
      wallsFinish,
      timeline,
      numberOfHomes,
      customNumberOfHomes,
      financing,
      needsFinancingHelp,
      estimatedPrice
    } = body

    // Calculate base price and add-ons cost
    let basePrice = 0
    switch (model) {
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

    let addOnsCost = 0
    const addOnPrices = {
      'solar': 12500,
      'net-zero': 35000,
      'off-grid': 40000,
      'deck': 8000,
      'appliances': 10000,
      'smart-home': 5000,
      'fireplace': 6500,
    }

    if (addons && Array.isArray(addons)) {
      addons.forEach((addon: string) => {
        addOnsCost += addOnPrices[addon as keyof typeof addOnPrices] || 0
      })
    }

    // Generate quote number in format DH-YYYYMMDDHHMMSS
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const quoteNumber = `DH-${year}${month}${day}${hours}${minutes}${seconds}`

    // Set valid until date (30 days from now)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    // Prepare quote data
    const quoteData = {
      name: name || '',
      email: email || '',
      phone: phone || '',
      landStatus: landStatus || '',
      postalCode: postalCode || '',
      intendedUse: intendedUse || '',
      intendedUseOther: intendedUseOther || '',
      model: model || '',
      bedrooms: bedrooms || '',
      bathrooms: bathrooms || '',
      sqft: sqft || '',
      packageType: packageType || 'base',
      addons: addons || [],
      siding: siding || 'base-metal',
      countertops: countertops || 'base-quartz',
      cabinets: cabinets || 'maple-shaker',
      headboard: headboard || 'melamine',
      flooring: flooring || 'vinyl-glue-down',
      blinds: blinds || false,
      faucets: faucets || 'stainless',
      addCeilingFans: addCeilingFans || false,
      addBedroomFixtures: addBedroomFixtures || false,
      baseLighting: baseLighting || true,
      baseTile: baseTile || true,
      featureSurfaces: featureSurfaces || false,
      wallsFinish: wallsFinish || 'drywall',
      timeline: timeline || '',
      numberOfHomes: numberOfHomes || '1',
      customNumberOfHomes: customNumberOfHomes || '',
      financing: financing || '',
      needsFinancingHelp: needsFinancingHelp || '',
      estimatedPrice: estimatedPrice || (basePrice + addOnsCost),
      basePrice,
      addOnsCost,
      quoteNumber,
      validUntil
    }

    // Step 1: Generate filled Word document using our existing word generator
    const wordBuffer = await wordGenerator.createQuote(quoteData)

    // Step 2: Send Word document to n8n webhook for PDF conversion
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      throw new Error('N8N_WEBHOOK_URL environment variable is not set')
    }

    console.log('Sending Word document to n8n webhook:', n8nWebhookUrl)

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Quote-Number': quoteNumber,
        'X-Customer-Name': name || 'Customer',
        'X-Filename': `${quoteNumber}.docx`,
      },
      body: new Uint8Array(wordBuffer)
    })

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.status} ${n8nResponse.statusText}`)
    }

    // Step 3: Get file URL from n8n response
    const n8nResult = await n8nResponse.json()
    console.log('n8n webhook response:', JSON.stringify(n8nResult, null, 2))
    
    const fileUrl = n8nResult.fileUrl || n8nResult.url || n8nResult.downloadUrl || n8nResult.pdfUrl

    if (!fileUrl) {
      throw new Error('n8n webhook did not return a file URL')
    }

    console.log('Received file URL from n8n:', fileUrl)

    // Step 4: Fetch the PDF file from the URL
    const pdfResponse = await fetch(fileUrl)
    
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF from URL: ${pdfResponse.status} ${pdfResponse.statusText}`)
    }

    // Step 5: Get PDF buffer and return to client
    const pdfBuffer = await pdfResponse.arrayBuffer()

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="discovery-homes-quote-${quoteNumber}.pdf"`,
        'Content-Length': pdfBuffer.byteLength.toString()
      }
    })

  } catch (error) {
    console.error('n8n PDF generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate PDF quote via n8n',
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Please check your n8n workflow is running and returning a file URL in the response'
      },
      { status: 500 }
    )
  }
}
