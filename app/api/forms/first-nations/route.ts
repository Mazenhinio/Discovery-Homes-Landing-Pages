import { NextRequest, NextResponse } from 'next/server'
import { mailer } from '@/lib/mailer'
import { crmClient } from '@/lib/crmClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      community,
      projectType,
      timeline,
      source = 'First Nations Landing Page',
      interest = 'First Nations Community Housing'
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !community) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare CRM data with First Nations specific tags
    const crmData = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      segment: 'indigenous-community',
      source,
      tags: ['First Nations', 'Community Housing', 'Landing Page Lead'],
      status: 'new',
      community_name: community,
      project_type: projectType,
      timeline: timeline
    }

    // Add to CRM
    const crmResult = await crmClient.createLead(crmData)

    // Send confirmation email to customer
    const customerEmailContent = `
      <h2>Thank you for your First Nations housing inquiry!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for reaching out to Discovery Homes about your community housing project. We've received your inquiry and our First Nations housing specialist will contact you within 24 hours to discuss your project.</p>

      <h3>What to expect:</h3>
      <ul>
        <li>Comprehensive housing needs assessment</li>
        <li>Funding and grant opportunities</li>
        <li>Community consultation process</li>
        <li>Sustainable housing solutions</li>
      </ul>
      
      <p>In the meantime, you can download our <a href="#">First Nations Housing Guide</a> to learn more about our community-focused approach.</p>
      
      <p>Best regards,<br>
      The Discovery Homes Team</p>
    `

    await mailer.sendNotification({
      to: email,
      subject: 'Your First Nations Housing Inquiry - Discovery Homes',
      data: { html: customerEmailContent }
    })

    // Send internal notification
    const notificationContent = `
      <h2>New First Nations Landing Page Lead</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Community:</strong> ${community}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>CRM ID:</strong> ${crmResult?.id || 'N/A'}</p>
    `

    await mailer.sendNotification({
      to: 'firstnations@discoveryhomes.ca',
      subject: 'New First Nations Landing Page Lead',
      data: { html: notificationContent }
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your First Nations housing guide is being prepared and our specialist will contact you within 24 hours.',
      crmId: crmResult?.id
    })

  } catch (error) {
    console.error('Error processing First Nations form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 