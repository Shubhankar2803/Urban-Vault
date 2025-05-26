'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Designer',
    photo: '/t1.webp',
    quote:
      "This brand transformed the way I think about design. Bold, unapologetic, and inspiring.",
  },
  {
    id: 2,
    name: 'Mark Stevens',
    role: 'Developer',
    photo: '/t2.jpeg',
    quote:
      "The maximalist, neobrutalist style really resonates with me. Their work is loud and proud.",
  },
  {
    id: 3,
    name: 'Jessica Lee',
    role: 'Entrepreneur',
    photo: '/t3.webp',
    quote:
      "Every detail is crafted with intent. This isn’t just a brand—it’s a movement.",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#e6ddff] py-20 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-extrabold text-[#ff007f] mb-12 uppercase tracking-wide">
        What They Say
      </h2>

      <motion.div
        className="flex flex-col md:flex-row justify-center gap-10 max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {testimonials.map(({ id, name, role, photo, quote }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 max-w-sm shadow-lg flex flex-col items-center text-center"
          >
            <img
              src={photo}
              alt={`${name} photo`}
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#ff007f]"
            />
            <p className="text-lg text-black font-semibold mb-4">&ldquo;{quote}&rdquo;</p>
            <div className="font-bold text-[#ff007f]">{name}</div>
            <div className="text-sm text-black/70">{role}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
