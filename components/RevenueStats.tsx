export function RevenueStats() {
  const stats = [
    { label: "Average Occupancy Rate", value: "78%", description: "Industry leading" },
    { label: "Revenue per Unit", value: "$91K", description: "Annual average" },
    { label: "ROI Timeline", value: "3-5 years", description: "Typical payback" },
    { label: "Booking Rate", value: "85%", description: "Repeat customers" }
  ];

  return (
    <section className="py-16 bg-[#2D2D2D] text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revenue Performance
          </h2>
          <p className="text-xl text-gray-300">
            Real data from successful resort partnerships
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-gray-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 