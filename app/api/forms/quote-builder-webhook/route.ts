import { NextRequest, NextResponse } from 'next/server'

// Go High Level webhook URLs for quote builder
const GHL_WEBHOOK_URL_STEP1 = 'https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/2a9c4617-2321-409c-b722-12d62f1c2030'
const GHL_WEBHOOK_URL_COMPLETE = 'https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/c2fda141-5868-44b2-a87f-0e712f8dcd5f'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract complete form data from quote builder
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
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Determine which webhook URL to use based on data completeness
    const isCompleteForm = landStatus && model && timeline
    const webhookUrl = isCompleteForm ? GHL_WEBHOOK_URL_COMPLETE : GHL_WEBHOOK_URL_STEP1
    
    // Send data to Go High Level webhook
    let ghlSuccess = false
    try {
      const ghlResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isCompleteForm ? {
          // Complete form data
          email: email,
          firstName: name ? name.split(' ')[0] : '',
          lastName: name && name.includes(' ') ? name.split(' ').slice(1).join(' ') : '',
          phone: phone,
          segment: 'quote-builder',
          source: 'quote-builder-complete',
          tags: ['quote-builder', 'complete-form', model, intendedUse].filter(Boolean),
          customFields: {
            lead_source: 'quote-builder',
            form_completion: 'complete',
            submitted_at: new Date().toISOString(),
            ip_address: request.ip || 'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown',
            
            // Property Details
            land_status: landStatus,
            postal_code: postalCode,
            intended_use: intendedUse,
            intended_use_other: intendedUseOther,
            
            // Model & Specifications
            model: model,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqft: sqft,
            package_type: packageType,
            
            // Add-ons
            addons: Array.isArray(addons) ? addons.join(', ') : '',
            
            // Finishes & Options
            siding: siding,
            countertops: countertops,
            cabinets: cabinets,
            headboard: headboard,
            flooring: flooring,
            blinds: blinds,
            faucets: faucets,
            add_ceiling_fans: addCeilingFans,
            add_bedroom_fixtures: addBedroomFixtures,
            base_lighting: baseLighting,
            base_tile: baseTile,
            feature_surfaces: featureSurfaces,
            walls_finish: wallsFinish,
            
            // Timeline & Project Details
            timeline: timeline,
            number_of_homes: numberOfHomes,
            custom_number_of_homes: customNumberOfHomes,
            financing: financing,
            needs_financing_help: needsFinancingHelp,
            
            // Pricing
            estimated_price: estimatedPrice
          }
        } : {
          // Step 1 contact data only
          email: email,
          firstName: name ? name.split(' ')[0] : '',
          lastName: name && name.includes(' ') ? name.split(' ').slice(1).join(' ') : '',
          phone: phone,
          segment: 'quote-builder',
          source: 'quote-builder-step1',
          tags: ['quote-builder', 'contact-info'],
          customFields: {
            lead_source: 'quote-builder',
            contact_step: 'step1',
            submitted_at: new Date().toISOString(),
            ip_address: request.ip || 'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown',
            form_progress: 'contact-info-completed'
          }
        })
      })

      if (ghlResponse.ok) {
        ghlSuccess = true
        console.log(`✅ Quote builder ${isCompleteForm ? 'complete form' : 'contact info'} sent to Go High Level successfully`)
      } else {
        console.error('❌ Go High Level webhook failed:', ghlResponse.status, ghlResponse.statusText)
        const responseText = await ghlResponse.text()
        console.error('Response body:', responseText)
      }
    } catch (ghlError) {
      console.error('❌ Go High Level webhook error:', ghlError)
    }

    return NextResponse.json({
      success: true,
      message: ghlSuccess 
        ? `${isCompleteForm ? 'Quote request' : 'Contact information'} processed successfully`
        : `${isCompleteForm ? 'Quote request' : 'Contact information'} saved, but webhook delivery failed`,
      ghlSuccess: ghlSuccess
    })

  } catch (error) {
    console.error('Quote builder webhook error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process quote request. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
