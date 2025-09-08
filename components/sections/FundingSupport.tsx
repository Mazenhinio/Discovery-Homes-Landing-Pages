export function FundingSupport() {
  const fundingOptions = [
    {
      title: "CMHC Co-Investment Fund",
      description: "Federal funding for affordable housing projects",
      eligibility: "Indigenous communities and housing providers"
    },
    {
      title: "Indigenous Housing Corporation", 
      description: "Dedicated funding for on-reserve housing",
      eligibility: "First Nations communities"
    },
    {
      title: "Provincial Housing Programs",
      description: "Provincial grants and subsidies available",
      eligibility: "Varies by province"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-6">
            Funding Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help navigate available funding programs to make quality housing more accessible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fundingOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {option.description}
              </p>
              <div className="text-sm text-[#D4AF37] font-medium">
                Eligibility: {option.eligibility}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-[#D4AF37] text-[#2D2D2D] font-bold py-3 px-8 rounded-lg hover:bg-[#C4A027] transition-colors">
            Learn More About Funding
          </button>
        </div>
      </div>
    </section>
  );
} 