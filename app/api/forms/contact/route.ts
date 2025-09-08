import { NextRequest, NextResponse } from 'next/server'
import { crmClient } from '@/lib/crmClient'
import { mailer } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone, message, segment = 'general' } = body
    
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create lead in CRM
    const leadData = {
      name,
      email,
      phone,
      message,
      source: 'contact-form',
      segment,
      tags: ['contact-form', segment],
      status: 'new',
      submittedAt: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    // Send to CRM
    const crmResult = await crmClient.createLead(leadData)
    
    // Send notification email to team
    await mailer.sendNotification({
      to: process.env.NOTIFICATION_EMAIL || 'info@discoveryhomes.ca',
      subject: `New Contact Form Submission - ${name}`,
      data: leadData
    })
    
    // Send welcome email to lead
    await mailer.sendWelcome({
      to: email,
      name,
      segment
    })

    return NextResponse.json({
      success: true,
      leadId: crmResult.id,
      message: 'Thank you for your inquiry. We\'ll be in touch soon!'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 