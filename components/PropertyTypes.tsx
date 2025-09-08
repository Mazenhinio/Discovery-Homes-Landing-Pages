interface PropertyTypesProps {
  properties?: any[];
}

export function PropertyTypes({ properties }: PropertyTypesProps) {
  const propertyTypes = properties || [
    {
      title: "Luxury Cabins",
      description: "Premium accommodations with high-end finishes",
      features: ["Full kitchen", "Private deck", "Hot tub ready"]
    },
    {
      title: "Family Lodges", 
      description: "Spacious units perfect for family getaways",
      features: ["Multiple bedrooms", "Common areas", "Outdoor spaces"]
    },
    {
      title: "Glamping Units",
      description: "Unique outdoor experiences with modern comforts", 
      features: ["Compact design", "Eco-friendly", "Instagram-worthy"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-6">
            Property Types
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect accommodation style for your guests
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propertyTypes.map((property, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {property.description}
              </p>
              <ul className="space-y-2">
                {property.features?.map((feature: any, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 