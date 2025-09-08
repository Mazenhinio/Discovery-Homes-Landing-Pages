// Discovery Homes Email Service
// TODO: Replace with actual email service (SendGrid, Mailgun, etc.)

interface WelcomeEmailData {
  to: string
  name: string
  segment: string
}

interface QuoteEmailData {
  to: string
  name: string
  model: string
  estimatedPrice: number
  pdfBuffer?: Buffer
  quoteNumber: string
}

interface NewsletterWelcomeData {
  to: string
  name: string
  segment: string
}

interface NotificationData {
  to: string
  subject: string
  data: any
}

interface WebinarConfirmationData {
  to: string
  name: string
  webinarTitle: string
  sessionDateTime: string
  timezone?: string
  joinUrl?: string
  calendarUrl?: string
}

class MailerService {
  private apiKey: string
  private fromAddress: string

  constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || 'mock-api-key'
    this.fromAddress = process.env.FROM_EMAIL || 'hello@discoveryhomes.ca'
  }

  async sendWelcome({ to, name, segment }: WelcomeEmailData): Promise<boolean> {
    try {
      console.log('Sending welcome email:', { to, name, segment })

      const emailContent = this.generateWelcomeEmail(name, segment)

      // TODO: Replace with actual email service
      // Example for SendGrid:
      // const msg = {
      //   to,
      //   from: this.fromAddress,
      //   subject: 'Welcome to Discovery Homes',
      //   html: emailContent
      // }
      // await sgMail.send(msg)

      // Mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Welcome Email Sent:', {
          to,
          from: this.fromAddress,
          subject: 'Welcome to Discovery Homes',
          segment
        })
      }

      return true

    } catch (error) {
      console.error('Email Error - Failed to send welcome email:', error)
      throw new Error('Failed to send welcome email')
    }
  }

  async sendQuote({ to, name, model, estimatedPrice, pdfBuffer, quoteNumber }: QuoteEmailData): Promise<boolean> {
    try {
      console.log('Sending quote email:', { to, name, model, estimatedPrice, quoteNumber })

      const emailContent = this.generateQuoteEmail(name, model, estimatedPrice, quoteNumber)

      // TODO: Replace with actual email service with PDF attachment
      // Example for SendGrid:
      // const msg = {
      //   to,
      //   from: this.fromAddress,
      //   subject: `Your Discovery Homes Quote - ${model}`,
      //   html: emailContent,
      //   attachments: pdfBuffer ? [{
      //     content: pdfBuffer.toString('base64'),
      //     filename: `discovery-homes-quote-${quoteNumber}.pdf`,
      //     type: 'application/pdf',
      //     disposition: 'attachment'
      //   }] : []
      // }
      // await sgMail.send(msg)

      // Mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Quote Email Sent:', {
          to,
          from: this.fromAddress,
          subject: `Your Discovery Homes Quote - ${model}`,
          estimatedPrice: `$${estimatedPrice.toLocaleString()}`,
          quoteNumber,
          hasPDF: !!pdfBuffer
        })
      }

      return true

    } catch (error) {
      console.error('Email Error - Failed to send quote email:', error)
      throw new Error('Failed to send quote email')
    }
  }

  async sendNewsletterWelcome({ to, name, segment }: NewsletterWelcomeData): Promise<boolean> {
    try {
      console.log('Sending newsletter welcome email:', { to, name, segment })

      const emailContent = this.generateNewsletterWelcomeEmail(name, segment)

      // TODO: Replace with actual email service
      // Mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Newsletter Welcome Email Sent:', {
          to,
          from: this.fromAddress,
          subject: 'Welcome to Discovery Homes Monthly Insights',
          segment
        })
      }

      return true

    } catch (error) {
      console.error('Email Error - Failed to send newsletter welcome:', error)
      throw new Error('Failed to send newsletter welcome email')
    }
  }

  async sendNotification({ to, subject, data }: NotificationData): Promise<boolean> {
    try {
      console.log('Sending notification email:', { to, subject })

      const emailContent = this.generateNotificationEmail(data)

      // TODO: Replace with actual email service
      // Mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Notification Email Sent:', {
          to,
          from: this.fromAddress,
          subject,
          dataKeys: Object.keys(data)
        })
      }

      return true

    } catch (error) {
      console.error('Email Error - Failed to send notification:', error)
      throw new Error('Failed to send notification email')
    }
  }

  async sendWebinarConfirmation({ to, name, webinarTitle, sessionDateTime, timezone, joinUrl, calendarUrl }: WebinarConfirmationData): Promise<boolean> {
    try {
      console.log('Sending webinar confirmation email:', { to, name, webinarTitle, sessionDateTime, timezone })

      const emailContent = this.generateWebinarConfirmationEmail({
        name,
        webinarTitle,
        sessionDateTime,
        timezone,
        joinUrl: joinUrl || 'https://www.discoveryhomes.ca/webinars/join',
        calendarUrl
      })

      // TODO: Replace with actual email service
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Webinar Confirmation Email Sent:', {
          to,
          from: this.fromAddress,
          subject: `You are registered: ${webinarTitle}`,
          sessionDateTime,
          timezone
        })
      }

      return true

    } catch (error) {
      console.error('Email Error - Failed to send webinar confirmation:', error)
      throw new Error('Failed to send webinar confirmation email')
    }
  }

  private generateWelcomeEmail(name: string, segment: string): string {
    const segmentMessages = {
      'indigenous-community': 'We look forward to partnering with your community to create culturally-respectful housing solutions.',
      'developer': 'We\'re excited to help you deliver quality housing projects faster and more efficiently.',
      'resort-owner': 'We can\'t wait to help you maximize your property\'s revenue potential with our modular units.',
      'rural-family': 'We\'re here to help you turn your land into your dream home.',
      'general': 'We\'re here to help you discover the potential of modular housing.'
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Discovery Homes</title>
      </head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.discoveryhomes.ca/images/logo/logo-header.webp" alt="Discovery Homes" style="max-width: 200px;">
        </div>
        
        <h1 style="color: #2D2D2D; text-align: center;">Welcome to Discovery Homes, ${name}!</h1>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          Thank you for your interest in Discovery Homes. ${segmentMessages[segment as keyof typeof segmentMessages] || segmentMessages.general}
        </p>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          At Discovery Homes, we believe a home is more than walls and a roof — it's a foundation for stronger families, 
          thriving communities, and a better future.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.discoveryhomes.ca/quote-builder" 
             style="background-color: #D4AF37; color: #2D2D2D; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Start Your Quote
          </a>
        </div>
        
        <p style="color: #737373; font-size: 14px; line-height: 1.6;">
          Best regards,<br>
          The Discovery Homes Team<br>
          Aaron, Corey & Jeff
        </p>
      </body>
      </html>
    `
  }

  private generateQuoteEmail(name: string, model: string, estimatedPrice: number, quoteNumber: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Discovery Homes Quote</title>
      </head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.discoveryhomes.ca/images/logo/logo-header.webp" alt="Discovery Homes" style="max-width: 200px;">
        </div>
        
        <h1 style="color: #2D2D2D; text-align: center;">Your Custom Quote is Ready!</h1>
        
        <div style="background-color: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2D2D2D; margin-top: 0;">Quote Details</h2>
          <p><strong>Quote Number:</strong> ${quoteNumber}</p>
          <p><strong>Model:</strong> ${model}</p>
          <p><strong>Estimated Price:</strong> $${estimatedPrice.toLocaleString()} CAD</p>
        </div>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          Thank you for using our Quote Builder! We've attached your detailed PDF quote which includes:
        </p>
        
        <ul style="color: #737373; font-size: 16px; line-height: 1.6;">
          <li>Complete pricing breakdown</li>
          <li>Model specifications and features</li>
          <li>Available add-ons and upgrades</li>
          <li>Next steps in the process</li>
        </ul>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          A Discovery Homes specialist will contact you within 24 hours to discuss your project and answer any questions.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.discoveryhomes.ca/contact" 
             style="background-color: #D4AF37; color: #2D2D2D; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Schedule a Consultation
          </a>
        </div>
        
        <p style="color: #737373; font-size: 14px; line-height: 1.6;">
          Ready to turn your land into your legacy?<br><br>
          
          Best regards,<br>
          The Discovery Homes Team
        </p>
      </body>
      </html>
    `
  }

  private generateNewsletterWelcomeEmail(name: string, segment: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Discovery Homes Monthly Insights</title>
      </head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.discoveryhomes.ca/images/logo/logo-header.webp" alt="Discovery Homes" style="max-width: 200px;">
        </div>
        
        <h1 style="color: #2D2D2D; text-align: center;">Welcome to Monthly Insights!</h1>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          Thank you for subscribing to Discovery Homes Monthly Insights! You'll receive:
        </p>
        
        <ul style="color: #737373; font-size: 16px; line-height: 1.6;">
          <li>Industry insights and trends</li>
          <li>Success stories and case studies</li>
          <li>Funding opportunities and guides</li>
          <li>Building tips and best practices</li>
          <li>Exclusive offers and updates</li>
        </ul>
        
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          In the meantime, here are some resources you might find helpful:
        </p>
        
        <div style="background-color: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2D2D2D; margin-top: 0;">Popular Resources</h3>
          <p><a href="https://www.discoveryhomes.ca/resources/roi-calculator" style="color: #D4AF37;">ROI Calculator</a> - Calculate your potential return</p>
          <p><a href="https://www.discoveryhomes.ca/resources/funding-guide" style="color: #D4AF37;">Funding Guide</a> - Available grants and programs</p>
          <p><a href="https://www.discoveryhomes.ca/success-stories" style="color: #D4AF37;">Success Stories</a> - Real customer experiences</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.discoveryhomes.ca/quote-builder" 
             style="background-color: #D4AF37; color: #2D2D2D; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Get Your Quote
          </a>
        </div>
        
        <p style="color: #737373; font-size: 14px; line-height: 1.6;">
          Best regards,<br>
          The Discovery Homes Team
        </p>
      </body>
      </html>
    `
  }

  private generateNotificationEmail(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Discovery Homes Notification</title>
      </head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Discovery Homes - New Lead Notification</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
      </html>
    `
  }

  private generateWebinarConfirmationEmail({ name, webinarTitle, sessionDateTime, timezone, joinUrl, calendarUrl }: { name: string; webinarTitle: string; sessionDateTime: string; timezone?: string; joinUrl?: string; calendarUrl?: string }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>You are registered: ${webinarTitle}</title>
      </head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.discoveryhomes.ca/images/logo/logo-header.webp" alt="Discovery Homes" style="max-width: 200px;">
        </div>

        <h1 style="color: #2D2D2D; text-align: center;">You're in, ${name}!</h1>
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">Thanks for registering for our webinar:</p>
        <h2 style="color: #2D2D2D;">${webinarTitle}</h2>
        <p style="color: #737373; font-size: 16px; line-height: 1.6;">
          <strong>Date & Time:</strong> ${sessionDateTime}${timezone ? ` (${timezone})` : ''}
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${joinUrl}" style="background-color: #D4AF37; color: #2D2D2D; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Join Webinar</a>
        </div>

        ${calendarUrl ? `<p style="text-align: center;"><a href="${calendarUrl}" style="color: #D4AF37;">Add to Calendar</a></p>` : ''}

        <p style="color: #737373; font-size: 14px; line-height: 1.6;">
          We look forward to seeing you there!<br>
          — The Discovery Homes Team
        </p>
      </body>
      </html>
    `
  }
}

// Export singleton instance
export const mailer = new MailerService()

// Export types
export type { WelcomeEmailData, QuoteEmailData, NewsletterWelcomeData, NotificationData, WebinarConfirmationData } 