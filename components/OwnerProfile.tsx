import Image from 'next/image'

interface Owner {
  name: string;
  title: string;
  image: string;
  bio: string;
  quote: string;
  highlights: string[];
}

interface OwnerProfileProps {
  owner: Owner;
  reverse?: boolean;
}

export function OwnerProfile({ owner, reverse = false }: OwnerProfileProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:gap-x-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={owner.image}
                    alt={`${owner.name} - ${owner.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-2">
              {owner.name}
            </h2>
            <p className="text-xl text-[#D4AF37] font-medium mb-6">
              {owner.title}
            </p>
            <div className="prose prose-lg text-gray-700 mb-8">
              <p>{owner.bio}</p>
            </div>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 mb-8">
              <p className="text-lg italic text-gray-600">
                "{owner.quote}"
              </p>
            </blockquote>
            <div>
              <h4 className="font-bold text-[#2D2D2D] mb-3">Highlights:</h4>
              <ul className="space-y-2">
                {owner.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 