export function ROICalculator() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-6">
            ROI Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Calculate your potential return on investment
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Units
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nightly Rate
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                placeholder="250"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#D4AF37]">
            <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">
              Estimated Annual Revenue
            </h3>
            <p className="text-3xl font-bold text-[#D4AF37]">$912,500</p>
            <p className="text-gray-600 mt-2">Based on 70% occupancy rate</p>
          </div>
        </div>
      </div>
    </section>
  );
} 