export function CommunityTestimonials() {
  const testimonials = [
    {
      name: "Community Leader",
      location: "Northern Alberta",
      text: "Discovery Homes has been a trusted partner in providing quality housing for our community."
    },
    {
      name: "Family Representative", 
      location: "Saskatchewan",
      text: "The respect and care shown throughout the process made all the difference."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-6">
            Community Voices
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full mr-4"></div>
                <div>
                  <div className="font-bold text-[#2D2D2D]">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 