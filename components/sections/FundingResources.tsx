import { Download, FileText, ExternalLink, DollarSign, Building2, Users } from 'lucide-react'

export function FundingResources() {
  const fundingPrograms = [
    {
      category: "Federal Programs",
      icon: <Building2 size={24} />,
      color: "bg-blue-50 border-blue-200 text-blue-600",
      programs: [
        {
          title: "CMHC - National Housing Co-Investment Fund",
          description: "Low-interest loans and contributions for affordable housing projects in Indigenous communities",
          amount: "Up to $25M per project",
          downloadUrl: "/resources/cmhc-co-investment-fund.pdf",
          website: "https://www.cmhc-schl.gc.ca"
        },
        {
          title: "ISC - First Nations Infrastructure Fund",
          description: "Capital funding for community infrastructure including housing on reserves",
          amount: "Project-based funding",
          downloadUrl: "/resources/isc-infrastructure-fund.pdf",
          website: "https://www.sac-isc.gc.ca"
        },
        {
          title: "CMHC - Indigenous Housing Policy",
          description: "Targeted housing programs specifically designed for Indigenous communities",
          amount: "Various funding levels",
          downloadUrl: "/resources/cmhc-indigenous-housing.pdf",
          website: "https://www.cmhc-schl.gc.ca"
        }
      ]
    },
    {
      category: "Provincial Programs",
      icon: <Users size={24} />,
      color: "bg-green-50 border-green-200 text-green-600",
      programs: [
        {
          title: "Alberta Indigenous Housing Corporation",
          description: "Funding for on-reserve and off-reserve Indigenous housing development",
          amount: "Up to $150K per unit",
          downloadUrl: "/resources/alberta-indigenous-housing.pdf",
          website: "https://www.alberta.ca"
        },
        {
          title: "Saskatchewan Housing Corporation",
          description: "Provincial housing programs with Indigenous community focus",
          amount: "Varies by program",
          downloadUrl: "/resources/saskatchewan-housing.pdf",
          website: "https://www.saskatchewan.ca"
        },
        {
          title: "BC Housing - Indigenous Programs",
          description: "Comprehensive housing support for BC Indigenous communities",
          amount: "Project-specific",
          downloadUrl: "/resources/bc-housing-indigenous.pdf",
          website: "https://www.bchousing.org"
        }
      ]
    },
    {
      category: "Community Programs",
      icon: <DollarSign size={24} />,
      color: "bg-purple-50 border-purple-200 text-purple-600",
      programs: [
        {
          title: "Indigenous Community Development Fund",
          description: "Local economic development funding that can support housing initiatives",
          amount: "Up to $500K",
          downloadUrl: "/resources/community-development-fund.pdf",
          website: "#"
        },
        {
          title: "Rural & Northern Housing Trust",
          description: "Special funding for remote and rural Indigenous housing projects",
          amount: "Project-based",
          downloadUrl: "/resources/rural-northern-housing.pdf",
          website: "#"
        }
      ]
    }
  ]

  const applicationSupport = [
    {
      title: "Grant Application Assistance",
      description: "Our team helps navigate complex funding applications",
      icon: <FileText size={32} />
    },
    {
      title: "Compliance Documentation",
      description: "We ensure all builds meet funding program requirements",
      icon: <Building2 size={32} />
    },
    {
      title: "Community Consultation",
      description: "Support for community engagement and approval processes",
      icon: <Users size={32} />
    }
  ]

  return (
    <section id="funding-resources" className="section bg-neutral-50 animate-section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
            Funding Resources & Grant Programs
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Access comprehensive funding resources for Indigenous housing projects. 
            Download program guides and application materials for federal, provincial, and community funding.
          </p>
        </div>

        {/* Funding Programs */}
        <div className="space-y-12">
          {fundingPrograms.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-cards">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-discovery-charcoal">
                  {category.category}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {category.programs.map((program, programIndex) => (
                  <div key={programIndex} className="card-luxury micro-interaction group">
                    <div className="card-body">
                      <h4 className="font-bold text-discovery-charcoal mb-2 group-hover:text-discovery-gold transition-colors">
                        {program.title}
                      </h4>
                      
                      <p className="text-sm text-neutral-600 mb-3">
                        {program.description}
                      </p>
                      
                      <div className="text-lg font-semibold text-discovery-gold mb-4">
                        {program.amount}
                      </div>
                      
                      <div className="space-y-2">
                        <a
                          href={program.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline w-full justify-center text-sm group-hover:bg-discovery-gold group-hover:text-discovery-charcoal group-hover:border-discovery-gold transition-all duration-300"
                        >
                          <Download size={14} className="mr-2" />
                          Download Guide
                        </a>
                        
                        {program.website !== "#" && (
                          <a
                            href={program.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full text-sm text-discovery-gold hover:text-discovery-gold-dark transition-colors py-2"
                          >
                            <ExternalLink size={14} className="mr-2" />
                            Official Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Application Support */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-discovery-charcoal text-center mb-8">
            Application Support Services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 animate-cards">
            {applicationSupport.map((service, index) => (
              <div key={index} className="card-luxury text-center micro-interaction group">
                <div className="card-body">
                  <div className="text-discovery-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="font-bold text-discovery-charcoal mb-2 group-hover:text-discovery-gold transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-neutral-600 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center scale-on-scroll">
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-discovery-charcoal mb-4">
              Need Help With Funding Applications?
            </h3>
            <p className="text-neutral-600 mb-6">
              Our experienced team can help you navigate the funding landscape and 
              prepare successful grant applications for your community housing project.
            </p>
            <a
              href="/contact"
              className="btn-luxury shadow-gold hover:shadow-luxury-lg transition-all duration-300"
            >
              Schedule Funding Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 