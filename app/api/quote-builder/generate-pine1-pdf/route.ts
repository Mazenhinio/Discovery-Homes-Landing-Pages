import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    

    
    // Create HTML content for the PDF with a cover page that matches your Word template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Pine 1 Quotation</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
            
            body {
              font-family: 'Montserrat', sans-serif;
              margin: 0;
              padding: 0;
              color: #2D2D2D;
              line-height: 1.6;
            }
            
            .header-rectangle {
              background-color: #68A71D;
              height: 120px;
              width: 100%;
              position: relative;
            }
            
            .cover-page {
              background-color: white;
              padding: 80px 40px 0 40px;
              text-align: center;
              position: relative;
              height: 1123px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              page-break-after: always;
            }
            
            .cover-logo {
              width: 120px;
              height: 80px;
              background: linear-gradient(135deg, #8BC34A 0%, #68A71D 100%);
              clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
              margin: 0 auto 20px;
              position: relative;
            }
            
            .cover-logo::before {
              content: '';
              position: absolute;
              top: 20%;
              left: 20%;
              width: 60%;
              height: 60%;
              background: #8BC34A;
              clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            }
            
            .cover-title {
              font-size: 48px;
              font-weight: 700;
              color: #68A71D;
              margin-bottom: 10px;
              letter-spacing: 2px;
            }
            
            .cover-subtitle {
              font-size: 36px;
              font-weight: 600;
              color: #2D2D2D;
              margin-bottom: 40px;
            }
            
            .cover-client {
              font-size: 18px;
              color: #2D2D2D;
              margin-bottom: 10px;
            }
            
            .cover-date {
              font-size: 16px;
              color: #2D2D2D;
            }
            
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
              padding: 0 40px;
            }
            
            .section-title {
              font-size: 24px;
              font-weight: 600;
              color: #2D2D2D;
              margin-bottom: 15px;
              border-bottom: 2px solid #68A71D;
              padding-bottom: 5px;
            }
            
            .subtitle {
              font-size: 18px;
              font-weight: 600;
              color: #2D2D2D;
              margin-bottom: 10px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            
            th {
              background-color: #f8f9fa;
              font-weight: 600;
            }
            
            .feature-list {
              list-style: none;
              padding: 0;
            }
            
            .feature-list li {
              padding: 5px 0;
              border-bottom: 1px solid #eee;
            }
            
            .feature-list li:before {
              content: "•";
              color: #68A71D;
              font-weight: bold;
              margin-right: 10px;
            }
            
            .cta {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-top: 30px;
            }
            
            .contact-details {
              background-color: #2D2D2D;
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            
            .footer-rectangle {
              background-color: #68A71D;
              height: 120px;
              width: 100%;
              position: absolute;
              bottom: 198px;
              left: 0;
              right: 0;
              page-break-inside: avoid;
              z-index: 10;
            }
            
            .footer-content {
              position: absolute;
              bottom: 5px;
              left: 40px;
              color: #E8F5E8;
              font-size: 16px;
              text-align: left;
              font-weight: 500;
            }
            
            .footer-item {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: 12px;
            }
            
            .footer-icon {
              width: 16px;
              height: 16px;
              margin-right: 8px;
              opacity: 0.8;
            }
            
            .footer-link {
              color: #E8F5E8;
              text-decoration: none;
              transition: opacity 0.2s;
            }
            
            .footer-link:hover {
              opacity: 0.8;
            }
            
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              max-width: 300px;
              max-height: 200px;
              opacity: 0.1;
              z-index: 1;
            }
            
            @media print {
              body { margin: 0; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <!-- Header Rectangle -->
          <div class="header-rectangle"></div>
          
          <!-- Cover Page (matching your Word template) -->
          <div class="cover-page">
            <!-- Watermark Image -->
            <img src="C:\Users\Work pc\Documents\GitHub\Modular-Homes-Website\New Images\Quotation Prep Files\Watermark logo.png" alt="Watermark" class="watermark">
            
            <div class="cover-logo"></div>
            <div class="cover-title">PINE</div>
            <div class="cover-subtitle">Quotation</div>
            <div class="cover-client">For: ${formData.name || 'Not specified'}</div>
            <div class="cover-date">Date: ${new Date().toLocaleDateString()}</div>
            
            <!-- Footer Rectangle with Contact Info on Cover Page -->
            <div class="footer-rectangle">
              <div class="footer-content">
                <div class="footer-item">
                  <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <a href="tel:+17808700524" class="footer-link">+1 (780) 870 0524</a>
                </div>
                <div class="footer-item">
                  <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:Info@discoveryhomes.ca" class="footer-link">Info@discoveryhomes.ca</a>
                </div>
                <div class="footer-item">
                  <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <a href="https://discoveryhomes.ca" class="footer-link">DISCOVERYHOMES.CA</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="section">
            <div class="section-title">CONTACT INFORMATION</div>
            <table>
              <tr><th>Name:</th><td>${formData.name || 'Not specified'}</td></tr>
              <tr><th>Email:</th><td>${formData.email || 'Not specified'}</td></tr>
              <tr><th>Phone:</th><td>${formData.phone || 'Not specified'}</td></tr>
              <tr><th>Location:</th><td>${formData.location || 'Not specified'}</td></tr>
            </table>
          </div>

          <!-- Property Details -->
          <div class="section">
            <div class="section-title">PROPERTY DETAILS</div>
            <table>
              <tr><th>Land Status:</th><td>${formData.landStatus || 'Not specified'}</td></tr>
              <tr><th>Within 150km of Lloydminster:</th><td>${formData.isWithin150kmOfLloydminster || 'Not specified'}</td></tr>
            </table>
          </div>

          <!-- Intended Use -->
          <div class="section">
            <div class="section-title">INTENDED USE</div>
            <p>${formData.intendedUse === 'other' ? `Other: ${formData.intendedUseOther || 'Not specified'}` : formData.intendedUse || 'Not specified'}</p>
          </div>

          <!-- Model Features -->
          <div class="section">
            <div class="section-title">PINE 1 MODEL FEATURES</div>
            <ul class="feature-list">
              <li>Premium modular construction with high-quality materials</li>
              <li>Customizable floor plans to suit your needs</li>
              <li>Energy-efficient design for cost savings</li>
              <li>Professional installation and warranty coverage</li>
              <li>Modern amenities and premium finishes</li>
              <li>Built to last with superior craftsmanship</li>
            </ul>
          </div>

          <!-- Package Selection -->
          <div class="section">
            <div class="section-title">SELECTED PACKAGE</div>
            <p>${formData.packageType === 'net-zero' 
              ? 'Net-Zero Package - Complete energy independence with solar panels and battery storage'
              : formData.packageType === 'off-grid' 
              ? 'Off-Grid Package - Self-sufficient systems for remote locations'
              : 'Standard Package - High-quality modular home with standard features'}</p>
          </div>

          <!-- Specifications -->
          <div class="section">
            <div class="section-title">SPECIFICATIONS</div>
            <table>
              <tr><th>Model:</th><td>Pine 1 (Pine)</td></tr>
              <tr><th>Bedrooms:</th><td>${formData.bedrooms || 'Not specified'}</td></tr>
              <tr><th>Square Footage:</th><td>${formData.sqft || 'Not specified'}</td></tr>
            </table>
          </div>

          <!-- Finishes and Options -->
          <div class="section">
            <div class="section-title">FINISHES & OPTIONS</div>
            
            <div class="subtitle">Selected Finishes:</div>
            <table>
              <tr><th>Feature</th><th>Description</th><th>Cost</th></tr>
              ${formData.baseLighting ? '<tr><td>Base Lighting</td><td>Pot lights throughout the home</td><td>Included</td></tr>' : ''}
              ${formData.baseTile ? '<tr><td>Base Tile</td><td>Shower surround + kitchen/bath backsplash</td><td>Included</td></tr>' : ''}
              ${formData.addCeilingFans ? `<tr><td>Ceiling Fans</td><td>Per bathroom</td><td>+$${540 * (parseInt(formData.bathrooms?.replace(/\\D/g, '') || '1'))} - $${660 * (parseInt(formData.bathrooms?.replace(/\\D/g, '') || '1'))}</td></tr>` : ''}
              ${formData.addBedroomFixtures ? '<tr><td>Enhanced Kitchen Tile</td><td>Premium kitchen tile upgrade</td><td>+$450 - $550</td></tr>' : ''}
              ${formData.featureSurfaces ? '<tr><td>Feature Surfaces</td><td>Premium surface materials</td><td>+$800 - $1,200</td></tr>' : ''}
              ${formData.faucets === 'bronze' ? '<tr><td>Bronze Faucets</td><td>Premium bronze finish</td><td>+$450 - $600</td></tr>' : ''}
              ${formData.siding === 'wood-grain' ? '<tr><td>Wood Grain Siding</td><td>Premium wood grain finish</td><td>+$4,000 - $6,600</td></tr>' : ''}
              ${formData.wallsFinish === 'woodboard-stained' ? '<tr><td>Woodboard/Stained Walls</td><td>Premium wall finish</td><td>+$4,050 - $4,950</td></tr>' : ''}
            </table>

            <div class="subtitle">Available Options for Discussion:</div>
            <ul class="feature-list">
              <li>Premium countertops (quartz, granite, marble)</li>
              <li>Custom cabinetry finishes and hardware</li>
              <li>Hardwood flooring and premium vinyl options</li>
              <li>Smart home integration and automation</li>
              <li>Custom lighting packages and fixtures</li>
              <li>Premium appliance packages (kitchen & laundry)</li>
              <li>Custom window treatments and coverings</li>
              <li>Exterior landscaping and hardscaping</li>
              <li>Custom paint colors and finishes</li>
              <li>Additional storage solutions</li>
            </ul>
          </div>

          <!-- Add-ons -->
          <div class="section">
            <div class="section-title">ADD-ONS & UPGRADES</div>
            <table>
              <tr><th>Add-on</th><th>Cost</th><th>Description</th></tr>
              ${formData.addons.includes('solar') ? '<tr><td>Solar Panels</td><td>+$15,000 - $20,000</td><td>Reduce energy costs with solar power</td></tr>' : ''}
              ${formData.addons.includes('deck') ? '<tr><td>Deck</td><td>+$8,000 - $12,000</td><td>Extend your living area outdoors</td></tr>' : ''}
              ${formData.addons.includes('appliances') ? '<tr><td>Upgraded Appliances</td><td>+$12,000 - $15,000</td><td>High-end kitchen and laundry appliances</td></tr>' : ''}
              ${formData.addons.includes('smart-home') ? '<tr><td>Smart Home Package</td><td>+$4,500 - $5,500</td><td>Automated lighting, security, and climate control</td></tr>' : ''}
              ${formData.addons.includes('fireplace') ? '<tr><td>Fireplace</td><td>+$5,000 - $8,000</td><td>Gas, electric, or wood-burning options</td></tr>' : ''}
            </table>
          </div>

          <!-- Budget and Timeline -->
          <div class="section">
            <div class="section-title">BUDGET & TIMELINE</div>
            <table>
              <tr><th>Budget Range:</th><td>${formData.budget || 'Not specified'}</td></tr>
              <tr><th>Project Timeline:</th><td>${formData.timeline || 'Not specified'}</td></tr>
            </table>
          </div>

          <!-- Project Details -->
          <div class="section">
            <div class="section-title">PROJECT DETAILS</div>
            <table>
              <tr><th>Number of Homes:</th><td>${formData.numberOfHomes === '4+' ? `${formData.customNumberOfHomes || 4}+ homes` : formData.numberOfHomes || 'Not specified'}</td></tr>
              <tr><th>Indigenous Community:</th><td>${formData.isIndigenous === 'yes' ? 'Yes' : 'No'}</td></tr>
              <tr><th>Financing Needed:</th><td>${formData.needsFinancingHelp === 'yes' ? 'Yes' : 'No'}</td></tr>
              <tr><th>Financing Type:</th><td>${formData.financing || 'Not specified'}</td></tr>
            </table>
          </div>

          <!-- Call to Action -->
          <div class="section" style="margin-bottom: 20px;">
            <div class="section-title">NEXT STEPS</div>
            <div class="cta">
              <p>Thank you for your interest in Discovery Homes! Our team will contact you within 24 hours to discuss your project in detail and answer any questions you may have.</p>
            </div>
            
            <div class="subtitle">For immediate assistance, please contact us:</div>
            <div class="contact-details">
              <strong>Discovery Homes</strong><br>
              Phone: +1 (780) 870 0524<br>
              Email: Info@discoveryhomes.ca<br>
              Website: DISCOVERYHOMES.CA
            </div>
          </div>


        </body>
      </html>
    `

    // For now, we'll use the HTML content since we need to combine Word and HTML
    // In a production environment, you might want to use a library like pdf-lib to merge documents
    
    // Launch browser and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      printBackground: true
    })

    await browser.close()

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Pine1-Quotation.pdf"'
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
