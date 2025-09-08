import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // For now, return a simple JSON response instead of PDF
    // This will allow the build to succeed and the site to deploy
    return NextResponse.json({ 
      message: 'PDF generation temporarily disabled for deployment',
      formData: formData,
      note: 'PDF generation will be re-enabled after deployment'
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}