import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  id: number;
  url: string;
  title?: string;
  description?: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const defaultPlaceholders: CarouselSlide[] = [
  {
    id: 1,
    url: '',
    title: 'Digital Forensics',
    description: 'Professional evidence analysis'
  },
  {
    id: 2,
    url: '',
    title: 'Cyber Security',
    description: 'Protecting your infrastructure'
  },
  {
    id: 3,
    url: '',
    title: 'Training & Certification',
    description: 'Expert-led programs'
  }
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const displaySlides = slides.length > 0 ? slides : defaultPlaceholders;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [displaySlides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slides */}
      {displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.url ? (
            <img
              src={slide.url}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder gradient background
            <div
              className={`w-full h-full ${
                index === 0
                  ? 'bg-gradient-to-br from-darkblue-800 via-darkblue-900 to-primary-900/30'
                  : index === 1
                  ? 'bg-gradient-to-br from-primary-900/20 via-darkblue-900 to-darkblue-800'
                  : 'bg-gradient-to-br from-darkblue-700 via-darkblue-900 to-primary-800/20'
              }`}
            >
              {/* Decorative elements for placeholder */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-600 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-darkblue-600 blur-3xl" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkblue-950 via-darkblue-900/80 to-darkblue-900/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-darkblue-950/50 to-transparent" />

      {/* Navigation Arrows */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-darkblue-900/50 hover:bg-primary-600/50 border border-white/10 rounded-full text-white/70 hover:text-white transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-darkblue-900/50 hover:bg-primary-600/50 border border-white/10 rounded-full text-white/70 hover:text-white transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-primary-600 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
