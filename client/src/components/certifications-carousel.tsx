import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Certification {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  images: string[];
  category: string;
}

interface CertificationsCarouselProps {
  certifications: Certification[];
  language: string;
}

export function CertificationsCarousel({ certifications, language }: CertificationsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setSelectedImageIndex(0); // Reset image index when certification changes
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const nextImage = useCallback(() => {
    const currentCert = certifications[selectedIndex];
    if (currentCert) {
      setSelectedImageIndex((prev) => 
        prev === currentCert.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedIndex, certifications]);

  const prevImage = useCallback(() => {
    const currentCert = certifications[selectedIndex];
    if (currentCert) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? currentCert.images.length - 1 : prev - 1
      );
    }
  }, [selectedIndex, certifications]);

  if (!certifications.length) return null;

  const currentCertification = certifications[selectedIndex];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {certifications.map((certification, index) => {
              const IconComponent = certification.icon;
              return (
                <div key={index} className="flex-none w-full">
                  <div className="bg-white rounded-xl shadow-lg mx-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Content Side */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-dh-ocean text-white rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div className={`ml-4 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                            <div className="text-sm text-dh-ocean font-medium mb-2 uppercase tracking-wider">
                              {certification.category}
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-dh-navy leading-tight">
                              {certification.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {certification.description}
                        </p>
                      </div>

                      {/* Image Side */}
                      <div className="relative bg-gray-50 min-h-[400px] lg:min-h-[500px]">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${index}-${selectedImageIndex}`}
                            src={certification.images[selectedImageIndex]}
                            alt={`${certification.title} certificate ${selectedImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                          />
                        </AnimatePresence>

                        {/* Image Navigation - Only show if multiple images */}
                        {certification.images.length > 1 && index === selectedIndex && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                              data-testid="prev-image-btn"
                            >
                              <ChevronLeft className="h-5 w-5 text-dh-navy" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                              data-testid="next-image-btn"
                            >
                              <ChevronRight className="h-5 w-5 text-dh-navy" />
                            </button>

                            {/* Image Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {certification.images.map((_, imgIndex) => (
                                <button
                                  key={imgIndex}
                                  onClick={() => setSelectedImageIndex(imgIndex)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    imgIndex === selectedImageIndex
                                      ? 'bg-white scale-125'
                                      : 'bg-white/60 hover:bg-white/80'
                                  }`}
                                  data-testid={`image-dot-${imgIndex}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dh-navy text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:bg-dh-ocean hover:scale-110 z-10"
          data-testid="prev-cert-btn"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dh-navy text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:bg-dh-ocean hover:scale-110 z-10"
          data-testid="next-cert-btn"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-dh-ocean scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            data-testid={`cert-dot-${index}`}
          />
        ))}
      </div>

      {/* Current Certification Info */}
      <div className="text-center mt-6">
        <div className="text-sm text-dh-ocean font-medium uppercase tracking-wider mb-1">
          {language === 'he' ? `תעודה ${selectedIndex + 1} מתוך ${certifications.length}` : `Certificate ${selectedIndex + 1} of ${certifications.length}`}
        </div>
        <h4 className="text-lg font-semibold text-dh-navy">
          {currentCertification?.category}
        </h4>
      </div>
    </div>
  );
}
