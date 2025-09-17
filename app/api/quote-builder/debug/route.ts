import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== PDF Generation Debug ===')
    
    // Check environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    console.log('N8N_WEBHOOK_URL exists:', !!n8nWebhookUrl)
    
    // Check if we can import wordGenerator
    let wordGeneratorAvailable = false
    try {
      const { wordGenerator } = await import('@/lib/wordGenerator')
      wordGeneratorAvailable = true
      console.log('wordGenerator imported successfully')
    } catch (error) {
      console.error('Failed to import wordGenerator:', error)
    }
    
    // Check template files
    const fs = await import('fs')
    const path = await import('path')
    const templatesDir = path.join(process.cwd(), 'public', 'templates')
    console.log('Templates directory:', templatesDir)
    
    const templateFiles = [
      'PINE Quotation Template.docx',
      'Spruce Quotation Template.docx', 
      'Willow Quotation Template.docx',
      'Custom Build Quotation Template.docx'
    ]
    
    const templateStatus = {}
    for (const template of templateFiles) {
      const templatePath = path.join(templatesDir, template)
      templateStatus[template] = fs.existsSync(templatePath)
      console.log(`Template ${template} exists:`, templateStatus[template])
    }
    
    return NextResponse.json({
      success: true,
      debug: {
        n8nWebhookUrl: !!n8nWebhookUrl,
        wordGeneratorAvailable,
        templateStatus,
        templatesDir,
        nodeEnv: process.env.NODE_ENV
      }
    })
    
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
