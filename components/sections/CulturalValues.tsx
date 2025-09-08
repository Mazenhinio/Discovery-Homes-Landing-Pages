export function CulturalValues() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-6">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respecting traditions while building for the future
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">Respect</h3>
            <p className="text-gray-600">Honoring cultural traditions and community values</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">Partnership</h3>
            <p className="text-gray-600">Working together for stronger communities</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">Quality</h3>
            <p className="text-gray-600">Building homes that last for generations</p>
          </div>
        </div>
      </div>
    </section>
  );
} 