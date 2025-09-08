'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface CarouselImage {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  title?: string
}

export function ImageCarousel({ images, title = "Gallery" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setModalIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        setModalIndex((prev) => (prev + 1) % images.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, images.length])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextModalImage = () => {
    setModalIndex((prev) => (prev + 1) % images.length)
  }

  const prevModalImage = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="space-y-8">
        <h2 className="text-3xl font-serif font-bold text-discovery-charcoal text-center">
          {title}
        </h2>
        
        {/* Large Featured Image */}
        <div className="relative group">
          <div className="aspect-video overflow-hidden rounded-2xl shadow-luxury bg-neutral-100">
            <img 
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay with Zoom Icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <button
                onClick={() => openModal(currentIndex)}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 glass text-discovery-white p-4 rounded-full hover:scale-110 micro-interaction"
              >
                <ZoomIn size={24} />
              </button>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-dark text-discovery-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 micro-interaction"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-dark text-discovery-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 micro-interaction"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-video overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 micro-interaction ${
                index === currentIndex 
                  ? 'ring-3 ring-discovery-gold shadow-gold' 
                  : 'hover:shadow-luxury'
              }`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div className="text-center text-sm text-neutral-500">
          {currentIndex + 1} of {images.length}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 glass text-discovery-white p-3 rounded-full hover:scale-110 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevModalImage()
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 glass-dark text-discovery-white p-4 rounded-full hover:scale-110 transition-all duration-300"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextModalImage()
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 glass-dark text-discovery-white p-4 rounded-full hover:scale-110 transition-all duration-300"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Modal Image */}
            <div 
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[modalIndex]?.src}
                alt={images[modalIndex]?.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-luxury-lg animate-in fade-in zoom-in duration-300"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass text-discovery-white px-6 py-3 rounded-full">
                <span className="text-sm font-medium">
                  {images[modalIndex]?.alt} • {modalIndex + 1} of {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 