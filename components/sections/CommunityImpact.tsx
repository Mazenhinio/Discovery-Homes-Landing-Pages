import { Star, Quote, MapPin, Calendar, Users } from 'lucide-react'

export function CommunityImpact() {
  const testimonials = [
    {
      name: "Chief Maria Littlecrow",
      title: "Bigstone Cree Nation",
      location: "Alberta",
      quote: "Discovery Homes understood our community's needs and cultural values. The housing project has provided safe, affordable homes while respecting our traditional ways. The partnership has been respectful and collaborative from day one.",
      image: "/images/testimonials/chief-maria.webp",
      project: "15 family homes completed in 2023",
      rating: 5
    },
    {
      name: "Robert Sinclair",
      title: "Housing Director",
      location: "Meadow Lake Tribal Council, Saskatchewan",
      quote: "Working with Discovery Homes has been exceptional. They took time to understand our grant requirements and delivered homes that exceed expectations. The quality and affordability make them our preferred partner.",
      image: "/images/testimonials/robert-sinclair.webp",
      project: "32 units across 4 communities",
      rating: 5
    },
    {
      name: "Elder Sarah Blackbird",
      title: "Community Elder",
      location: "Cheakamus First Nation, BC",
      quote: "These homes bring our families together while honoring the land. Discovery Homes listened to our elders and built something beautiful that will serve our grandchildren's grandchildren.",
      image: "/images/testimonials/elder-sarah.webp",
      project: "Community gathering space + 8 homes",
      rating: 5
    }
  ]

  const impactStats = [
    {
      icon: <Users size={32} />,
      number: "1,200+",
      label: "Community Members Housed",
      description: "Families now living in safe, affordable homes"
    },
    {
      icon: <MapPin size={32} />,
      number: "50+",
      label: "Communities Served",
      description: "First Nations across Alberta, Saskatchewan, and BC"
    },
    {
      icon: <Calendar size={32} />,
      number: "60 Days",
      label: "Average Delivery",
      description: "From order to move-in ready"
    },
    {
      icon: <Star size={32} />,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Based on community feedback surveys"
    }
  ]

  const projectHighlights = [
    {
      community: "Mikisew Cree First Nation",
      province: "Alberta",
      year: "2023",
      homes: 22,
      description: "Net-zero ready homes with traditional design elements",
      image: "/images/projects/mikisew-cree.webp"
    },
    {
      community: "Cowessess First Nation",
      province: "Saskatchewan", 
      year: "2022",
      homes: 18,
      description: "Multi-generational housing with cultural gathering spaces",
      image: "/images/projects/cowessess.webp"
    },
    {
      community: "Tsilhqot'in Nation",
      province: "British Columbia",
      year: "2023",
      homes: 12,
      description: "Off-grid capable homes for remote locations",
      image: "/images/projects/tsilhqotin.webp"
    }
  ]

  return (
    <section className="section bg-discovery-white animate-section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-discovery-charcoal mb-6">
            Community Impact & Success Stories
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            See how our partnerships with Indigenous communities have created lasting positive change, 
            providing safe, affordable housing while respecting cultural values and traditions.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-cards">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center card-item micro-interaction">
              <div className="text-discovery-gold mb-3 mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-discovery-charcoal mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-discovery-charcoal mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-neutral-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-discovery-charcoal text-center mb-12">
            Voices from Our Community Partners
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8 animate-cards">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-luxury micro-interaction group">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-discovery-gold fill-current" size={20} />
                    ))}
                  </div>
                  
                  <Quote className="text-discovery-gold mb-4" size={32} />
                  
                  <blockquote className="text-neutral-600 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="font-bold text-discovery-charcoal group-hover:text-discovery-gold transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-600 mb-1">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-discovery-gold mb-2">
                      {testimonial.location}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {testimonial.project}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Highlights */}
        <div>
          <h3 className="text-2xl font-bold text-discovery-charcoal text-center mb-12">
            Recent Community Projects
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8 animate-cards">
            {projectHighlights.map((project, index) => (
              <div key={index} className="card-luxury micro-interaction group overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <img 
                    src={project.image} 
                    alt={`${project.community} housing project`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 glass text-discovery-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </div>
                </div>
                
                <div className="card-body">
                  <h4 className="font-bold text-discovery-charcoal mb-2 group-hover:text-discovery-gold transition-colors">
                    {project.community}
                  </h4>
                  
                  <div className="flex items-center text-sm text-neutral-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    {project.province}
                    <span className="mx-2">•</span>
                    <span className="font-semibold text-discovery-gold">{project.homes} homes</span>
                  </div>
                  
                  <p className="text-neutral-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center scale-on-scroll">
          <div className="glass rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-discovery-charcoal mb-4">
              Ready to Start a Partnership?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how Discovery Homes can support your community's housing needs 
              with culturally-appropriate, affordable solutions backed by comprehensive funding support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-luxury shadow-gold hover:shadow-luxury-lg transition-all duration-300"
              >
                Book Community Consultation
              </a>
              <a
                href="#funding-resources"
                className="btn-outline hover:bg-discovery-gold hover:text-discovery-charcoal hover:border-discovery-gold transition-all duration-300"
              >
                View Funding Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 