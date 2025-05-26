'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AboutSection from '@/components/AboutSection';
import StatementSection from '@/components/StatementSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const slides = [
  {
    title: 'Unleash Your Bold Style',
    description: 'Discover fashion that breaks the mold.',
    image: '/slider1.jpg',
  },
  {
    title: 'Designs That Speak Loud',
    description: 'Make every look unapologetically yours.',
    image: '/slider2.webp',
  },
  {
    title: 'Statement Here',
    description: 'Neobrutalist vibes. Maximalist energy.',
    image: '/slider3.jpg',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => setCurrent(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F5DC]">
      <div className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Full background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover w-full h-full"
            />

            {/* Centered text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[4px_4px_0px_black] mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl font-semibold text-white drop-shadow-[2px_2px_0px_black]">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full border-4 ${
                current === index ? 'bg-black' : 'bg-white'
              } border-black transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <AboutSection />
      <StatementSection />
      <TestimonialsSection />

    </main>
  );
}
