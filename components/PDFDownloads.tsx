'use client'

import { Download, FileText, Ruler, Home } from 'lucide-react'

interface PDFDownload {
  title: string
  description: string
  filename: string
  category: 'floorplan' | 'elevation' | 'perspective' | 'technical'
  size?: string
}

interface PDFDownloadsProps {
  downloads: PDFDownload[]
  modelName: string
}

export function PDFDownloads({ downloads, modelName }: PDFDownloadsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'floorplan':
        return <Ruler size={20} />
      case 'elevation':
        return <Home size={20} />
      case 'perspective':
        return <FileText size={20} />
      case 'technical':
        return <FileText size={20} />
      default:
        return <FileText size={20} />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'floorplan':
        return 'bg-blue-50 border-blue-200 text-blue-600'
      case 'elevation':
        return 'bg-green-50 border-green-200 text-green-600'
      case 'perspective':
        return 'bg-purple-50 border-purple-200 text-purple-600'
      case 'technical':
        return 'bg-orange-50 border-orange-200 text-orange-600'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  const groupedDownloads = downloads.reduce((acc, download) => {
    if (!acc[download.category]) {
      acc[download.category] = []
    }
    acc[download.category].push(download)
    return acc
  }, {} as Record<string, PDFDownload[]>)

  const categoryTitles = {
    floorplan: 'Floor Plans',
    elevation: 'Elevations',
    perspective: 'Perspectives',
    technical: 'Technical Documents'
  }

  return (
    <section className="section bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-discovery-charcoal mb-6">
            Download Plans & Documents
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Access detailed architectural drawings, floor plans, and technical specifications for {modelName}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedDownloads).map(([category, categoryDownloads]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold text-discovery-charcoal mb-4 flex items-center gap-2">
                {getCategoryIcon(category)}
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              <div className="space-y-3">
                {categoryDownloads.map((download, index) => (
                  <div key={index} className="card-luxury micro-interaction group">
                    <div className="card-body">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-discovery-charcoal mb-1 group-hover:text-discovery-gold transition-colors">
                            {download.title}
                          </h4>
                          <p className="text-sm text-neutral-600 mb-2">
                            {download.description}
                          </p>
                          {download.size && (
                            <span className="text-xs text-neutral-500">
                              File size: {download.size}
                            </span>
                          )}
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getCategoryColor(category)}`}>
                          {getCategoryIcon(category)}
                        </div>
                      </div>
                      
                      <a
                        href={download.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full justify-center group-hover:bg-discovery-gold group-hover:text-discovery-charcoal group-hover:border-discovery-gold transition-all duration-300"
                      >
                        <Download size={16} className="mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Download Option */}
        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="text-discovery-charcoal" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-discovery-charcoal mb-2">
              Need All Documents?
            </h3>
            <p className="text-neutral-600 mb-6">
              Contact us to receive a complete package of all {modelName} documentation including specifications, warranties, and building guides.
            </p>
            <a
              href="/contact"
              className="btn-luxury shadow-gold hover:shadow-luxury-lg transition-all duration-300"
            >
              Request Complete Package
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 