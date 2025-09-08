import { NextRequest, NextResponse } from 'next/server'
import { mailer } from '@/lib/mailer'
import { crmClient } from '@/lib/crmClient'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Extract form fields
    const {
      firstName,
      lastName,
      email,
      phone,
      propertyAddress,
      landSize,
      currentUse,
      developmentGoals
    } = formData

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !propertyAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare CRM data with land development specific tags
    const crmData = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      segment: 'developer',
      source: 'Land Owners Landing Page',
      tags: ['Land Development', 'Property Owner', 'Landing Page Lead'],
      status: 'new',
      property_address: propertyAddress,
      land_size: landSize,
      current_use: currentUse,
      development_goals: developmentGoals
    }

    // Add to CRM
    const crmResult = await crmClient.createLead(crmData)

    // Send confirmation email to customer
    const customerEmailContent = `
      <h2>Thank you for your land evaluation request!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for reaching out to Discovery Homes about your land development project. We've received your inquiry and our land development specialist will contact you within 24 hours to discuss your property's potential.</p>

      <h3>What to expect:</h3>
      <ul>
        <li>Comprehensive land evaluation and feasibility study</li>
        <li>Zoning analysis and development options</li>
        <li>Revenue projections and ROI calculations</li>
        <li>Infrastructure planning and cost estimates</li>
      </ul>
      
      <p>In the meantime, you can download our <a href="#">Land Development Guide</a> to learn more about our sustainable modular development approach.</p>
      
      <p>Best regards,<br>
      The Discovery Homes Team</p>
    `

    await mailer.sendNotification({
      to: email,
      subject: 'Your Land Evaluation Request - Discovery Homes',
      data: { html: customerEmailContent }
    })

    // Send internal notification
    const notificationContent = `
      <h2>New Land Owners Landing Page Lead</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Property Address:</strong> ${propertyAddress}</p>
      <p><strong>Land Size:</strong> ${landSize}</p>
      <p><strong>Current Land Use:</strong> ${currentUse}</p>
      <p><strong>Development Goals:</strong> ${developmentGoals}</p>
      <p><strong>CRM ID:</strong> ${crmResult?.id || 'N/A'}</p>
    `

    await mailer.sendNotification({
      to: 'landowners@discoveryhomes.ca',
      subject: 'New Land Owners Landing Page Lead',
      data: { html: notificationContent }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error processing land owners form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 