import { NextRequest, NextResponse } from 'next/server'

// Go High Level webhook URL for quote builder
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/c2fda141-5868-44b2-a87f-0e712f8dcd5f'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract contact information from quote builder step 1
    const { name, email, phone } = body
    
    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
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

    // Send data to Go High Level webhook
    let ghlSuccess = false
    try {
      const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        console.log('✅ Quote builder contact info sent to Go High Level successfully')
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
        ? 'Contact information processed successfully'
        : 'Contact information saved, but webhook delivery failed',
      ghlSuccess: ghlSuccess
    })

  } catch (error) {
    console.error('Quote builder webhook error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process contact information. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
