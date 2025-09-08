interface Quote {
  quote: string;
  author: string;
}

interface QuoteCarouselProps {
  quotes: Quote[];
}

export function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  return (
    <section className="py-16 bg-[#2D2D2D] text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          {quotes.map((quote, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <blockquote className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
                "{quote.quote}"
              </blockquote>
              <cite className="text-[#D4AF37] font-medium text-lg">
                — {quote.author}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 