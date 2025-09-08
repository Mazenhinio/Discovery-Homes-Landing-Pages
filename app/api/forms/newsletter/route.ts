import { NextRequest, NextResponse } from 'next/server'
import { crmClient } from '@/lib/crmClient'
import { mailer } from '@/lib/mailer'

// Go High Level webhook URL
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/c59e4361-6b59-4868-8bb3-2acb6ea8822d'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { email, name, segment } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
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

    // Create newsletter subscription data
    const subscriptionData = {
      email,
      name: name || '',
      segment: segment || 'general',
      source: 'newsletter-signup',
      tags: ['newsletter-subscriber', segment || 'general'],
      status: 'subscribed',
      subscribedAt: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      preferences: {
        newsletter: true,
        productUpdates: true,
        marketingEmails: false
      }
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
          phone: '', // Optional: add phone field to form if needed
          segment: segment || 'general',
          source: 'newsletter-signup',
          tags: ['newsletter-subscriber', segment || 'general'],
          customFields: {
            interest_segment: segment || 'general',
            subscription_source: 'newsletter-signup',
            subscribed_at: new Date().toISOString(),
            ip_address: request.ip || 'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown'
          }
        })
      })

      if (ghlResponse.ok) {
        ghlSuccess = true
        console.log('✅ Newsletter signup sent to Go High Level successfully')
      } else {
        console.error('❌ Go High Level webhook failed:', ghlResponse.status, ghlResponse.statusText)
      }
    } catch (ghlError) {
      console.error('❌ Go High Level webhook error:', ghlError)
    }

    // Fallback to existing CRM system if Go High Level fails
    if (!ghlSuccess) {
      console.log('🔄 Falling back to existing CRM system')
      
      // Check if email already exists in CRM
      const existingSubscriber = await crmClient.findSubscriber(email)
      
      if (existingSubscriber) {
        // Update existing subscriber
        await crmClient.updateSubscriber(email, {
          ...subscriptionData,
          updatedAt: new Date().toISOString()
        })
      } else {
        // Create new subscriber
        await crmClient.createSubscriber(subscriptionData)
      }
    }
    
    // Send welcome email with newsletter content
    await mailer.sendNewsletterWelcome({
      to: email,
      name: name || 'Friend',
      segment: segment || 'general'
    })
    
    // Send internal notification for new high-value segments
    if (['indigenous', 'developer', 'resort-owner'].includes(segment)) {
      await mailer.sendNotification({
        to: process.env.SALES_EMAIL || 'sales@discoveryhomes.ca',
        subject: `High-Value Newsletter Signup - ${segment}`,
        data: subscriptionData
      })
    }

    return NextResponse.json({
      success: true,
      message: ghlSuccess 
        ? 'Thank you for subscribing! Check your email for our monthly insights.'
        : 'Thank you for subscribing! Check your email for our monthly insights.',
      isNewSubscriber: true,
      ghlSuccess: ghlSuccess
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 