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
      propertyType,
      investmentAmount,
      timeline,
      source = 'Real Estate Rental Landing Page',
      interest = 'Rental Property Investment'
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !propertyType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare CRM data with rental investment specific tags
    const crmData = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      segment: 'developer',
      source,
      tags: ['Rental Investment', 'Real Estate', 'Landing Page Lead'],
      status: 'new',
      property_type: propertyType,
      investment_amount: investmentAmount,
      timeline: timeline
    }

    // Add to CRM
    const crmResult = await crmClient.createLead(crmData)

    // Send confirmation email to customer
    const customerEmailContent = `
      <h2>Thank you for your rental investment inquiry!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for reaching out to Discovery Homes about your rental property investment. We've received your inquiry and our rental investment specialist will contact you within 24 hours to discuss your project.</p>

      <h3>What to expect:</h3>
      <ul>
        <li>ROI analysis and projections</li>
        <li>Property evaluation and recommendations</li>
        <li>Financing options and strategies</li>
        <li>Portfolio expansion planning</li>
      </ul>
      
      <p>In the meantime, you can download our <a href="#">Rental Investment Guide</a> to learn more about maximizing your rental property returns.</p>
      
      <p>Best regards,<br>
      The Discovery Homes Team</p>
    `

    await mailer.sendNotification({
      to: email,
      subject: 'Your Rental Investment Inquiry - Discovery Homes',
      data: { html: customerEmailContent }
    })

    // Send internal notification
    const notificationContent = `
      <h2>New Real Estate Rental Landing Page Lead</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Property Type:</strong> ${propertyType}</p>
      <p><strong>Investment Amount:</strong> ${investmentAmount}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>CRM ID:</strong> ${crmResult?.id || 'N/A'}</p>
    `

    await mailer.sendNotification({
      to: 'rental@discoveryhomes.ca',
      subject: 'New Real Estate Rental Landing Page Lead',
      data: { html: notificationContent }
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your ROI calculator is being prepared and our rental property specialist will contact you within 24 hours.',
      crmId: crmResult?.id
    })

  } catch (error) {
    console.error('Error processing real estate rental form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 