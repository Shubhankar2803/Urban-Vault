'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Maya Chen',
    role: 'Fashion Influencer',
    photo: '/t1.webp',
    quote: "Urban Vault curates pieces I can't find anywhere else. Every purchase feels like discovering hidden treasure.",
  },
  {
    id: 2,
    name: 'Jordan Blake',
    role: 'Streetwear Enthusiast',
    photo: '/t2.jpeg',
    quote: "Finally, an e-commerce site that understands urban culture. The selection is unmatched.",
  },
  {
    id: 3,
    name: 'Alex Rivera',
    role: 'Creative Director',
    photo: '/t3.webp',
    quote: "Urban Vault doesn't just sell clothes—they vault culture. Every brand they feature speaks to authenticity.",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth staggered animations
  const yTitle = useSpring(useTransform(scrollYProgress, [0, 0.3], [80, 0]), {
    stiffness: 45,
    damping: 30,
  });

  const opacityTitle = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), {
    stiffness: 45,
    damping: 30,
  });

  const yCards = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [100, 0]), {
    stiffness: 45,
    damping: 30,
  });

  const opacityCards = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [0, 1]), {
    stiffness: 45,
    damping: 30,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black py-20 px-6 flex flex-col items-center border-t-4 border-black"
    >
      {/* Title */}
      <motion.h2
        style={{ y: yTitle, opacity: opacityTitle }}
        className="text-4xl md:text-6xl font-black text-white mb-16 uppercase tracking-tight"
      >
        What They Say
      </motion.h2>

      {/* Testimonials Grid */}
      <motion.div
        style={{ y: yCards, opacity: opacityCards }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {testimonials.map(({ id, name, role, photo, quote }) => (
          <div
            key={id}
            className="bg-black p-8 border-4 border-black hover:bg-white hover:text-black transition-all duration-300 group"
          >
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <Image
                src={photo}
                alt={`${name} photo`}
                width={80}
                height={80}
                className="w-20 h-20 object-cover border-4 border-white group-hover:border-black transition-all duration-300"
              />
            </div>

            {/* Quote */}
            <p className="text-lg text-white group-hover:text-black font-medium mb-6 leading-relaxed">
              "{quote}"
            </p>

            {/* Author Info */}
            <div className="border-t-2 border-white group-hover:border-black pt-4 transition-all duration-300">
              <div className="font-black text-white group-hover:text-black text-lg uppercase tracking-wide">
                {name}
              </div>
              <div className="text-sm text-gray-300 group-hover:text-gray-600 font-medium">
                {role}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Bottom Accent */}
      <motion.div
        style={{ opacity: opacityCards }}
        className="mt-16 w-24 h-1 bg-black"
      />
    </section>
  );
}