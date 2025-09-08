import { NextRequest, NextResponse } from 'next/server'
import { crmClient } from '@/lib/crmClient'
import { mailer } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      webinarTitle = 'Discovery Homes Webinar',
      sessionDateTime,
      timezone = 'America/Vancouver',
      source = 'Webinar Registration Page',
      segment = 'general'
    } = body

    if (!firstName || !lastName || !email || !sessionDateTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const name = `${firstName} ${lastName}`

    const leadData = {
      name,
      email,
      phone,
      segment,
      source,
      tags: ['webinar', webinarTitle, segment].filter(Boolean),
      status: 'registered',
      webinar_title: webinarTitle,
      webinar_session: sessionDateTime,
      timezone,
      submittedAt: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    const crmResult = await crmClient.createLead(leadData)

    await mailer.sendWebinarConfirmation({
      to: email,
      name: firstName,
      webinarTitle,
      sessionDateTime,
      timezone
    })

    await mailer.sendNotification({
      to: process.env.SALES_EMAIL || 'sales@discoveryhomes.ca',
      subject: `New Webinar Registration: ${webinarTitle}`,
      data: { leadId: crmResult.id, ...leadData }
    })

    return NextResponse.json({
      success: true,
      leadId: crmResult.id,
      message: 'You are registered! Check your email for confirmation and joining details.'
    })
  } catch (error) {
    console.error('Webinar registration error:', error)
    return NextResponse.json(
      {
        error: 'Failed to register for the webinar. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}


