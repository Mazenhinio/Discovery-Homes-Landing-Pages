import { Check, Users, Leaf, Building, Map } from 'lucide-react'

export function IndigenousPartnerships() {
  const partnerships = [
    {
      icon: <Users size={32} />,
      title: "Chief & Council Collaboration",
      description: "Working directly with Indigenous leadership to ensure housing solutions meet community needs and cultural values.",
      features: [
        "Community consultation and planning",
        "Traditional knowledge integration",
        "Local workforce development",
        "Ongoing partnership support"
      ]
    },
    {
      icon: <Leaf size={32} />,
      title: "Land & Cultural Respect",
      description: "Homes designed to work harmoniously with the land while honoring traditional Indigenous building practices.",
      features: [
        "Sustainable, earth-friendly materials",
        "Climate-appropriate designs",
        "Sacred space considerations",
        "Environmental stewardship"
      ]
    },
    {
      icon: <Building size={32} />,
      title: "Community-Centered Design",
      description: "Modular homes that support Indigenous family structures and community gathering traditions.",
      features: [
        "Multi-generational living options",
        "Community gathering spaces",
        "Culturally appropriate layouts",
        "Flexible family configurations"
      ]
    }
  ]

  const successMetrics = [
    { number: "15+", label: "Years Serving Communities" },
    { number: "98%", label: "Community Satisfaction" },
    { number: "250+", label: "Homes Delivered" },
    { number: "50+", label: "Indigenous Partnerships" }
  ]

  return (
    <section className="section bg-discovery-white animate-section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
            Indigenous Community Partnerships
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            For over 15 years, we've been honored to work alongside Indigenous communities, 
            building homes that respect cultural traditions while providing modern comfort and efficiency.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-cards">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center card-item micro-interaction">
              <div className="text-4xl md:text-5xl font-bold text-discovery-gold mb-2">
                {metric.number}
              </div>
              <div className="text-neutral-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Approach */}
        <div className="grid lg:grid-cols-3 gap-8 animate-cards">
          {partnerships.map((partnership, index) => (
            <div key={index} className="card-luxury micro-interaction group">
              <div className="card-body">
                <div className="text-discovery-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {partnership.icon}
                </div>
                
                <h3 className="text-xl font-bold text-discovery-charcoal mb-3 group-hover:text-discovery-gold transition-colors">
                  {partnership.title}
                </h3>
                
                <p className="text-neutral-600 mb-6">
                  {partnership.description}
                </p>
                
                <ul className="space-y-2">
                  {partnership.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-discovery-gold mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Community Impact Statement */}
        <div className="mt-16 glass rounded-2xl p-8 lg:p-12 text-center scale-on-scroll">
          <div className="max-w-3xl mx-auto">
            <Map className="text-discovery-gold mx-auto mb-6" size={48} />
            <h3 className="text-2xl md:text-3xl font-bold text-discovery-charcoal mb-4">
              Serving Indigenous Communities Across Western Canada
            </h3>
            <p className="text-lg text-neutral-600 mb-6">
              From remote northern communities to urban Indigenous housing projects, 
              we understand the unique challenges and opportunities facing First Nations, 
              Métis, and Inuit communities.
            </p>
            <div className="text-sm text-neutral-500">
              <strong>Territory Acknowledgment:</strong> We acknowledge that we operate on the traditional territories 
              of Indigenous peoples across Alberta, Saskatchewan, and British Columbia, and we are grateful 
              for the opportunity to work in partnership with these communities.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 