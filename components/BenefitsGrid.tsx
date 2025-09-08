interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-gray-200">
              <div className="text-[#D4AF37] text-4xl mb-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full mx-auto"></div>
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 