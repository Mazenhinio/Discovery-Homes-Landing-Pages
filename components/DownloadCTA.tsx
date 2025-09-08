interface DownloadCTAProps {
  title: string;
  description: string;
  downloadText?: string;
  fileName?: string;
  benefits?: string[];
  downloadUrl?: string;
  leadMagnet?: string;
}

export function DownloadCTA({ title, description, downloadText = "Download Now", fileName = "guide.pdf", benefits, downloadUrl, leadMagnet }: DownloadCTAProps) {
  return (
    <section className="py-16 bg-[#2D2D2D] text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <button className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#2D2D2D] font-bold py-4 px-8 rounded-lg hover:bg-[#C4A027] transition-colors">
          <span>{downloadText}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </section>
  );
} 